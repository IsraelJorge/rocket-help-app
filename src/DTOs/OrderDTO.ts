import { Firestore, Timestamp } from "firebase/firestore";

export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  created_at: Timestamp;
  closed_at?: Timestamp;
};
