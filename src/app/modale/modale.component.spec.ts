import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleComponent } from './modale.component';

describe('ModaleComponent', () => {
  let component: ModaleComponent;
  let fixture: ComponentFixture<ModaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaleComponent]
    });
    fixture = TestBed.createComponent(ModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
