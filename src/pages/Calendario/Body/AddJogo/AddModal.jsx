import { useEffect, useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";
import { TipoJogoOptions } from "@/utils/helper/consts";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddJogoModal({ showModal, setShowModal, resetList }) {
  const [form, setForm] = useState({
    descricao: "",
    data: "",
    hora: "",
    local: "",
    tipo: null,
    equipa: null,
    adversario: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [equipas, setEquipas] = useState([]);

  /* ---------------- VALIDATION ---------------- */
  const isValidData = () => {
    if (!form.descricao || form.descricao.length < 3) {
      toast.error("Descrição é obrigatória (mín. 3 caracteres).");
      return false;
    }

    if (!form.data) {
      toast.error("Data do jogo é obrigatória.");
      return false;
    }

    if (!form.local) {
      toast.error("Local é obrigatório.");
      return false;
    }

    if (!form.tipo?.value) {
      toast.error("Selecione o tipo de jogo.");
      return false;
    }

    if (!form.equipa?.value) {
      toast.error("Selecione a equipa própria.");
      return false;
    }

    if (!form.adversario?.value) {
      toast.error("Selecione a equipa adversária.");
      return false;
    }

    return true;
  };

  /* ---------------- CLEAR ---------------- */
  const clearForm = () => {
    setForm({
      descricao: "",
      data: "",
      hora: "",
      local: "",
      tipo: null,
      equipa: null,
      adversario: null,
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const addJogo = async () => {
    if (!isValidData()) return;

    setIsLoading(true);

    const dataFinal = form.hora
      ? new Date(`${form.data}T${form.hora}`)
      : new Date(form.data);

    const response = await service.jogo.add({
      descricao: form.descricao,
      data: dataFinal,
      local: form.local,
      tipo: form.tipo.value,
      equipaId: form.equipa.value,
      adversarioId: form.adversario.value,
    });

    if (response?.status === HttpStatus.CREATED) {
      toast.success("Jogo criado com sucesso!");
      clearForm();
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao criar jogo.");
    }

    setIsLoading(false);
  };

  /* ---------------- LOAD EQUIPAS ---------------- */
  const getAllEquipas = async () => {
    const response = await service.equipa.getAll({ page: 1, size: 1000 });
    console.log("Equipas response:", response);
    if (response?.status === HttpStatus.OK) {
      setEquipas(
        response.data.equipas.map((e) => ({
          value: e.id,
          label: e.nome,
        }))
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      getAllEquipas();
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPlus className="mr-2" /> Novo Jogo
            </h2>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              {/* Descrição */}
              <div className="col-span-2">
                <label className="text-sm">Descrição</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="ex.: Jogo treino"
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                />
              </div>

              {/* Data */}
              <div>
                <label className="text-sm">Data</label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                />
              </div>

              {/* Hora */}
              <div>
                <label className="text-sm">Hora</label>
                <input
                  type="time"
                  className="border p-2 rounded w-full"
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                />
              </div>

              {/* Local */}
              <div className="col-span-2">
                <label className="text-sm">Local</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="ex.: Campo principal"
                  value={form.local}
                  onChange={(e) => setForm({ ...form, local: e.target.value })}
                />
              </div>

              {/* Tipo */}
              <div>
                <label className="text-sm">Tipo</label>
                <Select
                  value={form.tipo}
                  onChange={(tipo) => setForm({ ...form, tipo })}
                  options={TipoJogoOptions}
                  isClearable
                />
              </div>

              {/* Equipa própria */}
              <div>
                <label className="text-sm">Equipa</label>
                <Select
                  value={form.equipa}
                  onChange={(equipa) => setForm({ ...form, equipa })}
                  options={equipas}
                  isClearable
                />
              </div>

              {/* Adversário */}
              <div className="col-span-2">
                <label className="text-sm">Adversário</label>
                <Select
                  value={form.adversario}
                  onChange={(adversario) => setForm({ ...form, adversario })}
                  options={equipas}
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
                onClick={addJogo}
              >
                {isLoading ? <ActivityIndicator /> : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
