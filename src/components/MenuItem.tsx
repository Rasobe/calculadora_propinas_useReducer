import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-recuder";
import type { MenuItem } from "../types";

type MenuItemProps = {
  item: MenuItem;
  dispatch: Dispatch<OrderActions>;
};

export default function MenuItem({ item, dispatch }: Readonly<MenuItemProps>) {
  return (
    <button
      className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between rounded-lg"
      onClick={() => dispatch({type: "add-to-order", payload: {item: item}})}
    >
      <p>{item.name}</p>
      <p className="font-black">{item.price}€</p>
    </button>
  );
}
