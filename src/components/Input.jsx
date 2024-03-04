const Input = ({ handleChange, value, title, name, color }) => {
  return (
      //onChange - used for handling input changes such as typed text or selected option values.
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;