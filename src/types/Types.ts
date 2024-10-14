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

export interface IClientsResponse {
  clients: IClient[];
}

export interface IDeleteResponse {
  deleted: boolean;
}