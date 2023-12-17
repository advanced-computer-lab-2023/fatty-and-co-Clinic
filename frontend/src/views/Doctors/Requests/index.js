import { useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Button } from "@chakra-ui/react";
import { ViewRequestsInner } from "./ViewRequests";
import { FollowUpRequestsContextProvider } from "context/FollowUpRequestsContext";

export default function ViewRequests() {
  return (
    <FollowUpRequestsContextProvider>
      <ViewRequestsInner />
    </FollowUpRequestsContextProvider>
  );
}
