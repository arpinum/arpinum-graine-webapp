import {Component} from 'angular2/core';

@Component({
  selector: 'app',
  template: '<h1>{{message}}<h1>'
})
export class AppComponent {
  constructor() {
    this.message = "coucou";
  }
}
