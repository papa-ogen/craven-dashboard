import { For, Show } from "solid-js";
import { ICredential } from "../../types";
import Input from "../Input";
import Url from "./Url";

const Credential = ({
  credential: { id, name, descr, url, username, password },
}: {
  credential: ICredential;
}) => {
  return (
    <div class="border border-black rounded-lg my-2">
      <h3 class="font-bold text-xl bg-gray p-1 rounded-md rounded-b-none">
        {name}
      </h3>
      <div class="p-2">
        <p class="pb-1">{descr}</p>
        <Show when={url.length > 0}>
          <ul class="pb-1">
            <For each={url}>
              {(u) => (
                <li>
                  <Url url={u} />
                </li>
              )}
            </For>
          </ul>
        </Show>
        <Show when={username}>
          <Input id={`${id}-username`} label="username" value={username} />
        </Show>
        <Show when={password}>
          <Input
            id={`${id}-password`}
            label="password"
            value={password}
            type="password"
          />
        </Show>
      </div>
    </div>
  );
};

export default Credential;
