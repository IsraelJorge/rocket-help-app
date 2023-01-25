import { VStack, Heading, useTheme } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { useState } from "react";
import { Alert } from "react-native";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSingIn = async () => {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe Email e Senha!");
    }

    setLoading(true);

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Email Inválido ou Senha Inválida");
      }
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Email Inválido ou Senha Inválida");
      }
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "Esté usuário não existe");
      }

      return Alert.alert("Error", "Não foi possivel Acessar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading
        color="gray.100"
        fontSize="xl"
        mt={20}
        mb={6}
        fontFamily="heading"
      >
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <FontAwesome
            name="envelope"
            color={colors.gray[300]}
            style={{ marginLeft: 15 }}
            size={20}
          />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        InputLeftElement={
          <FontAwesome
            name="lock"
            color={colors.gray[300]}
            style={{ marginLeft: 15 }}
            size={20}
          />
        }
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        mt={8}
        onPress={handleSingIn}
        isLoading={isLoading}
      />
    </VStack>
  );
};
