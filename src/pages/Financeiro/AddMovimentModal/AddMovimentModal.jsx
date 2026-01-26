import { useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddMovimentModal({
  showModal,
  setShowModal,
  resetList,
}) {
  const [newMovement, setNewMovement] = useState({
    data: null,
    tipo: null,
    valor: null,
    descricao: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const isValidData = () => {
    if (
      !newMovement?.descricao ||
      !newMovement?.valor ||
      !newMovement?.tipo?.value ||
      !newMovement?.data
    ) {
      toast.error("Por favor, preencha todos os campos correctamente.");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setNewMovement({
      tipo: null,
      valor: null,
      descricao: null,
      data: null,
    });
  };

  const addMovement = async () => {
    if (!isValidData()) return;
    setIsLoading(true);

    const response = await service.financeiro.add({
      descricao: newMovement?.descricao,
      valor: Number(newMovement?.valor),
      tipo: newMovement?.tipo?.value,
      data: newMovement?.data,
    });

    if (response?.status == HttpStatus.CREATED) {
      clearForm();
      toast.success("Movimento adicionado com sucesso!");
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao adicionar movimento. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex flex-row items-center">
              <FaPlus className="mr-2" /> Adicionar Movimento
            </h2>
            <div className="flex flex-col gap-3">
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Descrição
                </label>
                <input
                  type="text"
                  placeholder="Descrição"
                  className="border p-2 rounded"
                  value={newMovement.descricao}
                  onChange={(e) =>
                    setNewMovement({
                      ...newMovement,
                      descricao: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Valor
                </label>
                <input
                  type="number"
                  placeholder="Ex.: Valor"
                  className="border p-2 rounded"
                  value={newMovement.valor}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, valor: e.target.value })
                  }
                />
              </div>
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Tipo
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isClearable={true}
                  name="color"
                  value={newMovement.tipo}
                  onChange={(selectedOption) => {
                    setNewMovement({
                      ...newMovement,
                      tipo: selectedOption,
                    });
                  }}
                  options={[
                    { value: "Entrada", label: "Entrada" },
                    { value: "Saída", label: "Saída" },
                  ]}
                />
              </div>
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Data
                </label>
                <input
                  type="date"
                  placeholder="Ex.: 11/02/2023"
                  className="border p-2 rounded"
                  value={newMovement.data}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, data: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => {
                    clearForm();
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={addMovement}
                >
                  {isLoading ? <ActivityIndicator /> : "Adicionar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
