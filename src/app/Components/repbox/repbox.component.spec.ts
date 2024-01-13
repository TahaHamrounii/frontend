import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepboxComponent } from './repbox.component';

describe('RepboxComponent', () => {
  let component: RepboxComponent;
  let fixture: ComponentFixture<RepboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
