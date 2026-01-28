import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import { service } from "@/services";
import { useEffect, useState } from "react";
import { HttpStatus } from "@/utils/helper";
import { DefaultPageSize } from "@/utils/helper/consts";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { getTreinoStatus } from "@/utils/helper/functions";
import AddHistoricoModal from "../AddHistorico/AddModal";

const HistoricoTable = () => {
  const [historicos, setHistoricos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- LOAD DATA ---------------- */
  const getAllHistoricos = async ({ page = 1 }) => {
    setIsLoading(true);
    try {
      const response = await service.historico.getAll({
        page,
        size: DefaultPageSize,
      });

      if (response?.status === HttpStatus.OK) {
        setHistoricos(response.data.historicos);
        setTotalPages(response.data.totalPage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetList = () => {
    setPage(1);
    getAllHistoricos({ page: 1 });
  };

  useEffect(() => {
    getAllHistoricos({ page });
  }, [page]);

  const handleEdit = (historico) => {
    console.log("Editar histórico", historico);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este histórico?")) return;

    const response = await service.historico.delete(id);
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
          <FaPlus className="mr-2" /> Novo Histórico
        </button>
      </div>
      <hr />
      {/* Tabela */}
      <div className="max-w-[1082px] overflow-scroll">
        <table className="bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Atleta</th>
              <th className="py-2 px-4 text-left">Jogo</th>
              <th className="py-2 px-4 text-left">Equipa</th>
              <th className="py-2 px-4 text-left">Adversário</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Data</th>
              <th className="py-2 px-4 text-left">Minutos</th>
              <th className="py-2 px-4 text-left">Gols</th>
              <th className="py-2 px-4 text-left">Assistência</th>
              <th className="py-2 px-4 text-left">Faltas</th>
              <th className="py-2 px-4 text-left">Avaliação</th>
              <th className="py-2 px-4 text-center">Opções</th>
            </tr>
          </thead>

          <tbody>
            {historicos?.length === 0 && (
              <tr>
                <td colSpan={14} className="py-4 px-4 text-center">
                  {isLoading ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            )}

            {historicos?.map((h) => {
              return (
                <tr key={h.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{h.id}</td>
                  <td className="py-2 px-4">{h.atleta?.user?.name || "-"}</td>
                  <td className="py-2 px-4">{h.jogo?.descricao || "-"}</td>
                  <td className="py-2 px-4">{h.jogo?.equipa?.nome || "-"}</td>
                  <td className="py-2 px-4">
                    {h.jogo?.adversario?.nome || "-"}
                  </td>
                  <td className="py-2 px-4">{h.jogo?.tipo || "-"}</td>
                  <td className="py-2 px-4">
                    {h.jogo?.data
                      ? new Date(h.jogo.data).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-4">{h.minutos ?? "-"}</td>
                  <td className="py-2 px-4">{h.gols ?? "-"}</td>
                  <td className="py-2 px-4">{h.assistencias ?? "-"}</td>
                  <td className="py-2 px-4">{h.faltas ?? "-"}</td>
                  <td className="py-2 px-4">{h.avaliacaoStar ?? "-"}</td>

                  {/* Opções */}
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="Editar"
                        onClick={() => handleEdit(h)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                        title="Eliminar"
                        onClick={() => handleDelete(h.id)}
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
      {showModal ? (
        <AddHistoricoModal
          showModal={setShowModal}
          setShowModal={setShowModal}
          resetList={resetList}
        />
      ) : null}
      {/* Paginação */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default HistoricoTable;
