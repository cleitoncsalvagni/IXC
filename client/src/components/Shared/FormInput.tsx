import { UseFormRegisterReturn } from "react-hook-form";

export type HTMLCustomInputElement = HTMLInputElement | HTMLTextAreaElement;
export interface InputProps
  extends React.InputHTMLAttributes<HTMLCustomInputElement> {
  required?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  errorMessage?: string;
  classNames?: InputClasses;
  label?: string;
  yupRegister?: UseFormRegisterReturn;
  multipleLines?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLCustomInputElement>) => void;
}

interface InputClasses {
  root?: string;
  container?: string;
  input?: string;
  error?: string;
  left?: string;
  right?: string;
  label?: string;
}

const RenderIcon = ({
  icon,
  isLeft,
  className,
}: {
  icon: React.ReactNode;
  isLeft?: boolean;
  className?: string;
}) => {
  return (
    <span
      aria-hidden="true"
      className={`${isLeft ? "mr-2" : "ml-2"} text-zinc-400 ${className}`}
    >
      {icon}
    </span>
  );
};

export const FormInput: React.FC<InputProps> = ({
  required,
  left,
  right,
  yupRegister,
  classNames,
  errorMessage,
  onChange,
  multipleLines,
  ...inputProps
}) => {
  const hasError = !!errorMessage;

  const containerClassName = classNames?.container || "";

  const hasContainerBg = containerClassName.includes("bg");
  const hasContainerDimensions =
    containerClassName.includes("h-") || containerClassName.includes("w-");

  const labelConditionalClass = required
    ? "after:ml-1 after:text-red-500 after:content-['*']"
    : "";

  const containerConditionalClasses = `${
    !hasContainerDimensions && "h-[3.2rem]"
  } ${!hasContainerBg && "bg-zinc-100"} ${hasError ? "border-red-500" : ""}`;

  const inputBaseClass = `h-full w-full bg-transparent text-sm focus:outline-none  ${classNames?.input}`;

  return (
    <fieldset className={`flex w-full flex-col ${classNames?.root || ""}`}>
      {inputProps.label && (
        <label
          htmlFor={inputProps.id}
          className={`mb-2 text-sm ${labelConditionalClass} ${
            classNames?.label || ""
          }`}
        >
          {inputProps.label}
        </label>
      )}

      <div
        className={`flex items-center rounded-md border-2 px-2 transition-transform focus-within:border-black  border-transparent  ${containerConditionalClasses} ${containerClassName}`}
      >
        {left ? (
          <RenderIcon icon={left} className={classNames?.left} isLeft />
        ) : null}

        {multipleLines ? (
          <textarea
            required={required}
            className={`${inputBaseClass} resize-none`}
            maxLength={300}
            onChange={onChange}
            {...yupRegister}
            {...inputProps}
          />
        ) : (
          <input
            type="text"
            required={required}
            className={inputBaseClass}
            maxLength={50}
            onChange={onChange}
            {...yupRegister}
            {...inputProps}
          />
        )}

        {right ? (
          <RenderIcon icon={right} className={classNames?.right} />
        ) : null}
      </div>

      {hasError && (
        <span
          role="alert"
          className={`mt-1 text-[11px] text-red-500 ${classNames?.error}`}
        >
          {errorMessage}
        </span>
      )}
    </fieldset>
  );
};
