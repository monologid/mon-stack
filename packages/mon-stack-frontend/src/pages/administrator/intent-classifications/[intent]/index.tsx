import { Button, Heading, Modal, Table, TableColumn } from "@/components/shared";
import useDataState from "@/hooks/use-data-state";
import AdminLayout from "@/layouts/admin-layout";
import { fetchApi } from "@/utils/fetch-api";
import { adminGetServerSideProps } from "@/utils/page";
import { NextPageContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (ctx: NextPageContext) => {
  let { props, redirect }: any = await adminGetServerSideProps(ctx);
  if (redirect) return { redirect }

  const { intent }: any = ctx.query
  if (!intent) return {
    redirect: {
      destination: '/error?message=Invalid intent&prevUrl=/administrator/intent-classifications'
    }
  }

  const url: string = `${process.env.BASE_URL}/api/v1/backend`
  let body: any = {
    method: 'GET',
    api: `/api/cortex-intents?filters[intent][$eq]=${intent}`
  }
  let result: any = await fetchApi({ url, method: 'POST', headers: ctx.req?.headers, data: body });
  if (result.data && result.data.length > 0) props.intentDetail = result.data[0].attributes
  props.intent = intent

  body = {
    method: 'GET',
    api: `/api/cortex-prompts?filters[intent][$eq]=${intent}`
  }
  result = await fetchApi({ url, method: 'POST', headers: ctx.req?.headers, data: body });
  if (result.data && result.data.length > 0) props.prompts = result.data
  props.intent = intent

  return {
    props
  }
}

export default function AdminIntentClassificationsDetail(props: any) {
  const [state, setState] = useDataState({
    isLoading: false,
    showAddPromptModal: false,
    intents: [],
  });

  const onClickFormAddPromptSubmit = async () => {

  }

  return (
    <AdminLayout title={'Intent Classifications'} {...props}>
      <div className={'flex justify-between items-center mb-4'}>
        <Heading variant='h1'>Intent Details</Heading>
        <div className={'flex space-x-2'}>
          <Button size={'xs'} onClick={() => setState({ showAddPromptModal: true })}>
            + Add Prompt
          </Button>
          <Link href={`/administrator/intent-classifications/${props.intent}/workflow`}>
            <Button size={'xs'} variant={'none'}>
              Edit Workflow
            </Button>
          </Link>
        </div>
      </div>

      <div className={'space-y-5'}>
        <Table columns={['Intent', 'Description']}>
          <tr>
            <TableColumn>{props.intentDetail.intent}</TableColumn>
            <TableColumn>{props.intentDetail.description}</TableColumn>
          </tr>
        </Table>

        <Table columns={['Prompt', 'Locale']}>
          {props.prompts.map((prompt: any, i: number) => (
            <tr key={i}>
              <TableColumn>{prompt.attributes.prompt}</TableColumn>
              <TableColumn>{prompt.attributes.locale}</TableColumn>
            </tr>
          ))}
        </Table>
      </div>

      <Modal title={'Add new Prompt'}
        isLoading={state.isLoading}
        isOpen={state.showAddPromptModal}
        onClose={() => setState({ showAddPromptModal: false })}
        footer={
          <div className={'w-full flex justify-end items-center space-x-2'}>
            <Button size={'xs'} variant={'none'} onClick={() => setState({ showAddPromptModal: false })}>
              Cancel
            </Button>
            <Button size={'xs'} variant={'primary'} onClick={onClickFormAddPromptSubmit}>
              Submit
            </Button>
          </div>
        }>

      </Modal>
    </AdminLayout>
  )
}