export function getIniciais(nome) {
  if (!nome) return "";

  const partes = nome.trim().split(/\s+/);

  const primeiraInicial = partes[0][0];
  const ultimaInicial = partes[partes.length - 1][0];

  return (primeiraInicial + ultimaInicial).toUpperCase();
}

export function formatNumberPT(valor) {
  return new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

export const getTreinoStatus = (dataTreino) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const data = new Date(dataTreino);
  data.setHours(0, 0, 0, 0);

  if (data > hoje) {
    return {
      label: "Pendente",
      color: "bg-yellow-100 text-yellow-700",
      icon: "⏳",
    };
  }

  if (data.getTime() === hoje.getTime()) {
    return {
      label: "A decorrer",
      color: "bg-blue-100 text-blue-700",
      icon: "▶️",
    };
  }

  return {
    label: "Concluído",
    color: "bg-green-100 text-green-700",
    icon: "✔️",
  };
};
