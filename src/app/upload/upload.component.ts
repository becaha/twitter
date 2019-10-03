import {Component, Input, OnInit, Output} from '@angular/core';
import {Attachment} from '../status/attachment/Attachment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() uploadMessage: string;
  @Output() attachment: Attachment;

  constructor() {
  }

  ngOnInit() {
  }

  public onFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    // saveAs(file, file);
  }

  public uploadPic() {

  }

}
