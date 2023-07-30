/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent } from "react";
import { GrNotes } from "react-icons/gr";
import { BiErrorCircle } from "react-icons/bi";

interface IInputFileProps {
  label: string;
  className?: string;
  file: File | null | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

export const FileInput = ({ label, file, setFile }: IInputFileProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [fileFormatIsValid, setFileFormatIsValid] = useState(true);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length === 1) {
      if (selectedFiles[0].type == "text/plain") {
        const selectedFile = selectedFiles[0];
        setSelectedFileName(selectedFile.name);
        setFile(selectedFile);
        setFileFormatIsValid(true);
      } else {
        setFileFormatIsValid(false);
      }
    } else {
      setSelectedFileName("");
      setFile(null);
    }
  };

  return (
    <>
      <div className="flex justify-between relative flex-col w-full bg-gray-200 p-2 rounded gap-2 text-white">
        {file && (
          <>
            <div className=" p-2 flex bg-white h-fit rounded border-2 border-gray-100 text-black">
              <GrNotes size={64} color="#fff" />
              <div className="h-16 bg-gray-100 w-1 mx-2"> </div>
              <div className="w-full">
                <p className="p-1 h-fit">Nome: {selectedFileName}</p>
                <p className="p-1 h-fit">
                  Tamanho: {(file!.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </>
        )}

        <label htmlFor="file-upload" className="flex flex-col h-fit">
          {!file && fileFormatIsValid && (
            <p className="  text-gray-700 h-20 w-full pt-7 text-center mb-2 p-2 rounded bg-gray-100 m-auto">
              Nenhum arquivo selecionado
            </p>
          )}
          <span className="text-lg text-white bg-blue-800 border-2 p-2 h-fit rounded text-center ">
            Selecionar arquivo
          </span>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {!fileFormatIsValid && (
        <div className="bg-red-500 flex gap-3 rounded py-4 p-2 mt-2">
          <BiErrorCircle size={44} className="my-auto" />
          <p className="my-auto">
            Formato invalido!
            <br />O formato do arquivo selecionado deve ser .txt.
          </p>
        </div>
      )}
    </>
  );
};
