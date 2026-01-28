import { useEffect, useState } from "react";
import { service } from "@/services";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { HttpStatus } from "@/utils/helper";
import Select from "react-select";
import ActivityIndicator from "@/components/activityIndicator";

export default function AddHistoricoModal({
  showModal,
  setShowModal,
  resetList,
}) {
  const [form, setForm] = useState({
    atleta: null,
    jogo: null,
    minutos: "",
    gols: "",
    assistencias: "",
    faltas: "",
    avaliacaoStar: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [jogos, setJogos] = useState([]);
  const [atletas, setAtletas] = useState([]);

  /* ---------------- VALIDATION ---------------- */
  const isValidData = () => {
    if (!form.atleta?.value) {
      toast.error("Selecione um atleta.");
      return false;
    }
    if (!form.jogo?.value) {
      toast.error("Selecione um jogo.");
      return false;
    }
    return true;
  };

  /* ---------------- CLEAR ---------------- */
  const clearForm = () => {
    setForm({
      atleta: null,
      jogo: null,
      minutos: "",
      gols: "",
      assistencias: "",
      faltas: "",
      avaliacaoStar: "",
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const addHistorico = async () => {
    if (!isValidData()) return;

    setIsLoading(true);

    const response = await service.historico.add({
      atletaId: form.atleta.value,
      jogoId: form.jogo.value,
      minutos: form.minutos ? Number(form.minutos) : null,
      gols: form.gols ? Number(form.gols) : null,
      assistencias: form.assistencias ? Number(form.assistencias) : null,
      faltas: form.faltas ? Number(form.faltas) : null,
      avaliacaoStar: form.avaliacaoStar ? Number(form.avaliacaoStar) : null,
    });

    if (response?.status === HttpStatus.CREATED) {
      toast.success("Histórico criado com sucesso!");
      clearForm();
      setShowModal(false);
      resetList();
    } else {
      toast.error("Erro ao criar histórico.");
    }

    setIsLoading(false);
  };

  /* ---------------- LOAD JOGOS & ATLETAS ---------------- */
  const getAllJogos = async () => {
    const response = await service.jogo.getAll({ page: 1, size: 100 });
    if (response?.status === HttpStatus.OK) {
      setJogos(
        response.data.jogos.map((j) => ({
          value: j.id,
          label: `${j.descricao} (${new Date(j.data).toLocaleDateString()})`,
        }))
      );
    }
  };

  const getAllAtletas = async () => {
    const response = await service.atleta.getAll({ page: 1, size: 1000 });
    console.log("TESTE    ", response);
    if (response?.status === HttpStatus.OK) {
      setAtletas(
        response.data.atletas.map((a) => ({
          value: a.id,
          label: a.user.name,
        }))
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      getAllJogos();
      getAllAtletas();
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPlus className="mr-2" /> Novo Histórico
            </h2>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              {/* Atleta */}
              <div className="col-span-2">
                <label className="text-sm">Atleta</label>
                <Select
                  value={form.atleta}
                  onChange={(atleta) => setForm({ ...form, atleta })}
                  options={atletas}
                  isClearable
                />
              </div>

              {/* Jogo */}
              <div className="col-span-2">
                <label className="text-sm">Jogo</label>
                <Select
                  value={form.jogo}
                  onChange={(jogo) => setForm({ ...form, jogo })}
                  options={jogos}
                  isClearable
                />
              </div>

              {/* Minutos */}
              <div>
                <label className="text-sm">Minutos</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.minutos}
                  onChange={(e) =>
                    setForm({ ...form, minutos: e.target.value })
                  }
                  placeholder="ex.: 90"
                />
              </div>

              {/* Gols */}
              <div>
                <label className="text-sm">Gols</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.gols}
                  onChange={(e) => setForm({ ...form, gols: e.target.value })}
                  placeholder="ex.: 2"
                />
              </div>

              {/* Assistências */}
              <div>
                <label className="text-sm">Assistências</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.assistencias}
                  onChange={(e) =>
                    setForm({ ...form, assistencias: e.target.value })
                  }
                  placeholder="ex.: 1"
                />
              </div>

              {/* Faltas */}
              <div>
                <label className="text-sm">Faltas</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.faltas}
                  onChange={(e) => setForm({ ...form, faltas: e.target.value })}
                  placeholder="ex.: 3"
                />
              </div>

              {/* Avaliação */}
              <div>
                <label className="text-sm">Avaliação Do Treinador (★)</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={form.avaliacaoStar}
                  onChange={(e) =>
                    setForm({ ...form, avaliacaoStar: e.target.value })
                  }
                  placeholder="ex.: 5"
                  min={0}
                  max={5}
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
                onClick={addHistorico}
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
