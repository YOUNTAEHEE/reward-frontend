"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';
import apiClient from "@handler/fetch/client";
import useUserStore from "@store/useUserStore";

type Transaction = {
  title: string;
  date: string;
  amount: number;
}

export default function CashHistory() {
  const [activeTab, setActiveTab] = useState("적립내역");
  const t = useTranslations();
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({
    출금내역: [],
    적립내역: [],
  });
  
  const userId = useUserStore((state) => state.userInfo?.userId);
  
  const fetchPointDetail = async()=> {
    console.log("Sending userId:", userId);
    try{
      const response = await apiClient.post(`/my/point/detail`,{userId});
      const fetchedTransactions = response.data;
      
      const withdrawDetail = fetchedTransactions.filter((transaction: any) => transaction.pointAction === 'POINT_WITHDRAW');
      const depositDetail = fetchedTransactions.filter((transaction: any) => transaction.pointAction === 'POINT_DEPOSIT');

      setTransactions({
        출금내역: withdrawDetail || [],
        적립내역: depositDetail || [],
      });
      
    }catch (error){
    }
  }
  
  useEffect(()=>{
    fetchPointDetail();
  },[])

  const renderTransactions = (type: string) => (
    <div className="space-y-2">
      {transactions[type].map((transaction, index) => (
        <Card key={index} className="w-full">
          <CardBody className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
              <p className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount} {t("캐시")}
              </p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 p-4 bg-white shadow-sm">
        <h1 className="text-lg font-bold">{t("캐시내역")}</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow p-4 mb-20"> {/* 하단 여백 추가 */}
        <Tabs
          fullWidth
          aria-label="Cash History Tabs"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="w-full"
        >
          <Tab key="출금내역" title={t("출금내역")} />
          <Tab key="적립내역" title={t("적립내역")} />
          {/* <Tab key="사용내역" title={t("사용내역")} /> */}
        </Tabs>

        {activeTab === "출금내역" && (
          <div className='mt-3'>
            {renderTransactions("출금내역")}
          </div>
        )}
        {activeTab === "적립내역" && (
          <div className='mt-3'>
            {renderTransactions("적립내역")}
          </div>
        )}
        {/* {activeTab === "사용내역" && (
          <div>
            {renderTransactions("사용내역")}
          </div>
        )} */}
      </main>

      {/* 출금 신청하기 버튼 */}
      <div className="fixed w-full px-4 bottom-16 md:relative md:bottom-0 md:p-4">
        <Button className="w-full py-2 text-lg text-white bg-green-500 hover:bg-green-600">
          {t("출금 신청하기")}
        </Button>
      </div>
    </div>
  );
}
