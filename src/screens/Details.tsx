import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, useTheme, VStack, Text, ScrollView, Box } from "native-base";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Order";
import { OrderFirestoreDTO } from "../DTOs/OrderDTO";
import { dateFormat } from "../utils/fireStoreDateFormat";
import { FontAwesome } from "@expo/vector-icons";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { params } = useRoute();
  const { orderId } = params as RouteParams;

  const { colors } = useTheme();

  const { goBack } = useNavigation();

  const getOrder = async () => {
    const orderRef = doc(db, "orders", orderId);

    try {
      const orderSnap = await getDoc(orderRef);

      const {
        patrimony,
        description,
        created_at,
        status,
        closed_at,
        solution,
      } = orderSnap.data() as OrderFirestoreDTO;

      const closed = closed_at ? dateFormat(closed_at) : null;

      setOrder({
        id: orderSnap.id,
        patrimony,
        description,
        status,
        when: dateFormat(created_at),
        closed,
        solution,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClose = async () => {
    if (!solution) {
      return Alert.alert(
        "Solução",
        "Informe a solução para encerrar a solicitação"
      );
    }

    setIsButtonLoading(true);

    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, {
        status: "closed",
        closed_at: serverTimestamp(),
        solution,
      });
      Alert.alert("Solicitação", "Solicitação encerrada.");
      goBack();
    } catch (error) {
      console.log(error);
      setIsButtonLoading(false);
      Alert.alert("Solicitação", "Não foi possivel finalizar solicitação.");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <FontAwesome
            name="check-circle-o"
            size={24}
            color={colors.green[300]}
          />
        ) : (
          <FontAwesome
            name="hourglass-2"
            size={22}
            color={colors.secondary[700]}
          />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          textTransform="uppercase"
          ml={2}
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={
            <FontAwesome name="desktop" size={20} color={colors.primary[700]} />
          }
        />
        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={
            <FontAwesome
              name="clipboard"
              size={20}
              color={colors.primary[700]}
            />
          }
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          icon={
            <FontAwesome
              name="check-circle-o"
              size={22}
              color={colors.primary[700]}
            />
          }
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              h={24}
              mt={2}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          title="Encerrar solicitação"
          m={5}
          onPress={handleOrderClose}
          isLoading={isButtonLoading}
        />
      )}
    </VStack>
  );
};
