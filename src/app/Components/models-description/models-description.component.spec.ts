import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDescriptionComponent } from './models-description.component';

describe('ModelsDescriptionComponent', () => {
  let component: ModelsDescriptionComponent;
  let fixture: ComponentFixture<ModelsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
