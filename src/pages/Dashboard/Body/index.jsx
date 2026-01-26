import React from "react";
import {
  FaFutbol,
  FaHandsHelping,
  FaClock,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";

const statsData = [
  {
    title: "Golos",
    value: 25,
    icon: <FaFutbol className="text-yellow-500 w-6 h-6" />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Assistências",
    value: 18,
    icon: <FaHandsHelping className="text-green-500 w-6 h-6" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Minutos Jogados",
    value: 1340,
    icon: <FaClock className="text-blue-500 w-6 h-6" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "Avaliação do Treinador",
    value: 4.5,
    icon: <FaStar className="text-purple-500 w-6 h-6" />,
    bgColor: "bg-purple-100",
  },
];

const playersHistory = [
  { name: "José Domingos", gols: 5, assists: 3, minutes: 300 },
  { name: "Pedro Santos", gols: 3, assists: 2, minutes: 270 },
  { name: "Carlos Mendes", gols: 2, assists: 4, minutes: 320 },
  { name: "Luís Silva", gols: 1, assists: 1, minutes: 180 },
];

const gamesScheduled = [
  {
    date: "2026-02-05",
    opponent: "Clube Alpha",
    location: "Estádio Municipal",
    type: "Jogo",
  },
  {
    date: "2026-02-12",
    opponent: "Clube Beta",
    location: "Estádio Central",
    type: "Jogo",
  },
  {
    date: "2026-02-19",
    opponent: "Clube Gamma",
    location: "Estádio da Cidade",
    type: "Jogo",
  },
];

const trainingsDone = [
  { date: "2026-01-20", session: "Treino tático", duration: "90 min" },
  { date: "2026-01-22", session: "Treino físico", duration: "75 min" },
  { date: "2026-01-24", session: "Treino técnico", duration: "80 min" },
];

const DashboardBody = () => {
  return (
    <div className="pt-8 space-y-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.title}
            className={`flex items-center p-4 rounded-lg shadow-md ${stat.bgColor}`}
          >
            <div className="p-3 bg-white rounded-full mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-700">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Histórico de jogadores */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Histórico de Jogadores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Jogador</th>
                <th className="py-2 px-4 text-center">Golos</th>
                <th className="py-2 px-4 text-center">Assistências</th>
                <th className="py-2 px-4 text-center">Minutos</th>
              </tr>
            </thead>
            <tbody>
              {playersHistory.map((player) => (
                <tr key={player.name} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{player.name}</td>
                  <td className="py-2 px-4 text-center">{player.gols}</td>
                  <td className="py-2 px-4 text-center">{player.assists}</td>
                  <td className="py-2 px-4 text-center">{player.minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jogos marcados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Jogos Marcados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesScheduled.map((game, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
            >
              <FaCalendarAlt className="text-red-500 w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">{game.opponent}</p>
                <p className="text-gray-500 text-sm">
                  {game.date} | {game.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treinos realizados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Treinos Realizados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingsDone.map((training, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
            >
              <FaClock className="text-blue-500 w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">{training.session}</p>
                <p className="text-gray-500 text-sm">
                  {training.date} | {training.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
