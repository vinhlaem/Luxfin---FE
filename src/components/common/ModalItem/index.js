import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ModalItem({
  children,
  isOpen = false,
  onClose = () => ({}),
  p = "16px",
  pBody,
  ...props
}) {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent {...props} p={p} position="relative">
        <ModalCloseButton
          boxShadow="none !important"
          position="absolute"
          top="16px"
          right="16px"
        ></ModalCloseButton>
        <ModalBody p={pBody}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
