# React Study Day03

```react
import React, { Component } from 'react';

class MyCom extends Component {
  state = {
    value: 0
  };

  // getDerivedStateFromProps는 static값으로 넣어야함
  static getDerivedStateFromProps(nextProps, prevState) {
    // nextProps : 다음으로 받아올 props값
    // prevState : 현재 업데이트되기 전 state값
    if (prevState.value !== nextProps.value) {
      // 현재 props값과 다음에 올 props값이 다르다면 value값을 업데이트해준다
      // state값과 props값이 같아진다
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  // update를 막아주는 용도 -> nextProps가 10이될 때, update하지 않는다
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value === 10) return false;
    return true;
  }

  render() {
    return (
      <div>
        <p>props: {this.props.value}</p>
        <p>state: {this.state.value}</p>
      </div>
    );
  }
}

export default MyCom;

```

