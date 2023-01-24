import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = StyledProps & {
  title: string;
};

export const Header = ({ title, ...rest }: HeaderProps) => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton
        alignItems="center"
        _pressed={{ bg: "gray.400" }}
        icon={
          <FontAwesome name="arrow-left" color={colors.gray[200]} size={24} />
        }
        onPress={goBack}
      />
      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
};
