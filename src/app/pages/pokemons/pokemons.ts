import {
  ApplicationRef,
  Component,
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
import { ActivatedRoute } from '@angular/router';

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
export class Pokemons implements OnInit {
  private readonly pokemonsServices = inject(PokemonsServices);
  // private readonly route = inject(ActivatedRoute);

  readonly pokemons = signal<SimplePokemon[]>([]);

  readonly id = input(1, { transform: toNumberOrDefault });
  readonly offset = input(10, { transform: toNumberOrDefault });

  private readonly appRef = inject(ApplicationRef);

  private readonly platformId = inject(PLATFORM_ID);

  protected readonly hasData = signal(false);

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

  protected readonly paginationConfig: PaginationConfig = {
    currentPage: 1,
    totalPages: 10,
    helperText: 'Pokemon preview',
  };

  constructor() {
    this.appRef.isStable.pipe(takeUntilDestroyed()).subscribe((isStable) => {
      console.log('¿Aplicación estable?:', isStable);
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPokemons(1);
      setTimeout(() => {
        this.hasData.set(true);
      }, 6500);
    }
  }

  loadPokemons(page: number, nextPage: number = 20) {
    this.pokemonsServices.loadPage(page, nextPage).subscribe(this.pokemons.set);
  }
}

export default Pokemons;
