import { MenuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-to-order"; payload: { item: MenuItem } }
  | { type: "remove-from-order"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  if (action.type === "add-to-order") {
    const itemExists = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );

    let updatedOrder: OrderItem[] = [];
    if (itemExists) {
      updatedOrder = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem = { ...action.payload.item, quantity: 1 };
      updatedOrder = [...state.order, newItem];
    }

    return {
      ...state,
      order: updatedOrder,
    };
  }

  if (action.type === "remove-from-order") {
    const updatedOrder = state.order.filter(
      (menuItem) => menuItem.id !== action.payload.id
    );

    return {
      ...state,
      order: updatedOrder,
    };
  }

  if (action.type === "place-order") {
    return {
      ...state,
      order: [],
      tip: 0,
    };
  }

  if (action.type === "add-tip") {
    const updatedTip = action.payload.value;
    return {
      ...state,
      tip: updatedTip,
    };
  }

  return {
    ...state,
  };
};
