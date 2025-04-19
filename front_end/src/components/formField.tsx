interface FormFieldProps {
  label: string;
  type: "password" | "text" | "email" | "number" | "tel";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function FormField(props: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-medium mb-2">
        {props.label}
      </label>
      <input
        type={props.type}

        value={props.value}
        onChange={props.onChange}

        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        placeholder={props.placeholder}
      />
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
}

export default FormField;
