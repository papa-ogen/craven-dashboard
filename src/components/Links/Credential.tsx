import { For, Show } from "solid-js";
import { createSignal } from "solid-js";
import { BsChevronCompactDown, BsChevronCompactUp } from 'solid-icons/bs'
import { ICredential } from "../../types";
import Input from "../Input";
import Url from "./Url";

const Credential = ({
  credential: { id, name, descr, url, username, password },
}: {
  credential: ICredential;
}) => {
  const [isOpen, setIsOpen] = createSignal(true);
  const onToggle = () => { 
    setIsOpen(!isOpen())
   }

   return (
    <li class="border border-black rounded-lg my-2">
      <h3 class="font-bold text-xl bg-gray py-1 px-2 rounded-md rounded-b-none flex hover:bg-opacity-70">
        <span class="grow">
          {name}
        </span>       
        <button onclick={() => onToggle()}>
          {isOpen() ? 
          <BsChevronCompactUp class="color-white text-lg"/> :
          <BsChevronCompactDown class="color-white text-lg"/> 
        }
        </button>
      </h3>
      <div class={`p-2${!isOpen() ? ' hidden' :'' }`}>
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
    </li>
  );
};

export default Credential;
