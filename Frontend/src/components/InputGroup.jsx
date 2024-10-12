

export default function InputGroup({
  label,
  name,
  type,
  placeholder,
  value,
  setValue,
}) {
  return (
    <div className="input-group flex flex-col my-2">
      <label className="text-sm text-slate-700 mb-1">{label}</label>
      <input
        className="p-1 rounded-md border-gray-400 border-[1px] outline-none"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [name]: e.target.value }));
        }}
      />
    </div>
  );
}
