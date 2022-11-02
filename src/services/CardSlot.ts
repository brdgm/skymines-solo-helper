import Card from "./Card";
import Slot from "./enum/Slot";

export default interface CardSlot {
  slot: Slot
  card: Card
  flipped: boolean
}
