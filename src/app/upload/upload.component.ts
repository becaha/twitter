import {Component, OnInit, Output} from '@angular/core';
import {Attachment} from '../status/Attachment/Attachment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() attachment: Attachment;

  constructor() { }

  ngOnInit() {
  }

  public onFileUpload(event) {
    const file = event.target.files[0];
  }

  public uploadPic() {

  }

}
