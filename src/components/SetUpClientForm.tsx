import './SetUpClientForm.css';
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IClient } from '../types/Types';
import config from '../config';
import Form from 'react-bootstrap/Form';

interface SetUpClientFormProps {
    getClients: () => void;
}

const SetUpClientForm = ({ getClients }: SetUpClientFormProps) => {
    const [clientName, setClientName] = useState<string>("");
    const [clientCity, setClientCity] = useState<string>("");
    const [clientStreet, setClientStreet] = useState<string>("");
    const [clientNbr, setClientNbr] = useState<string>("");
    const [clientNip, setClientNip] = useState<string>("");
    const [editingClient, setEditingClient] = useState<IClient | null>(null);
    const navigate = useNavigate();
    const clientId = useParams().id;

    useEffect(() => {
        if (editingClient) {
            setClientName(editingClient.name);
            setClientCity(editingClient.address.city);
            setClientStreet(editingClient.address.street);
            setClientNbr(editingClient.address.nbr);
            setClientNip(editingClient.nip);
        }
    }, [editingClient]);

    useEffect(() => {
        if (clientId) {
            axios
                .get<IClient>(`http://localhost:8080/clients/${clientId}`)
                .then(res => {
                    setEditingClient(res.data);
                })
                .catch(() => {
                    navigate("/");
                });
        }
    }, [clientId, navigate]);

    const validateForm = (e: FormEvent<HTMLFormElement>): boolean => {
        e.preventDefault();

        if (!clientName || !clientCity || !clientStreet || !clientNbr || !clientNip) {
            alert("Wszystkie pola muszą być wypełnione");
            return false;
        }

        const newClient: IClient = {
            name: clientName,
            address: {
                city: clientCity,
                street: clientStreet,
                nbr: clientNbr
            },
            nip: clientNip,
        };

        if (editingClient) {
            saveClient(newClient);
        } else {
            addClient(newClient);
        }

        return true;
    };

    const addClient = (clientObj: IClient) => {
        axios.post("http://localhost:8080/clients/add", clientObj)
            .then(() => {
                getClients();
                resetForm();
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const saveClient = (clientObj: IClient) => {
        if (editingClient) {
            axios
                .put(`${config.api.url}/clients/edit/${editingClient._id}`, clientObj)
                .then(() => {
                    getClients();
                    resetForm();
                    navigate('/');
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const resetForm = () => {
        setClientName('');
        setClientCity('');
        setClientStreet('');
        setClientNbr('');
        setClientNip('');
    };

    return (
        <div className="formWrapper">
            <form action="#" onSubmit={validateForm}>
                <div className="wrapper">
                    <Form.Label htmlFor="name">Nazwa</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <Form.Label htmlFor="city">Miasto</Form.Label>
                    <Form.Control
                        type="text"
                        id="city"
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <Form.Label htmlFor="street">Ulica</Form.Label>
                    <Form.Control
                        type="text"
                        id="street"
                        value={clientStreet}
                        onChange={(e) => setClientStreet(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <Form.Label htmlFor="nbr">Numer</Form.Label>
                    <Form.Control
                        type="text"
                        id="nbr"
                        value={clientNbr}
                        onChange={(e) => setClientNbr(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <Form.Label htmlFor="nip">NIP</Form.Label>
                    <Form.Control
                        type="text"
                        id="nip"
                        value={clientNip}
                        onChange={(e) => setClientNip(e.target.value)}
                    />
                </div>
                <div className="wrapper">
                    <button type="submit">{editingClient ? "Zaktualizuj klienta" : "Dodaj klienta"}</button>
                </div>
            </form>
        </div>
    );
};

export default SetUpClientForm;