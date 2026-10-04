import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // El doble asterisco significa "CUALQUIER RUTA"
    // Esto obliga a Angular a usar SSR para toda la aplicación
    path: '**',
    renderMode: RenderMode.Server,
  },
];
