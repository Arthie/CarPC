import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { ApolloProvider } from "react-apollo-hooks"
import { client } from "./graphql/client"

import { ThemeProvider } from "styled-components"
import { createGlobalStyle } from "styled-components/macro"
import GlobalLoading from "./components/GlobalLoading"

import "@rmwc/circular-progress/circular-progress.css"

//////////
//STYLED//
//////////

const theme = {}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size:10px;
    overflow: hidden;
  }

  @media (min-width: 1200px){
    html {
      font-size: 13px;
    }
  }

  @media (min-width: 1500px){
    html {
      font-size: 15px;
    }
  }

  @media (min-width: 1800px){
    html {
      font-size: 18px;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
    
  body {
    margin: 0;
    padding:0;
  }

  @media print {
    body {
      background-color: #fff;
    }
  }

  html, body, #root{
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  :root{
  }

  div[role="group"][tabindex] {
    height: 100%!important;
  }

  input[type=range] {
    -webkit-appearance: none;
    background:transparent;
    width: 100%;
    margin: 0 0.5rem;
  }
  
  input[type=range]:focus {
    outline: none;
  }
  
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.84rem;
    cursor: pointer;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0), 0 0 0.1rem rgba(13, 13, 13, 0);
    background: rgba(255,255,255,0.8);
    border-radius: 0.13rem;
    border: 0.02rem solid rgba(1, 1, 1, 0);
  }
  
  input[type=range]::-webkit-slider-thumb {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 5rem;
    background: #ffc600;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -0.35rem;
    box-shadow:0 0 0.2rem rgba(0,0,0,0.2);
  }
  
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #FF9D00;
  }
  
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 0.84rem;
    cursor: pointer;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0), 0 0 0.1rem rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 0.13rem;
    border: 0.02rem solid rgba(1, 1, 1, 0);
  }
  
  input[type=range]::-moz-range-thumb {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 5rem;
    background: #ffc600;
    cursor: pointer;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<GlobalLoading />}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
)
