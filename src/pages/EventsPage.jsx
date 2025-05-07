
import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Stack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Fout bij ophalen van events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Heading size="2xl" mb={6} textAlign="center" color="blue.600">
        Alle evenementen
      </Heading>
      <Input
        placeholder="Zoek op titel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={8}
        bg="white"
        size="lg"
        borderRadius="xl"
        boxShadow="sm"
      />
      {filteredEvents.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.600">
          Geen evenementen gevonden.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {filteredEvents.map((event) => (
            <LinkBox
              as="article"
              key={event.id}
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              bg="white"
              boxShadow="md"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              transition="all 0.2s ease-in-out"
            >
              <Image
                src={event.image}
                alt={event.title}
                objectFit="cover"
                height="200px"
                width="100%"
              />
              <Box p={4}>
                <Heading size="md" mb={2} color="teal.600">
                  <LinkOverlay as={Link} to={`/events/${event.id}`}>
                    {event.title}
                  </LinkOverlay>
                </Heading>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {event.description}
                </Text>
              </Box>
            </LinkBox>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default EventsPage;
