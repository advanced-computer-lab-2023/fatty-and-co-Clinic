// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  Box,
  Input,
  Select,
  VStack,
  HStack,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useEffect, useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

function AppointmentCard({ date, DoctorName }) {
  const appDate = new Date(date);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
      <Text fontSize="md" color="gray.600">
        {appDate.toLocaleDateString("en-US")}
      </Text>
      <Text fontSize="md">{DoctorName}</Text>
    </Box>
  );
}

function AppointmentsList({ appointments }) {
  return (
    <VStack align="start" spacing="4">
      {appointments.map((appointment, index) => (
        <AppointmentCard
          key={index}
          date={appointment.Date}
          DoctorName={appointment.DoctorName}
        />
      ))}
    </VStack>
  );
}

function Appointments({ patientAppointments }) {
  const [data, setData] = useState([{}]);
  const [searchParams, setSearchParams] = useState({
    Status: "",
    Date: "",
  });
  const [statusSearchValue, setStatusSearchValue] = useState("");
  const [dateSearchValue, setDateSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const options = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
    { label: "Rescheduled", value: "Rescheduled" },
  ];

  useEffect(() => {
    const url = API_PATHS.viewAppointPat;
    setIsLoading(true);
    axios
      .get(url, { params: searchParams, headers: { Authorization } })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchParams]);
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Patient Appointments
      </Text>
      <AppointmentsList appointments={data} />
    </Box>
  );
}

// const Appointments = ({ title, amount, data }) => {
//   const textColor = useColorModeValue("gray.700", "white");
//   const [data, setData] = useState([{}]);
//   const [searchParams, setSearchParams] = useState({
//     Status: "",
//     Date: "",
//   });
//   const [statusSearchValue, setStatusSearchValue] = useState("");
//   const [dateSearchValue, setDateSearchValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { user } = useAuthContext();
//   const Authorization = `Bearer ${user.token}`;
//   return (
//     <Card maxH='100%'>
//       <CardHeader p='22px 0px 35px 14px'>
//         <Flex direction='column'>
//           <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
//             {title}
//           </Text>
//           <Text fontSize='sm' color='gray.400' fontWeight='normal'>
//             <Text fontWeight='bold' as='span' color='teal.300'>
//               {`${amount}%`}
//             </Text>{" "}
//             this month.
//           </Text>
//         </Flex>
//       </CardHeader>
//       <CardBody ps='20px' pe='0px' mb='31px' position='relative'>
//         <Flex direction='column'>
//           {data.map((row, index, arr) => {
//             return (
//               <TimelineRow
//                 key={row.title}
//                 logo={row.logo}
//                 title={row.title}
//                 date={row.date}
//                 color={row.color}
//                 index={index}
//                 arrLength={arr.length}
//               />
//             );
//           })}
//         </Flex>
//       </CardBody>
//     </Card>
//   );
// };

export default Appointments;
