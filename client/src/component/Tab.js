import React from "react"
import "./Tab.css"
import { withRouter } from "react-router-dom"

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }
    onClickHandler(e){
        this.props.history.push(`/${e.target.className}`)
    } 

    render(){
      const {isLogin} = this.props;
        return (
            <span className= {isLogin ? "tabs" : "none"}>
            <button className="home" onClick ={this.onClickHandler.bind(this)}>home</button>
            <button className="alarm" onClick ={this.onClickHandler.bind(this)}>Alarm</button>
            <button className="friends" onClick ={this.onClickHandler.bind(this)}>Friends</button>
            <button className="mypage" onClick ={this.onClickHandler.bind(this)}>myPage</button>
          </span>
        )
    }
}

export default withRouter(Tab);
