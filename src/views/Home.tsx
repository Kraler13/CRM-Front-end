import './Home.css';
import axios from "axios";
import { useState } from "react";
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
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 5;

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const totalPages = Math.ceil(clients.length / clientsPerPage);

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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="App">
            <div className="tableContainer">
                <Table clients={currentClients} deleteClient={deleteClient} editClient={editClient} />
            </div>
            <Button variant="primary" onClick={handleAddClient}>Dodaj Klienta</Button>

            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index}
                        variant="light"
                        onClick={() => handlePageChange(index + 1)}
                        active={index + 1 === currentPage}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Home;