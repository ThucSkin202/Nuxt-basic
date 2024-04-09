<template>
    <div>
        <input v-model="newTodo" />
        <button @click="addTodo">Add Todo</button>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                {{ todo.text }}
                <button @click="removeItem(todo)">X</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useTodoStore } from '~/store/todo';

const todoStore = useTodoStore();

let newTodo = '';

function addTodo() {
    if (newTodo.trim()) {
        todoStore.addTodo({ id: Date.now(), text: newTodo });
        newTodo = '';
    }
}

function removeItem(todo) {
    todoStore.removeItem(todo);
}

const todos = todoStore.todos;
</script>
