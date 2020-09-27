import React from 'react';
import './MyPage.css'
import profile_pic from '../profile_pic.png';
import { withRouter } from "react-router-dom"

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      changeClick: false,
      photo: null,
      openModal: false
    }
    window.sessionStorage.setItem('pathname', this.props.location.pathname);
    window.sessionStorage.setItem('photo', this.props.photo);
  }

  onChangeHandler(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  openModalHandler() {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  onChangePhoto(e) {
    this.setState({ photo: e.target.files[0] });
  }

  uploadPhoto() {
    console.log("want to change photo...")
    const formData = new FormData();
    formData.append("img", this.state.photo);
    fetch('http://54.180.92.83:3000/user/changephoto', {
      method: 'POST',
      body: formData,
      // multer사용할 경우 headers 없이 보내야함
    })
      .then(res => res.json())
      .then(data => alert(data.msg))
  }

  changeNickname() {
    const { setNicknameHandler, id } = this.props;
    if (this.state.changeClick && this.state.nickname) {
      fetch(`http://54.180.92.83:3000/user/changenickname/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          nickname: this.state.nickname
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => setNicknameHandler(json.nickname))
    }
    this.setState({
      changeClick: !this.state.changeClick
    })
  }

  signoutHandler() {
    fetch('http://54.180.92.83:3000/user/signout', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.messsage)
        this.props.isLoginHandler()
        window.sessionStorage.clear();
      })
  }

  render() {
    return (
      <div className="MyPage">
        <h2>My Page</h2>
        <div className="MyPage_profile">
          <img
            // signin에서 받은 photo 값이 null일 경우 기본사진 띄우기
            // 새로고침시 "null"이 되는 오류 수정
            src={this.props.photo && this.props.photo !== "null"
              ? this.props.photo : profile_pic}
            // 사진 클릭시 모달창으로 사진편집창 띄우기
            onClick={this.openModalHandler.bind(this)}
          />
          <div className={this.state.openModal ? "photoModal" : "none"}>
            <div className="content">
              <form className="form">
                <p><input type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img'></input></p>
                <button>저장</button>
                <button onClick={this.openModalHandler.bind(this)}>취소</button>
              </form>
            </div>
          </div>
          <div className="MyPage_nickname">
            {this.state.changeClick
              ? <input type="text" onChange={this.onChangeHandler.bind(this)} />
              : <span>{this.props.nickname}</span>}
            <button
              onClick={this.changeNickname.bind(this)}
            >✏️</button>
            <button
              onClick={this.signoutHandler.bind(this)}
            >Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MyPage);