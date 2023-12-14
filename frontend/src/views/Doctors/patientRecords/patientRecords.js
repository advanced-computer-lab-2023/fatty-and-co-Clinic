import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Input,
  useToast,
  Box,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function PatientAppointments() {
  const searchParams = new URLSearchParams(location.search);
}
