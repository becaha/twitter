import { Component, OnInit } from '@angular/core';
import {Message} from './Message/Message';
import {Status} from './Status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  private dummyStatus = new Status(new Message('Today is soooo great wow'));

  constructor() { }

  ngOnInit() {
  }

}
