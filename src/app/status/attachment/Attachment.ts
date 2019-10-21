export class Attachment {
  private src: string;
  private type: string; // image or video
  private videoType: string;

  constructor(src: string, type: string, videoType?: string) {
    this.src = src;
    this.type = type;
    this.videoType = videoType;
  }

  public getSrc() {
    return this.src;
  }

  public getType() {
    return this.type;
  }

  public getVideoType() {
    return this.videoType;
  }
}
