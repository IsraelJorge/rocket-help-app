import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const handleNewOrderRegiste = async () => {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todo os campos");
    }

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "orders"), {
        patrimony,
        description,
        status: "open",
        created_at: serverTimestamp(),
      });

      setPatrimony("");
      setDescription("");

      Alert.alert("Solicitação", "Solicitação registradacom sucesso.");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
        value={patrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
        value={description}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleNewOrderRegiste}
        isLoading={isLoading}
      />
    </VStack>
  );
};
