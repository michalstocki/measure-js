import {Sender} from './sending/Sender';

export class Measure {

  constructor(private sender:Sender) {
  }

  public durationOf(task:string):(target:Object, propertyKey:string,
                                  descriptor:TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any> {
    return (target:Object, propertyKey:string,
            descriptor:TypedPropertyDescriptor<any>):TypedPropertyDescriptor<any> => {

      const originalMethod:Function = descriptor.value;
      descriptor.value = function (...args:any[]):any {
        performance.mark(`${task} start`);
        var result:any = originalMethod.apply(this, args);
        performance.measure(task, `${task} start`);
        performance.clearMarks(`${task} start`);
        return result;
      };

      return descriptor;
    };
  }

  public send():void {
    this.sender.send();
    performance.clearMeasures();
  }
}
