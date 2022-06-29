import { For, Show } from "solid-js";
import { ILink } from "../../types";
import Link from "./Link";

type LinksProps = {
  links?: ILink[];
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

const Links = ({ links = [] }: LinksProps) => {
  return (
    <div class="flex space-x-4">
      <Show
        when={links.length > 0}
        fallback={<p class="text-red">No links yet</p>}
      >
        <LinkDistributor links={links} />
      </Show>
    </div>
  );
};

export default Links;
