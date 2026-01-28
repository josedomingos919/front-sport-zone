import React, { useState } from "react";
import TreinoTable from "./TreinoTab";
import JogoTab from "./JogoTab";
import HistoricoTable from "./HistoricoTab";

const tabs = [
  { key: "treinos", label: "Treinos" },
  { key: "jogos", label: "Jogos" },
  { key: "historico", label: "Histórico" },
  { key: "notificacoes", label: "Notificações" },
];

export default function CalendarioBody() {
  const [activeTab, setActiveTab] = useState("treinos");

  return (
    <div className="pt-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === tab.key
                ? "border-primary text-primary/90"
                : "border-transparent text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      {activeTab === "treinos" && <TreinoTable />}
      {activeTab === "jogos" && <JogoTab />}
      {activeTab === "historico" && <HistoricoTable />}
      {/* {activeTab === "notificacoes" && <HistoricoTable />} */}
    </div>
  );
}
