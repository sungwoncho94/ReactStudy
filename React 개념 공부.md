# React 개념 공부

## 1. 요소

1. 요소 렌더링

	```react
	<div id="root"></div>
	```

- React DOM에 의해 관리되는 모든 것이 이 **요소**안에 들어간다. 
  --> **루트** DOM노드

- React 요소를 루트DOM 노드에 렌더링하기 -> ReactDOM.render()에 전달

  ```react
  const element = <h1>Hello, world</h1>;
  ReactDOM.render() {
      element,
      document.getElementById('root') 
      // element를 'root'라는 id를 가진 객체에 넣어서 띄어준다.
  };
  ```



2. 렌더링된 요소 업데이트
   Recat요소는 변경 불가능 
   -> 업데이트 : 새로운 요소를 만들어서 ReactDOM.render()로 전달한다

   ```react
   function tick() {
       // 현재 시각을 가져오는 새로운 element를 생성
       const element = {
           <div>
           <h1>Hello, world!</h1>
           <h2>It is {new Date().toLocaleTimeString()}</h2>
           </div>
       };
       
       // ReactDOM.render()로 전달해준다.
       ReactDOM.render() {
           element,
           document.getElementById('root')
       };
   }
   
   // 1초에 한 번씩 tick함수 실행
   setInterval(tick, 1000);
   ```

   

## 2. 컴포넌트

**컴포넌트를 사용하여 UI를 독립적이고 재사용 가능하게 분리하고, 각 부분을 독립적으로 생각할 수 있음**

컴포넌트 : 임의의 입력 (props)를 받아서 화면에 어떤게 나타나야 하는지 설명하는 react요소를 반환함

1. 함수형 컴포넌트

   ```react
   function Welcome(props) {
       return <h1>Hello, {props.name}</h1>;
   }
   ```

   - 단일 props 객체 인수를 받고, React요소를 반환

2. 클래스 컴포넌트

   ```react
   class Welcome extends React.Component {
       render() {
           return <h1>Hello, {this.props.name}</h1>;
       }
   }
   ```

3. 컴포넌트 렌더링

   ```react
   // 사용자가 정의한 Welcome 컴포넌트
   // JSX속성을 이 컴포넌트에 단일 객체(props)로 전달한다.
   // props를 인자로 받아서, props로 속성을 표시한다(?)
   function Welcome(props) {
       return <h1>Hello, {props.name}</h1>
   }
   
   // 유저가 정의한 컴포넌트를 react요소로 전달 -> {name: "Sara"}로 Welcome 컴포넌트 호출 
   const element = <Welcome name="Sara" />;
   
   // element를 root로 랜더링할 것
   ReactDOM.render(
   	element,
   	document.getElementById('root')
   );
   ```

   1. ReactDOM.render() 로 element  (<Welcome name="Sara" />) 호출
   2. {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출
   3. Welcome 컴포넌트가 그 결과로  <h1>Hello, Sara</h1>  요소 반환
   4. DOM 업데이트

4. 컴포넌트 결합

   - 컴포넌트는 출력될 때 다른 컴포넌트를 참조할 수 있음
     이를 통해 모든 세부 레벨에서 동일한 컴포넌트 추상화를 사용할 수 있음

   - ex) welcome을 여러번 렌더링하는 App 컴포넌트 만들기

     ```react
     function Welcome(props) {
         return <h1>Hello, {props.name}</h1>;
     }
     
     function App() {
         return (
         	<div>
             	<Welcome name="Sara" />
                 <Welcome name="Jason" />
                 <Welcome name="" />
             </div>
         );
     }
     
     ReactDOM.render() {
         <App />,
         document.getElementById('root')
     }
     ```

5. 컴포넌트 추출
   : 컴포넌트를 더 작은 컴포넌트로 쪼개는 것

   ```react
   function Comment(props) {
       return (
       	<div calssName="Comment">
           	<div className="UserInfo">
               	<img className="Avatar"
                       src={props.author.avatarUrl}
                       alt={props.author.name}
                    />
                   <div className="UserInfo-name">
                   	{props.author.name}
                   </div>
               </div>
               <div className="Comment-text">
               	{props.text}
               </div>
               <div className="Comment-date">
               	{formatDate(props.date)}
               </div>
           </div>
       );
   }
   
   const comment = {
     date: new Date(),
     text:
       'I hope you enjoy learning React!',
     author: {
       name: 'Hello Kitty',
       avatarUrl:
         'http://placekitten.com/g/64/64',
     },
   };
   
   ReactDOM.render(
     <Comment
       date={comment.date}
       text={comment.text}
       author={comment.author}
     />,
     document.getElementById('root')
   );
   
   ```

   - Avatar 추출하기
   
     ```react
     function Avatar(props) {
         return (
         	<img className="avatar"
                 src={props.user.avatarUrl}
                 alt={props.user.name}
              />
         );
     }
     ```
   
     -> Comment()를 간소화시킬 수 있음
   
     ```react
     function Comment(props) {
       return (
         <div className="Comment">
           <div className="UserInfo">
             <Avatar user={props.author} />
             <div className="UserInfo-name">
               {props.author.name}
             </div>
           </div>
           <div className="Comment-text">
             {props.text}
           </div>
           <div className="Comment-date">
             {formatDate(props.date)}
           </div>
         </div>
       );
     }
     ```
   
   - UserInfo 컴포넌트 추출
   
     ```react
     function UserInfo(props) {
         return (
         	<div className="UserInfo">
                 {/* UserInfo 안에 Avatar포함 */}
             	<Avatar user={props.user} />
                 <div className="UserInfo-name">
                 	{props.user.name}
                 </div>
             </div>
         );
     }
     ```
   
     -> Comment() 단순화
   
     ```react
     function Comment(props) {
       return (
         <div className="Comment">
           <UserInfo user={props.author} />
           <div className="Comment-text">
             {props.text}
           </div>
           <div className="Comment-date">
             {formatDate(props.date)}
           </div>
         </div>
       );
     }
     ```
   
   - 전체 코드
   
     ```react
     function formatDate(date) {
       return date.toLocaleDateString();
     }
     
     function Avatar(props) {
       return (
         <img
           className="Avatar"
           src={props.user.avatarUrl}
           alt={props.user.name}
         />
       );
     }
     
     function UserInfo(props) {
       return (
         <div className="UserInfo">
           <Avatar user={props.user} />
           <div className="UserInfo-name">
             {props.user.name}
           </div>
         </div>
       );
     }
     
     function Comment(props) {
       return (
         <div className="Comment">
           <UserInfo user={props.author} />
           <div className="Comment-text">
             {props.text}
           </div>
           <div className="Comment-date">
             {formatDate(props.date)}
           </div>
         </div>
       );
     }
     
     const comment = {
       date: new Date(),
       text:
         'I hope you enjoy learning React!',
       author: {
         name: 'Hello Kitty',
         avatarUrl:
           'http://placekitten.com/g/64/64',
       },
     };
     ReactDOM.render(
       <Comment
         date={comment.date}
         text={comment.text}
         author={comment.author}
       />,
       document.getElementById('root')
     );
     
     ```
   
     

## 3. Props

- 부모 컴포넌트가 자식 컴포넌트에게 주는 값
- 자식 컴포넌트에서는 props를 받기만하고, 받은 props를 수정할 수 없음



## 4. State

- 컴포넌트 내부에서 선언하여 내부에서 값을 변경할 수 있음.
- render() 내에 선언되어야 한다.







