import React from "react";
import CallLogs from "../../components/CallLogs/CallLogs";
import "./Layout.css";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

class Layout extends React.Component {
  state = {
    callData: null,
    showImage: false,
  };

  componentDidMount() {
    fetch("https://staging-framework.blinkin.io/v1/calls/get-own-call-logs", {
      headers: new Headers({
        "x-token": localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ callData: res.data });
      })
      .catch((err) => console.log(err));
  }

  loadNextPage = () => {
    fetch(this.state.callData.next_page_url, {
      headers: new Headers({
        "x-token": localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({
          callData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  loadPreviousPage = () => {
    fetch(this.state.callData.prev_page_url, {
      headers: new Headers({
        "x-token": localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ callData: res.data });
      })
      .catch((err) => console.log(err));
  };

  toggleShowImage = () => {
    this.setState((prevState) => {
      return {
        showImage: !prevState.showImage,
      };
    });
  };

  render() {
    let callLogs = null;
    let prevButton = null;
    let nextButton = null;
    let multipleImages = [
      "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/vgkxbu74t9l8xsc8p7ky",
      "https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg",
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    ].map((img) => {
      return (
        <ModalBody>
          {" "}
          <img
            width="400px"
            style={{ display: "block", margin: "auto" }}
            src={img}
          />
          <ModalFooter>Here At BlinkIn</ModalFooter>
        </ModalBody>
      );
    });

    if (this.state.callData) {
      if (this.state.callData.current_page > 1) {
        prevButton = (
          <Button
            color="info"
            className="Button"
            onClick={this.loadPreviousPage}
          >
            Previous Page
          </Button>
        );
      }
      if (this.state.callData.current_page !== this.state.callData.last_page) {
        nextButton = (
          <Button color="info" className="Button" onClick={this.loadNextPage}>
            Next Page
          </Button>
        );
      }
      callLogs = (
        <div>
          <CallLogs
            content={this.state.callData}
            showImage={this.toggleShowImage}
          />
          {prevButton}
          {this.state.callData.current_page}
          {nextButton}
          <Modal isOpen={this.state.showImage} toggle={this.toggleShowImage}>
            {multipleImages}
          </Modal>
        </div>
      );
    }
    return callLogs;
  }
}

export default Layout;
