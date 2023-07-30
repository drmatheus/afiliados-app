import { IOperation } from "@/app/interfaces";
import React from "react";

interface IOperationResume {
  operations: Array<IOperation>;
}

export const OperationResume = ({ operations }: IOperationResume) => {
  const entriesTotal = operations.reduce((a, c) => {
    if (c.type != "3") {
      return a + Number(c.value);
    }
    return a + 0;
  }, 0);
  const entriesAfilliated = operations.reduce((a, c) => {
    if (c.type == "2") {
      return a + Number(c.value);
    }
    return a + 0;
  }, 0);
  const entriesProducer = entriesTotal - entriesAfilliated;
  const exits = operations.reduce((a, c) => {
    if (c.type == "3") {
      return a + Number(c.value);
    }
    return a + 0;
  }, 0);

  return (
    <div className="w-full bg-gray-300 flex flex-col sm:w-6/12  gap-2 justify-between rounded p-2">
      <div className="bg-gray-50 flex flex-col rounded text-gray-800 p-1">
        <span className=" w-full text-center font-bold">Entradas Totais</span>
        <span className=" font-bold text-lg">
          {(entriesTotal / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col rounded text-gray-800 p-1">
        <span className=" w-full text-center font-bold">
          Entradas Afiliados
        </span>
        <span className=" font-bold text-lg">
          {(entriesAfilliated / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col rounded text-gray-800 p-1">
        <span className=" w-full text-center font-bold">Entradas Produtor</span>
        <span className=" font-bold text-lg">
          {(entriesProducer / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col rounded p-1 text-gray-800">
        <span className=" text-center font-bold ">Saidas</span>
        <span className=" font-bold text-lg">
          {(exits / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col rounded p-1 text-gray-800">
        <span className="  text-center font-bold ">Liquido</span>
        <span className=" font-bold text-lg">
          {((entriesTotal - exits) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
};
