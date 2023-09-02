import { Todo } from "./models/Todo";
import { addTodo, changeTodo, removeAllTodos } from "./functions";

let todos: Todo[] = [];

beforeEach(() => {
	// Runs before each test where we clean up the todos array
	todos = [];
});

describe("addTodo", () => {
	// Describe the function we are testing which is addTodo
	it("shall add a new todo to the list if the length of the string is greater then 2 characters", () => {
		const todoText = "Buy milk";
		const response = addTodo(todoText, todos);

		expect(response.success).toBe(true); // Expect the response to be true
		expect(todos.length).toBe(1); // Expect the todos array to have one item
		expect(todos[0].text).toBe(todoText); // Expect the first item in the todos array to have the text "Buy milk"
		expect(todos[0].done).toBe(false); // Expect the first item in the todos array to have the done property set to false
	});

	it("shall return an error if the todo text is too short", () => {
		const todoText = "Hi"; // Create a todo text that is too short
		const response = addTodo(todoText, todos); // Call the addTodo function with the todo text and the todos array

		expect(response.success).toBe(false); // Expect the response to be false
		expect(response.error).toBe("Du måste ange minst tre bokstäver"); // Expect the error message to be "Du måste ange minst tre bokstäver"
		expect(todos.length).toBe(0); // Expect the todos array to be empty
	});
});

describe("changeTodo", () => {
	it("shall mark the todo item as done if it is not done", () => {
		const todo = new Todo("Buy milk", false); // Create a new todo item

		changeTodo(todo); // Call the changeTodo function with the todo item
		expect(todo.done).toBe(true); // Expect the todo item to be done
	});

	it("shall mark the todo item as not done if it is done", () => {
		const todo = new Todo("Buy milk", true); // Create a new todo item

		changeTodo(todo); // Call the changeTodo function with the todo item
		expect(todo.done).toBe(false); // Expect the todo item to not be done
	});
});

describe("removeAllTodos", () => {
	it("shall remove all todos from the list", () => {
		todos.push(new Todo("Buy milk", false)); // Add a new todo item to the todos array
		todos.push(new Todo("Buy bread", false)); // Add a new todo item to the todos array
		todos.push(new Todo("Buy butter", false)); // Add a new todo item to the todos array

		expect(todos.length).toBe(3); // Expect the todos array to have three items

		removeAllTodos(todos); // Call the removeAllTodos function with the todos array

		expect(todos.length).toBe(0); // Expect the todos array to be empty
	});
});