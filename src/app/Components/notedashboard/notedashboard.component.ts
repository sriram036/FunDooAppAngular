import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notedashboard',
  templateUrl: './notedashboard.component.html',
  styleUrls: ['./notedashboard.component.scss']
})
export class NotedashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;

}
