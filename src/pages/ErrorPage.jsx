
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="2xl" color="red.500" mb={4}>
        404 - Pagina niet gevonden
      </Heading>
      <Text color="gray.600" mb={6}>
        Oeps! Deze pagina bestaat niet of is verplaatst.
      </Text>
      <Button as={Link} to="/" colorScheme="teal" size="lg" borderRadius="xl">
        Terug naar de startpagina
      </Button>
    </Box>
  );
}
