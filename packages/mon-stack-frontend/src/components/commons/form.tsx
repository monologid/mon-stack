import { FC } from 'react';
import { FieldSchema, FormProps, SelectOptionSchema } from '@/components/commons/form.types';
import { Input } from '@/components/commons/input';
import { Select } from '@/components/commons/select';

export const Form: FC<FormProps> = ({ fields, data, setData, className }) => {
	const onChange = (e: any) => {
		const { name, value, type, checked }: any = e.target;
		setData((prevData: any) => {
			return {
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	return (
		<div className={`${className?.rootContainer || 'space-y-5'}`}>
			{fields.map((field: FieldSchema, i: number) => (
				<div key={i} className={`space-y-2 ${className?.container || null}`}>
					{field.kind != 'checkbox' && field.kind != 'radio' ? (
						<div className={`text-gray-500 text-sm ${className?.label || null}`}>{field.label}</div>
					) : null}
					<div>{renderField(field, onChange, className)}</div>
				</div>
			))}
		</div>
	);
};

const renderField = (field: FieldSchema, onChange: any, className: any) => {
	switch (field.kind) {
		case 'select':
			return (
				<Select {...field} onChange={onChange} className={className?.field || null}>
					<option value={''}>Please select</option>
					{field.options?.map((option: SelectOptionSchema, i: number) => (
						<option key={i} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>
			);
		case 'checkbox':
			return (
				<div className={'flex items-center space-x-3'}>
					<Input type={field.kind} onChange={onChange} {...field} />
					<div className={`text-gray-500 text-sm ${className?.label || null}`}>{field.label}</div>
				</div>
			);
		case 'radio':
			return (
				<div className={'space-y-2'}>
					<div className={`text-gray-500 text-sm ${className?.label || null}`}>{field.label}</div>
					{field.options?.map((option: SelectOptionSchema, i: number) => (
						<div key={i} className={'flex items-center space-x-3'}>
							<Input type={field.kind} onChange={onChange} {...field} value={option.value} />
							<div className={`text-black  text-sm ${className?.label || null}`}>{option.label}</div>
						</div>
					))}
				</div>
			);
		default:
			return <Input type={field.kind} onChange={onChange} {...field} className={className?.field || null} />;
	}
};
