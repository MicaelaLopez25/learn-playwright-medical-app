-- Paso 1: Agregar las columnas 'fecha' y 'hora' permitiendo NULL
ALTER TABLE "Turno" ADD COLUMN "fecha" DATETIME NULL;
ALTER TABLE "Turno" ADD COLUMN "hora" TEXT NULL;

-- Paso 2: Actualizar las filas existentes para que no tengan valores NULL en las nuevas columnas
UPDATE "Turno" 
SET "fecha" = '2025-05-07', "hora" = '09:00'
WHERE "fecha" IS NULL AND "hora" IS NULL;

-- Paso 3: Verificar si existen duplicados para las columnas 'pacienteId', 'fecha' y 'hora'
SELECT pacienteId, fecha, hora, COUNT(*)
FROM Turno
GROUP BY pacienteId, fecha, hora
HAVING COUNT(*) > 1;

-- Si el paso anterior devuelve registros, necesitas eliminarlos o corregirlos antes de continuar

-- Paso 4: Crear una nueva tabla con las columnas 'fecha' y 'hora' como NOT NULL
CREATE TABLE "new_Turno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "hora" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Turno_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Turno_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Paso 5: Copiar los datos de la tabla original a la nueva tabla
INSERT INTO "new_Turno" ("createdAt", "id", "medicoId", "pacienteId", "updatedAt", "fecha", "hora")
SELECT "createdAt", "id", "medicoId", "pacienteId", "updatedAt", "fecha", "hora"
FROM "Turno";

-- Paso 6: Eliminar la tabla original
DROP TABLE "Turno";

-- Paso 7: Renombrar la nueva tabla para que tenga el nombre 'Turno'
ALTER TABLE "new_Turno" RENAME TO "Turno";

-- Paso 8: Crear el índice único para las columnas 'pacienteId', 'fecha' y 'hora'
CREATE UNIQUE INDEX "Turno_pacienteId_fecha_hora_key" ON "Turno"("pacienteId", "fecha", "hora");

-- Paso 9: Activar las claves foráneas nuevamente
PRAGMA foreign_keys=ON;

-- Paso 10: Revertir la deferencia de las claves foráneas
PRAGMA defer_foreign_keys=OFF;
