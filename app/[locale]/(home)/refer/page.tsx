"use client";
import { useState } from 'react';
import { ArrowLeft, Copy, Users, Gift } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import toast, { Toaster } from 'react-hot-toast'; // 토스트 라이브러리 추가

export default function ReferFriend() {
  const [activeTab, setActiveTab] = useState('refer');
  const [nickname, setNickname] = useState('neobill');
  const inviteLink = 'https://play.google.com/store/apps/details?id=com.example.app';

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message); // 토스트 메시지 표시
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      {/* 토스트 메시지를 표시하기 위한 Toaster 컴포넌트 */}
      <Toaster position="top-center" />

      {/* 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-20 shadow-sm flex items-center">
        <Button isIconOnly variant="ghost" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">추천하기</h1>
      </header>

      {/* 탭 영역 */}
      <Tabs
       fullWidth
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
      >
        <Tab key="refer" title="추천하기">
          {/* 추천하기 탭 내용 */}
          <div className="p-4 space-y-6">
            {/* 친구 추천 보상 카드 */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <h2 className="text-lg text-green-700">친구 추천 보상</h2>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gift className="h-8 w-8 text-green-500 mr-2" />
                    <div>
                      <p className="font-bold text-green-700">1000 캐시</p>
                      <p className="text-sm text-green-600">추천인 & 친구 모두에게</p>
                    </div>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    자세히 보기
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* 닉네임으로 초대하기 카드 */}
            <Card>
              <CardHeader>
                <h2 className="text-lg">닉네임으로 초대하기</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="flex-grow"
                    placeholder="닉네임을 입력하세요"
                  />
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => copyToClipboard(nickname, '닉네임이 복사되었습니다.')}
                  >
                    복사
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  친구에게 이 닉네임을 공유하여 가입 시 입력하도록 안내해주세요.
                </p>
              </CardBody>
            </Card>

            {/* 초대 링크 공유하기 카드 */}
            <Card>
              <CardHeader>
                <h2 className="text-lg">초대 링크 공유하기</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex space-x-2">
                  <Input value={inviteLink} readOnly className="flex-grow" />
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => copyToClipboard(inviteLink, '초대 링크가 복사되었습니다.')}
                  >
                    복사
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  이 링크를 친구들과 공유하여 앱 다운로드를 유도하세요.
                </p>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="history" title="추천내역">
          {/* 추천내역 탭 내용 */}
          <div className="p-4">
            <Card>
              <CardBody className="p-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">아직 추천 내역이 없습니다.</p>
                <p className="text-sm text-gray-400 mt-2">친구를 초대하고 보상을 받아보세요!</p>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* 푸터 */}
      <div className="bottom-16 w-full px-4 md:relative md:bottom-0 md:p-4">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg">
          <Users className="mr-2 h-5 w-5" />
          친구초대하기
        </Button>
      </div>
    </div>
  );
}
