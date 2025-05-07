
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export const Root = () => {
  const location = useLocation();

  return (
    <Box
      minHeight="100vh"
      bgImage="url('/images/BuzzOn-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box bg="rgba(255, 255, 255, 0.85)" minHeight="100vh">
        <Header />

        <Box as="main" flex="1" p={4} pt="100px" pb="80px" display="flex" flexDirection="column">
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};
