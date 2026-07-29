import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPerfil } from './dev-perfil';

describe('DevPerfil', () => {
  let component: DevPerfil;
  let fixture: ComponentFixture<DevPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(DevPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
