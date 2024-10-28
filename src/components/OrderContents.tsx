import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { OrderActions } from "../reducers/order-recuder";

type OrderContentsProps = {
  order: OrderItem[];
  dispatch: Dispatch<OrderActions>;
};

export default function OrderContents({
  order,
  dispatch,
}: Readonly<OrderContentsProps>) {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumo</h2>
      <div className="space-y-3 mt-10">
        {order.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-t items-center border-gray-200 py-5 last-of-type:border-b"
          >
            <div>
              <p className="text-lg">
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className="font-black">
                Cantidad: {item.quantity} -{" "}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <div>
              <button
                className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                onClick={() => dispatch({type: "remove-from-order", payload: {id: item.id}})}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
