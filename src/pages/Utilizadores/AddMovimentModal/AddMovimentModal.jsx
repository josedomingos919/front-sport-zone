import { useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";
import { UserAccessTypeData } from "@/utils/helper/consts";

export default function AddMovimentModal({
  showModal,
  setShowModal,
  resetList,
}) {
  const [newMovement, setNewMovement] = useState({
    name: null,
    email: null,
    access: null,
    password: null,
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
      name: null,
      email: null,
      access: null,
      password: null,
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
              <FaPlus className="mr-2" /> Utilizadores
            </h2>
            <div className="flex flex-col gap-3">
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="ex.: João Silva"
                  className="border p-2 rounded"
                  value={newMovement.name}
                  onChange={(e) =>
                    setNewMovement({
                      ...newMovement,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ex.: Valor"
                  className="border p-2 rounded"
                  value={newMovement.valor}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, email: e.target.value })
                  }
                />
              </div>
              <div className="field flex flex-col">
                <label className="text-sm" htmlFor="">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="ex.: 3idnk3i,dm"
                  className="border p-2 rounded"
                  value={newMovement.data}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Acesso
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isClearable={true}
                  name="color"
                  value={newMovement.access}
                  onChange={(selectedOption) => {
                    setNewMovement({
                      ...newMovement,
                      access: selectedOption,
                    });
                  }}
                  options={UserAccessTypeData}
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
