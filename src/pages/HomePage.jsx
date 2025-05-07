
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setEvents(sorted.slice(0, 3));
      })
      .catch((err) => console.error("Fout bij ophalen van events:", err));
  }, []);

  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack spacing={6} maxW="700px" mx="auto">
        <Image
          src="./images/BuzzOn_logo.png"
          alt="BuzzOn logo"
          boxSize={{ base: "120px", md: "150px" }}
        />
        <Heading size="2xl" color="teal.600">BuzzOn!</Heading>
        <Text fontSize="lg" maxW="600px">
          Ontdek en beheer evenementen in jouw omgeving. Voeg je eigen evenementen toe en blijf op de hoogte van wat er speelt.
        </Text>
        <Button
          as={Link}
          to="/events"
          size="lg"
          colorScheme="teal"
          borderRadius="xl"
        >
          Bekijk alle evenementen
        </Button>
      </VStack>

      <Box mt={10}>
        <Heading size="lg" mb={4}>Aankomende evenementen</Heading>
        {events.length === 0 ? (
          <Text>Er zijn momenteel geen geplande evenementen.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {events.map((event) => (
              <Box
                key={event.id}
                borderWidth="1px"
                borderRadius="xl"
                overflow="hidden"
                bg="white"
                boxShadow="md"
                _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
                transition="all 0.2s ease-in-out"
              >
                <Image src={event.image} alt={event.title} objectFit="cover" height="200px" width="100%" />
                <Box p={4}>
                  <Heading size="md" mb={2}>{event.title}</Heading>
                  <Text mb={2}>{new Date(event.startTime).toLocaleDateString()}</Text>
                  <Text noOfLines={2}>{event.description}</Text>
                  <Button
                    as={Link}
                    to={`/events/${event.id}`}
                    colorScheme="teal"
                    mt={4}
                    size="sm"
                    borderRadius="full"
                  >
                    Bekijk
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
