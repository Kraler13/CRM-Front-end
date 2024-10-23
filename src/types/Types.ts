export interface IClient {
  _id?: string;
  name: string;
  address: {
    city: string;
    street: string;
    nbr: string;
  };
  nip: string;

  actions: IAction[];
}
export interface IAction {
  _id: string;
  type: string;
  date: string;
  description: string;
  client: string;
}

export type ActionWithoutId = Omit<IAction, "_id">
export interface IClientsResponse {
  clients: IClient[];
}

export interface IDeleteResponse {
  deleted: boolean;
}
