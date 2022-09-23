const LinkTitle = ({ title }: { title: string }) => (
  <div className="group border-b border-yellow flex flex-row items-center mb-2 hover:border-white">
    <div className="group w-6 h-6 bg-yellow -mb-1 group-hover:bg-white"></div>
    <h2 className="text-2xl font-extrabold -mb-1 pl-2 group-hover:text-white">
      {title}
    </h2>
  </div>
)

export default LinkTitle
