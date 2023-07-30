import React from "react";

export const ErrorCard = ({
  error,
}: {
  error: { [key: number]: string[] };
}) => {
  return (
    <div>
      {Object.entries(error).map(([key, values]) => (
        <div
          className="flex flex-col bg-white border border-gray-400 rounded p-2 mb-2"
          key={key}
        >
          <span className="text-center text-black">
            {values.length > 1
              ? `Linha nº${parseInt(key) + 1}, os seguintes erros ocorreram:`
              : `Linha nº${parseInt(key) + 1}, o seguinte erro ocorreu:`}
          </span>
          <ul className="bg-transparent mt-2 flex flex-col text-black">
            {values.map((message: string, i: number) => (
              <li className="mx-4 my-1" key={i}>
                * {message}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
