import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { service } from "@/services";
import { HttpStatus } from "@/utils/helper";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaFutbol } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegister = async (payload) => {
    setIsLoading(true);

    const response = await service.auth.signup(payload);

    console.log({ payload, response });

    if (response.status == HttpStatus.CREATED) {
      toast.success("Conta criada com sucesso! Por favor, faça login.");
    } else {
      toast.error("Erro ao criar conta. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Criar Conta</title>
      </Helmet>
      <main className="bg-gray-100 h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <div className="flex justify-center gap-2 mb-5">
            <FaFutbol className="my-auto" size="1.5em" />
            <h2 className="text-2xl font-semibold">KANDA SPORT</h2>
          </div>
          <form onSubmit={handleSubmit(onRegister)}>
            <div className="mb-4">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="rounded"
                placeholder="ex.: Tony Silva"
                {...register("name", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Obrigatório!</span>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="rounded"
                placeholder="ex.: example@gmail.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Obrigatório!</span>
              )}
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="rounded"
                  placeholder="ex.: 33*sj3jn.#"
                  {...register("password", { required: true })}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      size="1em"
                      title="Sembunyikan Password"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      size="1em"
                      title="Lihat Password"
                    />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">Obrigatório!</span>
              )}
            </div>
            <div className="mb-4">
              <Button type="submit" variant="default" className="w-full">
                Cadastrar-se
              </Button>
            </div>
          </form>

          <p className="text-gray-600 text-sm text-center">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-gray-800 hover:bg-text-gray-300">
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
