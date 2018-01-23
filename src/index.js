import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { injectGlobal } from "styled-components"

import { store } from "./_services"

import { App } from "./App"
//import registerServiceWorker from "./registerServiceWorker"

injectGlobal`
  body{
      margin: 0;
      padding: 0;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  input[type=range] {
    -webkit-appearance: none;
    background:transparent;
    width: 100%;
    margin: 0 5px;
  }
  
  input[type=range]:focus {
    outline: none;
  }
  
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
    background: rgba(255,255,255,0.8);
    border-radius: 1.3px;
    border: 0.2px solid rgba(1, 1, 1, 0);
  }
  
  input[type=range]::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffc600;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.5px;
    box-shadow:0 0 2px rgba(0,0,0,0.2);
  }
  
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #FF9D00;
  }
  
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 1.3px;
    border: 0.2px solid rgba(1, 1, 1, 0);
  }
  
  input[type=range]::-moz-range-thumb {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffc600;
    cursor: pointer;
  }
`

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
  //registerServiceWorker()
