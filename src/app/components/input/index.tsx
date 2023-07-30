import { FieldError } from "react-hook-form";

type TPInput = {
  label: string;
  type: string | undefined;
  error?: FieldError | undefined;
  register: any;
  defaulfValue?: string;
  className?: string;
  registerName?: string;
  placeholder: string;
};

export function Input({
  label,
  type,
  error,
  register,
  defaulfValue,
  className,
  registerName,
  placeholder,
}: TPInput) {
  return (
    <>
      <label className="text-white" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        defaultValue={defaulfValue}
        {...register(registerName)}
        placeholder={placeholder}
        className={`h-9 rounded -mt-1 mb-2 text-black text-sm p-2  ${className}`}
      />
      {error?.message && (
        <span className="text-xs -mt-3 w-fit p-1 text-white ">
          *{error.message}
        </span>
      )}
    </>
  );
}
