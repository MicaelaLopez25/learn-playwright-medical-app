import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  {prisma}  from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Buscar al paciente por el email
    const paciente = await prisma.paciente.findUnique({
      where: { email },
    });

    if (!paciente) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, paciente.password);

    if (!isPasswordValid) {
        throw new Error("Credenciales inválidas");
    }

    // Crear un JWT para el paciente
    const token = jwt.sign(
      { id: paciente.id, email: paciente.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
