import { Component, EventEmitter, OnInit, Output , QueryList } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { HttpClient } from '@angular/common/http';
import { DemoAdapter } from './MyAdapter';
import { Message , Window , IChatParticipant  } from "ng-chat";
import{NgChatWindowComponent } from 'node_modules/ng-chat/ng-chat/components/ng-chat-window/ng-chat-window.component'
import { Input } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ScrollDirection } from "./scroll-direction.enum";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient ){

  }

  ngOnInit(){

  }

      // Defines the size of each opened window to calculate how many windows can be opened on the viewport at the same time.
      public windowSizeFactor: number = 320;

      // Total width size of the friends list section
      public friendsListWidth: number = 262;

      // Available area to render the plugin
      private viewPortTotalArea!: number;

  userId: string = "demo-data";
  currentTheme = 'dark-theme';
  username!: string;

  adapter: ChatAdapter = new DemoAdapter();

  msg1= "The message has been added to nitesh";
  msg2= "The message has been added to gaurav";
  msg3= "The message has been added to all";
  windows: Window[] = [];
  public participants!: IChatParticipant[];

  @Input()
  public window!: Window;

  @Output()
    public onMessageSent: EventEmitter<Message> = new EventEmitter();

    @Input()
    public hideFriendsList: boolean = false;


    @Output()
    public onMessagesSeen: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    @ViewChildren('chatWindow') chatWindows!: QueryList<NgChatWindowComponent>;


  onEventTriggered(event: string): void {
   console.log(event);
  }

  public messageSeen(event: any)
  {
    console.log(event);
  }



  public MessageToNitesh( window: Window) : void {

    let message = new Message();
    message.fromId=this.userId;
    message.toId=window.participant.id;
    message.message=this.msg1;
    message.dateSent= new Date();

    window.messages.push(message);

    this.onMessageSent.emit(message);}

  public MessageToGaurav( window: Window) : void {
    let message = new Message();
    message.fromId=this.userId;
    message.toId=window.participant.id;
    message.message=this.msg1;
    message.dateSent= new Date();

    window.messages.push(message);

    this.onMessageSent.emit(message);

  }


  // public getHistory(window : Window){
  //   this.adapter.getMessageHistory(window.participant.id)
  //           .pipe(
  //               map((result: Message[]) => {
  //                   result.forEach((message) => message );

  //                   window.messages = result.concat(window.messages);
  //                   window.isLoadingHistory = false;

  //                   setTimeout(() => this.onFetchMessageHistoryLoaded(result, window,"Bottom"));
  //               })
  //           ).subscribe();
  // }

  // private onFetchMessageHistoryLoaded(messages: Message[], window: Window, direction: "Top", forceMarkMessagesAsSeen: boolean = false): void
  // {
  //     this.scrollChatWindow(window, direction)

  //     if (window.hasFocus || forceMarkMessagesAsSeen)
  //     {
  //         const unseenMessages = messages.filter(m => !m.dateSeen);

  //         this.markMessagesAsRead(unseenMessages);
  //     }
  // }

  // markMessagesAsRead(messages: Message[]): void
  // {
  //     const currentDate = new Date();

  //     messages.forEach((msg)=>{
  //         msg.dateSeen = currentDate;
  //     });

  //     this.onMessagesSeen.emit(messages);
  // }



  private scrollChatWindow(window: Window, direction: ScrollDirection): void
  {
      const chatWindow = this.getChatWindowComponentInstance(window);

      if (chatWindow){
          chatWindow.scrollChatWindow(window, direction);
      }
  }

  private getChatWindowComponentInstance(targetWindow: Window): NgChatWindowComponent | null {
    const windowIndex = this.windows.indexOf(targetWindow);

    if (this.chatWindows){
        let targetWindow = this.chatWindows.toArray()[windowIndex];

        return targetWindow;
    }

    return null;
}




}
