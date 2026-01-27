export const DefaultPageSize = 10;

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MovimentType = {
  ENTRADA: "Entrada",
  SAIDA: "Saída",
};

export const MovimentTypeData = [
  {
    label: "Estranda",
    value: "Estranda",
  },
  {
    label: "Saída",
    value: "Saída",
  },
];

export const UserAccessType = {
  ATLETA: "Atleta",
  VISITANTE: "Visitante",
  TREINADOR: "Treinador",
  DIRIGENTE_DO_CLUBE: "Dirigente do clube",
  ADMINISTRADOR_DO_SISTEMA: "Administrador do sistema",
};

export const UserAccessTypeData = [
  {
    label: "Atleta",
    value: "ATLETA",
  },
  // {
  //   label: "Visitante",
  //   value: "VISITANTE",
  // },
  {
    label: "Treinador",
    value: "TREINADOR",
  },
  {
    label: "Dirigente do clube",
    value: "DIRIGENTE_DO_CLUBE",
  },
  {
    label: "Administrador do sistema",
    value: "ADMINISTRADOR_DO_SISTEMA",
  },
];

export const ModalidadeData = [
  { value: "FUTEBOL", label: "Futebol" },
  { value: "BASQUETEBOL", label: "Basquetebol" },
  { value: "VOLEIBOL", label: "Voleibol" },
  { value: "TENIS", label: "Ténis" },
  { value: "TENIS_DE_MESA", label: "Ténis de mesa" },
  { value: "ATLETISMO", label: "Atletismo" },
  { value: "ARTES_MARCIAIS", label: "Artes marciais" },
  { value: "CICLISMO", label: "Ciclismo" },
  { value: "NATACAO", label: "Natação" },
  { value: "HALTEROFILISMO", label: "Halterofilismo" },
];

export const ModalidadeEnum = {
  FUTEBOL: "Futebol",
  BASQUETEBOL: "Basquetebol",
  VOLEIBOL: "Voleibol",
  TENIS: "Ténis",
  TENIS_DE_MESA: "Ténis de mesa",
  ATLETISMO: "Atletismo",
  ARTES_MARCIAIS: "Artes marciais",
  CICLISMO: "Ciclismo",
  NATACAO: "Natação",
  HALTEROFILISMO: "Halterofilismo",
};

export const CategoriaOptions = [
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMININO", label: "Feminino" },
  { value: "MISTO", label: "Misto" },
];

export const EscalaoOptions = [
  { value: "SUB_9", label: "Sub-9" },
  { value: "SUB_11", label: "Sub-11" },
  { value: "SUB_13", label: "Sub-13" },
  { value: "SUB_15", label: "Sub-15" },
  { value: "SUB_17", label: "Sub-17" },
  { value: "SUB_19", label: "Sub-19" },
  { value: "SENIOR", label: "Sénior" },
];

export const CategoriaOptionsEnum = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  MISTO: "Misto",
};

export const EscalaoOptionsEnum = {
  SUB_9: "Sub-9",
  SUB_11: "Sub-11",
  SUB_13: "Sub-13",
  SUB_15: "Sub-15",
  SUB_17: "Sub-17",
  SUB_19: "Sub-19",
  SENIOR: "Sénior",
};

export const PosicaoEnum = {
  GOLEIRO: "Goleiro",
  DEFESA: "Defesa",
  MEDIO: "Médio",
  AVANCADO: "Avançado",
};

export const PosicaoOptions = [
  { value: "GOLEIRO", label: "Goleiro" },
  { value: "DEFESA", label: "Defesa" },
  { value: "MEDIO", label: "Médio" },
  { value: "AVANCADO", label: "Avançado" },
];
