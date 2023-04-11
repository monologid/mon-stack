import { Form } from '@/components/shared';
import { FC, useState } from 'react';
import { FormIntentProps } from './index.types';

export const FormIntentCreate: FC<FormIntentProps> = ({ data, setData }) => {
  const fields: any = [
    {
      kind: 'text',
      name: 'intent',
      label: 'Intent',
      className: 'w-full',
    },
    {
      kind: 'text',
      name: 'description',
      label: 'Description',
    },
  ];

  return <Form fields={fields} data={data} setData={setData} className={{ field: 'w-full' }} />;
};
