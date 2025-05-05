import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { turnoId, pacienteId } = req.body;

    // Verificar si el turno pertenece al paciente y si está cancelando con más de 24 horas de anticipación
    const turno = await prisma.turno.findUnique({
      where: { id: turnoId },
    });

    if (!turno) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    if (turno.pacienteId !== pacienteId) {
      return res.status(403).json({ error: 'No puedes cancelar este turno' });
    }

    const diferenciaHoras = (turno.fechaHora.getTime() - new Date().getTime()) / (1000 * 3600);

    if (diferenciaHoras < 24) {
      return res.status(400).json({ error: 'No se puede cancelar el turno con menos de 24 horas de anticipación' });
    }

    // Eliminar el turno
    await prisma.turno.delete({ where: { id: turnoId } });

    return res.status(200).json({ message: 'Turno cancelado correctamente' });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
