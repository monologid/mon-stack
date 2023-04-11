import { FC } from 'react';
import { BaseHeadProps } from './base-head.types';
import BaseLayout from './base-layout';
import Link from 'next/link';

interface AdminLayoutProps extends BaseHeadProps {}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
  const menuItems = [
    { label: 'Dashboard', href: '/administrator' },
    { label: 'Intent Classifications', href: '/administrator/intent-classifications' },
  ];

  return (
    <BaseLayout {...props}>
      <div className={'w-full h-screen flex'}>
        <div className={'bg-slate-50 w-[300px] h-screen p-5 border-r border-slate-200'}>
          <div className={'uppercase font-bold text-gray-500 text-xs tracking-wider mb-7'}>Administrator</div>
          <nav>
            <ul className={'text-sm space-y-2'}>
              {menuItems.map((menu: any, i: number) => (
                <li
                  key={i}
                  className={
                    menu.label.toLowerCase() == props.title.toLowerCase()
                      ? 'font-semibold'
                      : 'text-gray-600 hover:text-black'
                  }
                >
                  <Link href={menu.href}>{menu.label}</Link>
                </li>
              ))}
              <li className={'text-gray-600 hover:text-black'}>
                <Link href='/sign-out'>Sign Out</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={'w-full col-span-10 h-screen p-5 overflow-y-auto'}>
          {props.children}
        </div>
      </div>
    </BaseLayout>
  );
};

export default AdminLayout;
