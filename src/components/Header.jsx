
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  HamburgerIcon,
  CalendarIcon,
  AddIcon,
  InfoIcon,
  EmailIcon,
} from '@chakra-ui/icons';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  React.useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="999"
        bg="teal.600"
        color="white"
        p={4}
        align="center"
        justify="space-between"
        wrap="wrap"
      >
        <Flex align="center" gap={2}>
          <img
            src="../images/BuzzOn_logo.png"
            alt="BuzzOn logo"
            style={{ height: '60px' }}
          />
          <Heading fontSize="60px" lineHeight="60px">BuzzOn!</Heading>
        </Flex>

        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          color="white"
          borderColor="white"
        />

        <Flex display={{ base: 'none', md: 'flex' }} gap={4}>
          <Button as={Link} to="/events" leftIcon={<CalendarIcon />} variant="ghost" color="white" _hover={{ bg: 'teal.900' }}>
            Alle events
          </Button>
          <Button as={Link} to="/add-event" leftIcon={<AddIcon />} variant="ghost" color="white" _hover={{ bg: 'teal.900' }}>
            Event toevoegen
          </Button>
          <Button as={Link} to="/over-ons" leftIcon={<InfoIcon />} variant="ghost" color="white" _hover={{ bg: 'teal.900' }}>
            Over ons
          </Button>
          <Button as={Link} to="/contact" leftIcon={<EmailIcon />} variant="ghost" color="white" _hover={{ bg: 'teal.900' }}>
            Contact
          </Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="teal.800" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Button as={Link} to="/events" leftIcon={<CalendarIcon />} variant="ghost" color="white">
                Alle events
              </Button>
              <Button as={Link} to="/add-event" leftIcon={<AddIcon />} variant="ghost" color="white">
                Event toevoegen
              </Button>
              <Button as={Link} to="/over-ons" leftIcon={<InfoIcon />} variant="ghost" color="white">
                Over ons
              </Button>
              <Button as={Link} to="/contact" leftIcon={<EmailIcon />} variant="ghost" color="white">
                Contact
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
