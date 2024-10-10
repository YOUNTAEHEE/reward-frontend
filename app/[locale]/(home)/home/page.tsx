"use client";
import { Bell, Gift, Users, CheckSquare, Calendar, Star } from 'lucide-react';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';

export default function HomeScreen() {
    const t = useTranslations(); // 국제화 훅 사용
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold">캐시백</h1>
        <Bell className="h-6 w-6 text-gray-600" />
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-4 space-y-4">
        {/* 첫 번째 카드 */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">sks</p>
                <p className="text-2xl font-bold">132p</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                적립금내역
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* 두 번째 카드 */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">추천 친구</p>
                  <p className="font-bold">0명</p>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                추천내역
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* 그리드 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardBody className="p-4 flex flex-col items-center justify-center">
              <Calendar className="h-8 w-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">오늘의 미션</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="p-4 flex flex-col items-center justify-center">
              <Star className="h-8 w-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">이벤트캐시보상</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="p-4 flex flex-col items-center justify-center">
              <Users className="h-8 w-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">친구초대 적립</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="p-4 flex flex-col items-center justify-center">
              <CheckSquare className="h-8 w-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">출석체크적립</p>
            </CardBody>
          </Card>
        </div>

        <div className=" md:hidden">
    <div className="mb-4 mx-5">
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
        {t("미션하기")}
      </Button>
    </div>
  </div>
      </main>
      <div className="hidden md:block">
    <div className="mb-4 mx-5">
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
        {t("미션하기")}
      </Button>
    </div>
  </div>
    </div>
  );
}
