export interface Job {
  value: number;
  label: string;
}

export interface Item {
  amount: number;
  label: string;
  editing: boolean;
  type: Type | null;
}
export interface Type {
  value: string;
  label: string;
}
