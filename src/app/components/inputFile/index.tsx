/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent } from "react";
import { GrNotes } from "react-icons/gr";

type TPInput = {
  label: string;
  className?: string;
  file: File | null | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
};

export const FileInput = ({ label, file, setFile }: TPInput) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length === 1) {
      if (selectedFiles[0].type == "text/plain") {
        const selectedFile = selectedFiles[0];
        setSelectedFileName(selectedFile.name);
        setFile(selectedFile);
      } else {
        /* avisa que o formato é invalido */
      }
    } else {
      setSelectedFileName("");
      setFile(null); // Define o arquivo como null se nenhum arquivo for selecionado
    }
  };

  return (
    <div className="flex justify-between relative flex-col w-full bg-gray-400 p-2 rounded gap-2 text-white">
      {selectedFileName && (
        <>
          <div className="bg-white p-2 flex h-fit">
            <GrNotes size={64} color="#fff" />
            <div className="w-full">
              <p className="bg-blue-400 p-1 h-fit">{selectedFileName}</p>
              <p className="bg-blue-400 p-1 h-fit">
                {(file!.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        </>
      )}

      {!file && <p> voce ainda não selecionou nenhum arquivo</p>}

      <label
        htmlFor="file-upload"
        className="text-lg text-white bg-blue-800 border-2 p-2 h-fit rounded "
      >
        Selecionar arquivo
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
