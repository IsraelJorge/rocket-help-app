import { Input as NativeBaseInput, IInputProps } from "native-base";

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={1}
      borderColor="gray.500"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
        selectionColor: "gray.100",
      }}
      {...rest}
    />
  );
};
