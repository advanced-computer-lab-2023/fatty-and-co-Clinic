import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import VideoChat from "components/VideoCall/VideoChat";
import { useAuthContext } from "hooks/useAuthContext";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function VideoCallPage() {
  const [patient, setPatient] = useState([{}]);
  const [roomName, setRoomName] = useState("roomName"); // Replace with your room name
  const [displayName, setDisplayName] = useState("displayName"); // Replace with the display name
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    getPatientInfo();
  }, []);

  const getPatientInfo = () => {
    const url = API_PATHS.getPatientInfo;
    axios
      .get(url, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        setPatient(response.data.patient);
        setRoomName(response.data.patient._id);
        setDisplayName(response.data.patient.Name);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box pt="80px">
      <Heading mb={5}>Video Call Page</Heading>
      {(patient.Username && (
        <VideoChat roomName={roomName} displayName={displayName} />
      )) || <Spinner />}
    </Box>
  );
}

export default VideoCallPage;