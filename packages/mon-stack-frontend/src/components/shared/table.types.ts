import { PropsWithChildren } from 'react';

export interface TableProps extends PropsWithChildren {
  columns: Array<string>;
}

export interface TableColumnProps extends PropsWithChildren {}
