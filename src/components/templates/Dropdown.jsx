const Dropdown = ({ title, options, func, selected }) => {
  return (
    <div className="select">
      <select
        value={selected}   // controlled input
        onChange={func}
        name="format"
        id="format"
      >
        <option value="" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option value={o} key={i}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
