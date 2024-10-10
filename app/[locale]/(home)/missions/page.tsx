"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';
import React from "react";

const missions = [
  { id: 1, nameKey: "미션_정답_찾기1", points: 15 },
  { id: 2, nameKey: "미션_정답_찾기2", points: 15 },
  { id: 3, nameKey: "미션_정답_찾기3", points: 15 },
  { id: 4, nameKey: "미션_정답_찾기4", points: 15 },
  { id: 5, nameKey: "미션_정답_찾기5", points: 15 },
  { id: 6, nameKey: "미션_정답_찾기6", points: 15 },
  { id: 7, nameKey: "미션_정답_찾기7", points: 15 },
  { id: 8, nameKey: "미션_정답_찾기8", points: 15 },
  { id: 9, nameKey: "미션_정답_찾기9", points: 15 },
  { id: 10, nameKey: "미션_정답_찾기10", points: 15 },
  { id: 11, nameKey: "미션_정답_찾기11", points: 15 },
  { id: 12, nameKey: "미션_정답_찾기12", points: 15 },
];

export default function Component() {
  const t = useTranslations();  // 국제화를 위한 훅 사용

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-center">
        <h2 className="text-2xl font-bold">{t('네이버미션하기')}</h2>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow p-4 space-y-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {missions.map((mission) => (
            <div key={mission.id} className="flex flex-col justify-between px-4 py-2">
              <div className="flex gap-3 space-y-2">
                <Button className="flex-grow bg-green-500 hover:bg-green-600 text-white">
                  {t(mission.nameKey)}
                </Button>
                <span className=" text-green-500 font-bold whitespace-nowrap">{mission.points}{t('포인트')}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
