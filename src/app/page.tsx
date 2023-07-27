"use client";
import { useState } from "react";
import { FileInput } from "./components/inputFile";
import { api } from "./services";

export default function Home() {
  const [file, setFile] = useState<File | null>();

  const [error, setErrors] = useState({} as { [key: number]: string[] });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("fez o append");

      try {
        const { data } = await api.post("/affiliated", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(data);
      } catch (error: any) {
        setErrors(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  const errorList = Object.entries(error).map(([key, values]) => (
    <li className="flex bg-white border-white-400 border-2 " key={key}>
      <span className=" text-center m-1 text-black p-2 mr-6">
        Linha {parseInt(key) + 1} os seguintes erros ocorreram:
      </span>
      <ul className="bg-transparent m-1 gap-1 flex flex-col w-full text-black ">
        {values.map((message: any, index: number) => (
          <li className="mr-4 bg-slate-300 " key={index}>
            *{message}
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-500">
      <form className="w-96 h-96 flex flex-col gap-3" onSubmit={handleSubmit}>
        <FileInput
          setFile={setFile}
          file={file}
          className="bg-white w-28"
          label="Selecione seu relatorio"
        />

        <button
          className="bg-blue-800 border-2 text-lg p-2 rounded"
          type="submit"
        >
          enviar
        </button>
      </form>

      {errorList.length > 0 && (
        <>
          <h1 className="text-2xl">
            Ao validar os dados do documento, alguns erros foram encontrados:
          </h1>
          <div className="w-full max-w-3xl bg-gray-400 p-2">
            <ul className="w-full flex flex-col gap-2">{errorList}</ul>
          </div>
        </>
      )}
    </main>
  );
}
