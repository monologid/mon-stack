import AdminLayout from '@/layouts/admin-layout';
import { adminGetServerSideProps } from '@/utils/page';

export const getServerSideProps = adminGetServerSideProps;

export default function AdminDashboard(props: any) {
  return <AdminLayout title={'Intent Classifications'} {...props}></AdminLayout>;
}
