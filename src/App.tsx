import { render } from "solid-js/web";
import HelloWorld from "./HelloWorld";

import "./index.css";

render(
  () => <HelloWorld name="Jörgen" />,
  document.getElementById("craven-dashboard")
);
