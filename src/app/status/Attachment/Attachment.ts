export class Attachment {
  private src: string;
  constructor(src: string) {
    this.src = src;
  }

  public getSrc() {
    return this.src;
  }
}
