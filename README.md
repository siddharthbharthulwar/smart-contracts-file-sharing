**Decentralized Storage (DStorage) Web App - CS50 Final Project**

**Installation**:

1. Unzip the project and navigate to main directory

2. Install NodeJS and NPM (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-node-js-and-npm)

3. To install all dependencies, run:
<code>npm install</code>
in the main project directory (containing the project.json file) with internet connection.

4. Install Ganache and Truffle for the Ethereum blockchain testing environment (either the Ganache UI or the CLI):
https://github.com/trufflesuite/ganache
https://trufflesuite.com/ganache/

5. Make sure that the port in Ganache UI/Truffle matches the port in <code>truffle-config.js</code>

6. Install Metamask for Google Chrome, which will serve as the Ethereum wallet for this blockchain project

7. Select any account in Ganache under the ACCOUNTS tab (leftmost). Click the key symbol on the right and copy the private key (bottom) onto your clipboard

8. Run the Metamask for Google Chrome extension and click the circular icon on the top right. In the drop-down menu that appears, click the "import accounts" option and paste the private key. This will allow Metamask to connect with the Ganache test account and let you use fake Ether for the Blockchain gas costs. 

9. To run the blockchain component of the web app, open a terminal in the main project directory and run:
<code>truffle develop</code>
(if the smart contracts are not compiled in the ./abis directory (as json files), compile and migrate them with Solidity with)
<code>truffle compile</code>
<code>truffle migrate</code>

10. To run the frontend React web app, open a new terminal (don't terminate the previous terminal with truffle cli) and run:
<code>npm start</code>

11. A development environment of the React web app should open at localhost:3000 and immediately the UI elements of the web app should be visible. 

**Usage**

The navbar at the top displays the blockchain address of the current user (pulled from the Metamask Ethereum account). Additionally, the navbar shows the number of blocks (files in this case) added by the user, which is incremented +1 with every new file added.

The first card in the list of cards in the center of the web app allows users to upload files to the file sharing application. Users must provide a description for the file they upload, and then click the "Choose File" button to select a file to upload from their local files. If the file is valid, its name is displayed next to the "Choose File" button. When the user hits the "Submit" button, the hash of the file is added to the blockchain and the file is added to the IPFS storage server. Additionally, the page component reloads to display information about the file below. The ordering of files displayed is chronological, and users can download the file they have uploaded via the download button. The file name, file description, date/time when the file was uploaded, and file size are displayed in each file info component. 

**Troubleshooting**:
If there are errors in the React terminal (the one you ran npm start in), the error is most likely with a missing library (fixed with npm install). Otherwise, there are errors in the smart contracts/Solidity part of the project configuration. Usually, the error is with Ganache/Truffle/Metamask not recognizing the smart contract network created by this web app, which can be fixed in <code>truffle-config.js</code>. If the error "Non-Ethereum browser detected. You should consider using MetaMask!" appears, this means that Metamask isn't installed properly on the browser being used. If the error 'DStorage contract not deployed to detected network' appears, this means that Ganache/Truffle cannot communicate with the smart contracts being deployed in the web app, and is likely an issue with the correct port number in both <code>truffle-config.js</code> and Ganache. 
