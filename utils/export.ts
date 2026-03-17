import { Consent } from "@prisma/client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportConsentPDF(consents: Consent[]) {
  const doc = new jsPDF();
  const title = "Consent Manager Perú - Reporte de Consentimientos";

  doc.setFontSize(16);
  doc.setTextColor("#1E40AF");
  doc.text(title, 14, 20);

  doc.setFontSize(10);
  doc.setTextColor("#6B7280");
  doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [["ID", "Status", "IP", "User Agent", "Fecha"]],
    body: consents.map(c => [
      c.id.slice(0, 8) + "...",
      c.status,
      c.ip || "-",
      c.userAgent || "-",
      new Date(c.createdAt).toLocaleString()
    ]),
    theme: "grid",
    headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: "bold" },
    bodyStyles: { fillColor: [255, 255, 255], textColor: 30 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    styles: { fontSize: 9, cellPadding: 4 }
  });

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor("#6B7280");
  doc.text(
    "© 2026 Consent Manager Perú. Todos los derechos reservados.",
    14,
    pageHeight - 10
  );

  doc.save(`consentimientos_${Date.now()}.pdf`);
}

export function exportConsentCSV(consents: Consent[]) {
  const headers = ["ID", "Status", "IP", "User Agent", "Fecha"];
  const rows = consents.map(c => [
    c.id,
    c.status,
    c.ip || "",
    c.userAgent || "",
    new Date(c.createdAt).toLocaleString()
  ]);

  const csvContent = [headers, ...rows]
    .map(e => e.map(v => `"${v}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `consentimientos_${Date.now()}.csv`);
  a.click();
}