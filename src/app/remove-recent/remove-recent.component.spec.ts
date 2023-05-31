import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRecentComponent } from './remove-recent.component';

describe('RemoveRecentComponent', () => {
  let component: RemoveRecentComponent;
  let fixture: ComponentFixture<RemoveRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveRecentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
