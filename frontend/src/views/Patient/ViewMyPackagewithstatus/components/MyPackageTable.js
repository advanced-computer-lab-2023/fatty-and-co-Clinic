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
import MyPackageSubRow from "components/Tables/MyPackageSubRow";

import React from "react";

const MyPackageSubsTable = ({ title, captions, data }) => {
  title="My Package"
  //Table that uses row
  const textColor = useColorModeValue("gray.700", "white");
  return (
     <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }}>
       <CardHeader p="6px 0px 22px 0px">
         <Flex direction="column">
           <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
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
          
                 <MyPackageSubRow
                   key={data.PackageName?data.PackageName.Name:""}
                   Name={data.PackageName?data.PackageName.Name:""}
                   Status={data.Status}
                   Enddate={data.Enddate}
                   Startdate={data.Startdate}
                   Renewaldate={data.Renewaldate}
                 />
               
           </Tbody>
         </Table> 
       </CardBody> 
     </Card>
  )
};

export default MyPackageSubsTable;
