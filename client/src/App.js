import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import MyPage from './component/MyPage';
import './App.css';
import {Switch, Route, Redirect} from "react-router-dom"
import Alarm from "./component/Alarm"
import Tab from "./component/Tab"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false,
    }
  }
  
  isLoginHandler(){
    this.setState({
      ...this.state,
      isLogin:true
    })
  }


  render() {
    const {isLogin} = this.state
    return (
      <div className="App">
      <Switch >
        <Route path="/signin" render={() => {
          if (isLogin){
            return <Redirect to="/" />
          }
          return <Signin isLogin={isLogin} isLoginHandler = {this.isLoginHandler.bind(this)} />
        }}/>
        <Route exact path="/signup" render = {() => {
          return <Signup />
        }} />

        <Route exact path="/mypage" render = {() => {
          if (isLogin){
            return <MyPage />
          }
          return  <Redirect to="/" />
        }} />     
         <Route exact path="/home" render = {() => {
          if (isLogin){
            return <MyPage />
          }
          return  <Redirect to = "/signin" />
        }} />      
        <Route exact path="/alarm" render = {() => {
          if (isLogin){
            return <Alarm />
          }
          return  <Redirect to = "/signin" />
        }} />      
        <Route exact path="/friends" render = {() => {
          if (isLogin){
            return <MyPage />
          }
          return  <Redirect to = "/signin" />
        }} />
        <Route path="/" render = {()=> {
          if (isLogin){
            return <Redirect to="/mypage" />
          }
          return <Redirect to = "/signin" />
        }} />
      </Switch>
      <Tab isLogin = {isLogin}/>
   </div>
    );
  }
}

export default App;
