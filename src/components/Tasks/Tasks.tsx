import { iTask } from "../../types";
import CompletedTasks from "./CompletedTasks";
import CurrentTasks from "./CurrentTasks";

type TasksProps = {
  tasks: iTask[];
  setTasks: (tasks: iTask[]) => void;
};

const Tasks = ({ tasks, setTasks }: TasksProps) => {
  console.log( tasks.length)
  return (
    <div class="flex space-x-4">
      <CurrentTasks tasks={tasks} setTasks={setTasks} />
      <CompletedTasks tasks={tasks} />
    </div>
  );
};

export default Tasks;
