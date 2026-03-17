"use client";

import { useEffect, useState } from "react";
import ConsentForm from "@/components/ConsentForm";
import Cookies from "js-cookie";

export default function Home() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("user_consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("user_consent", "accepted", { expires: 30 });
    setShowConsent(false);
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Consent Manager Perú 🇵🇪
        </h1>
        <p className="text-gray-700">
          Administra de manera sencilla los consentimientos de tus usuarios según la Ley N° 29733.
        </p>
      </div>

      {showConsent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <ConsentForm onAccept={handleAccept} />
          </div>
        </div>
      )}
    </main>
  );
}