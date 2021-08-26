import { useState } from "react";
import axios from "axios";
const { REACT_APP_ENV } = process.env;
const API_URL =
  REACT_APP_ENV === "PRODUCTION"
    ? "http://hoursapi.mausv.com/hours"
    : "http://localhost:5000/hours";

function App() {
  const [hours, setHours] = useState([]);
  const [times, setTimes] = useState([]);
  const [resBillable, setResBillable] = useState({
    billableHours: 0,
    billableMinutes: 0,
  });
  const [resHours, setResHours] = useState({ hours: 0, minutes: 0 });
  const [resBillableTime, setResBillableTime] = useState({
    billableHoursTime: 0,
    billableMinutesTime: 0,
  });
  const [resHoursTime, setResHoursTime] = useState({
    hoursTime: 0,
    minutesTime: 0,
  });

  const addHour = () => {
    setHours([...hours, ["", "", false, ""]]);
  };

  const removeHour = (idx) => {
    setHours(hours.filter((hour, hourIdx) => hourIdx !== idx));
  };

  const addTime = () => {
    setTimes([...times, ["", false]]);
  };

  const removeTime = (idx) => {
    setTimes(times.filter((time, timeIdx) => timeIdx !== idx));
  };

  const setHour = (idx, timeIdx, newTime) => {
    let tempHours = [...hours];
    let time = tempHours[idx];
    time[timeIdx] = newTime;
    tempHours[idx] = time;
    setHours(tempHours);
  };

  const setTime = (idx, timeIdx, newTime) => {
    let tempTimes = [...times];
    let time = tempTimes[idx];
    time[timeIdx] = newTime;
    tempTimes[idx] = time;
    setTimes(tempTimes);
  };

  const setBillable = (idx, timeIdx) => {
    let tempHours = [...hours];
    let time = tempHours[idx];
    time[timeIdx] = !time[timeIdx];
    tempHours[idx] = time;
    setHours(tempHours);
  };

  const setBillableTime = (idx, timeIdx) => {
    let tempTimes = [...times];
    let time = tempTimes[idx];
    time[timeIdx] = !time[timeIdx];
    tempTimes[idx] = time;
    setTimes(tempTimes);
  };

  const calculate = () => {
    const tempHours = hours.map((hour) => ({
      time: [hour[0], hour[1]],
      billable: hour[2],
    }));
    axios.post(API_URL, { hours: tempHours }).then((res) => {
      console.log("Result", res.data.data);
      const results = res.data.data;
      setResBillable({
        billableHours: results.billable.hours,
        billableMinutes: results.billable.minutes,
      });
      setResHours({
        hours: results.hours.hours,
        minutes: results.hours.minutes,
      });
      var tempHours = hours.map((hour, idx) => {
        var tempHour = [...hour];
        var curRes = results.time_windows[idx];
        tempHour[3] = `${curRes.hours}h ${curRes.minutes}m`;
        return tempHour;
      });
      setHours(tempHours);
    });
  };

  const calculateTime = () => {
    const tempHours = times.map((time) => ({
      time: ["00:00", time[0]],
      billable: time[1],
    }));
    console.log("Temp Hours", tempHours);
    axios.post(API_URL, { hours: tempHours }).then((res) => {
      console.log("Result", res.data.data);
      const results = res.data.data;
      setResBillableTime({
        billableHoursTime: results.billable.hours,
        billableMinutesTime: results.billable.minutes,
      });
      setResHoursTime({
        hoursTime: results.hours.hours,
        minutesTime: results.hours.minutes,
      });
    });
  };

  return (
    <div className="container">
      <h1>Time Windows</h1>
      <div className="table-responsive">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "center" }}>Time</th>
              <th></th>
              <th style={{ textAlign: "center" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, idx) => (
              <tr key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeHour(idx)}
                  >
                    -
                  </button>
                </td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    minWidth: 200,
                  }}
                >
                  <input
                    style={{ fontStyle: hour[0] ? "normal" : "italic" }}
                    type="time"
                    className="form-control"
                    placeholder="11:00"
                    aria-label="Starting Time"
                    onChange={(e) => setHour(idx, 0, e.target.value)}
                    value={hour[0]}
                  />
                  <span className="input-group-text">–</span>
                  <input
                    style={{ fontStyle: hour[1] ? "normal" : "italic" }}
                    type="time"
                    className="form-control"
                    placeholder="14:35"
                    aria-label="Ending Time"
                    onChange={(e) => setHour(idx, 1, e.target.value)}
                    value={hour[1]}
                  />
                </td>
                <td>
                  <div
                    style={{
                      margin: 2,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: hour[2] ? "#0d6efd" : "grey",
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    <input
                      style={{ marginRight: 10 }}
                      id={"billable-" + idx}
                      type="checkbox"
                      checked={hour[2]}
                      onChange={(e) => setBillable(idx, 2)}
                    />
                    <label
                      style={{ color: "white" }}
                      htmlFor={"billable-" + idx}
                    >
                      Billable
                    </label>
                  </div>
                </td>
                <td style={{ textAlign: "center", minWidth: 70 }}>{hour[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: 10 }}>
        <button className="btn btn-success" onClick={addHour}>
          +
        </button>
      </div>
      <div>
        <button className="btn btn-primary" onClick={calculate}>
          Calculate
        </button>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Billable</th>
            <td>{`${resBillable.billableHours}h ${resBillable.billableMinutes}m`}</td>
          </tr>
          <tr>
            <th scope="row">Non-billable</th>
            <td>{`${resHours.hours}h ${resHours.minutes}m`}</td>
          </tr>
        </tbody>
      </table>
      <h1>Time Calculator</h1>
      <div>
        {times.map((time, idx) => (
          <div
            key={idx}
            className="row"
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <div className="col">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeTime(idx)}
              >
                -
              </button>
            </div>
            <div
              className="col-6"
              style={{ display: "flex", flexDirection: "row", minWidth: 200 }}
            >
              <input
                style={{ fontStyle: time[0] ? "normal" : "italic" }}
                maxLength={5}
                className="form-control"
                placeholder="5:40"
                aria-label="Starting Time"
                onChange={(e) => setTime(idx, 0, e.target.value)}
                value={time[0]}
              />
            </div>
            <div
              className="col"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: time[1] ? "#0d6efd" : "grey",
                borderRadius: 5,
                paddingRight: -10,
                marginRight: 10,
              }}
            >
              <input
                style={{ marginRight: 10 }}
                id={"billable-time-" + idx}
                type="checkbox"
                checked={time[1]}
                onChange={(e) => setBillableTime(idx, 1)}
              />
              <label
                style={{ color: "white" }}
                htmlFor={"billable-time-" + idx}
              >
                Billable
              </label>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 10 }}>
        <button className="btn btn-success" onClick={addTime}>
          +
        </button>
      </div>
      <div>
        <button className="btn btn-primary" onClick={calculateTime}>
          Calculate
        </button>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Billable</th>
            <td>{`${resBillableTime.billableHoursTime}h ${resBillableTime.billableMinutesTime}m`}</td>
          </tr>
          <tr>
            <th scope="row">Non-billable</th>
            <td>{`${resHoursTime.hoursTime}h ${resHoursTime.minutesTime}m`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
