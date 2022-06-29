import { iTask } from "../types";

const nameSpace = "craven-dashboard-tasks";

export const getTasks = (): iTask[] => {
  const data = localStorage.getItem(nameSpace);

  return data ? JSON.parse(data) : [];
};

export const addTask = (title: string): iTask => {
  const tasks: iTask[] = getTasks();
  const task: iTask = {
    id: `task-${tasks.length}`,
    title,
    createdAt: Date.now(),
  };

  localStorage.setItem(nameSpace, JSON.stringify([...tasks, task]));

  return task;
};

export const deleteTask = (id: string) => {
  const tasks = getTasks();
  // localStorage.setItem(`${nameSpace}-${id}`, data);
};
