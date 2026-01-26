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
  {
    label: "Visitante",
    value: "VISITANTE",
  },
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
