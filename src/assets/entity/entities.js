import Colors from "../colors";
import {
  InventoryHolder,
  PlayerActor,
  MonsterActor,
  Movable
} from "./entityMixins";

export const PlayerTemplate = {
  name: "ME",
  char: "@",
  fg: Colors.white,
  mixins: [Movable, PlayerActor, InventoryHolder]
};

export const MonsterTemplate = {
  name: "Monster",
  char: "m",
  fg: Colors.green,
  mixins: [Movable, MonsterActor]
};
