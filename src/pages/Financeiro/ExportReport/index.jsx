import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa";

const ExportReportModal = ({ show, onClose, onExport, resetList }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleExport = () => {
    if (!startDate || !endDate) return alert("Preencha as duas datas");
    onExport(startDate, endDate);
    setStartDate("");
    setEndDate("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaFileExport /> Exportar Relatório
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Data Início
            </label>
            <input
              type="date"
              className="border rounded p-2 w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Data Fim
            </label>
            <input
              type="date"
              className="border rounded p-2 w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleExport}
            >
              Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReportModal;
