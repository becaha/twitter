import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Attachment} from './Attachment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  @Input() attachment: Attachment;
  // @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  private src;
  // 'https://www.youtube.com/embed/3CClOsC26Lw'
  private sanitizer;
  private type = 'image';

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    console.log(this.attachment);
    if (this.attachment.getSrc().includes('youtube.com')) {
      this.type = 'video';
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.attachment.getSrc());
    }
  }
}
