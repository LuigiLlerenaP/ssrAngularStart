import { PokemonCharacterAPIResponse } from '../contracts/pokemon-api';
import { PokemonType } from '../contracts/pokemons-types';

export const mapPokemon = (data: PokemonCharacterAPIResponse): PokemonType => ({
  id: data.id.toString(),
  name: data.name,
  height: data.height,
  weight: data.weight,
  types: data.types.map((t) => t.type.name),
  abilities: data.abilities.map((a) => a.ability?.name || ''),
  imageUrl: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
});
