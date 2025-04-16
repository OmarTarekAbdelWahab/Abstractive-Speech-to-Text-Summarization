interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 mt-4"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
