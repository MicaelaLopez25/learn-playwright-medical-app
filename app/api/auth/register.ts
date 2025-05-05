import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import  {prisma}  from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, email, telefono, password } = req.body;

    // Verificar si el email ya está registrado
    const existingUser = await prisma.paciente.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el paciente
    const paciente = await prisma.paciente.create({
      data: {
        nombre,
        email,
        telefono,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ paciente });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
