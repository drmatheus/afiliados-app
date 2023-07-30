import { IOperation } from "@/app/interfaces";
import React from "react";

interface IOperationCardProps {
  operation: IOperation;
}

export const OperationCard = ({ operation }: IOperationCardProps) => {
  const dateTime = new Date(Date.parse(operation.date));
  const typeOptions = [
    "Venda produtor - Entrada",
    "Venda afiliado - Entrada",
    "Comissão paga - Saida",
    "Comissão recebida - Entrada",
  ];

  return (
    <li
      className={`w-full text-black rounded bg-gray-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l-4 gap-4 p-2 ${
        operation.type == "3" ? "border-red-600" : "border-green-600"
      } `}
    >
      <div className="flex flex-col">
        <span>Vendedor(a): </span>
        <span className=" p-1 pl-2 italic ">{operation.seller}</span>
      </div>
      <div className="flex flex-col">
        <span>Preço: </span>
        <span className="p-1 pl-2  italic ">
          {(Number(operation.value) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className="flex flex-col">
        <span>Data: </span>
        <span className=" p-1 pl-2  italic ">
          {dateTime.toLocaleString("pt-BR")}
        </span>
      </div>

      <div className="flex flex-col">
        <span>Produto: </span>
        <span className=" p-1 pl-2  italic ">{operation.product}</span>
      </div>

      <div className="flex flex-col">
        <span>Tipo: </span>
        <span className=" p-1 pl-2  italic ">
          {typeOptions[Number(operation.type) - 1]}
        </span>
      </div>
    </li>
  );
};
