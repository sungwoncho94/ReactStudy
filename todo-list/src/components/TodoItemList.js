import React, { Component } from 'react';
import TodoItem from './TodoItem';

// 동적인 '리스트'를 랜더링 할 때는 함수형 컴포넌트 대신 클래스형 컴포넌트 사용 -> 최적화 우ㅢ해

class TodoItemList extends Component {

    // 지금은 input값이 바뀔 때 마다 매번 render되고있다 -> todos가 바뀔 때마다 render되도록 변경
    // 컴포넌트 최적화 (꼭 필요한 항목만 render하기)
    // 업데이트에 영향을 끼치는 조건을 return -> 이 조건일 때만 리렌더링해줌
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, onToggle, onRemove } = this.props;
        // 3개의 props를 받는다
        // todos : todo 객체들이 들어있는 배열
        // onToggle : 체크박스를 키고 끄는 함수
        // onRemove : 삭제 함수

        // todos를 객체배열(하나하나 내가 입력했었음) -> 컴포넌트 배열(todos의 항목을 저절로 mapping시킨다)로 변환시켜주기 (map함수 사용)
        // 배열 랜더링 시, key값 필수! (default로 index가 key값으로 랜더링되는데, 이는 비추!)
        const todoList = todos.map(
            ({id, text, checked}) => (
                <TodoItem 
                id={id} 
                text={text} 
                checked={checked} 
                onToggle={onToggle}
                onRemove={onRemove}
                key={id} />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;