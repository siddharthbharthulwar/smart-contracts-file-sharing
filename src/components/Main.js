import React, { Component } from 'react';

//style for main container for file submission system
const mainStyle = {
  height: "250px",
  width: "600px",
  overflow: "hidden",
  borderRadius: "15px",
  boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  backgroundColor: "grey",
  marginLeft: "25px",
  textAlign: "left",
  position : "relative",
  marginBottom: "36px",
  padding: "20px"
}

//style for submission button
const buttonStyle = {

  backgroundColor: "black",
  border: "none",
  color: "white",
  padding: "10px",
  textAlign : "center",
  textDecoration : "none",
  display: "inline-block",
  fontSize : "16px",
  margin : "4px 2px",
  cursor: "pointer",
  borderRadius: "8px",
  marginBottom : "20px"
}

//defining main react component as class
class Main extends Component {

  //render method
  render() {
    return (

        <div style = {mainStyle}>
          <form onSubmit = {(event) => {
            event.preventDefault();
            const description = this.fileDescription.value;
            this.props.uploadFile(description);
          }}>
            <h1 style = {{color: "white"}}>Share File</h1>
            <textarea
              id = "fileDescription"
              type = "text"
              ref={(input) => { this.fileDescription = input }}
              className = "form-control"
              placeholder = "description..."
              required
            />
            <input type="file" onChange={this.props.captureFile} className="text-white" />
            <button type = "submit" style = {buttonStyle}>Submit</button>
          </form>
        </div>

    );
  }
}

export default Main;