import { StateActionData } from "./state-action-data";
import { StateActionEnum } from "./state-action-enum";

export interface StateAction {
   action: StateActionEnum;
   data: StateActionData;
}