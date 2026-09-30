import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SimplePokemon } from '../contracts/pokemons-types';
import { map, Observable, tap } from 'rxjs';
import { PokemonAPIResponse } from '../contracts/pokemon-api';

@Service()
export class PokemonsServices {
  private readonly http = inject(HttpClient);

  //cargar page
  public loadPage(page: number, pageS: number = 20): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokemonAPIResponse>(
        `${environment.pokemonApiUrl}pokemon?offset=${page * pageS}&limit=${20}`,
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((result) => ({
            id: result.url.split('/').at(-2) ?? '0',
            name: result.name,
          }));

          return simplePokemons;
        }),
      );
  }
}
