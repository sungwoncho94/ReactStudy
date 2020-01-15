import React, { Component } from 'react';
import TodoItem from './TodoItem';

// 동적인 '리스트'를 랜더링 할 때는 함수형 컴포넌트 대신 클래스형 컴포넌트 사용 -> 최적화 우ㅢ해

class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;
        // 3개의 props를 받는다
        // todos : todo 객체들이 들어있는 배열
        // onToggle : 체크박스를 키고 끄는 함수
        // onRemove : 삭제 함수

        // todos를 객체배열 -> 컴포넌트 배열로 변환시켜주기 (map함수 사용)
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
        )

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;