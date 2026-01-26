import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "@/pages/Login/Login";
import Minutes from "@/pages/Equipa/Minutes";
import { useAppState } from "./store/appState";
import Register from "@/pages/Register/Register";
import NotFound from "@/pages/NotFound/NotFound";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Timelines from "@/pages/Financeiro/Timelines";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import { useInitApp } from "./hooks/useInitApp/useInitApp";
import Utilizadores from "./pages/Utilizadores/Utilizadores";

const App = () => {
  useInitApp();

  const user = useAppState((state) => state.user);

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financeiro" element={<Timelines />} />
            <Route path="/equipa" element={<Minutes />} />
            <Route path="/utilizadores" element={<Utilizadores />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
