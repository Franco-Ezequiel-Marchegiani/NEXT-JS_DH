import UserTabs from '@/components/users/UserTabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  //Muestra la info de cómo aparece en la side bar en el StoryBook del front
    title: 'Usuarios/UserTabs',
    //Se importa el componente el cual queremos que se muestre
    component: UserTabs,
    //Estilos adicionales para mostrar en el front
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],

  } satisfies Meta<typeof UserTabs>;

export default meta;

//Definimos tipo Historia, y le pasamos el objeto de "meta" para que ya cuente con la configuración
type Story = StoryObj<typeof meta>;

const messages = [
    {
        name: 'Anakin Skywalker',
        username: 'Anakin',
        message: 'Segundo mensaje',
        repliesCount: 13,
    },
    {
        name: 'Anakin Joestar',
        username: 'Anakin',
        message: 'Segundo mensaje',
        repliesCount: 13,
    },
]
const replies = [
    {
        message: "Mi respuesta",
        repliesCount: 0
    },
] 
export const MessageTab: Story = {
    args: {
      messages: messages,
      replies: replies
    },
  };
  