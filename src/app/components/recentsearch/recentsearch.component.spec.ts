import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentsearchComponent } from './recentsearch.component';

describe('RecentsearchComponent', () => {
  let component: RecentsearchComponent;
  let fixture: ComponentFixture<RecentsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentsearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
