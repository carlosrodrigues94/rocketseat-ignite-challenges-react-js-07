import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

const validateImageFormat = (type: string): boolean => {
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const isValid = acceptedTypes.find(acType => type === acType);

  if (!isValid) return false;

  return true;
};

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        // lessThan10MB: ({ size }) =>
        //   Number(size) > 10000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: ({ type }) =>
          validateImageFormat(type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres',
      },
    },
    description: {
      required: 'Título obrigatório',
      // minLength: {
      //   value: 2,
      //   message: 'Mínimo de 2 caracteres',
      // },
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    // api.post('/api/images', { url: '', title: '', description: '' }),

    async () => {
      const response = await api.post('/api/images', {
        url: '',
        title: '',
        description: '',
      });

      return response.data;
    },
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          status: 'error',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          title: 'Imagem não adicionada',
        });
      }

      // const response = await mutation.mutateAsync();
      toast({
        status: 'success',
        description: 'Sua imagem foi cadastrada com sucesso.',
        title: 'Imagem cadastrada',
      });
    } catch {
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        title: 'Falha no cadastro',
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          name="image"
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
