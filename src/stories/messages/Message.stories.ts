import Message from '@/components/messages/Message';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  //Muestra la info de cómo aparece en la side bar en el StoryBook del front
    title: 'Messages/Message',
    //Se importa el componente el cual queremos que se muestre
    component: Message,
    //Estilos adicionales para mostrar en el front
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],

  } satisfies Meta<typeof Message>;

export default meta;

//Definimos tipo Historia, y le pasamos el objeto de "meta" para que ya cuente con la configuración
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
      message: {message: 'Msg de prueba', name: 'Raul', username: 'Pablo'},
    },
  };
  