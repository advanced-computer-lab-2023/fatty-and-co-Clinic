// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useHistory } from "react-router-dom";
import {useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import DoctorSlotApt from "components/Tables/DoctorSlotApt";
import { useAuthContext } from "hooks/useAuthContext";
import { useParams , useLocation} from "react-router-dom";

const DocSlotAptsTable = ({ title, captions, data }) => {
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const patientUsername = searchParams.get("username");
  const doctor= searchParams.get("doctor");

  var id="";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_PATHS.getDoctorByUser, {
  //         headers: { Authorization },
  //       });
  //       id=response.data;
  //       console.log(id)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [Authorization]);
  const handleRescheduleClick = async (DayName, StartTime) => {
    try {
      const response = await axios.get(API_PATHS.getDoctorId, {
        headers: { Authorization },
      });
      
      const id = response.data
      
      // Only redirect when id is truthy
      if (id) {
      
        const newUrl = `/doctor/rescheduleApp/?username=${patientUsername}&day=${DayName}&startTime=${StartTime}&id=${id}`;
        history.replace(newUrl);
      } else {
        console.error("Error: id is falsy.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {/* title will be All doctors  */}
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <DoctorSlotApt
                  key={row.id}
                  DayName={row.DayName}
                  StartTime={row.StartTime}
                  bookRescheduleClick={() => handleRescheduleClick(row.DayName,row.StartTime)}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DocSlotAptsTable;
