export function getIniciais(nome) {
  if (!nome) return "";

  const partes = nome.trim().split(/\s+/);

  const primeiraInicial = partes[0][0];
  const ultimaInicial = partes[partes.length - 1][0];

  return (primeiraInicial + ultimaInicial).toUpperCase();
}
