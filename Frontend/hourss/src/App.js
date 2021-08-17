import { useState } from "react";
import axios from "axios";

function App() {
  const [hours, setHours] = useState([]);
  const [resBillable, setResBillable] = useState({
    billableHours: 0,
    billableMinutes: 0,
  });
  const [resHours, setResHours] = useState({ hours: 0, minutes: 0 });

  const addHour = () => {
    setHours([...hours, ["", "", false]]);
  };

  const removeHour = (idx) => {
    setHours(hours.filter((hour, hourIdx) => hourIdx !== idx));
  };

  const setTime = (idx, timeIdx, newTime) => {
    let tempHours = [...hours];
    let time = tempHours[idx];
    time[timeIdx] = newTime;
    tempHours[idx] = time;
    setHours(tempHours);
  };

  const setBillable = (idx, timeIdx) => {
    let tempHours = [...hours];
    let time = tempHours[idx];
    time[timeIdx] = !time[timeIdx];
    tempHours[idx] = time;
    setHours(tempHours);
  };

  const calculate = () => {
    const tempHours = hours.map((hour) => ({
      time: [hour[0], hour[1]],
      billable: hour[2],
    }));
    axios
      .post("http://hoursapi.mausv.com/hours", { hours: tempHours })
      .then((res) => {
        console.log("Result", res.data.data);
        const results = res.data.data;
        setResBillable({
          billableHours: results.billable.billable_hours,
          billableMinutes: results.billable.billable_minutes,
        });
        setResHours({
          hours: results.hours.hours,
          minutes: results.hours.minutes,
        });
      });
  };

  return (
    <div>
      <div>
        {hours.map((hour, idx) => (
          <div key={idx}>
            <button onClick={() => removeHour(idx)}>-</button>
            -
            <input
              onChange={(e) => setTime(idx, 0, e.target.value)}
              value={hour[0]}
            />
            -
            <input
              onChange={(e) => setTime(idx, 1, e.target.value)}
              value={hour[1]}
            />
            -
            <input
              id={"billable-" + idx}
              type="checkbox"
              checked={hour[2]}
              onChange={(e) => setBillable(idx, 2)}
            />
            <label htmlFor={"billable-" + idx}>Billable?</label>
          </div>
        ))}
      </div>
      <div>
        <button onClick={addHour}>+</button>
      </div>
      <button onClick={calculate}>Calculate</button>
      <div>
        Billable:{" "}
        {`${resBillable.billableHours}h ${resBillable.billableMinutes}m`}
      </div>
      <div>Non-billable: {`${resHours.hours}h ${resHours.minutes}m`}</div>
    </div>
  );
}

export default App;
