import { Routes, Route, Link, useNavigate  } from "react-router-dom";
import Home from "../views/Home";
import SetUpClientForm from "../views/SetUpClientForm";
import MoreAboutClient from "../views/MoreAboutClient";
import SetUpActionForm from "../views/SetUpActionForm";
import { IClient } from "../types/Types";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

interface AppRoutesProps {
  clients: IClient[];
  getClients: () => void;
}

const AppRoutes = ({ clients, getClients }: AppRoutesProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <div className="container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
{/*                   <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/client/add">Add Client</Nav.Link> */}
                  <Button variant="link" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home clients={clients} getClients={getClients} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/add"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SetUpClientForm getClients={getClients} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/edit/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SetUpClientForm getClients={getClients} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/more/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MoreAboutClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/more/:clientId/action/add"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SetUpActionForm getClients={getClients} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/more/:clientId/action/edit/:actionId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SetUpActionForm getClients={getClients} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;