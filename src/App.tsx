import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import config from './config';
import AppRoutes from './routers/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { IClient, IClientsResponse } from './types/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [clients, setClients] = useState<IClient[]>([]);
  
  const getClients = async () => {
    try {
      const res = await axios.get<IClientsResponse>(`${config.api.url}/clients`);
      console.log('Pobrane dane:', res.data.clients);
      setClients(res.data.clients);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <AuthProvider> {/* Otocz aplikację AuthProvider */}
      <BrowserRouter>
        <div className="App">
          <AppRoutes
            clients={clients}
            getClients={getClients}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;