import { Eye, EyeOff } from "react-feather";

export const VisibilityPassSwitch = ({
  visible,
  handler,
}: {
  visible: boolean;
  handler: () => void;
}) => {
  const Icon = visible ? EyeOff : Eye;

  return (
    <button className="flex focus:outline-none" type="button" onClick={handler}>
      <Icon
        className="pointer-events-none text-2xl text-default-400"
        size={18}
      />
    </button>
  );
};
