export class Sender {

  private DB_URL:string = 'http://192.168.0.13:8086/write?db=test';

  public send():void {
    const oReq:XMLHttpRequest = new XMLHttpRequest();
    oReq.open('POST', this.DB_URL, true);
    oReq.onload = (oEvent:Event) => {
      console.log('uploaded!', oEvent);
    };

    const serializeEntries:string = this.serializeEntries();
    console.log('41: serializeEntries =>', serializeEntries);
    const blob:Blob = new Blob([serializeEntries], {type: 'text/plain'});
    oReq.send(blob);
  }

  private serializeEntries():string {
    const entries:Array<PerformanceMeasure> = performance.getEntriesByType('measure');
    entries.shift();
    return entries.map((entry:PerformanceMeasure) => this.serializeEntry(entry)).join('\n');
  }

  private serializeEntry(entry:PerformanceMeasure):string {
    const time:number = (performance.timing.navigationStart + entry.startTime) * 1000000;
    return `${entry.name},${this.getTags()} duration=${entry.duration} ${time}`;
  }

  private getTags():string {
    return `site=about_us,version=1.3.2,browser=Chrome,platform=OSX`;
  }
}
