import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import AddModal from "../AddModal/AddModal";
import EditMovimentModalEditar from "../EditModal/AddMovimentModal";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { service } from "@/services";
import { DefaultPageSize, UserAccessType } from "@/utils/helper/consts";
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
    console.log("USERS ", response);

    if (response?.status === HttpStatus.OK) {
      setTotalPages(response?.data?.totalPage);
      setMovements(response?.data?.users);
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
              <th className="py-2 px-4 text-center">Acesso</th>
            </tr>
          </thead>
          <tbody>
            {movements?.length == 0 ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center">
                  {isLoadingMoviments ? <ActivityIndicator /> : "Sem dados"}
                </td>
              </tr>
            ) : null}
            {movements.map((m, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{m?.id}</td>
                <td className="py-2 px-4">{m?.name}</td>
                <td className="py-2 px-4">{m?.email}</td>
                <td className="py-2 px-4 text-center capitalize">
                  {UserAccessType[m?.access]}
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
