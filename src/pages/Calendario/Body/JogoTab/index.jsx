import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import AddJogoModal from "../AddJogo/AddModal";

import { service } from "@/services";
import { useEffect, useState } from "react";
import { HttpStatus } from "@/utils/helper";
import { DefaultPageSize } from "@/utils/helper/consts";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getTreinoStatus } from "@/utils/helper/functions";

const JogoTable = () => {
  const [jogos, setJogos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- LOAD DATA ---------------- */
  const getAllJogos = async ({ page = 1 }) => {
    setIsLoading(true);
    try {
      const response = await service.jogo.getAll({
        page,
        size: DefaultPageSize,
      });

      if (response?.status === HttpStatus.OK) {
        setJogos(response.data.jogos);
        setTotalPages(response.data.totalPage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetList = () => {
    setPage(1);
    getAllJogos({ page: 1 });
  };

  useEffect(() => {
    getAllJogos({ page });
  }, [page]);

  const handleEdit = (jogo) => {
    console.log("Editar jogo", jogo);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este jogo?")) return;

    const response = await service.jogo.delete(id);
    if (response?.status === HttpStatus.NO_CONTENT) {
      resetList();
    }
  };

  return (
    <div>
      {/* Botão Novo Jogo */}
      <div className="flex justify-start mb-4 gap-5">
        <button
          className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" /> Novo Jogo
        </button>
      </div>
      <hr />

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-left">Data</th>
              <th className="py-2 px-4 text-left">Local</th>
              <th className="py-2 px-4 text-left">Equipa</th>
              <th className="py-2 px-4 text-left">Adversário</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Opções</th>
            </tr>
          </thead>

          <tbody>
            {jogos?.length === 0 && (
              <tr>
                <td colSpan={9} className="py-4 px-4 text-center">
                  {isLoading ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            )}

            {jogos?.map((jogo) => {
              const status = getTreinoStatus(jogo.data);

              return (
                <tr key={jogo.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{jogo.id}</td>
                  <td className="py-2 px-4">{jogo.descricao}</td>
                  <td className="py-2 px-4">
                    {new Date(jogo.data).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{jogo.local}</td>
                  <td className="py-2 px-4">{jogo.equipa?.nome || "-"}</td>
                  <td className="py-2 px-4">{jogo.adversario?.nome || "-"}</td>
                  <td className="py-2 px-4">{jogo.tipo}</td>

                  {/* STATUS */}
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                    >
                      <span>{status.icon}</span>
                      {status.label}
                    </span>
                  </td>

                  {/* Opções */}
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="Editar"
                        onClick={() => handleEdit(jogo)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                        title="Eliminar"
                        onClick={() => handleDelete(jogo.id)}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AddJogoModal
        resetList={resetList}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {/* Paginação */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default JogoTable;
