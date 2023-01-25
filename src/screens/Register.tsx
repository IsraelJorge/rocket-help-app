import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const { goBack } = useNavigation();

  const handleNewOrderRegiste = async () => {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todo os campos");
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, "orders"), {
        patrimony,
        description,
        status: "open",
        created_at: serverTimestamp(),
      });

      Alert.alert("Solicitação", "Solicitação registrada com sucesso.");

      goBack();
    } catch (e) {
      console.error("Error adding document: ", e);

      setIsLoading(false);

      return Alert.alert(
        "Solicitação",
        "Não foi possivel fazer a solicitação."
      );
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
