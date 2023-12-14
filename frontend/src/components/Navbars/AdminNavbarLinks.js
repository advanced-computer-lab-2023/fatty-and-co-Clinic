// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  Tooltip,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  ChakraProvider,
  extendTheme,
  Divider,
} from "@chakra-ui/react";
import { BsBoxArrowRight } from "react-icons/bs";
import { Icon } from "@chakra-ui/icon";
import { MdAttachMoney } from "react-icons/md";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import { useAuthContext } from "hooks/useAuthContext";
import { useLogout } from "hooks/useLogout";
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { useState, useEffect } from "react";
import { useWalletContext } from "hooks/useWalletContext";
import PatientProfile from "views/Patient/viewProfile";

const theme = extendTheme({
  icons: {
    MdAttachMoney,
  },
});

export default function HeaderLinks(props) {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const history = useHistory();
  const { Wallet, dispatch } = useWalletContext();
  // const [Wallet, setWallet] = useState(null);
  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        const response = await axios.get(API_PATHS.getWalletAmount, {
          headers: { Authorization },
        });
        console.log(response.data);
        dispatch({ type: "GET_WALLET", payload: response.data.Wallet });
      } catch (error) {
        console.error("Error fetching wallet amount", error);
      }
    };
    fetchWalletAmount();
  }, [Authorization]);

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {!user && (
        <NavLink to="/auth/signin">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              ) : (
                ""
              )
            }
          >
            <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
          </Button>
        </NavLink>
      )}
      {user && (
        <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <Tooltip label="Profile" fontSize='md'> 
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px"  _hover={{color:"black"}}  />
                </Tooltip>
              )
            }
            leftIcon={
              document.documentElement.dir ? (
               <Tooltip label="Profile" fontSize='md'> 
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px"  _hover={{color:"black"}}  />
                </Tooltip>
              ) : (
                ""
              )
            }
            onClick={()=>{history.push('./profile')}}
          >
          </Button>
          )}
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      {/* <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        mw="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      /> */}
  
      {user.userType !== "Admin" && (
      <ChakraProvider theme={theme}>
        <Tooltip label="Wallet" >
          <Flex
            alignItems="center"
          >
        <Icon
              as={MdAttachMoney}
              boxSize={5}
              color={navbarIcon}
              _hover={{ color: "teal.500", cursor: "pointer" }}
              w="18px"
              h="18px"
              mb="2px"
            />
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={navbarIcon}
              _hover={{ color: "teal.500", cursor: "pointer" }}
              w="auto"
              h="27px"
              mr="13px"
            >
          {Wallet !== null ? `${parseFloat(Wallet).toFixed(2)}` : ""}
        </Text>
        </Flex>
        </Tooltip>
      </ChakraProvider> 
      )}
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" me="18px" mb="5px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      {user && (
          <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          _hover={{ color: "red.500", cursor: "pointer" }}
          onClick={useLogout()}
        >
          <Text display={{ sm: "none", md: "flex" }}>Log out</Text>
          <Icon
            as={BsBoxArrowRight}
            _hover={{ color: "red.500", cursor: "pointer" }}
            color={navbarIcon}
            w="22px"
            h="22px"
            me="0px"
            ml="5px"
          />
        </Button>
      )}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
