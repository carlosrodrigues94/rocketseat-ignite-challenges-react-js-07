import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card as CardComponent } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  const handleViewImage = useCallback(
    (url: string) => {
      setImageUrl(url);
      onToggle();
    },
    [onToggle]
  );

  return (
    <>
      <SimpleGrid flex="1" gap="6" minChildWidth="320px" align="flex-start">
        {cards.map(card => (
          <CardComponent
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} imgUrl={imageUrl} onClose={onClose} />
    </>
  );
}
