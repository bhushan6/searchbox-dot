"use client";

import { FormEvent, useState } from "react";
import { Check, Minus, Plus, RotateCcw, Trash2 } from "lucide-react";

import { SearchBox } from "@/components/search-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AppName = "search" | "counter" | "todo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const appTabs: { id: AppName; label: string }[] = [
  { id: "search", label: "Searchbox" },
  { id: "counter", label: "Counter" },
  { id: "todo", label: "Todo app" },
];

export function AppTabs() {
  const [activeApp, setActiveApp] = useState<AppName>("search");

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="mb-6 flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        role="tablist"
        aria-label="Apps"
      >
        {appTabs.map((tab) => {
          const isActive = activeApp === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => setActiveApp(tab.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${activeApp}-panel`}
        role="tabpanel"
        aria-label={appTabs.find((tab) => tab.id === activeApp)?.label}
      >
        {activeApp === "search" && <SearchBox />}
        {activeApp === "counter" && <CounterApp />}
        {activeApp === "todo" && <TodoApp />}
      </div>
    </div>
  );
}

function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <section className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Counter
      </h1>
      <p
        className="my-8 text-6xl font-bold tabular-nums text-gray-900 dark:text-gray-100"
        aria-live="polite"
      >
        {count}
      </p>
      <div className="flex justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Decrease count"
          onClick={() => setCount((value) => value - 1)}
        >
          <Minus />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setCount(0)}
        >
          <RotateCcw />
          Reset
        </Button>
        <Button
          type="button"
          size="icon"
          aria-label="Increase count"
          onClick={() => setCount((value) => value + 1)}
        >
          <Plus />
        </Button>
      </div>
    </section>
  );
}

function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Try the searchbox", completed: false },
    { id: 2, text: "Build something useful", completed: false },
  ]);

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = newTodo.trim();

    if (!text) return;

    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Todo app
      </h1>
      <form className="mb-4 flex gap-2" onSubmit={addTodo}>
        <Input
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add a task..."
          aria-label="New task"
          className="text-base dark:text-gray-100"
        />
        <Button type="submit" aria-label="Add task">
          <Plus />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-800"
          >
            <button
              type="button"
              aria-label={todo.completed ? "Mark task incomplete" : "Complete task"}
              aria-pressed={todo.completed}
              onClick={() => toggleTodo(todo.id)}
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                todo.completed
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 text-transparent hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400"
              }`}
            >
              <Check className="h-4 w-4" />
            </button>
            <span
              className={`min-w-0 flex-1 text-sm ${
                todo.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {todo.text}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete ${todo.text}`}
              onClick={() =>
                setTodos((current) => current.filter((item) => item.id !== todo.id))
              }
              className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
