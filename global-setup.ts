import { prisma } from './lib/prisma';

async function globalSetup() {
  console.log('Ejecutando globalSetup: Inicializando entorno de pruebas...');

  // 1. Limpia la base de datos existente.
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 2. Inserta datos de prueba.
  await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      name: 'Test User',
      posts: {
        create: [
          {
            title: 'Primer Post de Prueba',
            content: 'Este es un post de prueba.',
            published: true,
          },
          {
            title: 'Segundo Post de Prueba',
            content: 'Otro post de prueba.',
            published: false,
          },
        ],
      },
    },
  });

  console.log('Datos de prueba insertados correctamente.');
}

export default globalSetup;
