import { Component, input } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { EmptyList } from '../../../shared/components/empty-list/empty-list';
import { SimplePokemon } from '../../contracts/pokemons-types';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard, EmptyList],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  readonly pokemons = input.required<SimplePokemon[]>();
}
