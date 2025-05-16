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
  textColor = "white",
  backgroundColor = "var(--color-primary-light)",
  textSize = "md",
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

  const getTextSizeClasses = () => {
    switch (textSize) {
      case "sm":
        return "0.75rem";
      case "md":
        return "0.875rem";
      case "lg":
        return "1rem";
      default:
        return "0.875rem";
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
                px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
            `}
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            fontSize: getTextSizeClasses(),
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
