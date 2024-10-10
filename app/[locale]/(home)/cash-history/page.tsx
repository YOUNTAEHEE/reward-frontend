"use client";
import { useState } from 'react';
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';

type Transaction = {
  title: string;
  date: string;
  amount: number;
}

export default function CashHistory() {
  const [activeTab, setActiveTab] = useState("적립내역");
  const t = useTranslations();

  const transactions: Record<string, Transaction[]> = {
    "출금내역": [
      { title: t("출금"), date: "2024-09-20 14:30:25", amount: -50000 },
      { title: t("출금"), date: "2024-09-15 10:15:30", amount: -30000 },
    ],
    "적립내역": [
      { title: t("[출석체크포인트] 출석체크 적립"), date: "2024-09-19 08:11:04", amount: 50 },
      { title: t("블로그 광고"), date: "2024-09-19 07:57:42", amount: 5 },
      { title: t("★유튜브 구독★"), date: "2024-09-19 07:35:29", amount: 20 },
      { title: t("정답찾기 미션"), date: "2024-09-18 14:39:10", amount: 10 },
    ],
    "사용내역": [
      { title: t("상품 구매"), date: "2024-09-17 16:45:20", amount: -1000 },
      { title: t("기프티콘 교환"), date: "2024-09-16 11:20:15", amount: -500 },
    ],
  };

  const renderTransactions = (type: string) => (
    <div className="space-y-2">
      {transactions[type].map((transaction, index) => (
        <Card key={index} className="w-full">
          <CardBody className="p-3">
            <div className="flex justify-between items-center">
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
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
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
          <Tab key="사용내역" title={t("사용내역")} />
        </Tabs>

        {activeTab === "출금내역" && (
          <div>
            {renderTransactions("출금내역")}
          </div>
        )}
        {activeTab === "적립내역" && (
          <div>
            {renderTransactions("적립내역")}
          </div>
        )}
        {activeTab === "사용내역" && (
          <div>
            {renderTransactions("사용내역")}
          </div>
        )}
      </main>

      {/* 출금 신청하기 버튼 */}
      <div className="fixed bottom-16 w-full px-4 md:relative md:bottom-0 md:p-4">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 text-lg">
          {t("출금 신청하기")}
        </Button>
      </div>
    </div>
  );
}
