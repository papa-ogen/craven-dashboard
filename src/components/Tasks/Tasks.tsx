import { For, Show } from "solid-js";
import { addTask } from "../../svc/taskSvc";
import { iTask } from "../../types";
import Input from "../Input";

const CurrentTask = ({ task }: { task: iTask }) => {
  return (
    <div class="flex items-center">
      <p class="grow">{task.title}</p>
      <p class="text-xs">{task.createdAt.toString()}</p>
    </div>
  );
};

type CurrentTasksProps = {
  tasks: iTask[];
  setTasks: (tasks: iTask[]) => void;
};

const CurrentTasks = ({ tasks, setTasks }: CurrentTasksProps) => {
  const onAddTask = (e: any) => {
    if (e.key === "Enter") {
      const task = addTask(e.target.value);

      setTasks([...tasks, task]);

      e.target.value = "";

      console.log("task added! ", task);
    }
  };

  return (
    <div>
      <h2 class="text-1xl font-extrabold text-blue">Current Tasks</h2>
      <Input id="add-task" onKeyDown={onAddTask} placeholder="Add task" />
      <Show
        when={tasks.length > 0}
        fallback={<p class="text-red">No tasks yet</p>}
      >
        <ul>
          <For each={tasks}>
            {(task) => (
              <li class="pb-4">
                <CurrentTask task={task} />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

const CompletedTasks = () => {
  return (
    <div>
      <h2 class="text-1xl font-extrabold text-green">Completed Tasks</h2>
    </div>
  );
};

type TasksProps = {
  tasks: iTask[];
  setTasks: (tasks: iTask[]) => void;
};

const Tasks = ({ tasks, setTasks }: TasksProps) => {
  return (
    <div class="flex space-x-4">
      <CurrentTasks tasks={tasks} setTasks={setTasks} />
      <CompletedTasks />
    </div>
  );
};

export default Tasks;
