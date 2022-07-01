import { BiTrash } from "solid-icons/bi";
import { For, Show } from "solid-js";
import { iTask } from "../../types";
import CurrentTask from "./CurrentTask";

const CompletedTasks = ({tasks}: {tasks: iTask[]}) => {
    return (
      <div>
        <h2 class="text-1xl font-extrabold text-green">Completed Tasks</h2>
        <Show
          when={tasks.filter(t=> t.isCompleted).length > 0}
          fallback={<p class="text-red">No tasks yet</p>}
        >
          <ul>
            <For each={ tasks.filter(t=> t.isCompleted)}>
              {(task) => (
               <li class="py-2 px-1 cursor-pointer hover:bg-gray flex">
                  <CurrentTask task={task} isComplete />
                  <button type="button" onClick={() => console.log('delete')}>
                      <BiTrash size={24} class="text-red hover:text-white" title="Delete task"/>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    );
  };

  export default CompletedTasks