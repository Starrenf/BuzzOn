
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormErrorMessage,
  Text,
  useToast
} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

export default function EditEventForm({ event, onClose, onSave }) {
  const { users = [], categories = [] } = useAppContext() ?? {};
  const [formData, setFormData] = useState({ ...event });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Titel is verplicht";
    if (!formData.description) newErrors.description = "Beschrijving is verplicht";
    if (!formData.startTime) newErrors.startTime = "Starttijd is verplicht";
    if (!formData.endTime) newErrors.endTime = "Eindtijd is verplicht";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map((o) => o.value);
    setFormData((prev) => ({ ...prev, categoryIds: values }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fout bij bijwerken.");
        return res.json();
      })
      .then((data) => {
        onSave(data);
        setSuccessMessage("✅ Het evenement is succesvol bijgewerkt!");
        toast({
          title: "Event opgeslagen",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() =>
        toast({
          title: "Fout bij opslaan",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="xl" p={4}>
        <ModalHeader color="teal.600">Evenement bewerken</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={errors.title}>
                <FormLabel>Titel</FormLabel>
                <Input name="title" value={formData.title} onChange={handleChange} />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors.description}>
                <FormLabel>Beschrijving</FormLabel>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl isDisabled>
                <FormLabel>Afbeeldings-URL</FormLabel>
                <Input name="image" value={formData.image} readOnly />
              </FormControl>
              <FormControl isRequired isInvalid={errors.startTime}>
                <FormLabel>Starttijd</FormLabel>
                <Input name="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} />
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors.endTime}>
                <FormLabel>Eindtijd</FormLabel>
                <Input name="endTime" type="datetime-local" value={formData.endTime} onChange={handleChange} />
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Locatie</FormLabel>
                <Input name="location" value={formData.location} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Categorieën</FormLabel>
                <Select multiple value={formData.categoryIds} onChange={handleCategoryChange}>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isDisabled>
                <FormLabel>Aangemaakt door</FormLabel>
                <Input
                  value={users.find(u => u.id == formData.createdBy)?.name || "Onbekend"}
                  readOnly
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter flexDirection="column" alignItems="flex-start">
            <Button type="submit" colorScheme="teal" mr={3}>Opslaan</Button>
            <Button onClick={onClose} mt={2}>Annuleren</Button>
            {successMessage && (
              <Text mt={3} fontSize="md" color="green.600">
                {successMessage}
              </Text>
            )}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
