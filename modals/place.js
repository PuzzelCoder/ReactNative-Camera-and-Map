class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; //{lat:0.34534,long:127.2342}
    this.id = new Date().toString() + Math.random().toString();
  }
}
