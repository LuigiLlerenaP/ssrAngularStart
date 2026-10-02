import {
  ApplicationRef,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Pagination } from '../../shared/components/pagination/pagination';
import { SkeletonCards } from '../../shared/components/skeleton-cards/skeleton-cards';
import { HeaderActions } from '../../shared/components/header-actions/header-actions';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PageHeaderConfig, PaginationConfig } from '../../shared/contracts/types';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonsServices } from '../../pokemons/services/pokemons-services';
import type { SimplePokemon } from '../../pokemons/contracts/pokemons-types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const toNumberOrDefault = (value: string | undefined | null): number => {
  if (!value) return 1;
  const parsedValue = Number(value);
  return isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
};

@Component({
  selector: 'pokemons',
  imports: [Pagination, SkeletonCards, HeaderActions, PokemonList],
  templateUrl: './pokemons.html',
})
export class Pokemons {
  // 1. INYECCIONES (Dependencias)
  private readonly pokemonsServices = inject(PokemonsServices);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly appRef = inject(ApplicationRef);

  // 2. INPUTS (Vienen de la URL automáticamente)
  // Cambié 'id' por 'page' porque semánticamente es una página
  readonly page = input(1, { transform: toNumberOrDefault });
  readonly offset = input(20, { transform: toNumberOrDefault });

  // 3. ESTADO LOCAL (Señales)
  readonly pokemons = signal<SimplePokemon[]>([]);
  protected readonly hasData = computed(() => this.pokemons().length > 0);

  // 4. CONFIGURACIONES COMPUTADAS (Reactivas)
  // Ahora es computed() para que cambie automáticamente cuando la URL cambia
  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.page(),
    totalPages: 10, // Nota: Idealmente esto debería calcularse con info del backend
    helperText: 'Pokemon preview',
  }));

  protected readonly pageHeaderConfig: PageHeaderConfig = {
    title: 'Pokémon',
    description: 'Browse and manage your collection of available Pokémon.',
    overline: 'Pokédex',
    primaryAction: {
      label: 'New Pokémon',
      type: 'button',
      customClasses: 'bg-black text-white hover:bg-gray-800',
      iconPath: 'M12 4v16m8-8H4',
    },
  };

  // 5. CONSTRUCTOR & EFECTOS
  constructor() {
    // Este efecto es la magia de Angular 16+.
    // Se ejecuta automáticamente al cargar y CADA VEZ que el input 'page()' o 'offset()' cambien.
    effect(() => {
      const currentPage = this.page();
      const currentLimit = this.offset();

      this.title.setTitle(`Pokémon - Page ${currentPage}`);
      this.loadPokemons(currentPage, currentLimit);
    });

    // Tu código de monitoreo estable
    this.appRef.isStable.pipe(takeUntilDestroyed()).subscribe((isStable) => {
      // console.log('¿Aplicación estable?:', isStable);
    });
  }

  // 6. LÓGICA DE NEGOCIO (Métodos Privados)
  private loadPokemons(page: number, limit: number) {
    this.pokemonsServices.loadPage(page, limit).subscribe((data) => this.pokemons.set(data));
    // Ya no necesitamos el 'tap' para el router aquí.
  }

  // 7. ACCIONES DE LA VISTA (Manejadores de Eventos)
  protected handleNextClick() {
    // Solo cambiamos la URL. El 'effect()' de arriba detectará el cambio y cargará los datos.
    this.router.navigate([], {
      queryParams: { page: this.page() + 1 },
      queryParamsHandling: 'merge', // Mantiene otros parámetros si existieran
    });
  }

  protected handlePreviousClick() {
    const prevPage = this.page() - 1;
    if (prevPage > 0) {
      // Evitamos navegar a la página 0 o negativas
      this.router.navigate([], {
        queryParams: { page: prevPage },
        queryParamsHandling: 'merge',
      });
    }
  }
}

export default Pokemons;
