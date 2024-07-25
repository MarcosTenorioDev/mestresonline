import { Field, ErrorMessage, useField } from "formik";
import { MultiSelect } from "../ui/multi-select";

const Input = (props: any) => {
  return (
    <div className={`flex flex-col ${props.componentClassName}`}>
      <label
        htmlFor={props.control}
        className={`${props.className} font-primary font-semibold mb-1"`}
      >
        {props.children}
      </label>
      <Field
        type="text"
        id={props.control}
        name={props.control}
        className={
          props.fieldClassName
            ? `${props.fieldClassName} border-2 border-primary h-10 rounded-lg`
            : "border-2 border-primary h-10 rounded-lg"
        }
        placeholder={props.placeholder}
      />
      {props.info ? props.info : ""}
      <ErrorMessage
        name={props.control}
        component="p"
        className="text-red-500 font-medium"
      />
    </div>
  );
};

const Select = (props: any) => {
  const { control, options, className, fieldClassName, info } = props;

  return (
    <div className={`flex flex-col ${props.componentClassName}`}>
      <label
        htmlFor={control}
        className={`${className} font-primary font-semibold`}
      >
        {props.children}
      </label>
      <Field
        as="select"
        id={control}
        name={control}
        className={
          fieldClassName
            ? fieldClassName
            : "border-2 border-primary h-10 rounded-lg bg-white px-2"
        }
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {info ? info : ""}
      <ErrorMessage
        name={control}
        component="p"
        className="text-red-500 font-medium"
      />
    </div>
  );
};

interface FormikMultiSelectProps {
  control: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  placeholder?: string;
  variant?: string;
  animation?: number;
  className?: string;
  fieldClassName?: string;
  info?: React.ReactNode;
  componentClassName?:string,
  children?:any,
  onValueChange?: (value: any[]) => void; // Função personalizada recebida via props
}

const FormikMultiSelect = (props: FormikMultiSelectProps) => {
  const { control, options, placeholder, variant, animation, className, fieldClassName, info, onValueChange } = props;
  const [field]:any = useField(control);

  const handleValueChange = (value: any[]) => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className={`flex flex-col ${props.componentClassName}`}>
      <label htmlFor={control} className={`${className} font-primary font-semibold`}>
        {props.children}
      </label>
      <MultiSelect
        {...field}
        options={options}
        onValueChange={handleValueChange}
        defaultValue={field.value}
        placeholder={placeholder}
        variant={variant}
        animation={animation}
        className={fieldClassName ? fieldClassName : "border-2 border-primary rounded-lg"}
      />
      {info ? info : ""}
      <ErrorMessage name={control} component="p" className="text-red-500 font-medium" />
    </div>
  );
};



export { Input, Select, FormikMultiSelect };
