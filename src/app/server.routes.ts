import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Le decimos a Angular que renderice esta ruta en tiempo real, no en el build
    path: 'pokemons-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    // El resto de la aplicación (about, contact, etc.) sí se pre-renderiza
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
