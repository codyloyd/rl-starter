import Colors from "../colors";
import { PlayerActor, MonsterActor, Movable } from "./entityMixins";

export const PlayerTemplate = {
  name: "ME",
  char: "@",
  mixins: [Movable, PlayerActor]
};

export const MonsterTemplate = {
  name: "Monster",
  char: "m",
  fg: Colors.green,
  mixins: [Movable, MonsterActor]
};
