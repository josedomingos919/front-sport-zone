import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import AddModal from "../AddModal/AddModal";
import EditMovimentModalEditar from "../EditModal/AddMovimentModal";
import { FaEdit, FaTrash } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { service } from "@/services";
import {
  DefaultPageSize,
  ModalidadeEnum,
  UserAccessType,
} from "@/utils/helper/consts";
import { HttpStatus } from "@/utils/helper";

const ClubeTable = () => {
  const [movements, setMovements] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMoviments, setIsLoadingMoviments] = useState(false);

  const getAllMoviments = async ({ page = 1 }) => {
    setIsLoadingMoviments(true);

    const response = await service.clube.getAll({
      page: page,
      size: DefaultPageSize,
    });
    console.log("clubs ", response);

    if (response?.status === HttpStatus.OK) {
      setTotalPages(response?.data?.totalPage);
      setMovements(response?.data?.clubes);
    }

    setIsLoadingMoviments(false);
  };

  const resetList = () => {
    setPage(1);
    getAllMoviments({ page: 1 });
  };

  useEffect(() => {
    getAllMoviments({ page });
  }, [page]);

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
      </div>
      <hr />
      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Id</th>
              <th className="py-2 px-4 text-left">Nome</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Telefone</th>
              <th className="py-2 px-4 text-center">Ano</th>
              <th className="py-2 px-4 text-center">Modalidade</th>
              <th className="py-2 px-4 text-left">Província</th>
              <th className="py-2 px-4 text-left">Dirigente</th>
              <th className="py-2 px-4 text-center">Opções</th>
            </tr>
          </thead>

          <tbody>
            {movements?.length === 0 && (
              <tr>
                <td colSpan={9} className="py-4 px-4 text-center">
                  {isLoadingMoviments ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            )}

            {movements?.map((club, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{club?.id}</td>
                <td className="py-2 px-4 font-medium">{club?.name}</td>
                <td className="py-2 px-4">{club?.email}</td>
                <td className="py-2 px-4">{club?.telefone}</td>
                <td className="py-2 px-4 text-center">{club?.ano}</td>
                <td className="py-2 px-4 text-center">
                  {ModalidadeEnum?.[club?.modalidade]}
                </td>
                <td className="py-2 px-4">{club?.province?.name || "-"}</td>
                <td className="py-2 px-4">{club?.dirigente?.name || "-"}</td>

                {/* OPÇÕES */}
                <td className="py-2 px-4">
                  <div className="flex justify-center gap-3">
                    {/* Editar */}
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      title="Editar"
                      onClick={() => handleEdit(club)}
                    >
                      <FaEdit size={14} />
                    </button>

                    {/* Eliminar */}
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                      title="Eliminar"
                      onClick={() => handleDelete(club?.id)}
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

      {/* Modal Add Moviment */}
      <EditMovimentModalEditar
        resetList={resetList}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <AddModal
        resetList={resetList}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
};

export default ClubeTable;
