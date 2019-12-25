# React Study Day01

- vue - vuex
- router - 
- React 라이브러리 알아보기



- React 실습해보기

```react
import React, { Component } from 'react';
// 설치되어있는 리엑트 모듈 사용


// 컴포넌트를 만드는 방법
// 1. 클래스를 통해서 만들기
// 2. 함수로 만들기
class App extends Component {
  render() {
    // jsx 형태의 파일을 return 해야한다
    return (
      // <div></div> 하나로 닫혀있어야 한다.
      // 여러 div를 만들어야한다면 큰 div로 감싸줘야함
      // <Fragment>로 감싸준다면 extra div없이 내용물div만 존재할 수 있음
      <div>
        <h1>안녕하세요 리액트</h1>
      </div>
    );
  }
}

export default App;
```

- 변수로 이름 받아서 출력하기

```react
import React, { Component } from 'react';
// 설치되어있는 리엑트 모듈 사용

// 컴포넌트를 만드는 방법
// 1. 클래스를 통해서 만들기
// 2. 함수로 만들기
class App extends Component {
  render() {
    const name = 'react';
    return <div>hello {name}</div>;
  }
}

export default App;
```

- 삼항연산자

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'sungwon';
    return (
      // div안에 삼항연산자는 {} 내에 작성해야함
      <div> 
      {
        name === 'sungwon' ? '성원아 안녕' : '아니다!'
      }
      </div>
    );
  }
}

export default App;
```

- if문 사용

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const value = 2;
    return (
      <div>
        {
          // functoin 자체를 ()로 묶어준 후, ()로 호출까지 해야함
          (function() {
          if (value === 1) return <div>1이다</div>
          if (value === 2) return <div>2이다</div>
          if (value === 3) return <div>3이다</div>
          return <div>없다</div>
          // else 일 때, -> return <div> </div>에 넣어서 else 호출
          })()
        }
      </div>
    );
  }
}
export default App;
```



-------------

## React 에 css입히기

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    // style 정의는 return() 위에서 해줌
    // camelCase를 기본으로 사용한다
    // 정의할 때는 : '' 사용 (dict이기 때문)
    const style = {
      backgroundColor: 'black',
      fontSize: 5 + 10 + 'px',
        // js문법 사용 가능
      padding: '16px',
      color: 'yellow'
    };
    const value = 2;
    return (
      // style = {style} -> 대괄호 안에 넣어줘야함
      <div style={style}>안녕하세요!</div>
    );
  }
}
export default App;

```



css파일 불러오기

```css
.App {
  background: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}

/* css파일에서는 color : ~~; 사용  (color: '~') 아님 */
/* css에서는 ;필요 */

```

```react
import React, { Component } from 'react';
import './App.css';
// App.css 불러오기

class App extends Component {
  render() {
    return (
// class = "App" --> className = "App" 으로 써야함
      <div className="App">안녕하세요!</div>
    );
  }
}
export default App;

```

