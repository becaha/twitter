import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from './Attachment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  @Input() attachment: Attachment;

  constructor() {
  }

  ngOnInit() {
    console.log(this.attachment);
  }
}
