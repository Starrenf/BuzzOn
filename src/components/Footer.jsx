
import { Box, Text, Stack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="teal.600"
      color="white"
      py={4}
      textAlign="center"
      zIndex="999"
    >
      <Stack spacing={1}>
        <Text fontSize="sm">© {new Date().getFullYear()} BuzzOn. Alle rechten voorbehouden.</Text>
        <Text fontSize="xs">Gemaakt met ❤️ en React</Text>
      </Stack>
    </Box>
  );
}
