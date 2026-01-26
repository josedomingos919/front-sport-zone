import { useState } from "react";

export default function ModalCadastro({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nome: "", email: "", senha: "" }); // limpar formulário
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Digite seu nome"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Digite seu email"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão enviar */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
