import { Meta, Title } from '@angular/platform-browser';
import { Component, effect, inject, input, signal } from '@angular/core';
import { Location } from '@angular/common';
import { PokemonsServices } from '../../pokemons/services/pokemons-services';
import type { PokemonType } from '../../pokemons/contracts/pokemons-types';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon-details',
  imports: [],
  templateUrl: './pokemon-details.html',
})
export class PokemonDetails {
  private readonly pokemonService = inject(PokemonsServices);
  private readonly location = inject(Location);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  protected readonly id = input.required<string>();
  protected readonly pokemon = signal<PokemonType | null>(null);

  constructor() {
    effect(() => {
      this.pokemonService
        .loadPokemon(this.id())
        .pipe(
          tap(({ name, id }) => {
            const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
            const pageTitle = `#${id} - ${uppercaseName} | Pokémon Details`;

            this.title.setTitle(pageTitle);

            this.meta.updateTag({
              name: 'description',
              content: `Details about Pokémon ${uppercaseName}`,
            });

            this.meta.updateTag({
              name: 'og:title',
              content: pageTitle,
            });

            this.meta.updateTag({
              name: 'og:description',
              content: `Details about Pokémon ${uppercaseName}`,
            });

            this.meta.updateTag({
              property: 'og:image',
              content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            });
          }),
        )
        .subscribe(this.pokemon.set);
    });
  }
  goBack() {
    this.location.back();
  }
}

export default PokemonDetails;
