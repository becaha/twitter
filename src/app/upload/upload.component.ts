import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Attachment} from '../status/attachment/Attachment';
import {UserService} from '../user/user.service';
import {UploadService} from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() uploadMessage: string;
  @Output() attachment: Attachment;
  private userService: UserService;
  private changer: ChangeDetectorRef;
  private uploadService: UploadService;

  constructor(userService: UserService, changer: ChangeDetectorRef, uploadService: UploadService) {
    this.userService = userService;
    this.changer = changer;
    this.uploadService = uploadService;
  }

  ngOnInit() {
  }

  /**
   * when user uploads a file
   * @param event
   */
  async onFileUpload(event) {
    await this.uploadService.onFileUpload(event);
  }
}
