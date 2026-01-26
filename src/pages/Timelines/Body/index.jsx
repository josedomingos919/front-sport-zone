import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import React, { useState } from "react";
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { PiExportBold } from "react-icons/pi";
import ExportReportModal from "../ExportReport";

const initialMovements = [
  { descricao: "Mensalidade atleta", valor: 5000, tipo: "entrada" },
  { descricao: "Compra de bolas", valor: 1200, tipo: "saida" },
  { descricao: "Patrocínio", valor: 20000, tipo: "entrada" },
  { descricao: "Pagamento treinador", valor: 8000, tipo: "saida" },
];

const FinanceTable = () => {
  const [movements, setMovements] = useState(initialMovements);
  const [showModal, setShowModal] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [newMovement, setNewMovement] = useState({
    descricao: "",
    valor: "",
    tipo: "entrada",
  });

  const addMovement = () => {
    if (!newMovement.descricao || !newMovement.valor) return;
    setMovements([
      ...movements,
      { ...newMovement, valor: Number(newMovement.valor) },
    ]);
    setNewMovement({ descricao: "", valor: "", tipo: "entrada" });
    setShowModal(false);
  };

  return (
    <div className="">
      {/* Botão Novo Movimento */}
      <div className="flex justify-start pt-8 mb-4 gap-5">
        <button
          className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" /> Novo
        </button>
        <button
          className="flex items-center bg-blue-600 hover:bg-primary/90 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowExport(true)}
        >
          <PiExportBold className="mr-2" /> Relatório
        </button>
      </div>
      <hr />
      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-right">Valor</th>
              <th className="py-2 px-4 text-center">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{m.descricao}</td>
                <td
                  className={`py-2 px-4 text-right font-semibold ${
                    m.tipo === "entrada" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.tipo === "entrada" ? (
                    <FaArrowUp className="inline mr-1" />
                  ) : (
                    <FaArrowDown className="inline mr-1" />
                  )}
                  {m.valor.toLocaleString()} Kz
                </td>
                <td className="py-2 px-4 text-center capitalize">{m.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex flex-row items-center">
              <FaPlus className="mr-2" /> Adicionar Movimento
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Descrição"
                className="border p-2 rounded"
                value={newMovement.descricao}
                onChange={(e) =>
                  setNewMovement({ ...newMovement, descricao: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Valor"
                className="border p-2 rounded"
                value={newMovement.valor}
                onChange={(e) =>
                  setNewMovement({ ...newMovement, valor: e.target.value })
                }
              />
              <select
                className="border p-2 rounded"
                value={newMovement.tipo}
                onChange={(e) =>
                  setNewMovement({ ...newMovement, tipo: e.target.value })
                }
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={addMovement}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ExportReportModal
        show={showExport}
        onExport={() => {}}
        onClose={() => setShowExport(false)}
      />
      <Pagination currentPage={6} totalPages={33} onPageChange={() => {}} />
    </div>
  );
};

export default FinanceTable;
