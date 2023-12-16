import { Jitsi } from "@jitsi/react-sdk";

function VideoChat({ roomName }) {
  return (
    <Jitsi
      domain="meet.jit.si" // domain of your jitsi server
      options={{
        roomName: roomName, // name of the room
        width: "100%",
        height: "100%",
      }}
      onAPILoad={(JitsiMeetAPI) => console.log("Jitsi API loaded")}
    />
  );
}

export default VideoChat;
