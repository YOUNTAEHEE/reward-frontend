"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';
import React, { use } from "react";
import { useState, useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion"
import apiClient from "@handler/fetch/client";

interface Mission {
  rewardNo: number;
  rewardPoint: number;
}
export default function Component() {
  const t = useTranslations();  // 국제화를 위한 훅 사용
  const [hoveredMission, setHoveredMission] = useState<number | null>(null)
  const [missions, setMissions] = useState<Mission[]>([]);
 
  const fetchMissions = async()=> {
    try{
      const response = await apiClient.get('/reward/mission/list');
      const missionsData = Array.isArray(response.data) ? response.data : [];
      setMissions(missionsData); 
    }catch (error){
      setMissions([]); 
    }
  }
  
  useEffect(()=>{
    fetchMissions();
  },[])
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      {/* <header className="sticky top-0 z-10 flex justify-center p-4 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">{t('네이버 미션하기')}</h2>
      </header> */}
      <header className="sticky top-0 z-10 flex justify-center p-4 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">{t('미션하기')}</h2>
      </header>
      {/* 메인 컨텐츠 */}
        <main className="flex-1 p-8 ">
        <div className="grid grid-cols-2 gap-6 " >
          {missions.map((mission) => (
            <motion.div
              key={mission.rewardNo}
              className="relative overflow-hidden transition-all bg-white shadow-md group rounded-xl hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredMission(mission.rewardNo)}
              onHoverEnd={() => setHoveredMission(null)}
            >
              <div className="absolute inset-0 transition-opacity opacity-75 bg-gradient-to-r from-blue-400 to-green-700 group-hover:opacity-100" />
              <div className="relative flex flex-col justify-between h-full p-6">
                <h2 className="text-xl font-semibold text-white">{`미션 ${mission.rewardNo}`}</h2>
                <div className="flex items-center justify-between mt-4">
                  <span className="px-3 py-1 text-sm font-medium text-green-600 bg-white rounded-full">
                    {mission.rewardPoint} 포인트
                  </span>
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-green-600 transition-opacity bg-white rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredMission === mission.rewardNo ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    시작하기
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
