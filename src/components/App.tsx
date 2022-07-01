import { ErrorBoundary, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getTasks } from "../svc/taskSvc";
import { getLinks } from "../svc/linksSvc";
import { iTask, IConfig } from "../types";
import Links from "./Links/Links";
import Tasks from "./Tasks";

const Header = () => {
  return (
    <h1 class="text-4xl font-extrabold tracking-wide text-center pb-2">
      <span class="text-orange">craven</span>
      <span class="text-lightGray">Dashboard</span>
    </h1>
  );
};

const App = () => {
  const [config, setConfig] = createStore<IConfig>({
    dblinks: [],
    tasks: []
  });

  onMount(async () => {
    const dblinks = await getLinks();
    const tasks = await getTasks();

    setConfig({
      ...config,
      dblinks,
      tasks
    })
  });

  const onSetTasks = (tasks: iTask[]) => { 
    setConfig({...config, tasks})
   } 

   return (
     <ErrorBoundary fallback={(err: any) => err}>
      <div class="flex flex-col p-4">
        <Header />
        <div class="text-lightGray flex">
          <div class="grow">
            <Links links={config.dblinks} />
          </div>
          <div class="w-[500px]">
            <Tasks tasks={config.tasks} setTasks={onSetTasks} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
