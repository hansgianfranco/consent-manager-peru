"use client";

import { useEffect, useState } from "react";

interface Consent {
  id: string;
  status: string;
  purpose?: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/consents", {
      headers: { "x-admin-key": process.env.ADMIN_KEY || 'lF6DScFhikXCnLRRnKRdzIVb' },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setConsents(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin - Consentimientos</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">IP</th>
            <th className="border px-2 py-1">User Agent</th>
            <th className="border px-2 py-1">Created At</th>
          </tr>
        </thead>
        <tbody>
          {consents.map((c) => (
            <tr key={c.id} className="even:bg-gray-100">
              <td className="border px-2 py-1">{c.id}</td>
              <td className="border px-2 py-1">{c.status}</td>
              <td className="border px-2 py-1">{c.ip}</td>
              <td className="border px-2 py-1">{c.userAgent}</td>
              <td className="border px-2 py-1">{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}