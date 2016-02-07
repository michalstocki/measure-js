# measure-js
Measure actual performance of any part your javascript app and push data to the [InfluxDB](https://influxdata.com/time-series-platform/influxdb/) in order to [further analytics](https://influxdata.com/time-series-platform/chronograf/).

* Use convenient Typescript annotations to measure **execution time of different parts of your code**
* Measure **frame rate during specific user interactions**
* Compare **actual performance between browserss** and platform
* Watch **changes in app performance** between releases

> :warning: Note, this library is in the early concept phase and the API documentation below is only a draft and may change in the future.

## Technical background
Library uses [Performance API](https://developer.mozilla.org/pl/docs/Web/API/Performance) to save high-resolution time stamps and calculate time between them. Collected data are normalized, tagged and pushed in batches to the InfluxDB via XHR POST request. 
