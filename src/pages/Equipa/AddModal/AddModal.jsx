import { useEffect, useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";

import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";
import { CategoriaOptions, EscalaoOptions } from "@/utils/helper/consts";

/* ===== OPTIONS ===== */

export default function AddModal({ showModal, setShowModal, resetList }) {
  const [newEquipa, setNewEquipa] = useState({
    nome: "",
    categoria: null,
    escalao: null,
    clube: null,
    treinador: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [clubes, setClubes] = useState([]);
  const [treinadores, setTreinadores] = useState([]);

  /* ===================== VALIDATION ===================== */
  const isValidData = () => {
    if (!newEquipa.nome || newEquipa.nome.trim().length < 3) {
      toast.error("Nome da equipa é obrigatório.");
      return false;
    }

    if (!newEquipa?.categoria?.value) {
      toast.error("Categoria é obrigatória.");
      return false;
    }

    if (!newEquipa?.escalao?.value) {
      toast.error("Escalão é obrigatório.");
      return false;
    }

    if (!newEquipa?.clube?.value) {
      toast.error("Selecione um clube.");
      return false;
    }

    if (!newEquipa?.treinador?.value) {
      toast.error("Selecione um treinador.");
      return false;
    }

    return true;
  };

  /* ===================== ACTIONS ===================== */
  const clearForm = () => {
    setNewEquipa({
      nome: "",
      categoria: null,
      escalao: null,
      clube: null,
      treinador: null,
    });
  };

  const addEquipa = async () => {
    if (!isValidData()) return;
    setIsLoading(true);

    const response = await service.equipa.add({
      nome: newEquipa.nome,
      categoria: newEquipa.categoria.value,
      escalao: newEquipa.escalao.value,
      clubeId: newEquipa.clube.value,
      treinadorId: newEquipa.treinador.value,
    });

    if (response?.status === HttpStatus.CREATED) {
      toast.success("Equipa criada com sucesso!");
      clearForm();
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao criar equipa.");
    }

    setIsLoading(false);
  };

  /* ===================== LOAD DATA ===================== */
  const getAllClubes = () => {
    service.clube.getAll({ page: 1, size: 100 }).then((response) => {
      if (response?.status === HttpStatus.OK) {
        setClubes(
          response.data.clubes.map((c) => ({
            value: c.id,
            label: c.name,
          }))
        );
      }
    });
  };

  const getAllTreinadores = () => {
    service.user.getAllTreinadores().then((response) => {
      if (response?.status === HttpStatus.OK) {
        setTreinadores(
          response.data.map((t) => ({
            value: t.id,
            label: t.name,
          }))
        );
      }
    });
  };

  useEffect(() => {
    getAllClubes();
    getAllTreinadores();
  }, []);

  /* ===================== UI ===================== */
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPlus className="mr-2" /> Nova Equipa
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Nome */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm">Nome da Equipa</label>
                <input
                  type="text"
                  className="border p-2 rounded"
                  placeholder="ex.: Petro Sub-17"
                  value={newEquipa.nome}
                  onChange={(e) =>
                    setNewEquipa({ ...newEquipa, nome: e.target.value })
                  }
                />
              </div>

              {/* Categoria */}
              <div className="flex flex-col">
                <label className="text-sm">Categoria</label>
                <Select
                  value={newEquipa.categoria}
                  onChange={(categoria) =>
                    setNewEquipa({ ...newEquipa, categoria })
                  }
                  options={CategoriaOptions}
                  isClearable
                />
              </div>

              {/* Escalão */}
              <div className="flex flex-col">
                <label className="text-sm">Escalão</label>
                <Select
                  value={newEquipa.escalao}
                  onChange={(escalao) =>
                    setNewEquipa({ ...newEquipa, escalao })
                  }
                  options={EscalaoOptions}
                  isClearable
                />
              </div>

              {/* Clube */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm">Clube</label>
                <Select
                  value={newEquipa.clube}
                  onChange={(clube) => setNewEquipa({ ...newEquipa, clube })}
                  options={clubes}
                  isClearable
                />
              </div>

              {/* Treinador */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm">Treinador</label>
                <Select
                  value={newEquipa.treinador}
                  onChange={(treinador) =>
                    setNewEquipa({ ...newEquipa, treinador })
                  }
                  options={treinadores}
                  isClearable
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-6">
              <button
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
                onClick={addEquipa}
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
