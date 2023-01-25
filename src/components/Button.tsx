import { Button as ButtonNativeBase, Heading, IButtonProps } from "native-base";

type ButtonProps = {
  title: string;
} & IButtonProps;

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      bg="green.700"
      h={14}
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading fontSize="sm" color="#FFF">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
};
