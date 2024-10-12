import ExploreTrending from '@/components/explore/ExploreTrending';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  //Muestra la info de cómo aparece en la side bar en el StoryBook del front
    title: 'Explore/ExploreTrending',
    //Se importa el componente el cual queremos que se muestre
    component: ExploreTrending,
    //Estilos adicionales para mostrar en el front
    
    tags: ['autodocs'],

  } satisfies Meta<typeof ExploreTrending>;

export default meta;

//Definimos tipo Historia, y le pasamos el objeto de "meta" para que ya cuente con la configuración
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
      hashes: [
        {
          hash: 'Tatooine',
          count: 2,
        },
        {
          hash: 'Fuerza',
          count: 7,
        },
      ]
    },
  };
  
export const MoreThanTwo: Story = {
  args: {
    hashes: [
      {
        hash: 'Tatooine',
        count: 2,
      },
      {
        hash: 'Fuerza',
        count: 7,
      },
      {
        hash: 'Jedi',
        count: 17,
      },
    ]
  },
};

export const Empty: Story = {
  args: {
    hashes: []
  },
};