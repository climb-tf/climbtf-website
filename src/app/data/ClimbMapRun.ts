import { StringUtils } from "../utils/StringUtils";
import {ClimbUser} from "./ClimbUser";

export interface ClimbMapRun {
  user: ClimbUser;
  classId: number;
  runTime: number;
  rank: number;
  date: number;
}
