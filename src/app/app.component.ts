import { Component } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { HttpClient } from '@angular/common/http';
import { DemoAdapter } from './MyAdapter';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){

  }

  userId: string = "demo-data";
  currentTheme = 'dark-theme';
  username!: string;

  adapter: ChatAdapter = new DemoAdapter();


  onEventTriggered(event: string): void {
   console.log(event);
  }

  public messageSeen(event: any)
  {
    console.log(event);
  }

}
