import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SidebarContext from "./SidebarContext";

const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, isOpen, onOpen, onClose }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
