import { Suite } from "./suit";

export interface Card {
   id: string;
   code: string;
   value: string;
   suit: Suite;
}