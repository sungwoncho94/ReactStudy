# React 개념 공부 (5)

## 11. State 끌어올리기

- 여러 개의 컴포넌트가 동일한 변결 데이터를 보여줘야 할 때, 공통 조상에 state를 끌어올려서 표시하기

  

(1) 섭씨 온도 입력받고, 끓는 여부 출력해주는 기본 코드

```react
// BoilingVerdict 컴포넌트 : props로 celsius온도를 받고, 끓음 여부 판단
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓는다!</p>
    }
    return <p>아직 물이 안끓는다</p>
}

// Caculator 컴포넌트 : 온도를 입력받는 input을 랜더링하고, 그 값을 this.state.temperature로 넣는다
class Calculator extends React.Component {
    constructor(props) {
        super(props)
        // handleChange 바인딩
        this.handleChange = this.handleChange.bind(this);
        // 초기상태 지정
        this.state = {temperature : ''};
    }
    
    // handleChange가 실행되면 현재 state를 target의 값으로 바꾼다
    handleChange(e) {
        this.setState({temperature: e.target.value});
    }
    
    render() {
        const temperature = this.state.temperature;
        return (
            // filedset:테두리  legend : 테두리 위에 글자 입력
        	<filedset>
            	<legend>Enter temperature in Celsius:</legend>
                {/* onChange : input에 변화가 생기면 handleChange를 실행 */}
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict
                    celsius={parseFloat(temperature)} />
            </filedset>
        );
    }
}

ReactDOM.render(
	<Calculator />,
    document.getElementById('root')
);
```



(2) 섭씨 입력과 함게 화씨 입력을 제공하고, 동기화 상태 유지

- Calculator 에서 TemperatureInput 컴포넌트 추출 & 섭씨, 화씨 입력할 수 있는 scale prop 추가

```react
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }
    
    handleChange(e) {
        this.setState({temperature: e.target.value});
    }
    
    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
        	<fieldset>
            	<legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// 온도입력 및 계산기능은 TemperatureInput으로 빼고, Calculator 컴포넌트를 TemperatureInput컴포넌트를 받아서 재작성

// but, 섭씨input을 하면 화씨 input은 변화X -> 아직 섭씨 & 화씨 동기화 X
// 온도를 입력해도 Temperature안에만 있기 때문에 현재 온도를 알 수 없다.
class Calculator extends React.Component {
    render() {
        return (
        	<div>
            	<TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}

ReactDOM.render(
	<Calculator />,
    document.getElementById('root')
);
```



(3) 동기화 & 결과출력

- 섭씨 -> 화씨 / 화씨 -> 섭씨 변환 함수 작성하기

```react
// 섭씨 -> 화씨 / 화씨 -> 섭씨 변환 함수 두 개 작성

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// 온도를 입력받아서 섭씨 or 화씨로 변환
// 온도, 변환함수를 인수로 받는다
function tryConver(temperature, convert) {
    const input = parseFloat(temprature);
    // 숫자아 아닌 input이 들어오면 X
    if (Number.inNaN(input)) {
        return '';
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

// ex) tryConvert('10.22', toFahrenheit) => '50.396'
```



## 11.2 State 끌어올리기

- 현재 두 개의 TemperatureInput은 독립적인 state값을 가지고 있음 -> 이를 동기화해야함
  state를 공유하기 위해선 가까운 공통 조상에 state를 옮겨야 한다 == state끌어올리기
  TemperatureInput 컴포넌트 -> Calculator 로 옮기기

  

  - (1) TemperatureInput컴포넌트의 render() 에서 
    this.state.temperature을 this.props.temperature로 변경

  ```react
  const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
  };
  
  function toCelsius(fahrenheit) {
      return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
      return (celsius * 9 / 5) + 32;
  }
  
  function tryConver(temperature, convert) {
      const input = parseFloat(temprature);
      if (Number.inNaN(input)) {
          return '';
      }
      const output = convert(input)
      const rounded = Math.round(output * 1000) / 1000;
      return rounded.toString();
  }
  
  class TemperatureInput extends React.Component {
      constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
          // 로컬 상태를 컴포넌트에서 제거 
          // this.state = {temperature: ''};
      }
      
      // Change가 발생하면 props로 onTemperatureChange를 받아서 값을 수정한다.
      handleChange(e) {
          // 이제는 Temperature에서 setState로 값을 변경할 수 없다.
          // this.setState({temperature: e.target.value});
          this.props.onTemperatureChange(e.target.value);
      }
      
      render() {
          // props는 읽기전용 -> this.state.temperature일 때는 setState()로 변경가능했지만, 이제는 부모컴포넌트(Calculator)로부터 prop으로 전달받기 때문에 TemperatureInput에서 제어할 수 없다.
          
          // 이를 해결하기 위해, '제어되는'컴포넌트를 만든다. 커스텀 TemperatureInput을 만들어서 부모Calcutator 컴포넌트로부터 temperature와 onTemjperatureChange prop을 받아서 수정한다.
          const temperature = this.props.temperature;
          const scale = this.props.scale;
          return (
          	<fieldset>
              	<legend>Enter temperature in {scaleNames[scale]}:</legend>
                  <input value={temperature}
                      onChange={this.handleChange} />
              </fieldset>
          );
      }
  }
  
  class Calculator extends React.Component {
      render() {
          return (
          	<div>
              	<TemperatureInput scale="c" />
                  <TemperatureInput scale="f" />
              </div>
          );
      }
  }
  
  ReactDOM.render(
  	<Calculator />,
      document.getElementById('root')
  );
  ```

  

  