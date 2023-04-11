import { Button, Heading, Modal, Table, TableColumn } from '@/components/shared';
import useDataState from '@/hooks/use-data-state';
import AdminLayout from '@/layouts/admin-layout';
import { adminGetServerSideProps } from '@/utils/page';

export const getServerSideProps = adminGetServerSideProps;

export default function AdminDashboard(props: any) {
  const [state, setState] = useDataState({
    showAddIntentModal: false
  })

  const data = [
    { intent: 'greetings.hello', description: 'Intent for welcome.' },
    { intent: 'greetings.goodbye', description: 'Intent for saying goodbye.' },
  ];

  return (
    <AdminLayout title={'Intent Classifications'} {...props}>
      <div className={'flex justify-between items-center mb-4'}>
        <Heading variant='h1'>Intent Classifications</Heading>
        <Button size={'xs'} onClick={() => setState({ showAddIntentModal: true })}>+ Add</Button>
      </div>
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

      <Modal title={'Add new Intent'}
        isOpen={state.showAddIntentModal}
        onClose={() => setState({ showAddIntentModal: false })}
        footer={
          <div className={'flex items-center space-x-2'}>
            <Button size={'xs'} variant={'none'} onClick={() => setState({ showAddIntentModal: false })}>Cancel</Button>
            <Button size={'xs'} variant={'primary'}>Submit</Button>
          </div>
        }>
          <Button size={'xs'} variant={'primary'}>Submit</Button>
      </Modal>
    </AdminLayout>
  );
}
