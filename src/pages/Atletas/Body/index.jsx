import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import AddAtletaModal from "../AddModal/AddModal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { service } from "@/services";
import { DefaultPageSize, PosicaoEnum } from "@/utils/helper/consts";
import { HttpStatus } from "@/utils/helper";

const AtletaTable = () => {
  const [atletas, setAtletas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- LOAD DATA ---------------- */
  const getAllAtletas = async ({ page = 1 }) => {
    setIsLoading(true);
    try {
      const response = await service.atleta.getAll({
        page,
        size: DefaultPageSize,
      });
      if (response?.status === HttpStatus.OK) {
        setAtletas(response.data.atletas);
        setTotalPages(response.data.totalPage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetList = () => {
    setPage(1);
    getAllAtletas({ page: 1 });
  };

  useEffect(() => {
    getAllAtletas({ page });
  }, [page]);

  const handleEdit = (atleta) => {
    // Lógica para abrir modal de edição
    console.log("Editar", atleta);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este atleta?")) return;
    const response = await service.atleta.delete(id);
    if (response?.status === HttpStatus.NO_CONTENT) {
      resetList();
    }
  };

  return (
    <div className="">
      {/* Botão Novo Atleta */}
      <div className="flex justify-start pt-8 mb-4 gap-5">
        <button
          className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" /> Novo Atleta
        </button>
      </div>
      <hr />

      {/* Tabela */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Nome</th>
              <th className="py-2 px-4 text-left">Foto</th>
              <th className="py-2 px-4 text-left">Nascimento</th>
              <th className="py-2 px-4 text-left">Posição</th>
              <th className="py-2 px-4 text-center">Público</th>
              <th className="py-2 px-4 text-left">Equipa</th>
              <th className="py-2 px-4 text-center">Opções</th>
            </tr>
          </thead>

          <tbody>
            {atletas?.length === 0 && (
              <tr>
                <td colSpan={9} className="py-4 px-4 text-center">
                  {isLoading ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            )}

            {atletas?.map((atleta) => (
              <tr key={atleta.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{atleta.id}</td>
                <td className="py-2 px-4">{atleta.user?.name || "-"}</td>

                {/* Foto Base64 */}
                <td className="py-2 px-4">
                  {atleta.foto ? (
                    <img
                      src={atleta.foto}
                      alt={atleta.nome}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-2 px-4">
                  {new Date(atleta.nascimento).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {PosicaoEnum?.[atleta.posicao] || atleta.posicao}
                </td>
                <td className="py-2 px-4 text-center">
                  {atleta.publico ? "Sim" : "Não"}
                </td>
                <td className="py-2 px-4">{atleta.equipe?.nome || "-"}</td>

                {/* Opções */}
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      title="Editar"
                      onClick={() => handleEdit(atleta)}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                      title="Eliminar"
                      onClick={() => handleDelete(atleta.id)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add Atleta */}
      <AddAtletaModal
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

export default AtletaTable;
