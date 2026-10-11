import { ApplicationRef, Component, computed, effect, inject, input, signal } from '@angular/core';
import { Pagination } from '../../shared/components/pagination/pagination';
import { SkeletonCards } from '../../shared/components/skeleton-cards/skeleton-cards';
import { HeaderActions } from '../../shared/components/header-actions/header-actions';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PageHeaderConfig, PaginationConfig } from '../../shared/contracts/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonsServices } from '../../pokemons/services/pokemons-services';
import type { SimplePokemon } from '../../pokemons/contracts/pokemons-types';
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
  private readonly pokemonsServices = inject(PokemonsServices);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly appRef = inject(ApplicationRef);
  readonly page = input(1, { transform: toNumberOrDefault });
  readonly offset = input(20, { transform: toNumberOrDefault });
  readonly pokemons = signal<SimplePokemon[]>([]);
  protected readonly hasData = computed(() => this.pokemons().length > 0);

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.page(),
    totalPages: 10,
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

  constructor() {
    // Se ejecuta automáticamente al cargar y CADA VEZ que el input 'page()' o 'offset()' cambien.
    effect(() => {
      const currentPage = this.page();
      const currentLimit = this.offset();

      this.title.setTitle(`Pokémon - Page ${currentPage}`);
      this.loadPokemons(currentPage, currentLimit);
    });

    this.appRef.isStable.pipe(takeUntilDestroyed()).subscribe((isStable) => {});
  }

  private loadPokemons(page: number, limit: number) {
    this.pokemonsServices.loadPage(page, limit).subscribe((data) => this.pokemons.set(data));
  }

  protected handleNextClick() {
    const nextPage = this.page() + 1;
    // this.router.navigate([], {
    //   queryParams: { page: nextPage },
    //   queryParamsHandling: 'merge',
    // });
    this.router.navigate(['/pokemons/page', nextPage]);
  }

  protected handlePreviousClick() {
    const prevPage = this.page() - 1;
    if (prevPage > 0) {
      // this.router.navigate([], {
      //   queryParams: { page: prevPage },
      //   queryParamsHandling: 'merge',
      // });

      this.router.navigate(['/pokemons/page', prevPage]);
    }
  }
}

export default Pokemons;
