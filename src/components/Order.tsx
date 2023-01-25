import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

export type OrderProps = {
  id: string;
  patrimony: string;
  description: string;
  when: string;
  status: "open" | "closed";
};

type Props = IPressableProps & {
  data: OrderProps;
};

export const Order = ({ data, ...rest }: Props) => {
  const { colors } = useTheme();

  const colorStatus =
    data.status === "open" ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorStatus} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            {data.description}
          </Text>
          <HStack alignItems="center">
            <FontAwesome name="clock-o" color={colors.gray[200]} size={15} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.900" h={12} w={12} mr={5}>
          {data.status === "closed" ? (
            <FontAwesome name="check-circle-o" size={29} color={colorStatus} />
          ) : (
            <FontAwesome name="hourglass-2" size={24} color={colorStatus} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
};
