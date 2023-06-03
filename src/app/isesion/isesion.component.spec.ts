import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsesionComponent } from './isesion.component';

describe('IsesionComponent', () => {
  let component: IsesionComponent;
  let fixture: ComponentFixture<IsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
