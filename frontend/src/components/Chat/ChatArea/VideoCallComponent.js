import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import VideoChat from "components/VideoCall/VideoChat";
import { useAuthContext } from "hooks/useAuthContext";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

function VideoCallComponent({ roomName, setIsVideoCall }) {
  const [displayName, setDisplayName] = useState(""); // Replace with the display name
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const getInitiatingPatient = () => {
    const url = API_PATHS.getPatientInfo;
    axios
      .get(url, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        setDisplayName(response.data.patient.Name);
      })
      .catch((err) => console.log(err));
  };

  const getInitiatingDoctor = () => {
    const url = API_PATHS.getDoctorInfo;
    axios
      .get(url, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        setDisplayName(response.data.doctor.Name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user.userType.toLowerCase() === "patient") {
      getInitiatingPatient();
    } else if (user.userType.toLowerCase() === "doctor") {
      getInitiatingDoctor();
    }
  }, []);

  return (
    <Box>
      {(displayName && (
        <VideoChat
          roomName={roomName}
          displayName={displayName}
          setIsVideoCall={setIsVideoCall}
        />
      )) || <Spinner />}
    </Box>
  );
}

export default VideoCallComponent;
