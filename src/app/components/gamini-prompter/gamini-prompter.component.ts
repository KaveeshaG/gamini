import { Component, OnInit } from '@angular/core';

interface Message {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

@Component({
    selector: 'app-gamini-prompter',
    templateUrl: './gamini-prompter.component.html',
    styleUrls: ['./gamini-prompter.component.scss'],
    standalone: false
})
export class GaminiPrompterComponent implements OnInit{

  messages: Message[] = [];
  currentTranscript = '';
  isListening = false;
  showRipple = false;
  isProcessing = false;

  ngOnInit(): void { }


  public getTimeString(date: Date): string {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  }

}
