interface ButtonProps {
  text: string;
  onClick?: () => void;
  isSubmit?: boolean;
}

function Button(props: ButtonProps) {
  return (
    <button
      type={props.isSubmit ? "submit" : "button"}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 mt-4"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
