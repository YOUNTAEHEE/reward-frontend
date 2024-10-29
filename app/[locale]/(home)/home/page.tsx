'use client'
import React, { useState, useEffect } from "react";
import {
  Bell,
  Gift,
  Users,
  CheckSquare,
  Calendar,
  Star,
  Wallet,
  FileSpreadsheet,
  User,
} from "lucide-react";
import { Button } from "@nextui-org/button";
import useLocaleStore from "@store/useLocaleStore";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import apiClient from "@handler/fetch/client";
import useUserStore from "@store/useUserStore";


export default function HomeScreen() {
  const t = useTranslations(); // 국제화 훅 사용
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();
  // const [loadData, setLoadData] = useState<boolean>(false);
  const [point, setPoint] = useState<number | string>();
  const [userNickname, setUserNickname] = useState<string>();
  const userId = useUserStore((state) => state.userInfo?.userId);
  
  const fetchUserInfo = async()=> {
    console.log("Sending userId:", userId);
    try{
      const response = await apiClient.post(`/my/point`,{userId});
      // setLoadData(true);
      setPoint(response.data.userPoint);
      setUserNickname(response.data.userNickname);
    }catch (error){
      // setLoadData(false);
      setPoint('포인트를 불러올 수 없음');
      setUserNickname('닉네임을 불러올 수 없음');
    }
  }
  
  useEffect(()=>{
    fetchUserInfo();
    // setLoadData(false);
  },[])

  // useEffect(()=>{
  //   fetchUserInfo();
  //   setLoadData(false);
  // },[loadData])
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">리워드</h1>
        {/* <Bell className="w-6 h-6 text-gray-600" /> */}
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-4 space-y-4">
        {/* 첫 번째 카드 */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{userNickname}</p>
                <p className="text-2xl font-bold">{point}p</p>
              </div>
              <Button className="text-white bg-green-500 hover:bg-green-600"
              onClick={() => router.push(`/${locale}/cash-history`)}>
                포인트 내역
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* 두 번째 카드 */}
        {/* <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">추천 친구</p>
                  <p className="font-bold">0명</p>
                </div>
              </div>
              <Button className="text-white bg-green-500 hover:bg-green-600">
                추천내역
              </Button>
            </div>
          </CardBody>
        </Card> */}

        {/* 그리드 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-white shadow-sm"
            isPressable
            onPress={() => router.push(`/${locale}/today-mission`)}
          >
            <CardBody className="flex flex-col items-center justify-center p-4">
              <Calendar className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">오늘의 미션</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="flex flex-col items-center justify-center p-4">
              <Wallet className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">적립</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm"  
            isPressable
            onPress={() => router.push(`/${locale}/cash-history`)}>
            <CardBody className="flex flex-col items-center justify-center p-4">
              <FileSpreadsheet className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">포인트 내역</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm" 
          isPressable
           onPress={() => router.push(`/${locale}/mypage`)}>
            <CardBody className="flex flex-col items-center justify-center p-4">
              <User className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">마이페이지</p>
            </CardBody>
          </Card>
          {/* <Card className="bg-white shadow-sm">
            <CardBody className="flex flex-col items-center justify-center p-4">
              <Star className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">이벤트캐시보상</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="flex flex-col items-center justify-center p-4">
              <Users className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">친구초대 적립</p>
            </CardBody>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardBody className="flex flex-col items-center justify-center p-4">
              <CheckSquare className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm font-medium text-center">출석체크적립</p>
            </CardBody>
          </Card> */}
        </div>

        <div className=" md:hidden">
          <div className="mb-4 ">
            <Button
              className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600"
              onClick={() => router.push(`/${locale}/missions`)}
            >
              {t("미션하기")}
            </Button>
          </div>
        </div>
      </main>
      <div className="hidden md:block">
        <div className="mx-5 mb-4">
          <Button
            className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600"
            onClick={() => router.push(`/${locale}/missions`)}
          >
            {t("미션하기")}
          </Button>
        </div>
      </div>
    </div>
  );
}
