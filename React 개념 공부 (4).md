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















