import { ErrorBoundary, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getTasks } from "../svc/taskSvc";
import { iTask } from "../types";
import dashboardConfig from "../__mocks__/dbConfig";
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
  const [tasks, setTasks] = createStore([]);

  onMount(async () => {
    const _tasks = await getTasks();

    if (_tasks) setTasks(_tasks);
  });

  return (
    <ErrorBoundary fallback={(err: any) => err}>
      <div class="flex flex-col p-4">
        <Header />
        <div class="text-lightGray flex">
          <div class="grow">
            <Links links={dashboardConfig.dblinks} />
          </div>
          <div class="w-[500px]">
            <Tasks tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
