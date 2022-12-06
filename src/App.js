import tile1 from './tile1.png';
import './App.css';
import React from 'react';

import { ethers } from "ethers";
import { useState, } from "react";
import Web3Modal from "web3modal";


document.body.style = 'background: rgb(65, 65, 65);';
var buttonTextColor = 'rgb(40, 40, 160)';
const buttonStyle = {height: "30%", width: '15%', textAlign: 'center', color: buttonTextColor}

function App() {
  var [page, setPage] = useState('main');
  var [address, setAddress] = useState('');
  var [balance, setBalance] = useState(0);
  var [connectText, setConnectText] = useState('Connect Wallet')


  const web3Modal = new Web3Modal({
    providerOptions: {},
  });
  
  const [connectedAccount, setConnectedAccount] = useState("");
  
  const connectWeb3Wallet = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setConnectedAccount(web3Accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return(
  <div>
        {
            page==='main' ?(
              <div style ={{height: "100vh"}}> 
                  <div className='Header Bar' 
                  style={{
                  width: '100%',
                  height: '10vh',
                  backgroundColor:  'rgb(105, 105, 105)',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                  }}>
                    <div style={{color: 'Black', display: 'flex', fontSize: '30px'}}>Header Bar</div>
                  </div>
                  
                  <div className='Sections Bar'
                  style={{
                  width: '100%',
                  height: '15vh',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-start'
                  }}>

                    <div className='fillerLeft' style={{width: '65%', height: "100%", backgroundColor: 'transparent', display: "flex"}}></div>
                    <div className='Sections' style={{marginLeft: '0.5%', marginRight: '0.5%', width: '30%', height: "100%", backgroundColor: 'transparent', display: "flex", flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <button style={buttonStyle} onClick = {()=> setPage('Data')}> Data </button>
                      <button style={buttonStyle} onClick = {()=> setPage('Empty1')}> Empty1 </button>
                      <button style={buttonStyle} onClick = {()=> setPage('Empty2')}> Empty2 </button>
                      <button style={buttonStyle} onClick = {()=>{
                        connectWeb3Wallet();
                      }}> {connectText} </button>
                      {address === '' ? <div> </div> : <button style={buttonStyle} onClick = {()=> setPage('properties')}> My Properties </button>}
                    </div>
                    <div className='fillerRight' style={{width: '5%', height: "100%", backgroundColor: 'transparent', display: "flex"}}> </div>
                  </div>
                  <div style = {{width: "40%", height: "100%", backgroundColor: "transparent",
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-start'}}>
                    <div style = {{width: "20%", height: "100%", backgroundColor: "transparent", marginLeft: "5%", marginRight: "2%", marginTop: "7.5%",
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start'}}>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                    </div>
                    <div style = {{width: "20%", height: "100%", backgroundColor: "transparent", marginLeft: "5%", marginRight: "2%", marginTop: "7.5%",
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start'}}>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                      <img src={tile1} className="tile1" alt="tile1" style = {{marginTop: "3%", width: '100%', height: '20%'}}/>
                    </div>
                  </div>

              </div>
              )
            : page==='Data'?
              <div style={{flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                Data
              </div>
            : page==='Empty1'?
              <div>
                Empty1
              </div>
            : page==='Empty2'?
              <div>
                Empty2
              </div>
            : page==='Empty3'?
              <div>
                Empty3
              </div>
            :
            <div>
              Error
            </div>
        } 
  </div>
  );

}

export default App;
