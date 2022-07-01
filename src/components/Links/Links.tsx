import { For, Show } from "solid-js";
import { ILink } from "../../types";
import Link from "./Link";
import { createSignal } from "solid-js";
import AddLinkConfig from "./AddLinkConfig";
import AddLink from "./AddLink";


type LinksProps = {
  links?: ILink[];
  setLinks: (links: ILink[]) => void;
};

const LinkDistributor = ({ links }: LinksProps) => {
  const middleIndex = Math.ceil(links.length / 2);

  const firstHalf = [...links].splice(0, middleIndex);
  const secondHalf = [...links].splice(-middleIndex);

  return (
    <Show
      when={links.length > 2}
      fallback={
        <ul class="max-w-[600px] min-w-[400px]">
          <For each={links}>
            {(link) => (
              <li class="pb-4">
                <Link link={link} />
              </li>
            )}
          </For>
        </ul>
      }
    >
      <ul class="max-w-[600px] min-w-[400px]">
        <For each={firstHalf}>
          {(link) => (
            <li class="pb-4">
              <Link link={link} />
            </li>
          )}
        </For>
      </ul>
      <ul class="max-w-[600px] min-w-[400px]">
        <For each={secondHalf}>
          {(link) => (
            <li class="pb-4">
              <Link link={link} />
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
};

const NoLinksYet = ({setLinks}: {setLinks: (links: ILink[]) => void;}) => { 
  const [state, setState] = createSignal(0);

  return <div class="flex space-y-2 flex-col">
    <p class="text-red">No links yet</p>
    <div class="space-x-1">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setState(1)}>Add config file</button>
      <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => setState(2)}>Add Links</button>
    </div>
    {state() === 1 && <AddLinkConfig setLinks={setLinks} />}
    {state() === 2 && <AddLink />}
  </div>
 }

const Links = ({ links = [], setLinks }: LinksProps) => {
  return (
    <div class="flex space-x-4">
      <Show
        when={links.length > 0}
        fallback={<NoLinksYet setLinks={setLinks} />}
      >
        <LinkDistributor links={links} setLinks={setLinks} />
      </Show>
    </div>
  );
};

export default Links;
