import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebariconbuttonsComponent } from './sidebariconbuttons.component';

describe('SidebariconbuttonsComponent', () => {
  let component: SidebariconbuttonsComponent;
  let fixture: ComponentFixture<SidebariconbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebariconbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebariconbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
