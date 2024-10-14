import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import SetUpClientForm from "../components/SetUpClientForm";
import { IClient } from "../types/Types";

interface AppRoutesProps {
  clients: IClient[];
  getClients: () => void;
}

const AppRoutes = ({ clients, getClients }: AppRoutesProps) => {
    return (
    <Routes>
      <Route path="/" element={<Home clients={clients}  getClients={getClients} />} />
      <Route path="/client/add" element={<SetUpClientForm getClients={getClients} />} />
      <Route path="/client/edit/:id" element={<SetUpClientForm getClients={getClients} />} />
    </Routes>
  );
};

export default AppRoutes;