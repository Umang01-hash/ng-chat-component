import { Component } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { HttpClient } from '@angular/common/http';
import { MyAdapter } from './MyAdapter';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-component';
  fileUploadUrl: string = `${MyAdapter.serverBaseUrl}UploadFile`;



  constructor(private http: HttpClient){

  }

  userId: string = '999';
  username!: string ;

  public adapter: ChatAdapter = new MyAdapter(this.http);


}
