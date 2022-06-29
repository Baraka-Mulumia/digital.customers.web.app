import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../constants";
import ConfirmationDialogModal from "../components/ConfirmationDialogModal";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import axios from "axios";

const SingleCustomerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customer, setCustomer] = useState(null);

  const fetchSingleCustomer = async (id) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(API_URL + "/customers/" + id);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    if (response?.data) {
      setIsLoading(false);
      setIsError(false);
      setCustomer(response?.data);
    }
  };

  useEffect(() => {
    fetchSingleCustomer(id);
  }, [id]);

  const handleDelete = async () => {
    let response;
    try {
      response = await axios.delete(API_URL + "/customers/" + id);
    } catch (error) {
      console.log(error); // you could show a toast.
    }
    if (response) {
      navigate("/customers", { replace: true });
    }
  };

  const color = useColorModeValue("gray.900", "gray.400");

  return (
    <Container maxW={"7xl"}>
      {isError ? (
        <ErrorState
          title={"Customer Not found"}
          description={
            "We apologize for the inconvenience, we can not seem to find what you are looking for"
          }
        />
      ) : isLoading ? (
        <LoadingState />
      ) : (
        <>
          {customer && (
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <AspectRatio
                maxW="500px"
                ratio={4 / 3}
                rounded={"md"}
                border={"1px solid red"}
              >
                <Image
                  alt={`${customer?.first_name} ${customer?.last_name}`}
                  src={customer?.image}
                  objectFit={"contain"}
                  objectPosition={"top center"}
                  align={"center"}
                  w={"100%"}
                />
              </AspectRatio>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {customer?.first_name} {customer?.last_name}
                  </Heading>
                  <Text color={color} fontWeight={300} fontSize={"2xl"}>
                    {customer?.email}
                  </Text>
                </Box>

                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                  <Text fontSize={"2xl"}>
                    <Badge fontSize={"2xl"}>{customer?.gender}</Badge>
                  </Text>
                </Stack>
                <Text fontSize={"lg"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  neque reprehenderit minima, dolore aliquam accusamus totam,
                  dignissimos molestiae pariatur ducimus temporibus nihil
                  architecto dicta consequatur maxime eligendi delectus.
                  Possimus, inventore.
                </Text>
                <ConfirmationDialogModal
                  actionText={`Delete ${customer?.first_name} ${customer?.last_name}`}
                  helperText={"This changes cannot be undone in the future"}
                  onConfirmation={handleDelete}
                >
                  {(onOpen) => (
                    <Button w={40} onClick={onOpen} colorScheme={"red"}>
                      Delete
                    </Button>
                  )}
                </ConfirmationDialogModal>
              </Stack>
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
};

export default SingleCustomerDetailsPage;
