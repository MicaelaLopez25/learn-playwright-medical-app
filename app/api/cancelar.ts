import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { turnoId, pacienteId } = body;

  if (!turnoId || !pacienteId) {
    return NextResponse.json({ error: 'Faltan datos para cancelar el turno' }, { status: 400 });
  }

  const turno = await prisma.turno.findUnique({ where: { id: turnoId } });

  if (!turno) {
    return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 });
  }

  if (turno.pacienteId !== pacienteId) {
    return NextResponse.json({ error: 'No puedes cancelar este turno' }, { status: 403 });
  }

  // Combinar fecha y hora en un solo objeto Date
  const [hours, minutes] = turno.hora.split(':').map(Number);
  const fechaHoraTurno = new Date(turno.fecha);
  fechaHoraTurno.setHours(hours);
  fechaHoraTurno.setMinutes(minutes);
  fechaHoraTurno.setSeconds(0);
  fechaHoraTurno.setMilliseconds(0);

  const ahora = new Date();
  const diferenciaHoras = (fechaHoraTurno.getTime() - ahora.getTime()) / (1000 * 3600);

  if (diferenciaHoras < 24) {
    return NextResponse.json({
      error: 'No se puede cancelar el turno con menos de 24 horas de anticipación'
    }, { status: 400 });
  }

  await prisma.turno.delete({ where: { id: turnoId } });

  return NextResponse.json({ message: 'Turno cancelado correctamente' }, { status: 200 });
}
