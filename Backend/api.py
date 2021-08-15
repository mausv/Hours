from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True

# { hours: [
#   {"time": ["10:00", "11:30"], "billable": true},
#   {"time": ["11:30", "12:30"], "billable": false},
#   {"time": ["12:30", "14:00"], "billable": true}
# ] }
@app.route('/hours', methods=['POST'])
def hours():
    _hours = request.json['hours']
    total_billable_hours, total_billable_minutes, total_hours, total_minutes = _calculate_hours(_hours)
    return jsonify({
        'data': {
            "billable": {
                "billable_hours": total_billable_hours,
                "billable_minutes": total_billable_minutes
            },
            "hours": {
                "hours": total_hours,
                "minutes": total_minutes
            }
        },
    }), 200

def _calculate_hours(input_hours):
    billable_hours, hours = 0, 0
    billable_minutes, minutes = 0, 0

    input_in_minutes = _time_to_minutes(input_hours)
    billable_time_in_minutes, time_in_minutes = _calculate_time_in_minutes(input_in_minutes)

    hours = time_in_minutes // 60
    minutes = time_in_minutes % 60
    billable_hours = billable_time_in_minutes // 60
    billable_minutes = billable_time_in_minutes % 60

    return billable_hours, billable_minutes, hours, minutes

def _time_to_minutes(hours):
    minutes = list(map(lambda h: [_times_to_minutes_helper(h["time"][0]), _times_to_minutes_helper(h["time"][1]), h["billable"]], hours))
    return minutes

def _times_to_minutes_helper(time):
    hours, minutes = time.split(":")
    hours_to_mins = int(hours) * 60
    new_time = hours_to_mins + int(minutes)
    return new_time

def _calculate_time_in_minutes(minutes):
    time = 0
    billable_time = 0
    for starting, ending, billable in minutes:
        c_time = ending - starting
        if billable:
            billable_time += c_time
        else:
            time += c_time
    return billable_time, time
