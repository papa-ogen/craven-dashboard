const LinkTitle = ({ title }: { title: string }) => (
  <div class="border-b border-yellow flex flex-row items-center mb-2">
    <div class="w-6 h-6 bg-yellow -mb-1"></div>
    <h2 class="text-2xl font-extrabold -mb-1 pl-2">{title}</h2>
  </div>
);

export default LinkTitle;
