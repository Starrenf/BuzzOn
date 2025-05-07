
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function OverOns() {
  return (
    <Box maxW="800px" mx="auto" mt={8} p={6} borderRadius="xl" bg="whiteAlpha.900" boxShadow="lg">
      <Heading mb={4} color="teal.600">Over BuzzOn</Heading>
      <VStack spacing={4} align="stretch">
        <Text>
          BuzzOn! is jouw centrale platform om evenementen te organiseren, te ontdekken en te delen met de wereld. Of je nu een buurtfeest plant, een concert organiseert of een workshop aanbiedt, BuzzOn! helpt je om je publiek te bereiken.
        </Text>
        <Text>
          Ons doel is om mensen samen te brengen en evenementen toegankelijk te maken voor iedereen. Ontdek wat er speelt in jouw buurt, voeg je eigen events toe, en blijf op de hoogte!
        </Text>
      </VStack>
    </Box>
  );
}
