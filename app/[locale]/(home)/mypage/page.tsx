"use client";
import { ArrowRight, Bell, FileText, HelpCircle, User, Users , LogOut } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';
import React from "react";

export default function MyPage() {
  const t = useTranslations();  // 번역을 위한 useTranslations 훅 사용

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold">{t('마이페이지')}</h1>
      </header>

      <main className="flex-grow p-4 space-y-4 pb-16">
        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t('닉네임')}</p>
                <p className="font-bold text-lg">xxxx</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                {t('적립내역')}
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{t('보유_캐시')}</p>
              <p className="font-bold text-2xl">85 {t('캐시')}</p> 
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t('추천해준_친구')}</p>
                <p className="font-bold text-lg">0 {t('명')}</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                {t('추천인_내역')}
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span>{t('푸시알림')}</span>
              </div>
              <Switch />
            </div>
            {[
              { icon: User, label: t('내정보수정') },
              { icon: FileText, label: t('공지사항') },
              { icon: Users, label: t('제휴광고') },
              { icon: HelpCircle, label: t('문의하기') },
              { icon: LogOut, label: t("로그아웃") }, 
            ].map((item, index) => (
              <Button key={index} variant="light" className="w-full justify-between py-2 px-0">
                <div className="flex items-center space-x-2">
                  <item.icon className="h-5 w-5 text-gray-500" />
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </Button>
            ))}
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
