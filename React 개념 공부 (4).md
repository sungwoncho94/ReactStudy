# React 개념 공부 (4)

## 8. 리스트 변환

### 8-1 다수 컴포넌트 렌더링

- 일반 JavaScript 문법
- 요소 컬렉션을 만들고 중괄호 {}를 사용하여 JSX에 포함시키기 가능.

```react
const numbers = [1, 2, 3, 4, 5];
// map함수로 number 배열 순회 -> 요소 배열 결과를 listItems에 할당
const listItems = numbers.map((number) =>
	<li>{number}</li>
);
                              
ReactDOM.render(
	<ul>{listItems}</ul>
	document.getElementByid('root')
);
```



### 8-2 기본 리스트 컴포넌트 

-  **List 컴포넌트**를 만들 때는 **KEY** 요소를 꼭 포함해야한다.

```react
function NumberList(props) {
    const numbers = props.numbers;
    const listitems = numbers.map((number) => 
		<li key={number.toString()}>{number}</li>
);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<numberList numbers={numbers} />,
	document.getElementById('root')
);

// listItems에 key를 넣어야 한다는 error발생!

```





## 9. KEY

- 리스트 아이템을 고유하게 식별할 수 있는 문자열을 키로 사용
- 리스트에 명시적으로 키를 지정하지 않으면 기본적으로 idx를 키로 사용

```react
// toString : 객체가 가지고 있는 정보나 값들을 문자열로 만들어 리턴
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
	<li key={number.toString()}>{number}</li>
);

// 데이터의 ID를 키로 사용
const todoItems = todos.map((todo) =>
	<li key={todo.id}>{todo.text}</li>
);

// 아이템 인덱스를 키로 사용
// 단, 아이템 순서가 바뀔 수 있는 경우 idx를 key로 사용 X
const todoItems = todos.map((todo, index) => 
	// Item이 ID를 가지고 있지 않을 때만 이 방법 사용
	<li key={index}>{todo.text}</li>
);
```



### 9-1 키로 컴포넌트 추출하기

- KEY는 주변 배열의 문맥 (context) 에서만 의미가 있음

  -> ListItem의 컴포넌트를 추출할 때, ListItem이 정의된 곳이 아니라, ListItem에 값이 전해질 때 key를 포함해야 한다.
  ex) ListItem 컴포넌트를 추출한 경우, ListItem 자체의 루트 `<li>`의 요소가 아닌 배열의 `<ListItem />`요소가 키를 가지고 있어야 한다.

- 잘못된 예시

```react
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
   // numbers 는 listItems에서 사용되기 때문에, listItems자체가 키를 가지고 있어야 한다. 
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- 올바른 예시

```react
function ListItem(props) {
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
		// 실제 ListItem에 값이 전해지는 부분에서 key를 설정
		<ListItem key={number.toString()} value={number} />
	);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
    document.getElementById('root')
);

```

### 9-2 Key 는 고유값이어야 한다

- 배열 내에서 사용하는 키는 형제간에 고유해야한다. 
- 글로벌로 고유값일 필요는 없다. -> 다른 두 배열을 만들 때, 동일한 key를 사용할 수 있다.

```react
function Blog(props) {
    // sidebar 정의 -> key값 : {post.id}
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
    // content 정의 -> key값 : {post.id}
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

- key는 컴포넌트로 전달되지 않는다. key값과 동일한 값을 표현해야한다면, 명시적으로 다른 이름의 prop으로 전달해야한다.
- Post 컴포넌트는 props.key값을 읽을 수 없다.

```react
const content = posts.map((post) => 
	<Post key={post.id} id={post.id} title={post.title} />
);
```

### 9-3 JSX에서 map() 포함하기

- listItems 변수 선언 후, 이를 JSX에 포함하기

```react
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
		<ListItem key={number.toString()} value={number} />
);
                                  
	return (
		<ul>{listItems}</ul>
	);
}
```

- { }을 이용하여 map()을 인라인에 포함시키기

```react
function Numbers(props) {
    const numbers = props.numbers;
    
    return (
    	<ul>{numbers.map((number) =>
			<ListItem key={number.toString()} 
                value={number} />
			)}
        </ul>
    );
}
```



## 10. 폼

### 10-1 Controlled Components (제어되는 컴포넌트)

- React의 state는 컴포넌트의 state속성에 존재하며, setState()로만 업데이트 할 수 있다.
- React state를 **신뢰 가능한 단일 소스** 로 만들어 두 요소를 결합할 수 있다.
  그 다음 렌더링되는 React 컴포넌트는 이후에 폼에서 발생하는 유저 입력을 제어함.
  이 방식으로 React에 의해 제어되는 Input폼 요소 = **제어되는 컴포넌트**

- ex) 이름을 입력할 때 이름을 log로 남기고싶다면, 해당 폼을 제어되는 컴포넌트로 작성할 수 있음

```react
class NameForm extends React.Component {
    constructor(props) {
        super(props) {
            this.state = {value: ''};
            
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        
        // 변화가 일어나면 state를 입력받은 event의 value로 바꾼다
        // value 속성은 폼 요소에 설정되므로 표시값은 항상 this.state.value임 -> 신뢰 가능한 소스
        // handleChane : state변경과 연관되는 핸들러 함수 -> 이 함수를 통해 사용자 입력을 검사하거나 수정할 수 있음.
        handleChange(event) {
            this.setState({value: event.target.value});
        }
        
        handleSubmit(event) {
            alert('A name was submitted: ' + this.state.value);
        	event.preventDefault();
        }
        
        render() {
            return (
            	<form onSubmit={this.handleSubmit}>
                	<label>
                    	name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="submit" />
                </form>
            );
        }
    }
```

### 10-2 textarea 태그

- React에서 <textarea>는 value속성을 사용한다.

```react
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this.state.value에 값을 줌으로써 text를 나타낼 수 있다. 
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### 10-3 select 태그

- React 에서는 selected 속성을 사용하는 대신 루트 select 태그에 value 속성을 사용함. -> 한 곳에서 업데이트만 하면 돼서 제어되는 컴포넌트에서 사용하기 더 편리함

```react
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('Yours favorite flavor is : ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
        <from onSubmit={this.handleSubmit}>
        	<label>
                Pick your favorite flavor:
                <select value={this.state.value} onChange={this.handleChange}>
                	<option value="grape">Grape</option>
                    <option value="banana">banana</option>
                    <option value="strawberry">strawberry</option>
                    <option value="lime">lime</option>
                    <option value="coconut">coconut</option>
                </select>
            </label>    
            <input type="submit" value="Submit" />
        </form>
        );
    }
}
```

- 정리 : <input type="text">, <textarea>, <select> 를 비슷하게 동작하도록 할 수 있다. 모두 제어되는 컴포넌트를 구현할 때 value속성을 사용할 수 있다.

- `select`태그에서 여러개의 옵션을 사용하고 싶다면, value 속성에 배열을 전달할 수 있다.
  `<select multiple={true} value={['B', 'C']}>`

### 10-4 여러 Input 제어하기

**더 이해 필요.....;ㅅ;**

- 각 input 요소에 name 속성을 추가한 후, event.target.name 값을 기반으로 핸들러 함수를 고를 수 있다.

```react
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // name = target의 name값을 잡아 핸들러 함수를 고를 수 있음 (?)
        const name = target.name;
        
        // 주어진 input 이름에 해당하는 state키를 업데이트하기 위해 coumputed property name 구문을 사용함
        // 계산 된 속성 이름도 지원합니다. 이를 통해 대괄호 [] 안에 식을 넣을 수 있으며, 속성 이름으로 계산되어 사용됩니다. 이것은 속성 접근 자 구문의 대괄호 표기법을 연상시킵니다.이 속성은 이미 속성을 읽고 설정하는 데 사용했을 수 있습니다.
        this.setState({
            [name]: value
        });
    }
    
    render() {
        return (
        <form>
        	<label>
            	Is going:
                <input
                    name="isGoing"
                    type="checkbox"
                    // this.state.name을 기반으로 핸들러 함수를 고른다 -> 위에 target.type === checkbox 이면 target.checked를 넘긴다.
                    checked={this.state.isGoing}
                    onchange={this.handleInputChange} />
            </label>
            <br/>
            <label>
            	Number of guests:
                <input 
                    name="numberOfGuests"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange} />
            </label>
        </form>
        );
    }
}
```



## 11. State 끌어올리기

```react
function BiolingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>끓는다!</p>
    }
    return <p>아직 안끓어요</p>
}
```









