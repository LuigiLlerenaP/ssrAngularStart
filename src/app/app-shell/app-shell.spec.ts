import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppShell } from './app-shell';

describe('AppShell', () => {
  let component: AppShell;
  let fixture: ComponentFixture<AppShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
    }).compileComponents();

    fixture = TestBed.createComponent(AppShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main application shell structure', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-navbar')).not.toBeNull();
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });
});
