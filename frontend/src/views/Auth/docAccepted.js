import { Button } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import { Link } from 'react-router-dom';
import axios from 'axios';


function DocAccepted() {
  var urlParams = new URLSearchParams(window.location.search);
  var username = urlParams.get('username');
  useEffect(() => {
  const handleAccept = async() => {
    try{
      console.log(username);
      axios
      .post(API_PATHS.acceptContract, null, {
        params:{ Username: username },
      })
      .then(async (response) => {
        console.log(response.data)
        window.location.href = 'http://localhost:3000/auth/signin';
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

      //res.status(200).send("success");
      
    }catch (error) {
    console.log(error);
    //res.status(400).send({ message: error.message });
  }
  };
  handleAccept();
  }, []);

  
  return (
    <div>
      <h1>Contract Accepted</h1>
      {/* <Button colorScheme="green" size="lg" onClick={() => handleAccept()}>
        Accept
      </Button> */}
    </div>
  );
}

export default DocAccepted;
