export interface Job {
  value: number;
  label: string;
  senders: string[];
}

export interface Item {
  amount: number;
  label: string;
  editing: boolean;
  type: Type | null;
  material: string | null;
}
export interface Type {
  value: string;
  label: string;
}
export interface Sender {
  value: string;
  label: string;
}
