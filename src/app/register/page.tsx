"use client";
import { Input } from "../components/input";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues, FieldError } from "react-hook-form";
import { Header } from "../components/header";
import { api } from "../services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Container } from "../components/container";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
const Login = () => {
  const registerSchema = z.object({
    name: z
      .string()
      .refine(
        (s: string) => s.trim().split(" ").length > 1,
        "Informe um nome e um sobrenome"
      ),
    email: z
      .string()
      .email("Formato invalido para email")

      .nonempty("Email é obrigatorio"),
    password: z
      .string()
      .nonempty("Senha é obrigatorio")
      .min(6, "Sua senha deve possuir no minimo 6 caracteres"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get("/users");
        router.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  const router = useRouter();

  const handleLogin = async (data: FieldValues): Promise<void> => {
    try {
      await api.post("/users", data);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      setRegistered(true);
    } catch (e: any) {
      console.log(e);
      if (e.response.data.message.split(" ").includes("Email")) {
        setEmailError(true);
      }
    }
  };

  useEffect(() => {
    setEmailError(false);
  }, [errors.email]);

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 gap-8 bg-gray-100">
      <Header>
        <Link
          href={"/login"}
          className="border-2 flex px-2 rounded border-white"
        >
          <span className="m-auto w-fit h-fit">Entrar</span>
        </Link>
      </Header>
      <Container>
        <div className="flex flex-col max-w-xl w-full mx-auto">
          <h2 className="text-3xl text-blue-950  font-extrabold w-fit p-2 rounded">
            Cadastro
          </h2>

          {registered && (
            <div className="bg-green-500 flex gap-4 rounded text-sm py-4 px-2 my-2">
              <AiOutlineCheckCircle size={40} />
              <p className="my-auto">Cadastro concluido com sucesso!</p>
            </div>
          )}

          {!isLoading ? (
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="max-w-xl flex flex-col bg-blue-950 w-full mx-auto rounded p-4 gap-2"
            >
              <Input
                label="Nome"
                type="text"
                error={errors.name as FieldError}
                register={register}
                registerName="name"
                placeholder="Nome e sobrenome"
              />
              <Input
                label="Email"
                type="text"
                error={errors.email as FieldError}
                register={register}
                registerName="email"
                placeholder="Seu email"
                className="z-10"
              />
              {emailError && !errors.email && (
                <div className="bg-red-500 flex gap-4 rounded text-sm p-2 -mt-2 my-2">
                  <BiErrorCircle size={32} />
                  <p className="my-auto">O email informa ja está em uso</p>
                </div>
              )}

              <Input
                label="Senha"
                type="password"
                error={errors.password as FieldError}
                register={register}
                registerName="password"
                placeholder="Sua senha"
              />
              <button className="bg-gray-100 text-blue-950 text-2xl rounded font-bold h-12 w-full mt-2">
                Cadastrar
              </button>
            </form>
          ) : null}
        </div>
      </Container>
    </main>
  );
};

export default Login;
