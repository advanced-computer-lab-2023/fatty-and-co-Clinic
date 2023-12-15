import { useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Button } from "@chakra-ui/react";
import { RequestsContextProvider } from "context/RequestsContext";
import { ViewRequestsInner } from "./ViewRequests";

export default function ViewRequests() {
  return (
    <RequestsContextProvider>
      <ViewRequestsInner />
    </RequestsContextProvider>
  );
}
