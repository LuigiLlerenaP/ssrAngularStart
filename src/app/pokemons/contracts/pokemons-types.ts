export type Pokemon = {
  id: string;
  name: string;
  image: string;
};

export type SimplePokemon = Pick<Pokemon, 'id' | 'name'>;
