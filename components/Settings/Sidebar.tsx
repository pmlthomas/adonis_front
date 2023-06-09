import React from 'react';
import { useRouter } from 'next/router';
import { BsPersonCircle, BsBrush, BsShieldLock } from 'react-icons/bs';

export default function Sidebar() {
  const { push, pathname } = useRouter();
  const settingsSubPages = [
    {
      name: 'Profil',
      routeName: '/settings',
      icon: <BsPersonCircle size={18} />,
    },
    {
      name: 'Mot de passe',
      routeName: '/settings/new-password',
      icon: <BsShieldLock size={18} />,
    },
    {
      name: 'Appearance',
      routeName: '/settings/appearance',
      icon: <BsBrush size={16} />,
    },
  ];

  const sidebarMapping = settingsSubPages.map((el, i) => {
    return (
      <div className="flex" key={i}>
        <div
          className={`w-1 ${pathname === el.routeName && 'bg-blue-600'}`}
        ></div>
        <div
          onClick={() => {
            pathname != el.routeName && push(el.routeName);
          }}
          className={`flex w-full mr-8 p-2 pr-8 pl-[14px] cursor-pointer ${
            pathname === el.routeName &&
            'bg-gray-100 dark:bg-gray-900 rounded-r-md'
          }`}
        >
          <div className="mt-[4px]">{el.icon}</div>
          <div className="ml-2">{el.name}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col h-fit w-[270px]">
      <div className="mt-8">{sidebarMapping}</div>
    </div>
  );
}
