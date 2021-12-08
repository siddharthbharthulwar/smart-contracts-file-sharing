//import relevant libraries/functions
import React from 'react'
import { convertBytes } from './helpers'
import moment from 'moment'
import randomColor from 'randomcolor';
import { truncate } from './helpers';
import { LightenDarkenColor } from './helpers';

//defining file component with const React framework
const File = ( {file} ) => {

    //generate random good-looking color with randomColor library (installed via NPM)
    let color = randomColor();
    const color2 = LightenDarkenColor(color, -20); //darken color for visible button + text
    color = color + "30"; //lower opacity of color to make it more visible against white background

    //file-specific styles for button
    const buttonStyle = {

        backgroundColor: color2,
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

    //main component style
    const mainStyle = {
        height: "200px",
        width: "600px",
        overflow: "hidden",
        borderRadius: "15px",
        boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: color,
        marginLeft: "25px",
        textAlign: "left",
        position : "relative",
        marginBottom: "36px"
    }

    //style for left side of component
    const leftStyle = {

        width: '60%',
        zIndex : "100",
        float: 'left',
        overflow : "hidden",
        position : "absolute",
        padding: "30px 10px",
        paddingTop: '35px',
        paddingLeft : '75px'

    }

    //style for right side of component
    const rightStyle = {
        
        width: '100%',
        zIndex : "150",
        position : "absolute",
        padding: "30px 10px",
        paddingTop: '35px',
        paddingLeft : '350px',
        float: 'right'

    }

    //react.js DOM rendering return method (returns definition of component in JSX)
    return (
        <div style = {mainStyle}>
            <div style = {leftStyle}>
                <h4>Name: {truncate(file.fileName, 11)}</h4>
                <h5>{file.fileDescription}</h5>
                <h6>{file.fileType}</h6>
                <a href={"https://ipfs.infura.io/ipfs/" + file.fileHash} without rel="noopener noreferrer" target="_blank">
                    <button label="View File" style = {buttonStyle}>
                        Download File
                    </button>
                </a>
            </div>
            <div style = {rightStyle}>
                <h5>Size: {convertBytes(file.fileSize)}</h5>
                <h5>Uploaded at: {moment.unix(file.uploadTime).format('h:mm:ss')}</h5>
                <h5>Date: {moment.unix(file.uploadTime).format('MM/DD/YY')}</h5>
            </div>
        </div>
    )
}

export default File
