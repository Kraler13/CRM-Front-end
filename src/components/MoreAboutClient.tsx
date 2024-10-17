import './SetUpClientForm.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAction, IClient } from '../types/Types';
import config from '../config';
import { Table as BootstrapTable, Button } from 'react-bootstrap';

const MoreAboutClient = () => {
    const [client, setClient] = useState<IClient | null>(null);
    const [actions, setActions] = useState<IAction[]>([]);
    const navigate = useNavigate();
    const { id: clientId } = useParams();

    useEffect(() => {
        if (clientId) {
            axios
                .get<IClient>(`${config.api.url}/clients/${clientId}`)
                .then(res => {
                    setClient(res.data);
                })
                .catch(() => {
                    navigate("/");
                });

            axios
                .get<IAction[]>(`${config.api.url}/actions/${clientId}`)
                .then(res => setActions(res.data))
                .catch(err => console.error('Error fetching client actions:', err));
        }
    }, [clientId, navigate]);

    const handleViewDetails = (clientId: string, actionId: string) => {
        navigate(`/client/more/${clientId}/action/edit/${actionId}`);
    };

    return (
        <div>
            {client ? (<div>
                <p>Nazwa klienta: {client.name}</p>
                <p>Miasto: {client.address.city}</p>
                <p>Ulica: {client.address.street}</p>
                <p>Numer: {client.address.nbr}</p>
                <p>NIP: {client.nip}</p>
            </div>
            ) : (
                <p>Ładowanie danych klienta...</p>
            )}
            <h2>Akcje powiązane z klientem</h2>
            {actions.length > 0 ? (
                <BootstrapTable striped bordered hover>
                    <thead>
                        <tr>
                            <th>Typ akcji</th>
                            <th>Data</th>
                            <th>Opis</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions.map((action) => (
                            <tr key={action._id}>
                                <td>{action.type}</td>
                                <td>{new Date(action.date).toLocaleDateString()}</td>
                                <td>{action.description}</td>
                                <td>
                                    <Button variant="danger" >Usuń</Button>
                                    {client && (
                                        <Button variant="warning" onClick={() => handleViewDetails(client._id!, action._id)}>Edytj</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </BootstrapTable>
            ) : (
                <p>Brak akcji powiązanych z tym klientem</p>
            )}
            <Button variant="primary">
                Dodaj Klienta
            </Button>
        </div>
    );
};

export default MoreAboutClient;