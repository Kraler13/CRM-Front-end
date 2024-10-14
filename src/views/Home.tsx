import './Home.css';
import axios from "axios";
import { IClient, IDeleteResponse } from '../types/Types';
import config from '../config';
import Table from '../components/ClientTable';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    clients: IClient[];
    getClients: () => void;
}

const Home = ({ clients, getClients }: HomeProps) => {
    const navigate = useNavigate();

    const deleteClient = async (rowId: string) => {
        if (window.confirm('Usunąć klienta?')) {
            try {
                const res = await axios.delete<IDeleteResponse>(`${config.api.url}/clients/delete/${rowId}`);
                if (res.data.deleted) {
                    getClients();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const editClient = (client: IClient) => {    
        navigate(`/client/edit/${client._id}`);
    };

    const handleAddClient = () => {
        navigate(`/client/add`);
    };

    return (
        <div className="App">
            <div className="tableContainer">
                <Table clients={clients} deleteClient={deleteClient} editClient={editClient} />
            </div>
            <Button variant="primary" onClick={handleAddClient}>
                Dodaj Klienta
            </Button>
        </div>
    );
}

export default Home;