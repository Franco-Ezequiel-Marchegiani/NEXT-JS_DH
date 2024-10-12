import UsersLayOut from '@/app/(main)/layout';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  //Muestra la info de cómo aparece en la side bar en el StoryBook del front
    title: 'Layout/Base',
    //Se importa el componente el cual queremos que se muestre
    component: UsersLayOut,
    //Estilos adicionales para mostrar en el front
    
    tags: ['autodocs'],

  } satisfies Meta<typeof UsersLayOut>;

export default meta;

//Definimos tipo Historia, y le pasamos el objeto de "meta" para que ya cuente con la configuración
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
      children: 'CONTENIDO'
    },
  };
  