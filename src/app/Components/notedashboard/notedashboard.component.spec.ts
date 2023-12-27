import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedashboardComponent } from './notedashboard.component';

describe('NotedashboardComponent', () => {
  let component: NotedashboardComponent;
  let fixture: ComponentFixture<NotedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
