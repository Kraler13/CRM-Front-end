import { ChangeEvent } from "react";


export interface IClient {
  _id?: string;
  name: string;
    address: {
      city: string
      street: string
      nbr: string
    }
    nip: string;
}
export interface IAction {
  _id: string;
  type: string;
  date: string;
  description: string;
  client: string;
}
export interface IClientsResponse {
  clients: IClient[];
}

export interface IDeleteResponse {
  deleted: boolean;
}