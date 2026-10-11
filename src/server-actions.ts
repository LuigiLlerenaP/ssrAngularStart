import { environment } from './environments/environment';

const TOTAL_POKEMONS = 20;
const POKEMONS_PER_PAGE = 10;

type PokemonListResponse = {
  results: Array<{
    name: string;
    url: string;
  }>;
};

/**
 * Genera los parámetros para prerenderizar los detalles.
 */
export const getPokemonParams = async (): Promise<Array<{ id: string }>> => {
  const pokemonNames = await getPokemonNames();

  return pokemonNames.map((_, index) => ({
    id: String(index + 1),
  }));
};

/**
 * Genera los parámetros para prerenderizar las páginas del listado.
 */
export const getPokemonPageParams = async (): Promise<Array<{ page: string }>> => {
  const totalPokemon = await fetch(`${environment.pokemonApiUrl}/pokemon?limit=1`);

  if (!totalPokemon.ok) {
    throw new Error(`Error al consultar el total de Pokémon: ${totalPokemon.status}`);
  }

  const data: { count: number } = await totalPokemon.json();

  const totalPages = Math.ceil(data.count / POKEMONS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, index) => ({
    page: String(index + 1),
  }));
};

/**
 * Obtiene los primeros Pokémon desde la PokéAPI.
 */
const getPokemonNames = async (): Promise<string[]> => {
  const response = await fetch(`${environment.pokemonApiUrl}/pokemon?limit=${TOTAL_POKEMONS}`);

  if (!response.ok) {
    throw new Error(`Error al obtener los Pokémon: ${response.status} ${response.statusText}`);
  }

  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon) => pokemon.name);
};
