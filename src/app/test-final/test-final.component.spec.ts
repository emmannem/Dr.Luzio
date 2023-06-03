import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFinalComponent } from './test-final.component';

describe('TestFinalComponent', () => {
  let component: TestFinalComponent;
  let fixture: ComponentFixture<TestFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
