import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../../../services/chatService/chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName: string;
  message: string;
  output: any[] = [];
  feedback: string;
  user: string;
  constructor(private webSocketService: ChatService) { }


  ngOnInit(): void {
    this.webSocketService.currentMessage.subscribe(message => this.user=message);
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
  }

  sendMessage() {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.user
    });
    this.message = "";  
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

}


