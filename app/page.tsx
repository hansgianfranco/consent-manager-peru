"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ConsentBanner from "@/components/ConsentBanner";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";

export default function Home() {
  const [showConsent, setShowConsent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const consent = Cookies.get("user_consent");
    if (!consent) {
      setTimeout(() => setShowConsent(true), 0);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("user_consent", "accepted", { expires: 30 });
    setShowConsent(false);
  };

  const goToAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 relative overflow-hidden">
      <section className="text-center pt-20 pb-32 px-4 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          Consent Manager Perú 🇵🇪
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Administra de manera sencilla los consentimientos de tus usuarios según la Ley N° 29733.
          Simula el registro de consentimientos en un entorno seguro y visual.
        </p>

        <div className="flex justify-center">
          <button
            onClick={goToAdmin}
            className="mt-4 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            <LayoutDashboardIcon className="w-5 h-5" />
            Ir al Admin
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
          >
            <h2 className="font-bold text-lg mb-2">Sección {idx + 1}</h2>
            <p className="text-gray-600 text-sm">
              Contenido de ejemplo para simular una web real. Esta tarjeta puede contener cualquier información.
            </p>
          </div>
        ))}
      </section>

      {showConsent && <ConsentBanner onAccept={handleAccept} />}

      <footer className="text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} Consent Manager Perú. Todos los derechos reservados.
      </footer>
    </main>
  );
}