import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreateCustomerPage from "./pages/CreateCustomerPage";
import CustomersIndexPage from "./pages/CustomersIndexPage";
import Homepage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SingleCustomerDetailsPage from "./pages/SingleCustomerDetailsPage";

function App() {
  const mainBg = useColorModeValue("gray.50", "gray.800");
  return (
    <Box bg={mainBg} minH={"100vh"}>
      <NavBar />
      <Container
        centerContent
        minW={{
          xl: "container.xl",
          lg: "container.lg",
          md: "container.md",
          sm: "container.sm",
        }}
        w={"container.xl"}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="customers">
            <Route path="" element={<CustomersIndexPage />} index />
            <Route path=":id" element={<SingleCustomerDetailsPage />} />
            <Route path="create" element={<CreateCustomerPage />} />
          </Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
