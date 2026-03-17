"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ConsentBannerProps {
  onAccept?: () => void;
}

export default function ConsentBanner({ onAccept }: ConsentBannerProps) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("user_consent");
    if (!consent) setShowBanner(true);
  }, []);

  const handleSubmit = async (status: "accepted" | "rejected") => {
    if (status === "accepted" && !accepted) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/consents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("No se pudo registrar el consentimiento");

      Cookies.set("user_consent", status, { expires: 30 });
      setShowBanner(false);
      onAccept && onAccept();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 flex justify-center animate-slideUp">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200 p-6 md:p-8 max-w-3xl w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Consentimiento de Datos
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            Este sitio utiliza tus datos personales para registrar tu consentimiento según la{" "}
            <a
              href="https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470-29733"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Ley N° 29733 – Ley de Protección de Datos Personales
            </a>.
          </p>

          <label className="mt-3 flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition 
                ${accepted ? "bg-blue-600 border-blue-600" : error ? "border-red-500" : "border-gray-300"}`
              }
            >
              {accepted && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className={`ml-2 text-sm md:text-base ${error ? "text-red-600" : "text-gray-700"}`}>
              Acepto el aviso de privacidad
            </span>
          </label>
        </div>

        <div className="flex md:flex-col flex-row items-center gap-3 md:gap-4 mt-2 md:mt-0">
          <button
            onClick={() => handleSubmit("accepted")}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 w-1/2 md:min-w-50 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Aceptar"}
          </button>
          <button
            onClick={() => handleSubmit("rejected")}
            disabled={loading}
            className="px-6 py-2 bg-gray-300 w-1/2 md:min-w-50 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}