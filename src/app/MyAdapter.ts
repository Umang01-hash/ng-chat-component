// import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant } from 'ng-chat';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

// import * as signalR from "@aspnet/signalr";
// import { Injectable } from '@angular/core';

// @Injectable()
// export class MyAdapter extends ChatAdapter {

//     public userId!: string;
//     private hubConnection: any; // this is a signalR hub connection required for creating chat rooms
//     public static serverBaseUrl: string = ''; //base url of the server

//     constructor(private http: HttpClient) {
//         super();
//     }

//     ngOnInit() { }

//     private initializeListeners(): void {
//         this.hubConnection.on("generatedUserId", (userId: string) => {
//           // With the userId set the chat will be rendered
//           this.userId = userId;
//         });

//         this.hubConnection.on("messageReceived", (participant: IChatParticipant, message: Message) => {
//           // Handle the received message to ng-chat
//           console.log(message);
//           this.onMessageReceived(participant, message);
//         });

//         this.hubConnection.on("friendsListChanged", (participantsResponse: Array<ParticipantResponse>) => {
//           // Handle the received response to ng-chat
//           this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.userId));
//         });
//       }

//       joinRoom(): void {
//           //check whetehr there is a hub connection and it's state is connected
//       }

//       listFriends(): Observable<ParticipantResponse[]> {
//         // List connected users to show in the friends list

//         return this.http
//         .post(`${MyAdapter.serverBaseUrl}listFriends`, { currentUserId: this.userId })
//         .pipe(
//           map((res: any) => res),
//           catchError((error: any) => Observable.throw(error.error || 'Server error'))
//         );

//       }

//       getMessageHistory(destinataryId: any): Observable<Message[]> {
//         // This could be an API call to your web application that would go to the database
//         // and retrieve a N amount of history messages between the users.
//         return of([]);
//       }

//       sendMessage(message: Message): void {

//       }


// }


//
import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";

export class DemoAdapter extends ChatAdapter implements IChatGroupAdapter {
  public static mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: 1,
      displayName: "Umang Mundhra",
      avatar: "https://cliparting.com/wp-content/uploads/2016/10/Small-person-clipart-kid.png",
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 2,
      displayName: "Nitesh Sir",
      avatar: null,
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 3,
      displayName: "Gaurav Sir",
      avatar: "https://media-exp1.licdn.com/dms/image/C4E0BAQHT8cakn2YmbA/company-logo_200_200/0/1579701212165?e=2159024400&v=beta&t=fborGhPjFaEtQnHWSU5T1twEbU7CxwMTp0z5Ckyqbow",
      status: ChatParticipantStatus.Busy
    },
    {
      participantType: ChatParticipantType.User,
      id: 4,
      displayName: "Siddharth Raj",
      avatar: "https://pbs.twimg.com/profile_images/600707945911844864/MNogF757_400x400.jpg",
      status: ChatParticipantStatus.Offline
    },
    {
      participantType: ChatParticipantType.User,
      id: 5,
      displayName: "Anushka",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Anushka_Sharma_promoting_Zero.jpg",
      status: ChatParticipantStatus.Offline
    },
    {
      participantType: ChatParticipantType.User,
      id: 6,
      displayName: "Madhav Sachdeva",
      avatar: "https://pbs.twimg.com/profile_images/378800000243930208/4fa8efadb63777ead29046d822606a57.jpeg",
      status: ChatParticipantStatus.Busy
    },
    ];

  listFriends(): Observable<ParticipantResponse[]> {
    return of(DemoAdapter.mockedParticipants.map(user => {
      let participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      participantResponse.metadata = {
        totalUnreadMessages: Math.floor(Math.random() * 10)
      }

      return participantResponse;
    }));
  }

  getMessageHistory(destinataryId: any): Observable<Message[]> {
    let mockedHistory: Array<Message>;

    mockedHistory = [
      {
        fromId: 1,
        toId: 999,
        message: "Hi there, just type any message bellow to test this Angular module.",
        dateSent: new Date()
      }
    ];

    return of(mockedHistory).pipe(delay(1000));
  }

  sendMessage(message: Message): void {
    setTimeout(() => {
      let replyMessage = new Message();

      replyMessage.message = "You have typed '" + message.message + "'";
      replyMessage.dateSent = new Date();

      if (isNaN(message.toId)) {
        let group = DemoAdapter.mockedParticipants.find(x => x.id == message.toId) as Group;

        // Message to a group. Pick up any participant for this
        let randomParticipantIndex = Math.floor(Math.random() * group.chattingTo.length);
        replyMessage.fromId = group.chattingTo[randomParticipantIndex].id;

        replyMessage.toId = message.toId;

        this.onMessageReceived(group, replyMessage);
      }
      else {
        replyMessage.fromId = message.toId;
        replyMessage.toId = message.fromId;

         let user : IChatParticipant = DemoAdapter.mockedParticipants.find(x => x.id == replyMessage.fromId)!;

        this.onMessageReceived(user, replyMessage);
      }
    }, 1000);
  }

  groupCreated(group: Group): void {
    DemoAdapter.mockedParticipants.push(group);

    DemoAdapter.mockedParticipants = DemoAdapter.mockedParticipants.sort((first, second) =>
      second.displayName > first.displayName ? -1 : 1
    );

    // Trigger update of friends list
    this.listFriends().subscribe(response => {
      this.onFriendsListChanged(response);
    });
  }
}