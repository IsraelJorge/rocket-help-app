import { ReactElement, ReactNode } from "react";
import { VStack, HStack, Text, Box, useTheme } from "native-base";

type CardDetailsProps = {
  title: string;
  description?: string;
  footer?: string;
  children?: ReactNode;
  icon: ReactElement;
};

export const CardDetails = ({
  description,
  footer = null,
  icon,
  title,
  children,
}: CardDetailsProps) => {
  const { colors } = useTheme();

  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
      <HStack>
        {icon}

        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text color="gray.100" pt={2} fontSize="md">
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
