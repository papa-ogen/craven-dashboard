import { For, Show } from "solid-js";
import { addTask, updateTask } from "../../svc/taskSvc";
import { iTask } from "../../types";
import Input from "../Input";
import CurrentTask from "./CurrentTask";

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
  
      }
    };
  
    const onCompleteTask = (task: iTask) => { 
      const completedTask:iTask = {...task, isCompleted: true}
      const updatedTasks = tasks.map(t => {
        if(t.id === task.id) return completedTask
  
        return {...t}
      })
  
      updateTask(completedTask)
      setTasks(updatedTasks)
     }
  
    return (
      <div>
        <h2 class="text-1xl font-extrabold text-blue">Current Tasks</h2>
        <Input id="add-task" onKeyDown={onAddTask} placeholder="Add task" />
        <Show
          when={tasks.filter(t=> !t.isCompleted).length > 0}
          fallback={<p class="text-red">No tasks yet</p>}
        >
          <ul>
            <For each={tasks.filter(t=> !t.isCompleted)}>
              {(task) => (
                <li class="py-2 px-1 cursor-pointer hover:bg-gray">
                  <CurrentTask task={task} onCompleteTask={onCompleteTask} />
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    );
  };

  
  export default CurrentTasks