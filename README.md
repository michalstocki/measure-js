# measure-js
Measure actual performance of any part your javascript app and push data to the [InfluxDB](https://influxdata.com/time-series-platform/influxdb/) in order to [further analytics](https://influxdata.com/time-series-platform/chronograf/).

* Use convenient Typescript annotations to measure **execution time of different parts of your code**
* Measure **frame rate during specific user interactions**
* Compare **actual performance between browserss** and platform
* Watch **changes in app performance** between releases

> :warning: Note, this library is in the early concept phase and the API documentation below is only a draft and may change in the future.

## Technical background
Library uses [Performance API](https://developer.mozilla.org/pl/docs/Web/API/Performance) to save high-resolution time stamps and calculate time between them. Collected data are normalized, tagged and pushed in batches to the InfluxDB via XHR POST request. 

## Features
measure-js is able to measure execution time of a method, time needed for promise resolution or frame rate (FPS) in a specified period. measure-js provides also, rich configuration options, which can be used during initialization.

### Measuring execution time and events in application
#### Method execution time

```typescript
@measure.timeTo('draw a fractal')
private draw():void {
  // heavy drawing algorithm
}
```

:bulb: Typescript decorator is convenient and meaningful. It allows to mark a method to be measured without affecting implementation of the method.

#### Promise resolution time

```typescript
@measure.waitingTimeFor('data uncompressing')
private uncompress(data:CompressedData):Promise<UncompressedData> {
  // uncompressing logic
}
```

#### Frame rate during promise resolving

```
@measure.frameRateDuring('animation of a jump')
private animateJump():Promise<any> {
  // drawing frames
}
```

The exmaple above is a method which draws frames on a canvas using `requestAnimationFrame`. Returned promise is resolved on animation finish. Frame rate (FPS – frames per second) is measured only in time between the method call and the promise resolution. Such behaviour allows us to collect pefrormance info only whent it's necessary.
