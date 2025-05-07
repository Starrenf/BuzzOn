import React, { useState, useEffect } from 'react';
import {
  Button, Input, FormControl, FormLabel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Textarea, Stack, Select
} from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

const EventForm = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const { categories, users } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startTime: '',
    endTime: '',
    categoryIds: [],
    createdBy: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({ ...prev, categoryIds: selectedOptions }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData?.id ? 'Edit Event' : 'Add Event'}</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input name="image" value={formData.image} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              <Select multiple value={formData.categoryIds} onChange={handleCategoryChange}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Created By</FormLabel>
              <Select name="createdBy" value={formData.createdBy} onChange={handleChange}>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventForm;