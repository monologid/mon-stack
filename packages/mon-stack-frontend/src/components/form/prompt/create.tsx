import { Form } from '@/components/shared';
import { FC } from 'react';
import { FormPromptProps } from './index.types';

export const FormPromptCreate: FC<FormPromptProps> = ({ data, setData }) => {
  const fields: any = [
    {
      kind: 'text',
      name: 'prompt',
      label: 'Prompt',
      className: 'w-full',
    },
  ];

  return <Form fields={fields} data={data} setData={setData} className={{ field: 'w-full' }} />;
};
