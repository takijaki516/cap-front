const Grid = ({ title, children, className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold pb-4">{title}</h2>
      <div className="grid grid-cols-auto-fill gap-6">{children}</div>
    </div>
  );
};

export default Grid;
