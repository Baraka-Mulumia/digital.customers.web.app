import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const NavBar = () => {
  const textColor = useColorModeValue("whiteAlpha.800", "gray.700");
  const bgColor = useColorModeValue("gray.600", "gray.300");
  return (
    <Box w={"full"} bg={bgColor}>
      <Container
        centerContent
        minW={{
          xl: "container.xl",
          lg: "container.lg",
          md: "container.md",
          sm: "container.sm",
          xs: "container.xs",
        }}
      >
        <HStack
          justify={"space-between"}
          align={"center"}
          w={"full"}
          p={4}
          minW={{
            base: "full",
            md: "container.md",
            xl: "container.xl",
            lg: "container.lg",
          }}
          bg={bgColor}
        >
          <HStack spacing={4}>
            <Link to="/">
              <Text color={textColor} fontSize={"lg"} fontWeight={600}>
                Home
              </Text>
            </Link>

            <Link to="/customers">
              <Text color={textColor} fontSize={"lg"} fontWeight={600}>
                Customers
              </Text>
            </Link>
          </HStack>
          <Link to="/customers/create">
            <Button>+ Add New</Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};
export default NavBar;
