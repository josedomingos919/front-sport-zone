import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import AddModal from "../AddModal/AddModal";

import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import { service } from "@/services";
import {
  CategoriaOptionsEnum,
  DefaultPageSize,
  EscalaoOptionsEnum,
} from "@/utils/helper/consts";
import { HttpStatus } from "@/utils/helper";

const EquipaTable = () => {
  const [equipas, setEquipas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipa, setSelectedEquipa] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllEquipas = async ({ page = 1 }) => {
    setIsLoading(true);

    const response = await service.equipa.getAll({
      page,
      size: DefaultPageSize,
    });

    if (response?.status === HttpStatus.OK) {
      setEquipas(response?.data?.equipas || []);
      setTotalPages(response?.data?.totalPage || 0);
    }

    setIsLoading(false);
  };

  const resetList = () => {
    setPage(1);
    getAllEquipas({ page: 1 });
  };

  const handleEdit = (equipa) => {
    setSelectedEquipa(equipa);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja eliminar esta equipa?")) return;

    const response = await service.equipa.delete(id);
    if (response?.status === HttpStatus.OK) {
      resetList();
    }
  };

  useEffect(() => {
    getAllEquipas({ page });
  }, [page]);

  console.log("equipas", equipas);

  return (
    <div>
      {/* BOTÃO NOVO */}
      <div className="flex justify-start pt-8 mb-4">
        <button
          className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" /> Nova Equipa
        </button>
      </div>

      <hr />

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Id</th>
              <th className="py-2 px-4 text-left min-w-[250px]">Nome</th>
              <th className="py-2 px-4 text-left">Escalão</th>
              <th className="py-2 px-4 text-left">Categoria</th>
              <th className="py-2 px-4 text-left">Clube</th>
              <th className="py-2 px-4 text-left">Treinador</th>
              <th className="py-2 px-4 text-center">Opções</th>
            </tr>
          </thead>

          <tbody>
            {equipas.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  {isLoading ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            )}

            {equipas.map((equipa, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{equipa?.id}</td>
                <td className="py-2 px-4 font-medium whitespace-nowrap">
                  {equipa?.nome}
                </td>
                <td className="py-2 px-4">
                  {EscalaoOptionsEnum[equipa?.escalao]}
                </td>
                <td className="py-2 px-4">
                  {CategoriaOptionsEnum[equipa?.categoria]}
                </td>
                <td className="py-2 px-4">{equipa?.clube?.name || "-"}</td>
                <td className="py-2 px-4">{equipa?.treinador?.name || "-"}</td>

                {/* OPÇÕES */}
                <td className="py-2 px-4">
                  <div className="flex justify-center gap-3">
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="Editar"
                      onClick={() => handleEdit(equipa)}
                    >
                      <FaEdit size={14} />
                    </button>

                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="Eliminar"
                      onClick={() => handleDelete(equipa.id)}
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

      {/* MODAIS */}
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        resetList={resetList}
      />

      {/* PAGINAÇÃO */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EquipaTable;
