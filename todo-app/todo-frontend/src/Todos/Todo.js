import React from 'react';

export default function Todo({ todo, onClickDelete, onClickComplete }) {
    return (<div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }} key={todo.id}>
        <span>
            {todo.text}
        </span>
        {todo.done ? <>
            <span>This todo is done</span>
            <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
            </span>
        </> : <>
            <span>
                This todo is not done
            </span>
            <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
                <button onClick={onClickComplete(todo)}> Set as done </button>
            </span>
        </>}
    </div>);
}
