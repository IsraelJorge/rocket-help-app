import { Timestamp } from "firebase/firestore";

export const dateFormat = (tismestamp: Timestamp) => {
  if (tismestamp) {
    const date = new Date(tismestamp.toDate());

    const day = date.toLocaleDateString("pt-BR");
    const hour = date.toLocaleTimeString("pt-BR");

    return `${day} ás ${hour}`;
  }

  return "";
};
