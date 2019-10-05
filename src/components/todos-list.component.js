import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>{props.todo.todo_completed}</td>
        <td>
            <Link to={"/edit/"+props.todo_id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
             .then(response => {
                 this.setState({ todos: response.data});
            })
             .catch((err) => {
                 console.log(err);
             })
    }

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        })
    }
    
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop : 20 }} >
                    <thread>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>    
                    </thread>    
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}