export type PokemonType = {
  id: string;
  name: string;
  imageUrl: string;
  weight: number;
  height: number;
  types: string[];
  abilities: string[];
};

export type SimplePokemon = Pick<PokemonType, 'id' | 'name'>;
