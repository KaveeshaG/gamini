import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';
import { SpeechService } from 'src/app/services/speech.service';

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
export class GaminiPrompterComponent implements OnInit, OnDestroy {
 @ViewChild('chatContainer')
 private chatContainer!: ElementRef;

  messages: Message[] = [];
  currentTranscript = '';
  isListening = false;
  showRipple = false;
  isProcessing = false;

  constructor(
    private speechService: SpeechService,
    private geminiService: GeminiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.speechService.transcript.subscribe(async (transcript) => {
      this.currentTranscript = transcript;
      this.isProcessing = true;
      this.cdr.detectChanges();

      this.addMessage(transcript, 'user');

      try {
        const response = await this.geminiService.generateResponse(transcript);
        this.addMessage(response, 'assistant');
      } catch (error) {
        console.error('Error getting prompt: ', error);
        this.addMessage('Sorry, there was a problem in gamainis mind', 'assistant');
      } finally {
        this.isListening = false;
        this.showRipple = false;
        this.isProcessing = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isListening) {
      this.stopListening();
    }
  }

  private addMessage(content: string, type: 'user' | 'assistant') {
    this.messages.push({
      content,
      type,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private startListening() {
    this.speechService.startListening();
    this.isListening = true;
    this.showRipple = true;
  }

  private stopListening() {
    this.speechService.stopListening();
    this.isListening = false;
    this.showRipple = false;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        const element = this.chatContainer.nativeElement;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error scrolling to bottom:', error);
      }
    }, 100);
  }

  public onTouchStart(event: TouchEvent | MouseEvent) {
    event.preventDefault();
    this.startListening();
  }

  public onTouchEnd(event: TouchEvent | MouseEvent) {
    event.preventDefault();
    this.stopListening();
  }

  public getTimeString(date: Date): string {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}
