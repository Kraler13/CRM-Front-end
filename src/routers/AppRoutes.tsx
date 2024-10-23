import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import SetUpClientForm from "../components/SetUpClientForm";
import MoreAboutClient from "../components/MoreAboutClient";
import SetUpActionForm from "../components/SetUpActionForm";
import { IClient } from "../types/Types";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

interface AppRoutesProps {
  clients: IClient[];
  getClients: () => void;
}

const AppRoutes = ({ clients, getClients }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home clients={clients} getClients={getClients} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/client/add" element={<SetUpClientForm getClients={getClients} />} />
      <Route path="/client/edit/:id" element={<SetUpClientForm getClients={getClients} />} />
      <Route path="/client/more/:id" element={<MoreAboutClient />} />
      <Route path="/client/more/:clientId/action/add" element={<SetUpActionForm getClients={getClients} />} />
      <Route path="/client/more/:clientId/action/edit/:actionId" element={<SetUpActionForm getClients={getClients} />} />
    </Routes>
  );
};

export default AppRoutes;