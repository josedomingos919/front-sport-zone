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
