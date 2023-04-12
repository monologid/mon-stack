import { FormIntentCreate } from '@/components/form/intent';
import { Button, Form, Heading, Modal, Table, TableColumn } from '@/components/shared';
import useDataState from '@/hooks/use-data-state';
import AdminLayout from '@/layouts/admin-layout';
import { fetchApi } from '@/utils/fetch-api';
import { adminGetServerSideProps } from '@/utils/page';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const getServerSideProps = adminGetServerSideProps;

export default function AdminIntentClassifications(props: any) {
  const [state, setState] = useDataState({
    isLoading: false,
    showAddIntentModal: false,
    intents: [],
  });

  const data = [
    { intent: 'greetings.hello', description: 'Intent for welcome.' },
    { intent: 'greetings.goodbye', description: 'Intent for saying goodbye.' },
  ];

  const [formData, setFormData] = useState<any>({});

  const onClickFormIntentCreateSubmit = async () => {
    setState({ isLoading: true });
    const url: string = '/api/v1/backend';
    const body: any = {
      method: 'POST',
      api: '/api/cortex-intents',
      payload: {
        data: { ...formData },
      },
    };

    const result = await fetchApi({ url, method: 'POST', data: body });
    if (result.error) {
      const { errors }: any = result.error.details;
      let errorMsg: string = '';
      let tempMsg: string = '';
      if (Array.isArray(errors)) {
        errors.forEach((err: any) => (tempMsg += `- ${err.message}\n`));
        errorMsg += `Errors:\n${tempMsg}`;
      } else {
        errorMsg = result.error.message;
      }
      setState({ isLoading: false });
      alert(errorMsg);
      return;
    }

    window.location.reload();
  };

  const getIntents = async () => {
    setState({ isLoading: true, showAddIntentModal: true });
    const url: string = '/api/v1/backend';
    const body: any = {
      method: 'GET',
      api: '/api/cortex-intents',
    };

    const result = await fetchApi({ url, method: 'POST', data: body });
    setState({ isLoading: false, showAddIntentModal: false, intents: result.data ? result.data : [] });
  };

  useEffect(() => {
    getIntents();
  }, []);

  return (
    <AdminLayout title={'Intent Classifications'} {...props}>
      <div className={'flex justify-between items-center mb-4'}>
        <Heading variant='h1'>Intent Classifications</Heading>
        <Button size={'xs'} onClick={() => setState({ showAddIntentModal: true })}>
          + Add
        </Button>
      </div>
      <Table columns={['Intent', 'Description']}>
        {state.intents.map((d: any, i: number) => (
          <tr key={i}>
            <TableColumn>
              <Link href={`/administrator/intent-classifications/${d.attributes.intent}`} className={'hover:underline'}>
                {d.attributes.intent}
              </Link>
            </TableColumn>
            <TableColumn>{d.attributes.description}</TableColumn>
          </tr>
        ))}
      </Table>

      <Modal
        title={'Add new Intent'}
        isLoading={state.isLoading}
        isOpen={state.showAddIntentModal}
        loadingMessage={'Creating new intent ...'}
        onClose={() => setState({ showAddIntentModal: false })}
        footer={
          <div className={'w-full flex justify-end items-center space-x-2'}>
            <Button size={'xs'} variant={'none'} onClick={() => setState({ showAddIntentModal: false })}>
              Cancel
            </Button>
            <Button size={'xs'} variant={'primary'} onClick={onClickFormIntentCreateSubmit}>
              Submit
            </Button>
          </div>
        }
      >
        <FormIntentCreate data={formData} setData={setFormData} />
      </Modal>
    </AdminLayout>
  );
}
