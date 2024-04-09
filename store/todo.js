
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
    }),
    actions: {
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeItem(todo) {
            const index = this.todos.findIndex(item => item === todo);
            if (index !== -1) {
                this.todos.splice(index, 1);
            }
        }
    },
});
