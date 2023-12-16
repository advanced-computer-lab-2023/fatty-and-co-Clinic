import { useState } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { Button } from "@chakra-ui/react";
import { ViewRequestsInner } from "./ViewRequests";
import { RequestsContextProvider } from "context/RequestsContext";

export default function ViewRequests() {
  return (
    <RequestsContextProvider>
      <ViewRequestsInner />
    </RequestsContextProvider>
  );
}
