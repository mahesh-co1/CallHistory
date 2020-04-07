import React from "react";
import CallLog from "./CallLog/CallLog";
import "./CallLogs.css";
import { Table } from "reactstrap";

const callLogs = (props) => {
  console.log(props.content);
  const tableRows = props.content.data.map((cont) => {
    return <CallLog {...cont} showImage={props.showImage} />;
  });

  return (
    <Table style={{ width: 1000, margin: "auto" }}>
      <thead className="calllogs__thead">
        <tr>
          <th>Room ID </th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>To</th>
          {/* <th>Create At</th>
          <th>Updated At</th> */}
          <th>Files</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
};

export default callLogs;
