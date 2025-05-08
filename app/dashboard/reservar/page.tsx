"use client";

import { useEffect, useState } from "react";
import {
  getSpecialties,
  getDoctorsBySpecialty,
  getAvailableTimeSlots,
  createAppointment,
} from "@/lib/actions";

type OpcionSimple = { id: number; nombre: string };

export default function ReservarTurnoPage() {
  const [especialidades, setEspecialidades] = useState<OpcionSimple[]>([]);
  const [especialidadId, setEspecialidadId] = useState<number | null>(null);

  const [medicos, setMedicos] = useState<OpcionSimple[]>([]);
  const [medicoId, setMedicoId] = useState<number | null>(null);

  const [fecha, setFecha] = useState<string>(""); // formato YYYY-MM-DD
  const [horarios, setHorarios] = useState<string[]>([]); // solo horarios, ej. "14:00"
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null);

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Obtener especialidades al cargar
  useEffect(() => {
    getSpecialties().then(setEspecialidades);
  }, []);

  // Cargar médicos cuando se elige una especialidad
  useEffect(() => {
    if (especialidadId !== null) {
      getDoctorsBySpecialty(especialidadId).then(setMedicos);
    } else {
      setMedicos([]);
      setMedicoId(null);
    }
  }, [especialidadId]);

  // Cargar horarios cuando hay médico y fecha
  useEffect(() => {
    if (medicoId && fecha) {
      const dateObj = new Date(fecha);
      getAvailableTimeSlots(medicoId, dateObj).then(setHorarios);
    } else {
      setHorarios([]);
    }
  }, [medicoId, fecha]);

  const reservarTurno = async () => {
    if (!especialidadId || !medicoId || !fecha || !horarioSeleccionado) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    setCargando(true);
    setMensaje(null);

    try {
      const dateObj = new Date(fecha);
      
      
      // Enviar la fecha y la hora al backend
      await createAppointment({
        especialidadId,
        medicoId,
        date: new Date(fecha), // ✅ convertir string a Date
        timeSlot: horarioSeleccionado,
      });
      

      setMensaje("✅ Turno reservado correctamente.");
    } catch (err: any) {
      setMensaje(`❌ Error: ${err.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
   <h1 data-testid="reserva-header" className="text-2xl font-bold mb-4">
  Reservar Turno
</h1>
<p data-testid="debug-carga">Componente cargado</p>
 
      <h1 className="text-2xl font-bold mb-4">Reservar Turno</h1>

      <div className="mb-4">
        <label className="block mb-1">Especialidad</label>
        <select
          value={especialidadId ?? ""}
          onChange={(e) => setEspecialidadId(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Seleccionar</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>

      {medicos.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1">Médico</label>
          <select
            value={medicoId ?? ""}
            onChange={(e) => setMedicoId(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Seleccionar</option>
            {medicos.map((med) => (
              <option key={med.id} value={med.id}>
                {med.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

{medicoId && (
  <div className="mb-4">
    <label className="block mb-1">Fecha</label>
    <input
      type="date"
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      className="w-full border rounded px-2 py-1"
    />
    {fecha && (
      <p className="mt-2 text-sm text-gray-600">
        Fecha seleccionada: {new Date(fecha).toLocaleDateString("es-AR")}
      </p>
    )}
  </div>
)}

      {horarios.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1">Horario</label>
          <select
            value={horarioSeleccionado ?? ""}
            onChange={(e) => setHorarioSeleccionado(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Seleccionar</option>
            {horarios.map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={reservarTurno}
        disabled={cargando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {cargando ? "Reservando..." : "Confirmar Turno"}
      </button>

      {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
    </div>
  );
}
