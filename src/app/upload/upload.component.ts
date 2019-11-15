import {Component, Input, OnInit, Output} from '@angular/core';
import {Attachment} from '../status/attachment/Attachment';
import {fromEvent, Observable} from 'rxjs';
import { pluck } from 'rxjs/operators';
import {ProxyService} from '../proxy.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() uploadMessage: string;
  @Output() attachment: Attachment;
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
  }

  /**
   * when user uploads a file
   * @param event
   */
  async onFileUpload(event) {
    console.log('on file upload');
    // const file = event.target.files[0];
    // console.log(file);
    if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      const imageToUpload = event.target.files.item(0);
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          // do something with base64 image..
          console.log('base64 image', base64image);
          this.userService.updateProfile(base64image);
        });
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  public uploadPic() {

  }

}
