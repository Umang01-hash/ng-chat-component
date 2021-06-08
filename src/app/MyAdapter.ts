import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { Injectable } from '@angular/core';

@Injectable()
export class MyAdapter extends ChatAdapter {

    public userId!: string;
    private hubConnection: any; // this is a signalR hub connection required for creating chat rooms
    public static serverBaseUrl: string = ''; //base url of the server

    constructor(private http: HttpClient) {
        super();
    }

    ngOnInit() { }

    private initializeListeners(): void {
        this.hubConnection.on("generatedUserId", (userId: string) => {
          // With the userId set the chat will be rendered
          this.userId = userId;
        });

        this.hubConnection.on("messageReceived", (participant: IChatParticipant, message: Message) => {
          // Handle the received message to ng-chat
          console.log(message);
          this.onMessageReceived(participant, message);
        });

        this.hubConnection.on("friendsListChanged", (participantsResponse: Array<ParticipantResponse>) => {
          // Handle the received response to ng-chat
          this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.userId));
        });
      }

      joinRoom(): void {
          //check whetehr there is a hub connection and it's state is connected
      }

      listFriends(): Observable<ParticipantResponse[]> {
        // List connected users to show in the friends list

        return this.http
        .post(`${MyAdapter.serverBaseUrl}listFriends`, { currentUserId: this.userId })
        .pipe(
          map((res: any) => res),
          catchError((error: any) => Observable.throw(error.error || 'Server error'))
        );

      }

      getMessageHistory(destinataryId: any): Observable<Message[]> {
        // This could be an API call to your web application that would go to the database
        // and retrieve a N amount of history messages between the users.
        return of([]);
      }

      sendMessage(message: Message): void {

      }


}
