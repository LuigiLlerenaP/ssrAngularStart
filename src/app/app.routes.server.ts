import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

import { getPokemonPageParams, getPokemonParams } from '../server-actions';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getPokemonPageParams,
  },
  {
    path: 'pokemons-details/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    getPrerenderParams: getPokemonParams,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
