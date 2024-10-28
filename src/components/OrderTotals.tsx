import { Dispatch, useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-recuder";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

export default function OrderTotals({
  order,
  tip,
  dispatch,
}: Readonly<OrderTotalsProps>) {
  const subTotalAmout = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => tip * subTotalAmout, [tip, subTotalAmout]);

  const totalAmount = useMemo(
    () => tipAmount + subTotalAmout,
    [subTotalAmout, tipAmount]
  );

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina: </h2>
      </div>
      <p>
        Subtotal a pagar: {""}
        <span className="font-bold">{formatCurrency(subTotalAmout)}</span>
      </p>
      <p>
        Propina: {""}
        <span className="font-bold">{formatCurrency(tipAmount)}</span>
      </p>
      <p>
        Total a pagar: {""}
        <span className="font-bold">{formatCurrency(totalAmount)}</span>
      </p>

      <button
        className="w-full bg-black p-3 uppercase text-white mt-10 font-bold disabled:opacity-10"
        disabled={totalAmount === 0}
        onClick={() => dispatch({ type: "place-order" })}
      >
        Guardar orden
      </button>
    </>
  );
}
