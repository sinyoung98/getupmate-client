import React from "react";
import "./AlarmRing.css"

export default class AlarmRing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission_on: false,
      question: "",
      answer: "",
      userAnswer: ""
    }
  }

  missionHandler() {
    this.setState({
      mission_on: !this.state.mission_on
    });
    const url = new URL(`http://www.gijigae.com:3000/mission/${this.props.id}`);
    url.searchParams.append("id", this.props.curAlarm_num);
    console.log("url은", url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // 피드 생성용
        this.props.setQuestionHandler(data.question)
        // 미션 생성용
        this.setState({
          ...this.state,
          question: data.question,
          answer: data.answer
        })
      })
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { isAlarm, isAlarmHandler } = this.props;
    const { mission_on, answer, userAnswer, time } = this.state;
    return (
      <div className="modals">
        <div className={isAlarm ? "isAlarm" : "none"}>
          <div className="content">
            <button className="alarm_cancel" onClick={this.missionHandler.bind(this)}>알람해제</button>
            <h2>{(new Date().toLocaleTimeString('it-IT')).slice(0, 5)}</h2>
          </div>
        </div>

        <div className={mission_on ? "isAlarm" : "none"}>
          <div className="content">
            <button className="alarm_cancel" onClick={() => {
              if (answer === userAnswer) {
                isAlarmHandler();
                this.setState({
                  ...this.state,
                  mission_on: false
                })
              } else {
                alert("답을 다시 입력해주세요");
              }
            }}>확인</button>
            <div className="mission">
              <h2 className="question">문제</h2>
              <p>{this.state.question}</p>
              <h2 className="answer">답</h2>
              <input type="text" placeholder="답을 입력하세요" name="userAnswer" onChange={this.onChangeHandler.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )

  }

}