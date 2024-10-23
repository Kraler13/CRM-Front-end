import "./SetUpClientForm.css";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAction } from "../types/Types";
import config from "../config";
import Form from "react-bootstrap/Form";
import Select from "./Select";

interface SetUpClientFormProps {
  getClients: () => void;
}

const choicesAction: [string, string][] = [
  ["", "---"],
  ["call", "Call"],
  ["visit", "Visit"],
  ["sign the contract", "Sign the contract"],
];

const SetUpActionForm = ({ getClients }: SetUpClientFormProps) => {
  const [actionType, setActionType] = useState<string>("");
  const [actionDate, setActionDate] = useState<string>("");
  const [actionDescription, setActionDescription] = useState<string>("");
  const [editingAction, setEditingAction] = useState<IAction | null>(null);
  const navigate = useNavigate();
  const { clientId, actionId } = useParams();

  //console.log(actionId);
  console.log(clientId);

  useEffect(() => {
    if (actionId) {
      axios
        .get<IAction>(`${config.api.url}/actions/${actionId}`)
        .then((res) => {
          setEditingAction(res.data);
        })
        .catch(() => {
          navigate("/");
        });
    }
  }, [actionId, navigate]);

  useEffect(() => {
    if (editingAction) {
      setActionType(editingAction.type);
      setActionDate(editingAction.date.split("T")[0]);
      setActionDescription(editingAction.description);
    }
  }, [editingAction]);

  const handleChangeActionType = (e: ChangeEvent<HTMLSelectElement>) => {
    setActionType(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!actionType || !actionDate || !actionDescription) {
      alert("Wszystkie pola muszą być wypełnione");
      return;
    }

    const newAction: Omit<IAction, '_id'> = {
      type: actionType,
      date: actionDate,
      description: actionDescription,
      /* _id: editingAction ? editingAction._id : "", */
      client: editingAction ? editingAction.client : "",
    };

    if (editingAction) {
      saveAction({ ...newAction, _id: editingAction._id });
    } else {
      addAction(newAction);
    }

    return true;
  };

  const addAction = (actionObj: Omit<IAction, '_id'>) => {
    axios
      .post(`${config.api.url}/actions/add`, {
        ...actionObj,
        client: clientId,
      })
      .then(() => {
        getClients();
        resetForm();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveAction = (actionObj: IAction) => {
    if (editingAction) {
      axios
        .put(`${config.api.url}/actions/edit`, actionObj)
        .then(() => {
          getClients();
          resetForm();
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const resetForm = () => {
    setActionType("");
    setActionDate("");
    setActionDescription("");
    setEditingAction(null);
  };

  console.log(actionDate);

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <label htmlFor="event">Typ</label>
          <Select
            values={choicesAction}
            selectedValue={actionType}
            onValuesChange={handleChangeActionType}
            id="event"
          />
        </div>
        <div className="wrapper">
          <Form.Label htmlFor="date">Data</Form.Label>
          <Form.Control
            type="date"
            id="date"
            value={actionDate}
            onChange={(e) => setActionDate(e.target.value)}
          />
        </div>
        <div className="wrapper">
          <Form.Label htmlFor="description">Opis</Form.Label>
          <Form.Control
            type="text"
            id="description"
            value={actionDescription}
            onChange={(e) => setActionDescription(e.target.value)}
          />
        </div>

        <div className="wrapper">
          <button type="submit">
            {editingAction ? "Zaktualizuj Akcję" : "Dodaj Akcję"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetUpActionForm;
