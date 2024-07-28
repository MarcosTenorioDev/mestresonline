import { Field, ErrorMessage, useField } from "formik";
import { MultiSelect } from "../ui/multi-select";
import { cn } from "@/lib/utils";

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
	componentClassName?: string;
	children?: any;
	onValueChange?: (value: any[]) => void; // Função personalizada recebida via props
}

const Input = (props: any) => {
	return (
		<div className={`flex flex-col ${props.componentClassName}`}>
			<label
				htmlFor={props.control}
				className={`${props.className} font-primary font-semibold pb-2`}
			>
				{props.children}
			</label>
			<Field
				type="text"
				id={props.control}
				name={props.control}
				className={
					props.fieldClassName
						? `${props.fieldClassName} border-2 border-primary h-10 rounded-lg px-4`
						: "border-2 border-primary h-10 rounded-lg px-4"
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

const TextAreaFormik = (props: any) => {
  const {
    componentClassName,
    onValueChange,
    control,
    className,
    children,
    fieldClassName,
    placeholder,
    info,
    rows,
  } = props;

  const handleValueChange = (input: any) => {
    if (onValueChange) {
      onValueChange(input.target.value);
    }
  };

  return (
    <div className={`flex flex-col w-full ${componentClassName}`}>
      <label
        htmlFor={control}
        className={cn("font-primary font-semibold mb-1", className)}
      >
        {children}
      </label>
      <Field
        as="textarea"
        id={control}
        name={control}
        className={cn(
          "border-2 border-primary rounded-lg px-2",
          fieldClassName
        )}
        placeholder={placeholder}
        onChange={handleValueChange}
        rows={rows} // Passando a prop rows
      />
      {info ? info : ""}
      <ErrorMessage
        name={control}
        component="p"
        className="text-red-500 font-medium"
      />
    </div>
  );
};

const FormikMultiSelect = (props: FormikMultiSelectProps) => {
	const {
		control,
		options,
		placeholder,
		variant,
		animation,
		className,
		fieldClassName,
		info,
		onValueChange,
	} = props;
	const [field]: any = useField(control);

	const handleValueChange = (value: any[]) => {
		if (onValueChange) {
			onValueChange(value);
		}
	};

	return (
		<div className={`flex flex-col ${props.componentClassName}`}>
			<label
				htmlFor={control}
				className={`${className} font-primary font-semibold`}
			>
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
				className={
					fieldClassName ? fieldClassName : "border-2 border-primary rounded-lg"
				}
			/>
			{info ? info : ""}
			<ErrorMessage
				name={control}
				component="p"
				className="text-red-500 font-medium"
			/>
		</div>
	);
};

export { Input, FormikMultiSelect, TextAreaFormik };
