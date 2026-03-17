"use client";

import { useState } from "react";

interface ConsentFormProps {
  onAccept: () => void;
}

export default function ConsentForm({ onAccept }: ConsentFormProps) {
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accepted) {
      setMessage("Debes aceptar el aviso de privacidad para continuar.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/consents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "accepted",
        }),
      });

      if (!res.ok) throw new Error("Error registrando el consentimiento");

      onAccept();
    } catch (err: any) {
      setMessage(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 text-center">
        Formulario de Consentimiento
      </h2>

      <p className="text-gray-700 text-sm">
        Tus datos personales serán tratados únicamente para registrar tu consentimiento
        según la <a 
          href="https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470-29733" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 underline hover:text-blue-800"
        >
          Ley N° 29733 – Ley de Protección de Datos Personales
        </a>.
      </p>

      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-800">
          Acepto el aviso de privacidad y doy mi consentimiento
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Aceptar"}
      </button>

      {message && (
        <p className="text-red-700 bg-red-100 px-4 py-2 rounded-md text-center">
          {message}
        </p>
      )}
    </form>
  );
}