export interface FormProps {
	fields: FieldSchema[];
	data: any;
	setData: Function;
	className?: ClassNameSchema;
}

export interface FieldSchema {
	kind:
		| 'text'
		| 'password'
		| 'email'
		| 'number'
		| 'url'
		| 'date'
		| 'datetime-local'
		| 'time'
		| 'checkbox'
		| 'radio'
		| 'select';
	name: string;
	label: string;
	description?: string;
	options?: SelectOptionSchema[];
}

export interface SelectOptionSchema {
	label: string;
	value: string;
}

export interface ClassNameSchema {
	container?: string;
	field?: string;
	label?: string;
	rootContainer?: string;
}
