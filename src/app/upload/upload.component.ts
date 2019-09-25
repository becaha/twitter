import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onFileUpload(event) {
    const file = event.target.files[0];

  }

  public uploadPic() {

  }

}
