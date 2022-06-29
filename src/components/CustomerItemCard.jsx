import {
  Avatar,
  Badge,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import ConfirmationDialogModal from "./ConfirmationDialogModal";
import { Link } from "react-router-dom";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";

const CustomerItemCard = ({
  first_name,
  last_name,
  email,
  gender,
  image,
  id,
  handleDelete,
}) => {
  return (
    <Flex
      boxShadow={"lg"}
      width={"full"}
      rounded={"md"}
      px={4}
      py={2}
      gap={2}
      position={"relative"}
      justifyContent={"space-between"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Link to={`/customers/${id}`}>
        <Flex>
          <Avatar src={image} alignSelf={"center"} />

          <Flex
            direction={"column"}
            textAlign={"left"}
            justifyContent={"space-between"}
            p={1}
          >
            <Flex gap={2} placeItems={"center"}>
              <Text fontSize={"sm"} fontWeight={600}>
                {first_name} {last_name}
              </Text>
              <Text fontSize={"xs"}>
                <Badge fontSize={"10px"} variant="solid" colorScheme="green">
                  {gender}
                </Badge>
              </Text>
            </Flex>
            <Text fontSize={"xs"}>{email}</Text>
          </Flex>
        </Flex>
      </Link>

      <Menu placement={"left-start"}>
        <MenuButton>
          <MoreVerticalIcon />
        </MenuButton>
        <MenuList minW={0} w={40}>
          <MenuItem>
            <Link to={`/customers/${id}`}>View Details</Link>
          </MenuItem>
          <ConfirmationDialogModal
            actionText={`Delete ${first_name} ${last_name}`}
            helperText={"This changes cannot be undone in the future"}
            onConfirmation={handleDelete}
          >
            {(onOpen) => <MenuItem onClick={onOpen}>Delete</MenuItem>}
          </ConfirmationDialogModal>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CustomerItemCard;
