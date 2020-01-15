import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  // 초기 state설정
  id = 3

  state = {
    input: '',
    todos: [
      { id: 0, text: '1번 todo', checked: false },
      { id: 1, text: '2번 todo', checked: true },
      { id: 2, text: '3번 todo', checked: false },
    ]
  }

  // handleToggle, handleChange, handleCreate, handleKeyPress 메소드 구현
  // form에서 하는 역할 : 텍스트 내용이 바뀌면 state업데이트 / 버튼 클릭 시, todo생성 후 todos 업데이트 / Enter버튼 누를 때도 똑같은 작업
  // Toggle : 클릭하면 체크표시와 함께 취소선 생김
  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id를 가지고 지워야 할 아이템 index를 찾는다
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];  // 배열 복사

    // 기존의 값들을 복사하고, checked값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    
    this.setState({
      todos: nextTodos
    });
  }

  handleChange = (e) => {
    this.setState({
      // state를 바꿀건데, input값을 현재 target의 value로 바꾼다
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',  // input은 비우고
      todos: todos.concat({  // concat을 이용하여 배열 추가
        id: this.id++, // 현재 id에 1더한 값을 id로 배치
        text: input,  // input값을 text로 넣는다
        checked: false  // 기본적으로 체크박스에 체크는 안되어있음
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  render() {
    // const { input } = this.state 가 가능한 이유 -> state안에 input이라고 똑같은 이름이 있기 때문에 바로 할당 가능
    // todos를 TodoItemList로 전하기 위해 todos를 선언
    const { input, todos } = this.state;
    // 비구조화 할당 : 밑에서 value={this.input}이라고 안하려고 미리 불러옴
    const {
      handleToggle,
      handleChange,
      handleCreate,
      handleKeyPress
    } = this;

    return (
      // TodoListTemplate라는 js에 보낼건데, form과 children props를 보낼 수 있다.
      // form에는 Form.js자체를 받아서 보내고 / 왜 children은 TodoListTemplate안에 내용만 쓰면 저절로 들어갈까??
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>

        {/* todos를 화면에 보여주기 위해선, todos배열을 컴포넌트 배열로 변환해야함 -> map함수 사용 */}
        {/* 1. TodoItemList에 todos 전달하기 */}
        <TodoItemList todos={todos} onToggle={handleToggle}></TodoItemList>
      </TodoListTemplate>
    );
  }
}

export default App;
