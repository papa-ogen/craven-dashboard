import { iTask } from "../../types";

const formatDate = (date: number):string => { 
    const d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
   }
  
  const CurrentTask = ({ task, onCompleteTask, isComplete }: { task: iTask; onCompleteTask?: (task: iTask) => void; isComplete?:boolean }) => {
    const formatedDate = formatDate(task.createdAt)
    return (
      <div class={`flex items-center${isComplete ? ' line-through': ''}`} onClick={() => onCompleteTask(task)}>
        <p class="grow truncate pr-2">{task.title}</p>
        <p class="text-[10px] break-normal">{formatedDate}</p>
      </div>
    );
  };

  
  export default CurrentTask