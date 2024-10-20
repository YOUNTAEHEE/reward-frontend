"use client";
import { ArrowRight, Bell, FileText, HelpCircle, User, Users , LogOut } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import React from "react";
import apiClient from "@handler/fetch/client";
import { useRouter } from "next/navigation";
import useLocaleStore from "@store/useLocaleStore";
import useUserStore from "@store/useUserStore";

export default function MyPage() {
  const t = useTranslations();  // 번역을 위한 useTranslations 훅 사용
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);
  
  const handleLogout = async() =>{
    setError(null);
    try{
      const response = await apiClient.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("successMessage");
      clearUserInfo(); 
      router.push(`/${locale}/login`);
    }catch(error: any){
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("로그아웃 실패");
        }
      }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 p-4 bg-white shadow-sm">
        <h1 className="text-lg font-bold">{t('마이페이지')}</h1>
      </header>

      <main className="flex-grow p-4 pb-16 space-y-4">
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('닉네임')}</p>
                <p className="text-lg font-bold">xxxx</p>
              </div>
              <Button className="text-white bg-green-500 hover:bg-green-600">
                {t('적립내역')}
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{t('보유_캐시')}</p>
              <p className="text-2xl font-bold">85 {t('캐시')}</p> 
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('추천해준_친구')}</p>
                <p className="text-lg font-bold">0 {t('명')}</p>
              </div>
              <Button className="text-white bg-green-500 hover:bg-green-600">
                {t('추천인_내역')}
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-500" />
                <span>{t('푸시알림')}</span>
              </div>
              <Switch />
            </div>
            {[
              { icon: User, label: t('내정보수정') },
              { icon: FileText, label: t('공지사항') },
              { icon: Users, label: t('제휴광고') },
              { icon: HelpCircle, label: t('문의하기') },
              { icon: LogOut, label: t("로그아웃"), onClick: handleLogout }, 
            ].map((item, index) => (
              <Button key={index} variant="light" className="justify-between w-full px-0 py-2"
              onClick={item.onClick}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Button>
            ))}
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
