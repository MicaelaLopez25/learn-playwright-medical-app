import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear especialidades si no existen
  const especialidades = await prisma.especialidad.createMany({
    data: [
      { nombre: "Dermatología" },
      { nombre: "Cardiología" },
      { nombre: "Pediatría" },
      { nombre: "Traumatología" },
    ],
    //skipDuplicates: true, // Evitar errores si ya existen
  });

  // Obtener las especialidades insertadas
  const especialidadesDb = await prisma.especialidad.findMany();

  // Crear médicos y asociarlos con especialidades
  const medicos = await prisma.medico.createMany({
    data: [
      {
        nombre: "María García",
        especialidadId: especialidadesDb.find(e => e.nombre === "Dermatología")!.id,
      },
      {
        nombre: "Juan Pérez",
        especialidadId: especialidadesDb.find(e => e.nombre === "Cardiología")!.id,
      },
      {
        nombre: "Ana Rodríguez",
        especialidadId: especialidadesDb.find(e => e.nombre === "Pediatría")!.id,
      },
      {
        nombre: "Carlos López",
        especialidadId: especialidadesDb.find(e => e.nombre === "Traumatología")!.id,
      },
    ],
    //skipDuplicates: true, // Evitar duplicados si ya existen médicos
  });

  console.log("Datos iniciales cargados exitosamente.");
}

// Ejecutar la función main
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
