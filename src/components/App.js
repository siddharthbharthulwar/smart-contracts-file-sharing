//all the required imports for the React file
import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import FileView from './FileView';
import Web3 from 'web3';
import './App.css';

//importing IPFS for storing files
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

//defining App class (custom React component) that extends the React component class
class App extends Component {

  //async function that executes when component mounts
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //load required web 3.0 library dependencies (loading MetaMask for Ether wallet)
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. You should consider using MetaMask!");
    }
  }

  //loading proper blockchain data from MetaMask Ether wallet
  async loadBlockchainData() {
    const web3 = window.web3;
    // console.log(web3);
    const accounts = await web3.eth.getAccounts(); 
    this.setState({account: accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = DStorage.networks[networkId];
    if (networkData){
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address);
      this.setState({ dstorage });

      const filesCount = await dstorage.methods.fileCount().call();
      this.setState({ filesCount });

      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file]
        });
      }
    } else {
      window.alert('DStorage contract not deployed to detected network')
    }

    //Else
      //alert Error
    this.setState({loading: false});
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log("buffer", this.state.buffer)
    }
  }


  //Upload File
  uploadFile = description => {
    console.log("Submitting file to IPFS...");

    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result);

      if (error) {
        console.log(error);
        return;
      }

      this.setState({loading: true});

      if (this.state.type == '') {
        this.setState({ type: 'none'});
      }

      this.state.dstorage.methods.uploadFile(
        result[0].hash, result[0].size, this.state.type, this.state.name, description).send({
          from: this.state.account
        }).on('transactionHash', (hash) => {
          this.setState({
            loading: false,
            type: null,
            name: null
          })
          window.location.reload();
        }).on('error', (e) => {
          window.alert('Error');
          console.log(e);
          this.setState({loading: false});
        })
    })
  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      loading: true,
      type: null,
      name: null
    }

  }

  //React.js render method with JSX compiled in Virtual React DOM to HTML
  render() {
    return (
      <div>
        <Navbar account={this.state.account} num = {this.state.files.length}/>
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <div className = "container-fluid mt-5 text-center">
              <div className = "row">
                <main role = "main" className = "col-lg-12 ml-auto mr-auto" style = {{ maxWidth: '700px'}}>
                  <Main files = {this.state.files} 
                  uploadFile = {this.uploadFile}
                  captureFile = {this.captureFile} />
                  <FileView
                    files={this.state.files}
                  />
                </main>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;