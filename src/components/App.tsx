import dashboardConfig from "../__mocks__/dbConfig";
import Links from "./Links";

const Header = () => {
  return (
    <h1 class="text-4xl font-extrabold tracking-wide text-center p-2">
      <span class="text-orange">craven</span>
      <span class="text-lightGray">Dashboard</span>
    </h1>
  );
};

const App = () => (
  <div class="flex flex-col">
    <Header />
    <div class="text-lightGray flex">
      <div class="grow p-4">
        <Links links={dashboardConfig.dblinks} />
      </div>
      <div class="max-w-xs">todo</div>
    </div>
  </div>
);

export default App;
