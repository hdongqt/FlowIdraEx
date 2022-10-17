import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import * as ADD from "./AddTodo.style";
import {useSelector, useDispatch} from "react-redux";
import {editTodoFilter, addNewTodoFilter, selectEditTodo} from "../../containers/Todo/todoSlice";

const AddTodo = ({handelEditTodo, clearEditTodo}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const todoEdit = useSelector((state) => state.todos.todoEdit);
    const todoLists = useSelector((state) => state.todos.todoList);

    useEffect(() => {
        if (todoEdit) setTitle(todoEdit.title);
    }, [todoEdit]);

    const handelRandomId = () => {
        const id = Math.floor(Math.random() * 1000) + 1;
        if (todoLists.find((todo) => todo.id === id)) {
            return handelRandomId();
        }
        return id;
    };

    const onChangeInput = (event) => {
        setTitle(event.target.value);
    };

    const handelClickAddEditTodo = (e) => {
        e.preventDefault();
        if (title) {
            if (todoEdit) {
                const todo = {...todoEdit, title: title};
                dispatch(editTodoFilter(todo));
                dispatch(selectEditTodo(null));
                setTitle("");
            } else {
                dispatch(addNewTodoFilter({id: handelRandomId(), title: title, isDone: false}));
                setTitle("");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a title for the task !",
            });
        }
    };

    const onClickClearEdit = () => {
        setTitle("");
        dispatch(selectEditTodo(null));
    };

    return (
        <ADD.AddTodoStyle>
            <ADD.AddTodoInput
                placeholder="Please enter a title for the task..."
                onChange={(e) => onChangeInput(e)}
                onKeyDown={(e) => e.key === "Enter" && handelClickAddEditTodo(e)}
                value={title}
            ></ADD.AddTodoInput>
            {todoEdit && (
                <ADD.ClearEditButton onClick={() => onClickClearEdit()}>
                    <i className="las la-redo-alt"></i>
                </ADD.ClearEditButton>
            )}
            <ADD.AddTodoButton onClick={() => handelClickAddEditTodo()}>{todoEdit ? "Edit" : "Add"}</ADD.AddTodoButton>
        </ADD.AddTodoStyle>
    );
};

export default AddTodo;
