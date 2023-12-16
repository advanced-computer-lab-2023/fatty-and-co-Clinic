import { JaaSMeeting } from "@jitsi/react-sdk";
import { Spinner } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { set } from "date-fns";

function VideoChat({ roomName, displayName, setIsVideoCall }) {
  const history = useHistory();
  return (
    <JaaSMeeting
      appId="vpaas-magic-cookie-c97bbf8543c04154a0771f65dcf8ce74"
      roomName={roomName}
      configOverwrite={{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5,
      }}
      interfaceConfigOverwrite={{
        VIDEO_LAYOUT_FIT: "nocrop",
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4,
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          //   "closedcaptions",
          "desktop",
          //   "fullscreen",
          //   "fodeviceselection",
          "hangup",
          //   "profile",
          //   "chat",
          //   "recording",
          "livestreaming",
          //   "etherpad",
          //   "sharedvideo",
          "settings",
          //   "raisehand",
          "videoquality",
          //   "filmstrip",
          //   "invite",
          //   "feedback",
          //   "stats",
          //   "shortcuts",
          //   "tileview",
          "videobackgroundblur",
          //   "download",
          //   "help",
          //   "mute-everyone",
          //   "security",
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: "#81E6D9",
      }}
      userInfo={{
        displayName,
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "600px";
      }}
      spinner={Spinner}
      onApiReady={(externalApi) => {
        externalApi.on("videoConferenceLeft", () => {
          // Perform any additional actions here
          // history.push("./"); // TODO: redirect to chat page
          setIsVideoCall(false);
          console.log("The user has left the conference");
        });
      }}
    />
  );
}

export default VideoChat;