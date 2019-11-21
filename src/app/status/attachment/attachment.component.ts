import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Attachment} from './Attachment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  @Input() attachment: Attachment;
  @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  private src = 'https://www.youtube.com/embed/3CClOsC26Lw';
  private type = 'video/mp4';

  constructor() {
  }

  ngOnInit() {
    console.log(this.attachment);
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
}
