import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay display="flex" alignItems="center" justifyContent="center">
        <ModalContent
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="gray.900"
          width="80%"
        >
          <ModalBody>
            <Image
              src={imgUrl}
              maxWidth="900px"
              maxHeight="600px"
              width="90%"
              borderRadius="8"
            />
          </ModalBody>
          <ModalFooter>
            <Link href={imgUrl}>Abrir original</Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
