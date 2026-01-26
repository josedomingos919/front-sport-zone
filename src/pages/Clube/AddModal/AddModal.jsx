import { useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";
import { ModalidadeData } from "@/utils/helper/consts";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddModal({ showModal, setShowModal, resetList }) {
  const [newMovement, setNewMovement] = useState({
    name: null,
    ano: null,
    email: null,
    telefone: null,
    modalidade: null,
    dirigente: null,
    province: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const isValidData = () => {
    // Nome
    if (!newMovement?.name || newMovement.name.trim().length < 3) {
      toast.error("Nome é obrigatório e deve ter pelo menos 3 caracteres.");
      return false;
    }

    // Ano
    const anoAtual = new Date().getFullYear();
    if (
      !newMovement?.ano ||
      Number(newMovement.ano) < 1900 ||
      Number(newMovement.ano) > anoAtual
    ) {
      toast.error(`Ano inválido. Deve estar entre 1900 e ${anoAtual}.`);
      return false;
    }

    // Telefone
    if (!newMovement?.telefone) {
      toast.error("Telefone é obrigatório.");
      return false;
    }

    if (!/^\d{9,15}$/.test(newMovement.telefone)) {
      toast.error("Telefone inválido. Use apenas números (9 a 15 dígitos).");
      return false;
    }

    // Email
    if (!newMovement?.email) {
      toast.error("Email é obrigatório.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMovement.email)) {
      toast.error("Email inválido.");
      return false;
    }

    // Modalidade
    if (!newMovement?.modalidade?.value) {
      toast.error("Selecione uma modalidade.");
      return false;
    }

    // Dirigente
    if (!newMovement?.dirigente?.value) {
      toast.error("Selecione um dirigente.");
      return false;
    }

    // Província
    if (!newMovement?.province?.value) {
      toast.error("Selecione uma província.");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setNewMovement({
      name: null,
      ano: null,
      email: null,
      telefone: null,
      modalidade: null,
      dirigente: null,
      province: null,
    });
  };

  const addMovement = async () => {
    if (!isValidData()) return;
    setIsLoading(true);

    const response = await service.user.add({
      name: newMovement?.name,
      ano: newMovement?.ano,
      email: newMovement?.email,
      telefone: newMovement?.telefone,
      modalidade: newMovement?.modalidade?.value,
      dirigenteId: newMovement?.dirigente?.value,
      provinciaId: newMovement?.province?.value,
    });

    if (response?.status == HttpStatus.CREATED) {
      clearForm();
      toast.success("Clube adicionado com sucesso!");
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao adicionar clube. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex flex-row items-center">
              <FaPlus className="mr-2" /> Clube
            </h2>

            {/* FORM GRID */}
            <div className="grid grid-cols-2 gap-4">
              {/* Nome */}
              <div className="field flex flex-col col-span-2">
                <label className="text-sm">Nome</label>
                <input
                  type="text"
                  placeholder="ex.: João Silva"
                  className="border p-2 rounded"
                  value={newMovement.name}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, name: e.target.value })
                  }
                />
              </div>

              {/* Ano */}
              <div className="field flex flex-col">
                <label className="text-sm">Ano</label>
                <input
                  type="number"
                  placeholder="ex.: 2027"
                  className="border p-2 rounded"
                  value={newMovement.ano}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, ano: e.target.value })
                  }
                />
              </div>

              {/* Telefone */}
              <div className="field flex flex-col">
                <label className="text-sm">Telefone</label>
                <input
                  type="number"
                  placeholder="ex.: 948847374"
                  className="border p-2 rounded"
                  value={newMovement.telefone}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, telefone: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="field flex flex-col col-span-2">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  placeholder="ex.: joaquim@gmail.com"
                  className="border p-2 rounded"
                  value={newMovement.email}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, email: e.target.value })
                  }
                />
              </div>

              {/* Modalidade */}
              <div className="flex flex-col">
                <label className="text-sm">Modalidade</label>
                <Select
                  value={newMovement.modalidade}
                  onChange={(modalidade) =>
                    setNewMovement({ ...newMovement, modalidade })
                  }
                  options={ModalidadeData}
                  isClearable
                />
              </div>

              {/* Província */}
              <div className="flex flex-col">
                <label className="text-sm">Província</label>
                <Select
                  value={newMovement.province}
                  onChange={(province) =>
                    setNewMovement({ ...newMovement, province })
                  }
                  options={[]}
                  isClearable
                />
              </div>

              {/* Dirigente */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm">Dirigente</label>
                <Select
                  value={newMovement.dirigente}
                  onChange={(dirigente) =>
                    setNewMovement({ ...newMovement, dirigente })
                  }
                  options={[]}
                  isClearable
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-6">
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
      ) : null}
    </>
  );
}
