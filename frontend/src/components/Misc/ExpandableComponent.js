import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import axios from 'axios'; // Import axios

function ExpandableComponent({ apiUrl, requestData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {

      axios
        .post(apiUrl, requestData)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [isExpanded, apiUrl, params]);

  return (
    <div>
      <Button
        onClick={toggleExpansion}
        colorScheme="teal"
      >
        {isExpanded ? 'Collapse' : 'Details'}
      </Button>
      {isExpanded && (
        <Box
          padding="16px" // Example padding
          border="1px solid #ccc" // Example border
          borderRadius="8px" // Example border radius
        >
          {data ? (
            <div>
              <Text fontSize="lg">{data.someProperty}</Text>
              {/* Add more Chakra UI-styled elements here */}
            </div>
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
      )}
    </div>
  );
}

export default ExpandableComponent;
