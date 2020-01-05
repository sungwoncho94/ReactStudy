# React 개념 공부 (2)

## 4. state와 라이프사이클

**state** 
: props와 비슷하지만 컴포넌트에 의해 제어되며, private 속성
: class에서만 사용 가능

- 이전의 실시간 시계 예시
  : ReactDOM.render() 를 호출하여 렌더링된 출력을 변경

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

- Clock 컴포넌트 만들기
  : 재사용 가능 / 캡슐화 -> 자체 타이머를 설정하여 스스로 업데이트

```react
// 시계 캡슐화
function Clock(props) {
    return (
    	<div>
        	<h1>Hello, world!</h1>
            <h2>This time is {props.date.toLocaleTimeString()}</h2>
        </div>    
    );
}

function tick() {
    ReactDOM.render(
    	<Clock date={new Date()} />
        document.getElementById('root')
    );
}

setInterval(tick, 1000);
```

- 타이머를 설정하고 매 초 UI업데이트 기능도 Clock컴포넌트에 포함되어있어야함
  -> Clock 컴포넌트에 state 추가해야함
  -> state는 Class에서만 사용가능 == Clock을 클래스로 변경

```react
function Clock(props) {
    return(
    	<div>
        	<h1>Hello, World!</h1>
            <h2>This Time is {props.date.toLocaleTimeString()}</h2>
        </div>
    );
}

ReactDOM.render() {
    <Clock />,
    document.getElementById('root')
}
```



## 4.1 함수(형 컴포넌트)를 클래스로 변환하기

1. ES6 class를 같은 이름으로 만들고, React.Component를 확장
2. 비어있는 render() 메서드 하나 추가
3. 함수의 body를 render() 메서드 안으로 옮기기
4. render() 바디 내에서 props를 this.props로 바꾸기
5. 남아있는 빈 함수 선언문 제거

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>This Time is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```



## 4.2 Class에 로컬 state 추가하기

date를 props에서 state로 옮기자! 3step

1. render() 메서드 내의 this.props.date를 this.state.date로 바꾸기

   ```react
   class Clock extends React.Component {
     render() {
       return (
         <div>
           <h1>Hello, world!</h1>
           <h2>This Time is {this.state.date.toLocaleTimeString()}.</h2>
         </div>
       );
     }
   }
   ```

2. this.state를 초기화하는 클래스생성자를 추가
   클래스 컴포넌트는 항상 props와 함께 기본 생성자(super(props))를 호출함

   ```react
   class Clock extends React.Component {
       constructor(props) {
           super(props);
           this.state = {date: new Date()};
       }
       
       render() {
           return (
           	<div>
               	<h1>Hello, world!</h1>
           		<h2>This Time is {this.state.date.toLocaleTimeString()}.</h2>
               </div>
           );
       }
   }
   ```

3. Clock 요소에서 date prop을 삭제

   ```react
   ReactDOM.render(
   	<clock />,
       document.getElementById('root')
   )
   // 타이머 코드는 컴포넌트 자체에 다시 추가
   ```

- 결과 코드

  ```react
  // 4.1 함수형 컴포넌트를 class로 변경하기
  // (1) React.Component 확장
  class Clock extends React.Component {
      // <2> this.state를 초기화하는 클래스 생성자 추가
      // <3> super(props)로 props를 기본 생성자에 전달
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  // (2) render() 추가 // (3) 함수의 바디를 render() 안으로 옮기기 
  // (4) render()바디 내 props -> this.props로 변경
    render() {
        // class에 로컬state추가
        // <1> this.props.~ -> this.state.~로 변경
      return (
        <div>
          <h1>Hello, world!</h1>  
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  ```

  

## 4.3 클래스에 라이프사이클 메서드 추가하기

목표 : Clock에 자체 타이머를 설정하고, 매초마다 자동으로 업데이트 시키자

- Clock이 DOM에서 최초로 랜더링 될 떄, 타이머를 설정 -> "mounting"
- DOM에서 삭제됐을 때 타이머 해제 -> "unmounting"
- Clock을 마운트 / 언마운트 시키기 위해 컴포넌트 클래스에 특별한 메서드를 선언해야함

```react
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    // 라이프사이클훅
    // 컴포넌트 출력이 DOM에 랜더링 된 이후 동작
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }
    
    componentWillUnmount() {
        
    }
    
    render() {
        return (
        	<div>
            	<h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}
```

