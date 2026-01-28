import { useEffect, useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";
import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddJogoModal({ showModal, setShowModal, resetList }) {
  const [form, setForm] = useState({
    descricao: "",
    data: "",
    hora: "",
    duracaoMin: "",
    local: "",
    equipa: null,
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
      toast.error("Data do treino é obrigatória.");
      return false;
    }

    if (!form.duracaoMin || Number(form.duracaoMin) <= 0) {
      toast.error("Duração inválida.");
      return false;
    }

    if (!form.local) {
      toast.error("Local é obrigatório.");
      return false;
    }

    if (!form.equipa?.value) {
      toast.error("Selecione uma equipa.");
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
      duracaoMin: "",
      local: "",
      equipa: null,
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const addTreino = async () => {
    if (!isValidData()) return;

    setIsLoading(true);

    // Junta data + hora (se existir)
    const dataFinal = form.hora
      ? new Date(`${form.data}T${form.hora}`)
      : new Date(form.data);

    const response = await service.treino.add({
      descricao: form.descricao,
      data: dataFinal,
      duracaoMin: Number(form.duracaoMin),
      local: form.local,
      equipaId: form.equipa.value,
    });

    if (response?.status === HttpStatus.CREATED) {
      toast.success("Treino criado com sucesso!");
      clearForm();
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao criar treino.");
    }

    setIsLoading(false);
  };

  /* ---------------- LOAD EQUIPAS ---------------- */
  const getAllEquipas = async () => {
    const response = await service.equipa.getAll({ page: 1, size: 100 });
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
              <FaPlus className="mr-2" /> Novo Treino
            </h2>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              {/* Descrição */}
              <div className="col-span-2">
                <label className="text-sm">Descrição</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="ex.: Treino físico"
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

              {/* Duração */}
              <div>
                <label className="text-sm">Duração (min)</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  placeholder="ex.: 90"
                  value={form.duracaoMin}
                  onChange={(e) =>
                    setForm({ ...form, duracaoMin: e.target.value })
                  }
                />
              </div>

              {/* Local */}
              <div>
                <label className="text-sm">Local</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Campo principal"
                  value={form.local}
                  onChange={(e) => setForm({ ...form, local: e.target.value })}
                />
              </div>

              {/* Equipa */}
              <div className="col-span-2">
                <label className="text-sm">Equipa</label>
                <Select
                  value={form.equipa}
                  onChange={(equipa) => setForm({ ...form, equipa })}
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
                onClick={addTreino}
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
