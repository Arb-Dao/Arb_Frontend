import tile1 from './tile1.png';
import './App.css';
import React from 'react';
import Grapher from './grapher'


import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';
import json from './output-for-front-end.json'
import json2 from './output-for-front-end2.json'

import { ethers } from "ethers";
import { useState, } from "react";
import Web3Modal from "web3modal";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);


document.body.style = 'background: rgb(65, 65, 65);';
var buttonTextColor = 'rgb(40, 40, 160)';
const buttonStyle = {height: "30%", width: '20%', textAlign: 'center', color: buttonTextColor}

function App() {
  var [page, setPage] = useState('Home');
  var [address, setAddress] = useState('');
  var [balance, setBalance] = useState(0);
  var [connectText, setConnectText] = useState('Connect Wallet')
  var [jsonpicker, setJsonPicker] = useState(true);

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

  let content = [];

let axisNumbers = []
let swapPaths = [[]]
let inPaths = [[1]]
let numberOfSwaps = 1


let pathindex = 0
let moneyIn = 0;
let moneyOut = 0;

axisNumbers.push(""+(1))
for (const [key, value] of Object.entries(jsonpicker? json : json2)){
  numberOfSwaps += 2
  axisNumbers.push(""+(2*pathindex+2))
  axisNumbers.push(""+(2*pathindex+3))
  swapPaths.push([])
  swapPaths.push([])
  inPaths.push([1])
  inPaths.push([0])

  if (pathindex == 0){
    moneyIn = value.TotalIn
  }
    moneyOut = value.TotalOut
  let found = false
  for (let i = 0; i<swapPaths[pathindex*2].length; i++){
    if (swapPaths[pathindex*2][i] == value.from)
      found = true
  }
  if (!found)
    swapPaths[pathindex*2].push(value.from)
  
  found = false
  for (let i = 0; i<swapPaths[pathindex*2+2].length; i++){
    if (swapPaths[pathindex*2+2][i] == value.to)
      found = true
  }
  if (!found)
    swapPaths[pathindex*2+2].push(value.to)

  
  let pools2 = []
  let ins2 = []
  let inTot = 0

  for (const [key, value2] of Object.entries(value)){
    if (key != "from" && key != "to" && key != "TotalIn" && key!= "TotalOut"){
      pools2.push(key)
      ins2.push(Math.round(parseInt(value2)/parseInt(value.TotalIn) * 100) / 100
      )
    } 
    if (key == "TotalIn") {
      inTot = value.TotalIn
    }
  }
  content.push(<div style = {{marginTop: "5%", width: "100%"}}> {key}: {value.from} >>> {value.to} </div>)


  // swapPaths.pop()
  swapPaths[pathindex*2+1] = pools2
  inPaths[pathindex*2+1] = ins2
  pathindex += 1
}


let maxheight = 0;
for (let i = 0; i<swapPaths.length; i++){
  if( i % 2 == 1){
    if (swapPaths[i].length > maxheight)
      maxheight = swapPaths[i].length
  }
}

//swappath data
let swappathData = []
let addY = 0
let problematicIndex = -1
for (let i = 0; i<swapPaths.length; i++){
  let maxheightSub = swapPaths[i].length
  if( i % 2 == 1){
    if (maxheightSub < maxheight){
      addY = (maxheight -maxheightSub) / 2
      problematicIndex = i
    }
  }
}
for (let i = 0; i<swapPaths.length; i++){
  if( i % 2 == 1){
    for (let j = 0; j<swapPaths[i].length; j++){
          let currentSwappath = []
              for (let k = 0; k<swapPaths.length; k++){
               if (inPaths[k][j] == undefined)
                inPaths[k][j] = "   "
                if (k==i){
                  currentSwappath.push({
                    x: k,
                    y: k == problematicIndex? j+addY : j,
                    pool:swapPaths[k][j]+(k%2==1? "\n    "+inPaths[k][j] : "")
                  })
                } else {
                  currentSwappath.push({
                    x: k,
                    y: k % 2 == 1 ? (k == problematicIndex? addY : 0) : (maxheight-1)/2,
                    pool:swapPaths[k][0]+ (k%2==1? "\n    ":"")
                  })
                }
              }
          console.log(currentSwappath)
          swappathData.push(
            {
              //label:"Swap Path1",
              // y-axis data plotting values
              data:currentSwappath,
              datalabels:{
                color: "black",
                font: {
                  size: 12,
                  weight: "bold"
                }  
              },
              fill:false,
              borderWidth:4,
              pointRadius:40,
              backgroundColor:"rgb(123,123,123)",
              borderColor:'rgb(67,112,123)',
              responsive:false,
              pointDot: true,
            }
          )
    }
  }
}


  return(
  <div>
        {
            
              <div style ={{height: "100vh"}}> 
                  
                  <div className='Sections Bar'
                    style={{
                    width: '100%',
                    height: '10vh',
                    backgroundColor: 'black',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                    }}>

                    <div className='fillerLeft' style={{width: '75%', height: "100%", backgroundColor: 'transparent', display: "flex"}}></div>
                    <div className='Sections' style={{marginLeft: '0.5%', marginRight: '0.5%', width: '30%', height: "100%", backgroundColor: 'transparent', display: "flex", flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <button style={buttonStyle} onClick = {()=> setPage('Home')}> Home </button>
                      <button style={buttonStyle} onClick = {()=> setJsonPicker(!jsonpicker)}> Data </button>
                      <button style={buttonStyle} onClick = {()=> setPage('Performance')}> Performance </button>
                      <button style={buttonStyle} onClick = {()=>{
                        connectWeb3Wallet();
                      }}> {connectText} </button>
                      {address === '' ? <div> </div> : <button style={buttonStyle} onClick = {()=> setPage('properties')}> My Properties </button>}
                    </div>
                    <div className='fillerRight' style={{width: '2%', height: "100%", backgroundColor: 'black', display: "flex"}}> </div>
                  </div>

                  {page==='Home' ?

                      (<div className='MainContent' style = {{ height: "90%", backgroundColor: "rgb(75, 75, 75)",
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-start'}}>
                        <div style = {{width: '20%',minWidth: "10%", maxWidth: "20%", height: "100%", backgroundColor: "rgb(165,165,165)",
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start'}}>
                          <div style={{width: "100%", height: "2.5%", justifySelf: "center", backgroundColor: "rgb(125,125,125)"}}> 
                              Swap Paths
                          </div>
                          
                          {content}

                          <div style={{width: "100%", height: "2.5%", marginTop: "5%", justifySelf: "center", alignContent: "center", backgroundColor: "rgb(125,125,125)"}}> 
                              Tokens in
                          </div>
                          {moneyIn}
                          
                          <div style={{width: "100%", height: "2.5%", marginTop: "5%", justifySelf: "center", alignContent: "center", backgroundColor: "rgb(125,125,125)"}}> 
                              Tokens out
                          </div>
                          {moneyOut}

                          <div style={{width: "100%", height: "2.5%", marginTop: "5%", justifySelf: "center", alignContent: "center", backgroundColor: "rgb(125,125,125)"}}> 
                              Gain
                          </div>
                           {Math.round(parseInt(moneyOut)/parseInt(moneyIn) * 100) - 100} %

                        </div>
                        <div style = {{width: "90%", height: "100%", backgroundColor: "rgb(185,185,185)",
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start'}}>
                        <div style = {{height: "10%"}}> </div>
                        <Line
                        options = {
                                    {
                                      pointDot: true,

                                      plugins: {
                                        tooltip: {
                                          enabled: true // <-- this option disables tooltips
                                        },
                                        hover: {mode: null},
                                        legend: {
                                          display: false,
                                        },
                                        ChartDataLabels,
                                        datalabels: {
                                          formatter: function(value, context) {
                                            return value.pool
                                        }
                                        }

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
                                      } 
                                    }   
                                  }        

                        data = {{
                          // x-axis label values
                          labels:axisNumbers,
                          datasets:swappathData,
                        }}
                      />
                        </div>
                      </div>)

                  : page==='Data'?
                  (<div style={{flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '90%'}}>
                    <Line
                        options = {
                                    {
                                      pointDot: true,

                                      plugins: {
                                        tooltip: {
                                          enabled: true // <-- this option disables tooltips
                                        },
                                        hover: {mode: null},
                                        legend: {
                                          display: false,
                                        },
                                        ChartDataLabels,
                                        datalabels: {
                                          formatter: function(value, context) {
                                            return value.pool
                                        }
                                        }

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
                                      } 
                                    }   
                                  }        

                        data = {{
                          // x-axis label values
                          labels:axisNumbers,
                          datasets:swappathData,
                        }}
                      />
                    {/* <Line
                        options = {
                                    {
                                      pointDot: true,

                                      plugins: {
                                        tooltip: {
                                          enabled: true // <-- this option disables tooltips
                                        },
                                        hover: {mode: null},
                                        legend: {
                                          display: false,
                                        },
                                        ChartDataLabels,
                                        datalabels: {
                                          formatter: function(value, context) {
                                            return value.pool
                                        }
                                        }

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
                                      } 
                                    }   
                                  }        

                        data = {{
                          // x-axis label values
                          labels:["1","2","3"],

                          datasets:[
                                    {
                                      //label:"Swap Path1",
                                      // y-axis data plotting values
                                      data:[{y:200, x: 0, pool: "usdt"},{y:200, x:1, pool: "doge"},{y:167.5, x: 2, pool: "usdc"}],
                                      datalabels:{
                                        color: "black",
                                        font: {
                                          size: 25
                                        }  
                                      },
                                      fill:false,
                                      borderWidth:4,
                                      pointRadius:40,
                                      backgroundColor:"rgb(123,123,123)",
                                      borderColor:'green',
                                      responsive:true,
                                      pointDot: true,
                                    },

                                    {
                                      //label:"Swap Path2",
                                      // y-axis data plotting values
                                      datalabels:{
                                        color: "black",
                                        font: {
                                          size: 25
                                        }  
                                      },
                                      data:[{y:100, x: 0, pool: "btc"},{y:125, x:1, pool: "btc"},{y:167.5, x: 2, pool: "usdc"}],
                                      fill:false,
                                      pointRadius:40,
                                      borderWidth:4,
                                      backgroundColor:"rgb(123,123,123)",
                                      borderColor:'blue',
                                      responsive:false
                                    },

                                    {
                                      // label:"Swap Path3",
                                      // y-axis data plotting values
                                      datalabels:{
                                        color: "black",
                                        font: {
                                          size: 25
                                        }  
                                      },
                                      data:[{y:150, x: 0, pool: "avax"},{y:125, x:1, pool: "btc"},{y:167.5, x: 2, pool: "usdc"}],
                                      fill:false,
                                      pointRadius:40,
                                      borderWidth:4,
                                      backgroundColor:"rgb(123,123,123)",
                                      borderColor:'red',
                                      responsive:false
                                    },
                          ],
                        }}
                      /> */}

                  </div>)
                  : page==='Performance'?
                  (<div>
                    Empty1
                  </div>)
                  : page==='Empty2'?
                  (<div>
                    Empty2
                  </div>)
                  : page==='Empty3'?
                  (<div>
                      Empty3
                  </div>)
                  :
                  <div>
                    Error
                  </div>
                  }
            </div>
              
            
        } 
  </div>
  );

}

export default App;
