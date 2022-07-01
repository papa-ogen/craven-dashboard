import { ErrorBoundary, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getTasks } from "../svc/taskSvc";
import { getLinks } from "../svc/linksSvc";
import { iTask, ILink } from "../types";
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
  const [task, setTask] = createStore<iTask[]>([])
  const [links, setLinks] = createStore<ILink[]>([])

  onMount(async () => {
    const dblinks = await getLinks();
    const tasks = await getTasks();

    setTask(tasks)
    setLinks(dblinks)
  });

   return (
     <ErrorBoundary fallback={(err: any) => err}>
      <div class="flex flex-col p-4">
        <Header />
        <div class="text-lightGray flex">
          <div class="grow">
            <Links links={links} setLinks={setLinks} />
          </div>
          <div class="w-[500px]">
            <Tasks tasks={task} setTasks={setTask} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
