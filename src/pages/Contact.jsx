
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xyzwkoer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Bericht verzonden!",
          description: "Bedankt voor je bericht. We nemen spoedig contact op.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSuccessMessage("✅ Je bericht is succesvol verzonden!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Netwerkfout");
      }
    } catch (error) {
      toast({
        title: "Fout bij verzenden",
        description: "Er ging iets mis. Probeer het later opnieuw.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="xl"
      bg="whiteAlpha.900"
      boxShadow="lg"
    >
      <Heading mb={4} color="teal.600">
        Contact
      </Heading>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Naam"
          isRequired
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mailadres"
          isRequired
          value={formData.email}
          onChange={handleChange}
        />
        <Textarea
          name="message"
          placeholder="Bericht"
          rows={5}
          isRequired
          value={formData.message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          borderRadius="xl"
          alignSelf="flex-start"
          isLoading={isSubmitting}
        >
          Verstuur
        </Button>
        {successMessage && (
          <Text color="green.600" fontSize="md" alignSelf="flex-start">
            {successMessage}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
