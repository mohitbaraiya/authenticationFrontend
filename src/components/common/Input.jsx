import { ErrorMessage } from "formik";

function Input({
  label,
  htmlFor,
  divClassName,
  labelClassName,
  form,
  field,
  input,
  disabled,
  className,
  showIcon = false,
  Icon,
  iconOnClick,
  iconClassNames,
}) {
  return (
    <div className={divClassName ? divClassName : " my-3"}>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      <div
        className={`mt-1 relative ${
          disabled === true ? "opacity-50 " : "opacity-100"
        }`}
      >
        <input
          {...input}
          className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm ${
            form.touched[field.name] && form.errors[field.name]
              ? "bg-red-200 focus:border-red-500 focus:ring-red-500"
              : "focus:bg-indigo-100 focus:border-indigo-500 focus:ring-indigo-500"
          } ${className || ""}`}
          {...field}
          disabled={disabled ? disabled : false}
        />
        {showIcon && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${iconClassNames}`}
            onClick={iconOnClick}
          >
            <Icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <ErrorMessage name={field.name}>
          {(message) => (
            <div className="text-sm text-red-600 capitalize">{message}</div>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
}
export default Input;
