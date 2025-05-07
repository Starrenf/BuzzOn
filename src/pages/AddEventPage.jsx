
import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Textarea, Heading,
  Checkbox, CheckboxGroup, Stack, useToast, FormErrorMessage, Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddEventPage = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: 'Afbeelding wordt geplaatst door de beheerder.',
    location: '',
    startTime: '',
    endTime: '',
    organizerFirstName: '',
    organizerLastName: '',
    categoryIds: []
  });
  const [errors, setErrors] = useState({});

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (values) => {
    setFormData(prev => ({ ...prev, categoryIds: values.map(Number) }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Titel is verplicht";
    if (!formData.location) newErrors.location = "Locatie is verplicht";
    if (!formData.organizerFirstName) newErrors.organizerFirstName = "Voornaam is verplicht";
    if (!formData.organizerLastName) newErrors.organizerLastName = "Achternaam is verplicht";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.organizerFirstName + " " + formData.organizerLastName })
      });

      if (!userRes.ok) throw new Error("Fout bij gebruiker aanmaken");
      const newUser = await userRes.json();

      const eventToSave = {
        ...formData,
        createdBy: newUser.id
      };
      delete eventToSave.organizerFirstName;
      delete eventToSave.organizerLastName;

      const res = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventToSave),
      });

      if (!res.ok) throw new Error('Fout bij opslaan');

      toast({
        title: "Event toegevoegd",
        description: "Je event en organisator zijn opgeslagen!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/events');
    } catch (error) {
      console.error("Fout bij toevoegen van event:", error);
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het opslaan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} borderRadius="xl" bg="whiteAlpha.900" boxShadow="lg">
      <Heading mb={6} color="teal.600">Nieuw evenement toevoegen</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={!!errors.title}>
            <FormLabel>Titel</FormLabel>
            <Input name="title" value={formData.title} onChange={handleChange} />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Beschrijving</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Afbeelding</FormLabel>
            <Box p={3} bg="gray.100" borderRadius="md">
              <Text fontSize="sm" color="gray.700">
                Een afbeelding bij dit evenement wordt handmatig toegevoegd door de beheerder wegens copyright-overwegingen.
              </Text>
            </Box>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.location}>
            <FormLabel>Locatie</FormLabel>
            <Input name="location" value={formData.location} onChange={handleChange} />
            <FormErrorMessage>{errors.location}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Starttijd</FormLabel>
            <Input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Eindtijd</FormLabel>
            <Input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.organizerFirstName}>
            <FormLabel>Voornaam organisator</FormLabel>
            <Input name="organizerFirstName" value={formData.organizerFirstName} onChange={handleChange} />
            <FormErrorMessage>{errors.organizerFirstName}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.organizerLastName}>
            <FormLabel>Achternaam organisator</FormLabel>
            <Input name="organizerLastName" value={formData.organizerLastName} onChange={handleChange} />
            <FormErrorMessage>{errors.organizerLastName}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Categorieën</FormLabel>
            <CheckboxGroup onChange={handleCategoryChange}>
              <Stack spacing={2} direction="row">
                {categories.map((cat) => (
                  <Checkbox key={cat.id} value={cat.id.toString()}>{cat.name}</Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" borderRadius="xl">
            Voeg evenement toe
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddEventPage;
