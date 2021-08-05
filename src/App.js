import React, { useState, useEffect } from "react";
import { of, interval, concat, Subject } from "rxjs";
import {
  takeWhile,
  takeUntil,
  scan,
  startWith,
  repeatWhen,
  share,
} from "rxjs/operators";

const observable = interval(250).pipe(
  startWith(5),
  scan(time=>time - 1),
  takeWhile(time=> time > 0)
);

const result = concat(observable,of('Wake Up!'));
const action = new Subject();
action.subscribe(console.log('Hello World'));

export const App = () => {
  const [state, setstate] = useState();
  useEffect(() => {
    const listener = result.subscribe(setstate);
    return ()=> listener.unsubscribe();
  }, []);
  return (
    <div>
      <h1>Alarm Clock </h1>
      <h1>{state} </h1>
      <button onClick={()=>{action.next('snooze')}}>Snooze</button>
    </div>
  );
};

export default App;
