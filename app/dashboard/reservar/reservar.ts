import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pacienteId, medicoId, fechaHora } = req.body;

    // Verificar si el paciente ya tiene un turno reservado en esa fecha
    const turnoExistente = await prisma.turno.findFirst({
      where: {
        pacienteId,
        fechaHora,
      },
    });

    if (turnoExistente) {
      return res.status(400).json({ error: 'Ya tienes un turno reservado en este horario.' });
    }

    // Verificar si el médico tiene un turno disponible en esa fecha
    const turnoMedicoExistente = await prisma.turno.findFirst({
      where: {
        medicoId,
        fechaHora,
      },
    });

    if (turnoMedicoExistente) {
      return res.status(400).json({ error: 'El médico ya tiene un turno reservado en este horario.' });
    }

    // Crear el nuevo turno
    const turno = await prisma.turno.create({
      data: {
        pacienteId,
        medicoId,
        fechaHora: new Date(fechaHora),
      },
    });

    return res.status(201).json({ turno });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
