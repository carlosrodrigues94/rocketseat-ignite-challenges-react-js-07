/* eslint-disable no-console */
import { useMemo } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { Card } from '../components/CardList';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type RequestImagesResponse = {
  after?: string;
  data: Card[];
};

type RequestImages = (data: {
  pageParam?: string;
}) => Promise<RequestImagesResponse>;

export default function Home(): JSX.Element {
  const resquestImages: RequestImages = async ({ pageParam = null }) => {
    const response: AxiosResponse<RequestImagesResponse> = await api.get(
      '/api/images',
      {
        params: {
          after: pageParam,
        },
      }
    );

    return response.data;
  };
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', resquestImages, {
    getNextPageParam: ({ after }) => {
      if (!after) return null;

      return after;
    },
  });

  const formattedData = useMemo((): Card[] => {
    let formatted: Card[] = [];

    data?.pages.forEach(item => {
      formatted = [...formatted, ...item.data];
    });

    return formatted;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            type="button"
            onClick={() => {
              fetchNextPage({
                pageParam: data?.pages[0].after,
                throwOnError: true,
              });
            }}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
