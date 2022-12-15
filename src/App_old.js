import tile1 from './tile1.png';
import './App.css';
import React from 'react';
import Grapher from './grapher'


import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 

import { ethers } from "ethers";
import { useState, } from "react";
import Web3Modal from "web3modal";

Chart.register(CategoryScale);

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
                <Line
options = {
  {
    plugins: {
      tooltip: {
        enabled: false // <-- this option disables tooltips
      },
      hover: {mode: null},
    },
    legend: {
      display: false
    },


  // removes mouseover stuff
  // events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
  events: [],
  scales: {
  // to remove the labels
  x: {
    ticks: {
      display: false,
    },

    // to remove the x-axis grid
    grid: {
      drawBorder: false,
      display: false,
    },
  },
  // to remove the y-axis labels
  y: {
    ticks: {
      display: false,
      beginAtZero: true,
    },
    // to remove the y-axis grid
    grid: {
      drawBorder: false,
      display: false,
    },
  }
} }   }
              
data={{
  // x-axis label values
  labels:["1","2","3"],
  
  datasets:[
            {
              // y-axis data plotting values
            //   legend: {
            //     display: false,
            // },
            legend: {
              labels: {
                  fontSize: 0
              }
          },
              label: "",
              data:[250],
              labels: ["a", "b", "c"],
              fill:false,
              borderWidth:4,
              pointRadius:0,
              backgroundColor:"rgb(255,99,132)",
              borderColor:'green',
              responsive:false,
            },
            {
              label:"Swap Path1",
              // y-axis data plotting values
              data:[200,200,167.5],
              labels: ["a", "b", "c"],
              fill:false,
              borderWidth:4,
              pointRadius:40,
              backgroundColor:"rgb(255,99,132)",
              borderColor:'green',
              responsive:false,
            },
            {
              label:"Swap Path2",
              // y-axis data plotting values
              data:[100,125,167.5],
              fill:false,
              pointRadius:40,
              borderWidth:4,
              backgroundColor:"rgb(255,99,132)",
              borderColor:'blue',
              responsive:false
            },
            {
              label:"Swap Path3",
              // y-axis data plotting values
              data:[150,125,167.5],
              fill:false,
              pointRadius:40,
              borderWidth:4,
              backgroundColor:"rgb(255,99,132)",
              borderColor:'red',
              responsive:false
            },
  ],
}}
/>
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
