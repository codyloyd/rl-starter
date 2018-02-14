import Repository from "../repository";
import Colors from "../colors";
import Item from "./item";

export const ItemRepository = new Repository({ name: "Items", ctor: Item });

ItemRepository.define({
  name: "healing potion",
  char: "!",
  fg: Colors.pink
});

ItemRepository.define({
  name: "food",
  char: "%",
  fg: Colors.peach
});

export const WeaponRepository = new Repository({ name: "Weapons", ctor: Item });

WeaponRepository.define({
  name: "really really big knife",
  char: "(",
  fg: Colors.blue
});
