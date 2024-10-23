// 필요한 패키지에서 직접 import
'use client'

import { Bell, Gift, Users } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { useRouter } from "next/navigation";
import useLocaleStore from "@store/useLocaleStore";



export default function SmartScreen() {
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();

  const socialApps = [
    { name: '네이버', icon: 'N', unread: 216,  onClick: () => {
      console.log(`Navigating to /${locale}/missions`); // 경로 확인용 로그
      router.push(`/${locale}/missions`);
    }},
    // { name: '유튜브', icon: '▶', unread: 5 },
    // { name: '인스타그램', icon: '📷', unread: 26 },
    // { name: '카카오', icon: '💬', unread: 209 },
    // { name: '페이스북', icon: 'f', unread: 0 },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">미션</h1>
        <Bell className="w-6 h-6 text-gray-600" />
      </header>

      <main className="p-4 pb-16 space-y-4">
        {socialApps.map((app) => (
          <Card key={app.name} className='w-full cursor-pointer hover:bg-slate-400' isPressable
          onPress={app.onClick}>
            <CardBody >
                <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 mr-4 text-lg font-bold bg-gray-200 rounded-lg">
                  {app.icon}
                </span>
                <div>
                  <p className="text-sm text-gray-500">{app.name}</p>
                  <p className="font-bold">미션하기</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mr-2 text-sm text-green-500">
                  남은 미션: {app.unread}
                </p>
                
              </div>
              </div>
            </CardBody>
          </Card>
        ))}
        
      </main>

     
    </div>
  );
}
