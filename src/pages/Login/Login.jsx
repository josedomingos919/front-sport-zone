import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFutbol } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { service } from "@/services";
import { HttpStatus } from "@/utils/helper";
import { OrbitProgress } from "react-loading-indicators";
import { useAppState } from "@/store/appState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setUser = useAppState((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const onLogin = async (payload) => {
    setIsLoading(true);
    clearErrors();

    const response = await service.auth.login(payload);

    console.log({ response });

    if (response?.status == HttpStatus.OK) {
      reset();
      service.cache.setItem("login", response.data);
      setUser(response?.data?.user);
      navigate("/dashboard");
    } else {
      toast.error("Erro ao fazer login, Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>KANDA SPORT - Login</title>
      </Helmet>
      <main className="bg-gray-100 h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <div className="flex justify-center gap-2 mb-5">
            <FaFutbol className="my-auto" size="1.5em" />
            <h2 className="text-2xl font-semibold">KANDA SPORT</h2>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="rounded"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Required!</span>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="rounded"
                  placeholder="Enter password"
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
                <span className="text-red-500 text-sm">Required!</span>
              )}

              <div className="text-end">
                <Link
                  to="/forgot-password"
                  className="text-gray-800 hover:bg-text-gray-300 text-sm"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <Button
                disabled={isLoading}
                type="submit"
                variant="default"
                className="w-full"
              >
                {isLoading ? (
                  <div className="smal-indicator">
                    <OrbitProgress color="#ffff" size="medium" />
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </div>
          </form>

          <p className="text-gray-600 text-sm text-center">
            Não possui uma conta?{" "}
            <Link
              to="/register"
              className="text-gray-800 hover:bg-text-gray-300"
            >
              Criar
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
