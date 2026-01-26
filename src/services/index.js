import { address } from "./address";
import { app } from "./app";
import { auth } from "./auth";
import { cache } from "./cache";
import { classroom } from "./classRoom";
import { employee } from "./employee";
import { user } from "./user";
import { discipline } from "./discipline";
import { teacher } from "./teacher";
import { student } from "./student";
import { course } from "./course";
import { classs } from "./class";
import { schoolYear } from "./schoolYear";
import { classTeam } from "./classTeam";
import { price } from "./price";
import { matriculation } from "./matriculation";
import { product } from "./product";
import { curriculumGrid } from "./curriculumGrid";
import { payment } from "./payment";
import { propina } from "./propina";
import { setting } from "./setting";
import { document } from "./document";

export const service = {
  app,
  user,
  auth,
  cache,
  price,
  document,
  propina,
  setting,
  course,
  product,
  teacher,
  address,
  payment,
  student,
  employee,
  classTeam,
  classroom,
  discipline,
  schoolYear,
  matriculation,
  curriculumGrid,
  class: classs,
};
