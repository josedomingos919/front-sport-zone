import { auth } from "./auth";
import { user } from "./user";
import { cache } from "./cache";
import { clube } from "./clube";
import { equipa } from "./equipa";
import { atleta } from "./atleta";
import { teacher } from "./teacher";
import { province } from "./province";
import { financeiro } from "./financeiro";
import { treino } from "./treino";
import { jogo } from "./jogo";
import { historico } from "./historico";

export const service = {
  jogo,
  auth,
  historico,
  user,
  treino,
  clube,
  cache,
  atleta,
  equipa,
  teacher,
  province,
  financeiro,
};
