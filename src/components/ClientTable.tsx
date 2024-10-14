import './ClientTable.css';
import { IClient } from '../types/Types';
import { Table as BootstrapTable } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface TableProps {
    clients: IClient[];
    deleteClient: (id: string) => void;
    editClient: (client: IClient) => void;
    className?: string;
}

const ClientTable = ({ clients, deleteClient, editClient, className }: TableProps): JSX.Element => {
    console.log('Przekazane wydarzenia:', clients);
    if (!Array.isArray(clients) || clients.length === 0) {
        return <p>Brak danych do wyświetlenia</p>;
    }

    return (
        <BootstrapTable striped bordered hover className={className}>
            <thead>
                <tr>
                    <th>Nazwa klienta</th>
                    <th>Adres</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client._id}>
                        <td>{client.name}</td>
                        <td>{client.address.city}</td>
                        
                        <td>
                            <Button variant="danger" onClick={() => deleteClient(client._id!)}>Usuń</Button>
                            <Button variant="warning" onClick={() => editClient(client)}>Edytuj</Button>
                            <Button variant="info" onClick={() => deleteClient(client._id!)}>Zobacz więcej</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </BootstrapTable>
    );
};

export default ClientTable;