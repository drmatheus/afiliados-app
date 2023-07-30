"use client";
import Cookies from "js-cookie";
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
import { BiErrorCircle } from "react-icons/bi";

const Login = () => {
  const loginSchema = z.object({
    password: z.string().nonempty("Senha é obrigatorio"),
    email: z
      .string({ description: "Email é obrigatorio" })
      .email("Formato invalido para email"),
  });

  const [isLoading, setIsLoading] = useState(true);

  const [loginFaild, setLoginFaild] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setLoginFaild(false);
  }, [errors.email, errors.password]);

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
      const { data: token }: { data: { token: string } } = await api.post(
        "login/",
        data
      );
      Cookies.set("planilhasNormalizer@token", `Baerer ${token.token}`, {
        expires: 7,
      });
      router.push("/");
    } catch (e: any) {
      console.log(e);
      setLoginFaild(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-gray-100">
      <Header>
        <Link
          href={"/register"}
          className="border-2 flex px-2 rounded border-white"
        >
          <span className="m-auto w-fit h-fit">Cadastrar</span>
        </Link>
      </Header>
      <Container>
        <div className="flex flex-col max-w-xl w-full mx-auto">
          <h2 className="text-3xl text-blue-950  font-extrabold w-fit p-2 rounded">
            Entrar
          </h2>

          {!isLoading ? (
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="max-w-xl flex flex-col bg-blue-950 w-full mx-auto rounded p-4 gap-2"
            >
              <Input
                label="Email"
                type="text"
                error={errors.email as FieldError}
                register={register}
                registerName="email"
                placeholder="Seu email"
              />
              <Input
                label="Senha"
                type="password"
                error={errors.password as FieldError}
                register={register}
                registerName="password"
                placeholder="Sua senha"
              />
              {loginFaild && !errors.email && !errors.password && (
                <div className="bg-red-500 flex gap-4 rounded text-sm p-2 my-2">
                  <BiErrorCircle size={32} />
                  <p className="my-auto">Email e/ou senha incorretos</p>
                </div>
              )}
              <button className="bg-gray-100 text-blue-950 text-2xl rounded font-bold h-12 w-full mt-2">
                Entrar
              </button>
            </form>
          ) : null}
        </div>
      </Container>
    </main>
  );
};

export default Login;
