# React 개념 공부 (3)

## 6. 이벤트 제어하기

- camelCase 사용
- JSX에 문자열 대신 함수를 전달

```react
// HTML에 이벤트를 넣을 때,
<button onclick="activateLasers()">
	Activate Lasers
</button>

// React에서 이벤트 넣을 때 -> camelCase & 함수 전달
<button onClick={activateLasers}>
	Activate Lasers
</button>
```

- return false X -> preventDefault 호출해서 종료

```react
// HTML에서 새로운 페이지를 여는 기본 링크 동작 막는 법
<a href="#" onclick="console.log('The link was clicked.'); return false">Click Me!</a>

// React에서 새로운 페이지를 여는 기본 링크 동작 막는 법
fucntion ActionLink() {
    fucntion handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    
    return (
		<a href="#" onClick={handleClick}>Click Me!</a>
    );
}
```

- DOM 요소가 생성된 후에 리스너를 추가하기 위해 addEventListener를 호출할 필요가 없다.
  요소가 처음 랜더링될 때 리스너를 제공함.
- JS에서 클래스 메서드는 기본적으로 unbound되어있다. 
  -> this.handleClick 바인드를 하지않고 onClick에 전달하면 this는 undefined가 된다.
- 일반적으로 `onClick={this.handleClick}`처럼 () 없이 메서드를 참조하면, 그 메서드를 bind해야함.

```react
// "ON" "OFF" state를 유저가 토글할 수 있는 버튼 랜더링

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true}
        
        // 이 바인딩은 콜백에서 'this'를 작동시키기 위해 필요
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    
    render() {
        return (
        	<button onClick={this.handleClick}>
            	{this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        );
    }
}

ReactDOM.render(
	<Toggle />,
    document.getElementById('root')
);
```

- bind를 호출하지 않고 콜백에 this를 bind하는 방법
  (1) public class field 문법 사용  (**실험적인** 방법이다)

  ```react
  class LoggingButton extends React.Component {
      // handleClick 내에 this를 bind할 수 있음
      handleClick = () => {
          console.log('this is:', this);
      }
      
      render() {
          return (
          	<button onClick={this.handleClick}>
              	Click Me!
              </button>
          );
      }
  }
  ```

  (2) 콜백에서 arrow function을 사용

  ```react
  class LoggingButton extends React.Component {
      handleClick() {
          console.log('this is:', this);
      }
      
      render() {
          // handleClick 내에 this를 바인딩시킨다.
          return (
          	<button onClick={(e) => this.handleClick(e)}>
              	Click Me!
              </button>
          );
      }
  }
  ```

- arrow function을 사용할 때, 콜백에서 하위 컴포넌트에 prop을 전달한다면 랜더링하는데 큰 비용이 들 수 있음
  -> 생성자 함수에서 바인딩하거나 클래스 필드 문법을 사용하자!



## 6.1 이벤트 핸들러에 인수 전달하기

반복문 안에서 이벤트 핸들러에 추가 파라미터를 전달하기

```react
// id가 원시적인 ID라면, 아래처럼 전달할 수 있음

// arrow function 사용
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// Function.prototype.bind 사용
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

e : React 이벤트를 나타내는 인수
e 인수는 ID뒤에 두 번째 인수로 전달됨.

arrow function을 사용하여 명시적으로 전달해야하지만, bind를 사용하면 추가 인수가 자동으로 전달됨.



------------------------

## 7. 조건부 랜더링

-  React에서 원하는 동작을 수행하는 캡슐화된 컴포넌트를 생성할 수 있음.
  app의 state에 의존하여 이 중 일부만 랜더링시키는 것도 가능

```react
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

ReactDOM.render(
    // 초기값을 false로 설정, 이후에 isLoggedIn={true}로 바꿔야함
	<Greeting isLoggedIn={false} />,
    document.getElementById('root')
)

```



## 7-1 요소 변수

요소를 담기 위해 변수를 사용 -> 컴포넌트의 일부를 조건부로 랜더링함과 동시에, 나머지 출력은 변경되지 않음

```react
function LoginButton(props) {
    return (
    	<button onClick={props.onClick}>Login</button>
    );
}

function LogoutButton(props) {
    return (
    	<button onClick={props.onClick}>Logout</button>
    );
}

// LoginControl이라는 state를 가진 컴포넌트 생성 -> <LoginButton /> or <LogoutButton />을 랜더링할 것.

class loginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }
    
    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }
    
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        
        let button = null;
        // if문을 사용하여 LogoutButton or LoginButton을 랜더링함
        if (isLoggedIn) {
            button = <LogoutButton onClick= {this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick= {this.handleLoginClick} />;
        }
        
        return (
        	<div>
            	<Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
	<LoginControl />,
    document.getElementById('root')
)
```



## 7-2 논리 && 연산자가 있는 인라인 조건

- { }로 감싸면 JSX에 어떤 표현식이던 넣을 수 있음

```react
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        // 만약에 안읽은 메세지가 0일 때, 모든 메세지를 읽었다고 하려면 어떻게 해야할까? -> 조건 ? true : false 사용
    	<div>
        	<h1>Hello!</h1>
            {unreadMessages.length > 0 && 
              <h2>You Have {unreadMessages.length} unread messages.</h2>}
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

ReactDOM.render(
	<Mailbox unreadMesages={messages} />,
    document.getElementById('root')
)
```



## 7-3 조건부 연산자를 이용한 인라인 If-Else

- condition ? true : false 사용

```react
// 삼항연산자 사용
render() {
    const isLoggedIn = this.state.isLoggedIn;
    
    return (
      <div>
       	The User is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
}

// 삼항연자사 사용하여 LogoutButton / LoginButton 랜더링
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```



## 7-4 컴포넌트가 랜더링 되지 못하게 방지하기

- 컴포넌트가 다른 컴포넌트에 의해 랜더링되어도, 랜더링을 출력하는 대신 null을 반환하면 숨길 수 있음
- <WarningBanner />는 `warn prop`의 값에 의존해 랜더링됨. 
  만약 prop값이 false라면, 이 컴포넌트는 랜더린되지 않음

```react
// WARN!을 표시할 함수 -> props.warn에 의존하여 null or return을 정한다
function WarningBanner(props) {
	if (!props.warn) {
        return null;
    }
    
    return (
    	<div className="warning">
        	Warning!
        </div>
    );
}

// Page 컴포넌트를 만든다
class Page extends React.Component {
    // constructor : 생성자함수 / 초기 state설정 (이곳에서만 설정 가능)
    constructor(props) {
        super(props);
        this.state = {showWarning: true}
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    // 현재(prevState)를 반대로 바꾼다 (현재 state = true -> !true)
    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }
    
    render() {
        return (
            <div>
                {/* WarningBanner의 warn값을 현재 state의 showWarning값으로 준다  ex) 현재가 보여지고 있는 상태일 때 -> showWarning = true일 때, button을 누르면 handleToggleClick이 호출되고, showWarning은 !prevState.showWarning으로 인해 false로 바뀐다 -> WarningBanner 함수에 의하여 !props.warn (===false) 일 때, null값이 된다.*/}
                {/* 대신, componentWillUpdate와 componentDidUpdate는 여전히 호출됨 */}
            	<WarningBanner warn={this.state.showWarning} />
                <Button onClick={this.handleToggleClick}>
                	{this.state.showWarning ? "Hide" : "Show"}
                </Button>
            </div>
        );
    }
}

ReactDOM.render(
	<Page />,
    document.getElementById('root')
);
```

ㅇㅇ!

