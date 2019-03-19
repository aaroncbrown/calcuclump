import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixMathComponent } from './matrix-math.component';

describe('MatrixMathComponent', () => {
  let component: MatrixMathComponent;
  let fixture: ComponentFixture<MatrixMathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixMathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
