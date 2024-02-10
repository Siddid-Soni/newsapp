import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  constructor () {
    super()
    this.state= {
      mode: 'dark'
    }
  }

  state =  {
    progress: 0
  }

  apiKey = process.env.REACT_APP_NEWS_API

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  toggleMode = () =>{
    if (this.state.mode === 'primary') {
      this.setState({mode: 'dark'});
      document.body.style.backgroundColor = '#343a40'
    }
    else {
      this.setState({mode: 'primary'});
      document.body.style.backgroundColor = 'white'
    }
  } 

  render() {
    return (
      <div>
        <BrowserRouter>
        <LoadingBar height={2} color='#28b485' progress={this.state.progress} />
        <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' mode={this.state.mode} pageSize={8} category='general' />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' mode={this.state.mode} pageSize={8} category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' mode={this.state.mode} pageSize={8} category='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' mode={this.state.mode} pageSize={8} category='general' />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' mode={this.state.mode} pageSize={8} category='health' />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' mode={this.state.mode} pageSize={8} category='science' />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' mode={this.state.mode} pageSize={8} category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' mode={this.state.mode} pageSize={8} category='technology' />} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

