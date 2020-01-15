import React from 'react';
import './Form.css'

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    // value : input 내용, onCreate : 버튼 클릭 시 실행될 함수, onChange : 인풋 내용이 변경될 때 실행되는 함수, onKeyPress: 인풋에서 키를 입력할 때 실행되는 함수(Enter입력)
    return (
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress}></input>
            <div className="create-button" onClick={onCreate}>추가</div>
        </div>
    );
};

export default Form;