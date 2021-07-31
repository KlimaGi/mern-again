import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

class Time extends React.Component {
  constructor(props) {
    super(props);

    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(start, end) {
    const startTime = start._d.toISOString().split(".")[0] + "Z";
    const endTime = end._d.toISOString().split(".")[0] + "Z";
    console.log(start._d.toISOString());
    this.props.onSetTime(startTime, endTime);
  }

  render() {
    return (
      <DateRangePicker
        initialSettings={{
          startDate: moment().subtract(2, "days"),
          endDate: moment(),
        }}
        onCallback={this.handleCallback}
      >
        <button type="button" className="btn btn-outline-light mx-2 px-3">
          Select date
        </button>
      </DateRangePicker>
    );
  }
}
export default Time;
