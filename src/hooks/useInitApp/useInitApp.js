import { useEffect } from "react";
import { service } from "@/services";
import { useAppState } from "@/store/appState";

export const useInitApp = () => {
  const setUser = useAppState((state) => state.setUser);

  const handleInit = () => {
    const response = service.cache.getItem("login");

    if (response?.user) {
      console.log("Init User:", response?.user);
      setUser(response?.user);
    }
  };

  useEffect(() => {
    handleInit();
  }, []);
};
