import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { API_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateCustomerPage = () => {
  const formBg = useColorModeValue("white", "gray.700");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState(" ");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("Male");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, fn) => fn(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response;
    try {
      response = await axios.post(API_URL + "/customers", {
        first_name: firstName,
        last_name: lastName,
        email,
        image: imageUrl,
        gender,
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        setError("Something went wrong please try agin later");
      }
      setIsLoading(false);
      return;
    }
    if (response?.data) {
      navigate("/customers", { replace: true });
      setIsLoading(false);
    }
  };

  return (
    <Flex align={"center"} w={"full"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add a new customer
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Managing customers is our passion
          </Text>
        </Stack>
        <Box
          as={"form"}
          onSubmit={handleSubmit}
          rounded={"lg"}
          bg={formBg}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => handleChange(e, setFirstName)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleChange(e, setLastName)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
              />
            </FormControl>
            <FormControl id="image" isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={imageUrl}
                type="url"
                onChange={(e) => handleChange(e, setImageUrl)}
              />
            </FormControl>
            <FormControl id="gender" isRequired>
              <FormLabel>Gender</FormLabel>

              <RadioGroup
                defaultValue={gender}
                onChange={(value) => setGender(value)}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="Male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" value="Female">
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Stack spacing={4} pt={2}>
              {error ? (
                <Text fontSize={"lg"} textAlign={"center"} color={"red.600"}>
                  {error}
                </Text>
              ) : null}
              <Button
                isLoading={isLoading}
                loadingText="Submitting.."
                size="lg"
                bg={"blue.400"}
                type={"submit"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {isLoading ? <Spinner /> : "Create"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateCustomerPage;
