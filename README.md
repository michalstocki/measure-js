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
@measure.durationOf('drawing a fractal')
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

The exmaple above is a method which draws frames on a canvas using `requestAnimationFrame`. Returned promise is resolved on animation finish. Frame rate (FPS – frames per second) is measured only in time between the method call and the promise resolution. Such behaviour allows to collect pefrormance info only when it's necessary.

#### Custom frame rate meter
Start and stop frame rate measurement whenever you want:

```typescript
draggable.addEventListener('mousedown', () =>
  measure.frameRateStart('dragging an object');
});

draggable.addEventListener('mousemove', () =>
  // moving an object
});

draggable.addEventListener('mouseup', () => {
  measure.frameRateStop('dragging an object');
});
```

#### Time from a marker

You can mark some event on a timeline and then use `measure.timeFrom()` method to measure duration between the marker and the current time:
```typescript
measure.mark('wav encoding start');

// time-consuming operation

measure.timeFrom('wav encoding start', {as: 'wav encoding time'});
```

#### Time between markers

You can also put several markers on a timeline and measure time elapsed between them.

```typescript
private encodeWave():void {
  measure.mark('wav encoding start');
  // encoding logic
  measure.mark('wav encoding end');
  measure.timeBetween('wav encoding start', 'wav encoding end', {as: 'wav encoding'});
}
```
Note: The example above can be written in a shorhand form of a decorator:

```typescript
@measure.durationOf('wav encoding')
private encodeWave():void {
  // encoding logic
}
```

As `measure.timeBetween()` is a wrapper for [`performance.measure()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure), you can use one of predefined markers instead:

```typescript
measure.timeBetween(PerformanceTiming.navigationStart,
  PerformanceTiming.responseStart, {as: 'time to first byte'})
```
See [`PerformanceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) for list of all available predefined markers.
