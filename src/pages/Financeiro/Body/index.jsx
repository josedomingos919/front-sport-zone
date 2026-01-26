import ActivityIndicator from "@/components/activityIndicator";
import Pagination from "@/components/pagination";
import React, { useEffect, useState } from "react";
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { PiExportBold } from "react-icons/pi";
import ExportReportModal from "../ExportReport";
import { service } from "@/services";
import { DefaultPageSize, MovimentType } from "@/utils/helper/consts";
import { HttpStatus } from "@/utils/helper";
import AddMovimentModal from "../AddMovimentModal/AddMovimentModal";
import { formatNumberPT } from "@/utils/helper/functions";

const FinanceTable = () => {
  const [movements, setMovements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMoviments, setIsLoadingMoviments] = useState(false);

  const getAllMoviments = async ({ page = 1 }) => {
    setIsLoadingMoviments(true);

    const response = await service.financeiro.getAll({
      page: page,
      size: DefaultPageSize,
    });

    if (response?.status === HttpStatus.OK) {
      setTotalPages(response?.data?.totalPage);
      setMovements(response?.data?.movimentos);
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
              <th className="py-2 px-4 text-left">Id</th>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-right">Valor</th>
              <th className="py-2 px-4 text-center">Tipo</th>
              <th className="py-2 px-4 text-center">Data</th>
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
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{m.descricao}</td>
                <td
                  className={`py-2 px-4 text-right font-semibold ${
                    m.tipo == MovimentType.ENTRADA
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {m.tipo == MovimentType.ENTRADA ? (
                    <FaArrowUp className="inline mr-1" />
                  ) : (
                    <FaArrowDown className="inline mr-1" />
                  )}
                  {formatNumberPT(m.valor)} Kz
                </td>
                <td className="py-2 px-4 text-center capitalize">{m.tipo}</td>
                <td className="py-2 px-4 text-center capitalize">
                  {new Date(m.data).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add Moviment */}
      <AddMovimentModal
        resetList={resetList}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ExportReportModal
        show={showExport}
        onExport={() => {}}
        resetList={resetList}
        onClose={() => setShowExport(false)}
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

export default FinanceTable;
