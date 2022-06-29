import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";

const ConfirmationDialogModal = ({
  children,
  actionText,
  helperText,
  onConfirmation,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleConfirmation = () => {
    onConfirmation();
    onClose();
  };
  return (
    <>
      {children(onOpen)}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{actionText}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{helperText}</AlertDialogBody>
          <AlertDialogFooter>
            <HStack spacing={4}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirmation} colorScheme="red" ml={3}>
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default ConfirmationDialogModal;
