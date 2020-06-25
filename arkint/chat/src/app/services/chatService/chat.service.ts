import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import { Observable } from 'rxjs/internal/Observable';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   private url = 'http://localhost:3000';
//   private socket;
//   private messageSource = new BehaviorSubject('');
//   currentMessage = this.messageSource.asObservable();

//   constructor() {
//     this.socket = io(this.url);
//   }

//   changeMessage(message: string) {
//     this.messageSource.next(message)
//   }

//   public sendMessage(message) {
//     this.socket.emit('new-message', message);
//   }


//   public getMessages = () => {
//     return Observable.create((observer) => {
//       this.socket.on('new-message', (message) => {
//         observer.next(message);
//       });
//     });
//   }

// }

@Injectable()
export class ChatService {
  socket: io.SocketIOClient.Socket;
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.socket = io.connect('http://localhost:3000');
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }

  changeMessage(message: string) {
        this.messageSource.next(message)
      }
}


