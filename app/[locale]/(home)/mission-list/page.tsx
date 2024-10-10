// 필요한 패키지에서 직접 import
import { Bell, Gift, Users } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';

const socialApps = [
  { name: '네이버', icon: 'N', unread: 216 },
  { name: '유튜브', icon: '▶', unread: 5 },
  { name: '인스타그램', icon: '📷', unread: 26 },
  { name: '카카오', icon: '💬', unread: 209 },
  { name: '페이스북', icon: 'f', unread: 0 },
];

export default function SmartScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold">미션</h1>
        <Bell className="h-6 w-6 text-gray-600" />
      </header>

      <main className="flex-grow p-4 space-y-4 pb-16">
        {socialApps.map((app) => (
          <Card key={app.name} className='cursor-pointer hover:bg-slate-400'>
            <CardBody >
                <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-lg font-bold mr-4">
                  {app.icon}
                </span>
                <div>
                  <p className="text-sm text-gray-500">{app.name}</p>
                  <p className="font-bold">미션하기</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-green-500 mr-2">
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
