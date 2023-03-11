import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){}

  title = 'AngularProject';
  base_url = window.location.protocol+'//'+window.location.host;
}
