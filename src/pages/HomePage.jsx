import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 16, md: 20 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Happy customers, <br />
          <Text as={"span"} color={"green.400"}>
            amazing business
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={"lg"} fontWeight={500}>
          The real venture starts here with unending limits when it comes to
          business, drawing you closer to your customers
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Link to={"/customers"}>
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              View All Customers
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HomePage;
