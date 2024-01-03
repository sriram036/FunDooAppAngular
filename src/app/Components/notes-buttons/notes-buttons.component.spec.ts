import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesButtonsComponent } from './notes-buttons.component';

describe('NotesButtonsComponent', () => {
  let component: NotesButtonsComponent;
  let fixture: ComponentFixture<NotesButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
