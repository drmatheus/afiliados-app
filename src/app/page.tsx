"use client";
import { useEffect, useState } from "react";
import { FileInput } from "./components/inputFile";
import { api } from "./services";
import { Header } from "./components/header";
import { OperationCard } from "./components/operationCard";
import { Container } from "./components/container";
import { ErrorCard } from "./components/errosCard";
import { OperationResume } from "./components/operationResume";
import { IOperation } from "./interfaces";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const [error, setErrors] = useState({} as { [key: number]: string[] });
  const [normalizedData, setNormalizedData] = useState([] as Array<IOperation>);
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getOperations = async () => {
      try {
        const { data } = await api.get("/affiliated");
        setOperations(data);
        setIsLoading(false);
        setIsLogged(true);
      } catch (error) {
        setIsLogged(false);
      }
      setIsLoading(false);
    };
    getOperations();
  }, [isLoading]);

  useEffect(() => {
    setErrors([]);
  }, [file]);

  const navigate = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await api.post("/affiliated", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setNormalizedData(data);
        setIsLoading(true);
        setFile(undefined);
      } catch (error: any) {
        console.log(error);
        setErrors(error.response.data.message);
        setNormalizedData([]);
      }
    }
  };

  if (!isLoading && !isLogged) navigate.push("/login");

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 gap-8 bg-gray-100">
      <Header isLogged={isLogged} />
      <Container>
        <div className="flex flex-col sm:flex-row  gap-4">
          <div className="flex flex-col gap-2">
            <form
              className="w-full flex flex-col  p-2 gap-3 mx-auto rounded bg-gray-300"
              onSubmit={handleSubmit}
            >
              <FileInput
                setFile={setFile}
                file={file}
                className="bg-white w-28 rounded"
                label="Selecione seu relatorio"
              />
              <button className="bg-blue-800 text-lg p-2 rounded" type="submit">
                Enviar
              </button>
            </form>
            {normalizedData.length > 0 && (
              <div className="bg-green-500 flex gap-3 rounded py-4 px-2 mt-auto">
                <AiOutlineCheckCircle className="my-auto" size={44} />
                <p className="my-auto">
                  Foram adicionados {normalizedData.length} operações ao banco
                  de dados.
                </p>
              </div>
            )}

            {Object.entries(error).length > 0 && (
              <div className="bg-red-500 flex gap-3 rounded py-4 p-2 mt-2">
                <BiErrorCircle size={44} className="my-auto" />
                <p className="my-auto">
                  Erro ao validar o documento.
                  <br />
                  Nenhuma operação foi adicionada ao banco dados.
                </p>
              </div>
            )}
          </div>
          {!isLoading && <OperationResume operations={operations} />}
        </div>

        {Object.entries(error).length > 0 && (
          <ul className="bg-gray-100 flex flex-col gap-2 p-2 sm:pt-24 pt-32 relative rounded">
            <div className="text-lg z-10 text-white justify-center bg-red-500 rounded-t flex p-2 absolute w-full top-0 left-0 py-2 pb-4">
              <BiErrorCircle size={44} className="my-auto mr-4" />
              <h1 className="w-4/5">
                Ao validar os dados do documento, alguns erros foram
                encontrados:
              </h1>
            </div>
            <ErrorCard error={error} />
          </ul>
        )}

        {!isLoading && (
          <ul className="bg-gray-100 flex flex-col gap-2 p-2 rounded">
            <h1 className="text-2xl text-blue-950 py-2 pb-4">Operações</h1>
            {operations.map((operation, i) => {
              return <OperationCard key={i} operation={operation} />;
            })}
          </ul>
        )}
      </Container>
    </main>
  );
}
