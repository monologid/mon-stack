import { FC } from 'react';
import { TableProps, TableColumnProps } from './table.types';

export const Table: FC<TableProps> = (props) => {
  return (
    <div className={'relative rounded overflow-auto '}>
      <table className={'border-collapse table-auto w-full text-sm'}>
        <thead className={'bg-slate-100'}>
          <tr>
            {props.columns.map((col: string, i: number) => (
              <th
                key={i}
                className={
                  'border-b dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left'
                }
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export const TableColumn: FC<TableColumnProps> = (props) => {
  return (
    <td className={'border-b border-slate-100 dark:border-slate-800 p-4 text-slate-600 dark:text-slate-400'}>
      {props.children}
    </td>
  );
};
