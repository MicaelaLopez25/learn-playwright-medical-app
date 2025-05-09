import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

async function main() {
  try {
    // Eliminar todos los turnos sin condiciones
    const deleted = await prisma.turno.deleteMany({});

    console.log(`Se eliminaron ${deleted.count} turnos.`);  // Imprimir cuántos turnos se eliminaron

  } catch (error) {
    console.error("❌ Error eliminando turnos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función main
main().catch(e => {
  console.error(e);
  process.exit(1);
});
