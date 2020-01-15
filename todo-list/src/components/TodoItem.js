import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {

                    // remove를 눌렀을 때, onRemove() -> onToggle()도 실행된다. 
                    // e.stopPropagation()은 이벤트의 확산을 멈춰줘서 onToggle()은 실행되지 않도록 한다.
                    e.stopPropagation();
                    onRemove(id)}
                }>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default TodoItem;