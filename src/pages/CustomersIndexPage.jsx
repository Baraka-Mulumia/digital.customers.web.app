import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { API_URL } from "../constants";
import CustomerItemCard from "../components/CustomerItemCard";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import { Outlet } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

const CustomersIndexPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isError, setIsError] = useState(false);

  const fetchAllCustomers = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(API_URL + "/customers");
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    if (response?.data) {
      setIsLoading(false);
      setIsError(false);
      setCustomers(response?.data);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const customerList = customers
    .filter((customer) =>
      JSON.stringify(customer)
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    )
    .sort((a, b) => +b?.id - +a?.id);

  const handleDelete = async (id) => {
    let response;
    try {
      response = await axios.delete(API_URL + "/customers/" + id);
    } catch (error) {
      console.log(error); // you could show a toast.
    }
    if (response) {
      fetchAllCustomers();
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState
          title={"Could not fetch customers"}
          description={
            "We apologize for the inconvenience, we can not seem to get you the list of customers"
          }
        />
      ) : (
        <>
          <Flex
            textAlign={"center"}
            pt={10}
            justifyContent={"center"}
            direction={"column"}
            width={"full"}
            gap={10}
          >
            <InputGroup
              h={10}
              rounded={"md"}
              w={{
                base: "75%",
                md: "50%",
              }}
              mx={"auto"}
            >
              <InputLeftAddon>
                <Search2Icon />
              </InputLeftAddon>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={"Search"}
                px={4}
                rounded={"md"}
              />
            </InputGroup>
            <VStack>
              {customerList.map((customer, index) => (
                <CustomerItemCard
                  {...customer}
                  index={index}
                  key={customer?.id}
                  handleDelete={() => handleDelete(customer?.id)}
                />
              ))}
            </VStack>
          </Flex>
          <Outlet />
        </>
      )}
    </>
  );
};
export default CustomersIndexPage;
