import Pagination from "@/components/pagination";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const initialEquipes = [
  { id: 1, categoria: "Futebol", escalao: "Sub-17", treinador: "João Silva" },
  { id: 2, categoria: "Basquete", escalao: "Sénior", treinador: "Maria Costa" },
];

const CadastroEquipa = () => {
  const [equipes, setEquipes] = useState(initialEquipes);
  const [showModal, setShowModal] = useState(false);
  const [newEquipa, setNewEquipa] = useState({
    categoria: "",
    escalao: "",
    userId: "",
  });

  // Simulando lista de treinadores
  const treinadores = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Costa" },
    { id: 3, nome: "Carlos Mendes" },
  ];

  const addEquipa = () => {
    if (!newEquipa.categoria || !newEquipa.escalao || !newEquipa.userId) return;
    const treinadorNome = treinadores.find(
      (t) => t.id === parseInt(newEquipa.userId)
    )?.nome;

    setEquipes([
      ...equipes,
      {
        id: equipes.length + 1,
        categoria: newEquipa.categoria,
        escalao: newEquipa.escalao,
        treinador: treinadorNome || "N/A",
      },
    ]);
    setNewEquipa({ categoria: "", escalao: "", userId: "" });
    setShowModal(false);
  };

  return (
    <div className="pt-8">
      {/* Botão abrir modal */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded shadow mb-4"
      >
        <FaPlus className="mr-2" /> Nova
      </button>
      <hr />
      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Categoria</th>
              <th className="py-2 px-4 text-left">Escalão</th>
              <th className="py-2 px-4 text-left">Treinador</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map((equipe) => (
              <tr key={equipe.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{equipe.categoria}</td>
                <td className="py-2 px-4">{equipe.escalao}</td>
                <td className="py-2 px-4">{equipe.treinador}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={6} totalPages={33} onPageChange={() => {}} />
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPlus className="mr-2" /> Criar Equipa
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Categoria"
                className="border p-2 rounded"
                value={newEquipa.categoria}
                onChange={(e) =>
                  setNewEquipa({ ...newEquipa, categoria: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Escalão"
                className="border p-2 rounded"
                value={newEquipa.escalao}
                onChange={(e) =>
                  setNewEquipa({ ...newEquipa, escalao: e.target.value })
                }
              />
              <select
                className="border p-2 rounded"
                value={newEquipa.userId}
                onChange={(e) =>
                  setNewEquipa({ ...newEquipa, userId: e.target.value })
                }
              >
                <option value="">Selecionar Treinador</option>
                {treinadores.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={addEquipa}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroEquipa;
