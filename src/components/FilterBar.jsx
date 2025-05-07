import React from 'react';
import { Input, Select, Stack } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

const FilterBar = ({ search, onSearch, selectedCategory, onCategoryChange }) => {
  const { categories } = useAppContext();

  return (
    <Stack direction={['column', 'row']} spacing={4} mb={6}>
      <Input
        placeholder="Search events..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </Select>
    </Stack>
  );
};

export default FilterBar;