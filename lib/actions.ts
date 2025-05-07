"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();


// Acciones del servidor
export async function registerUser({ name, email, phone, password }: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.paciente.create({  // Cambié `user` por `paciente`
    data: {
      nombre: name,  // Asegúrate de que `name` se mapea a `nombre` en Prisma
      email,
      telefono: phone,  // `phone` se mapea a `telefono`
      password: hashedPassword,
    },
  });

  return user;
}


export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.paciente.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  (await cookies()).set(
    "session",
    JSON.stringify({
      userId: user.id,
      name: user.nombre,
      email: user.email,
    })
  );

  return { success: true };
}



export async function logoutUser() {
  (await cookies()).delete("session");
  redirect("/login");
}

export async function getSpecialties() {
  return await prisma.especialidad.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });
}

export async function getDoctorsBySpecialty(especialidadId: number) {
  return await prisma.medico.findMany({
    where: {
      especialidadId,
    },
    select: {
      id: true,
      nombre: true,
    },
  });
}
export async function getAvailableTimeSlots(medicoId: number, date: Date) {
  const allSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ];
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const turnos = await prisma.turno.findMany({
    where: {
      medicoId,
      fecha: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    select: {
      hora: true,
    },
  });

  const bookedSlots = turnos.map((t) => t.hora);

  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return availableSlots;
}

export async function createAppointment(data: {
  especialidadId: number;
  medicoId: number;
  date: Date;
  timeSlot: string;
}) {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    throw new Error("No autenticado");
  }

  const [hours, minutes] = data.timeSlot.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Formato de horario inválido.");
  }

  const dateTime = new Date(data.date);
  dateTime.setHours(hours, minutes, 0, 0);

  // Verifica si ya existe un turno en ese horario para ese paciente
  const existing = await prisma.turno.findFirst({
    where: {
      pacienteId: session.userId,
      fecha: data.date,
      hora: data.timeSlot,
    },
  });

  if (existing) {
    throw new Error("Ya tenés un turno reservado en este horario.");
  }

  // Verifica si el horario está disponible para ese médico
  const availableSlots = await getAvailableTimeSlots(data.medicoId, data.date);
  if (!availableSlots.includes(data.timeSlot)) {
    throw new Error("El horario seleccionado ya no está disponible.");
  }

  await prisma.turno.create({
    data: {
      pacienteId: session.userId,
      medicoId: data.medicoId,
      fecha: new Date(data.date),
      hora: data.timeSlot,
    },
  });

  revalidatePath("");
  return { success: true };
}




export async function getUserAppointments() {
  const session = (await cookies()).get("session");
  if (!session) throw new Error("No hay sesión activa");

  const data = JSON.parse(session.value);
  const user = await prisma.paciente.findUnique({ where: { id: data.userId } });
  if (!user) throw new Error("Usuario no encontrado");

  // Obtener los turnos del paciente con la información relacionada al médico y la especialidad
  const appointments = await prisma.turno.findMany({
    where: { pacienteId: user.id },
    include: {
      medico: {
        include: {
          especialidad: true,  // Asegúrate de incluir la especialidad
        },
      },
    },
  });

  // Mapear los turnos a un formato que se pueda usar en la interfaz
  return appointments.map((appointment) => ({
    id: appointment.id,
    specialty: appointment.medico.especialidad.nombre,  // Nombre de la especialidad
    doctorName: `${appointment.medico.nombre} `,  // Nombre completo del médico
    date: appointment.fecha,  // Fecha del turno
    time: appointment.hora,  // Hora del turno
  }));
}


export async function cancelAppointment(appointmentId: number) {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) throw new Error("No autenticado");

  const turno = await prisma.turno.findUnique({
    where: { id: appointmentId },
  });

  if (!turno || turno.pacienteId !== session.userId) {
    throw new Error("Turno no encontrado");
  }

  const now = new Date();
  const turnoDateTime = new Date(turno.fecha);
  const [hours, minutes] = turno.hora.split(":").map(Number);
  turnoDateTime.setHours(hours, minutes, 0, 0);

  const diffInHours = (turnoDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    throw new Error("No se puede cancelar un turno con menos de 24 horas de anticipación");
  }

  await prisma.turno.delete({
    where: { id: appointmentId },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getCurrentUser() {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) return null;
  return await prisma.paciente.findUnique({ where: { id: session.userId } });
}
