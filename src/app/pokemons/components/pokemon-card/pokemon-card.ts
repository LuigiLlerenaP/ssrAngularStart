import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../contracts/pokemons-types';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  host: {
    class: 'block',
  },
})
export class PokemonCard {
  readonly pokemon = input.required<SimplePokemon>();

  private pokemonImageBaseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  protected readonly pokemonImageUrl = computed(
    () => `${this.pokemonImageBaseUrl}/${this.pokemon().id}.png`,
  );

  //Efectos Angular

  //LogEffect: Nos permite, realizar una accion automaticamente cada vez que  el valor de la senial cambie.
  //Cada cambio en la senial del pokemon, se ejecutara el efecto.
  // logEffect = effect(() => {
  //   console.log('Pokemon changed:', this.pokemon());
  // });
}
