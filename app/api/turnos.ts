// app/api/mis-turnos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { pacienteId } = req.query;

    if (!pacienteId || Array.isArray(pacienteId)) {
      return res.status(400).json({ error: 'ID de paciente inválido' });
    }

    try {
      const turnos = await prisma.turno.findMany({
        where: { pacienteId: Number(pacienteId) },
        include: {
          medico: {
            include: { especialidad: true }
          }
        },
      
      });

      return res.status(200).json({ turnos });
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      return res.status(500).json({ error: 'Error al obtener los turnos' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
