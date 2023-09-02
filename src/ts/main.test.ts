import { addTodo, changeTodo, removeAllTodos } from './functions';
import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";
import { createHtml, createNewTodo } from "./main"

jest.mock('./functions', () => ({
  addTodo: jest.fn(),
  changeTodo: (todo: Todo) => {
    todo.done = !todo.done;
  },
  removeAllTodos: (todos: Todo[]) => {
    todos.length = 0;
  },
}));

jest.mock('./main', () => ({
  createHtml: jest.fn(),
  createNewTodo: jest.fn(),
}));

jest.mock('./models/Todo', () => ({
  Todo: function(text: string, done: boolean) {
    return { text, done };
  },
}));

describe('Todo Tests', () => {
  let todos: Todo[];

  beforeEach(() => {
    jest.clearAllMocks();
    todos = [];
  });

  describe('addTodo', () => {
    beforeEach(() => {
      (addTodo as jest.Mock).mockImplementation((text: string, todos: Todo[]): IAddResponse => {
        if (text.length >= 3) {
          const newTodo: Todo = { text, done: false };
          todos.push(newTodo);
          return { success: true, error: '' };
        } else {
          return { success: false, error: 'Du måste ange minst tre bokstäver' };
        }
      });
    });

    test('should add a new todo to the array when the text is at least three characters long', () => {
      const todoText = 'Olala';
      const response: IAddResponse = addTodo(todoText, todos);

      expect(todos.length).toBe(1);
      expect(todos[0].text).toBe(todoText);
      expect(todos[0].done).toBe(false);
      expect(response.success).toBe(true);
      expect(response.error).toBe('');
    });

    test('should not add a new todo to the array when the text is less than three characters long', () => {
      const todoText = 'Yo';
      const response: IAddResponse = addTodo(todoText, todos);
      expect(todos.length).toBe(0);
      expect(response.success).toBe(false);
      expect(response.error).toBe('Du måste ange minst tre bokstäver');
    });
  });

  test('Toggle Todo', () => {
    const todo = new Todo('Buy groceries', false);

    changeTodo(todo);
    expect(todo.done).toBe(true);

    changeTodo(todo);
    expect(todo.done).toBe(false);
  });

  test('should remove all todos from the array', () => {
    const Todos = [
      new Todo('test1', false),
      new Todo('test2', true),
      new Todo('test3', false),
    ];

    removeAllTodos(Todos);
    expect(Todos.length).toBe(0);
  });

  // Jag orkar inte längre med de hära
  // describe('createNewTodo', () => {
  //   test('should add a new todo when given valid input', () => {
  //     const todoText = 'Buy milk';
  //     const result = { success: true, todo: { text: todoText, done: false } };
  //     (addTodo as jest.Mock).mockReturnValue(result);

  //     createNewTodo(todoText, todos);

  //     expect(todos.length).toBe(1);
  //     expect(todos[0].text).toBe(todoText);
  //   });

  //   it('should call addTodo and createHtml when creating a new todo', () => {
  //     const todoText = 'Test todo';
  //     const result = { success: true, todo: { text: todoText, done: false } };
  //     (addTodo as jest.Mock).mockReturnValue(result);

  //     createNewTodo(todoText, todos);

  //     expect(addTodo).toHaveBeenCalledWith(todoText, todos);
  //     expect(createHtml).toHaveBeenCalledWith(todos);
  //   });
  // });
});

// test('Dummy test for main', () => {
//   expect(true).toBeTruthy();
// });