import Menu from '@/components/menu/Menu';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  //Muestra la info de cómo aparece en la side bar en el StoryBook del front
    title: 'Menu/Menu',
    //Se importa el componente el cual queremos que se muestre
    component: Menu,
    //Estilos adicionales para mostrar en el front
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],

  } satisfies Meta<typeof Menu>;

export default meta;

//Definimos tipo Historia, y le pasamos el objeto de "meta" para que ya cuente con la configuración
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
      links: [
        {title: 'Inicio', href:'/',},
        {title: 'Explorar', href:'/explorar',},
        {title: 'Perfil', href:'/mi-prefil',},
      ]
    },
  };
  