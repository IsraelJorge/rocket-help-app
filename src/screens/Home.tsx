import {
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center,
} from "native-base";
import { ListRenderItemInfo, Alert } from "react-native";
import Logo from "../assets/logo_secondary.svg";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Filter } from "../components/Filter";
import { useEffect, useState } from "react";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

import { getAuth, signOut } from "firebase/auth";
import { app, db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { dateFormat } from "../utils/fireStoreDateFormat";
import { Loading } from "../components/Loading";

export const Home = () => {
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { navigate } = useNavigation();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewOrder = () => {
    navigate("register");
  };

  const handleOpenDetails = (id: string) => {
    navigate("details", { orderId: id });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      Alert.alert("Sair", "Não foi possivel sair.");
    }
  };

  const getOrders = () => {
    setIsLoading(true);
    const ordersCol = collection(db, "orders");

    const q = query(ordersCol, where("status", "==", statusSelected));

    const unsubscribe = onSnapshot(q, (ordersSnapshot) => {
      const ordersData = ordersSnapshot.docs.map((doc) => {
        const { description, patrimony, status, created_at } = doc.data();

        const when = dateFormat(created_at);

        return {
          id: doc.id,
          description,
          patrimony,
          status,
          when,
        };
      });
      setOrders(ordersData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    return getOrders();
  }, [statusSelected]);

  const rederItem = ({ item }: ListRenderItemInfo<OrderProps>) => {
    return <Order data={item} onPress={() => handleOpenDetails(item.id)} />;
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={
            <FontAwesome name="sign-out" size={26} color={colors.gray[300]} />
          }
          _pressed={{ bg: "gray.400" }}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={6}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={rederItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            ListEmptyComponent={() => (
              <Center>
                <MaterialIcons name="chat" size={40} color={colors.gray[300]} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"} solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
