interface ToolTipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  textColor?: string;
  backgroundColor?: string;
  textSize?: string;
}

const ToolTip = ({
  children,
  text,
  position = "top",
  textColor = "black",
  backgroundColor = "white",
  textSize = "sm",
}: ToolTipProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none">
        <div
          className={`
                absolute  truncate
                ${getPositionClasses()} 
                text-${textColor}
                bg-${backgroundColor}
                text-${textSize}
                px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
            `}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
