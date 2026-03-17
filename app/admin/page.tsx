"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Consent } from "@prisma/client";
import { exportConsentCSV, exportConsentPDF } from "@/utils/export";
import { FileSpreadsheetIcon, FileTextIcon, HomeIcon } from "lucide-react";

export default function AdminPage() {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/consents", {
      headers: { "x-admin-key": process.env.ADMIN_KEY || "lF6DScFhikXCnLRRnKRdzIVb" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setConsents(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const goHome = () => router.push("/");

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-gray-400 text-lg animate-pulse">Cargando consentimientos...</p>
      </div>
    );

  const total = consents.length;
  const accepted = consents.filter(c => c.status === "accepted").length;
  const rejected = total - accepted;

  return (
    <main className="min-h-screen bg-gray-900 p-6 md:p-10 text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard - Consentimientos</h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={goHome}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            <HomeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => exportConsentPDF(consents)}
            className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            <FileTextIcon className="w-5 h-5" />
            Exportar PDF
          </button>
          <button
            onClick={() => exportConsentCSV(consents)}
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            <FileSpreadsheetIcon className="w-5 h-5" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-gray-400 text-sm">Aceptados</p>
          <p className="text-2xl font-bold text-green-400">{accepted}</p>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-gray-400 text-sm">Rechazados</p>
          <p className="text-2xl font-bold text-red-400">{rejected}</p>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User Agent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {consents.map((c) => (
              <tr key={c.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-200">{c.id.slice(0, 8)}...</td>
                <td className="px-4 py-2 text-sm font-semibold">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === "accepted" ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-400">{c.ip || "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-400 truncate max-w-xs">{c.userAgent || "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-400">{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {consents.length === 0 && (
        <p className="mt-4 text-center text-gray-400">No hay consentimientos registrados aún.</p>
      )}
    </main>
  );
}