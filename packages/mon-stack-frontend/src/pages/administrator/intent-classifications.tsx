import { Heading, Table, TableColumn } from '@/components/shared';
import AdminLayout from '@/layouts/admin-layout';
import { adminGetServerSideProps } from '@/utils/page';

export const getServerSideProps = adminGetServerSideProps;

export default function AdminDashboard(props: any) {
  const data = [
    { intent: 'greetings.hello', description: 'Intent for welcome.' },
    { intent: 'greetings.goodbye', description: 'Intent for saying goodbye.' },
  ];

  return (
    <AdminLayout title={'Intent classNameifications'} {...props}>
      <Heading variant='h1'>Intent Classifications</Heading>
      <Table columns={['Intent', 'Description', 'Actions']}>
        {data.map((d: any, i: number) => (
          <tr key={i}>
            <TableColumn>{d.intent}</TableColumn>
            <TableColumn>{d.description}</TableColumn>
            <TableColumn>
              <div></div>
            </TableColumn>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}
