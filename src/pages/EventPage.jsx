
import EditEventForm from "./EditEventForm";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Flex,
  Spinner,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { categories = [] } = useAppContext() ?? {};
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event niet gevonden");
        return res.json();
      })
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDeleteConfirmed = () => {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast({
          title: "Event verwijderd.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/events");
      })
      .catch(() =>
        toast({
          title: "Fout bij verwijderen.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
    onDeleteClose();
  };

  if (isLoading) return <Spinner size="xl" mt={10} />;
  if (!event) return <Text>Event niet gevonden.</Text>;

  const categoryNames = event.categoryIds?.map(
    (id) => categories.find((c) => c.id === id)?.name
  ) ?? [];

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4}>
      <Heading mb={4}>{event.title}</Heading>
      <Image src={event.image} alt={event.title} height="300px" width="100%" objectFit="cover" />
      <Text fontSize="lg" mb={2}>{event.description}</Text>
      <Text>📍 Locatie: {event.location}</Text>
      <Text>🕓 Start: {new Date(event.startTime).toLocaleString()}</Text>
      <Text>🕓 Einde: {new Date(event.endTime).toLocaleString()}</Text>
      <Text>🏷️ Categorieën: {categoryNames.join(", ")}</Text>

      <Flex gap={4} mt={6}>
        <Button colorScheme="red" onClick={onDeleteOpen}>
          Verwijder event
        </Button>
        <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
          Bewerk event
        </Button>
      </Flex>

      {isEditing && (
        <EditEventForm
          event={event}
          onClose={() => setIsEditing(false)}
          onSave={(updatedEvent) => {
            setEvent(updatedEvent);
            setIsEditing(false);
            toast({
              title: "Event bijgewerkt.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        />
      )}

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Event verwijderen
            </AlertDialogHeader>

            <AlertDialogBody>
              Weet je zeker dat je dit event wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Annuleren
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirmed} ml={3}>
                Verwijder
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
