import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";
import { useEffect, useState } from "react";
import { PosicaoOptions } from "@/utils/helper/consts";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddAtletaModal({ showModal, setShowModal, resetList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [equipas, setEquipas] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    posicao: "",
    publico: false,
    foto: "", // Base64
    equipa: null,
    user: null,
  });

  /* ---------------- VALIDATION ---------------- */
  const isValid = () => {
    if (!form.user?.value) {
      toast.error("Selecione um utilizador.");
      return false;
    }

    if (!form.nascimento) {
      toast.error("Data de nascimento é obrigatória.");
      return false;
    }

    if (!form.posicao) {
      toast.error("Posição é obrigatória.");
      return false;
    }

    if (!form.equipa?.value) {
      toast.error("Selecione uma equipa.");
      return false;
    }

    return true;
  };

  /* ---------------- ACTIONS ---------------- */
  const clearForm = () => {
    setForm({
      nome: "",
      nascimento: "",
      posicao: "",
      publico: false,
      foto: "",
      equipa: null,
      user: null,
    });
  };

  const addAtleta = async () => {
    if (!isValid()) return;

    setIsLoading(true);

    const response = await service.atleta.add({
      nascimento: form.nascimento,
      posicao: form.posicao,
      publico: form.publico,
      foto: form.foto || null,
      equipaId: form.equipa.value,
      userId: form.user.value,
    });

    if (response?.status === HttpStatus.CREATED) {
      toast.success("Atleta cadastrado com sucesso!");
      clearForm();
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao cadastrar atleta.");
    }

    setIsLoading(false);
  };

  /* ---------------- LOAD DATA ---------------- */
  const getEquipas = async () => {
    const response = await service.equipa.getAll({ page: 1, size: 1000 });

    if (response?.status === HttpStatus.OK) {
      setEquipas(
        response.data.equipas.map((e) => ({
          value: e.id,
          label: e.nome,
        }))
      );
    }
  };

  const getUsers = async () => {
    const response = await service.user.getAll({ page: 1, size: 1000 });

    if (response?.status === HttpStatus.OK) {
      setUsers(
        response.data.users.map((u) => ({
          value: u.id,
          label: u.name,
        }))
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      getEquipas();
      getUsers();
    }
  }, [showModal]);

  /* ---------------- HANDLE FILE ---------------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, foto: reader.result });
    };
    reader.readAsDataURL(file); // Converte para Base64
  };

  /* ---------------- UI ---------------- */
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaPlus className="mr-2" /> Cadastrar Atleta
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Utilizador */}
          <div className="col-span-2">
            <label className="text-sm ">Utilizador</label>
            <Select
              options={users}
              value={form.user}
              onChange={(user) => setForm({ ...form, user })}
              isClearable
            />
          </div>

          {/* Nascimento */}
          <div>
            <label className="text-sm">Nascimento</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.nascimento}
              onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
            />
          </div>

          {/* Posição */}
          <div>
            <label className="text-sm">Posição</label>
            <Select
              options={PosicaoOptions}
              value={
                PosicaoOptions.find((p) => p.value === form.posicao) || null
              }
              onChange={(selected) =>
                setForm({ ...form, posicao: selected?.value || "" })
              }
              isClearable
            />
          </div>

          {/* Foto */}
          <div className="col-span-2">
            <div className="border rounded p-2">
              <label className="text-sm">Foto</label>
              <div className="border rounded">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {form.foto && (
                <img
                  src={form.foto}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* Equipa */}
          <div>
            <label className="text-sm">Equipa</label>
            <Select
              options={equipas}
              value={form.equipa}
              onChange={(equipe) => setForm({ ...form, equipa: equipe })}
              isClearable
            />
          </div>

          {/* Público */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.publico}
              onChange={(e) => setForm({ ...form, publico: e.target.checked })}
            />
            <label className="text-sm">Perfil público</label>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => {
              clearForm();
              setShowModal(false);
            }}
          >
            Cancelar
          </button>

          <button
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={addAtleta}
          >
            {isLoading ? <ActivityIndicator /> : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
