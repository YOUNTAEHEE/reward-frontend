"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useTranslations } from 'next-intl';

export default function WithdrawalRequest() {
  const t = useTranslations(); // 국제화 훅 사용
  const amountOptions = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

  const [accountHolder, setAccountHolder] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold">{t("출금신청")}</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-4 space-y-4 pb-16">
        <form className="space-y-4">
          <div>
            <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">
              {t("예금주")}
            </label>
            <Input
              id="accountHolder"
              placeholder={t("예금주명 입력")}
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
              {t("은행")}
            </label>
            <Select
              placeholder={t("은행선택")}
              selectedKeys={new Set([bank])}
              onSelectionChange={(key) => setBank(key as string)}
            >
              <SelectItem key="shinhan">{t("신한은행")}</SelectItem>
              <SelectItem key="kb">{t("국민은행")}</SelectItem>
              <SelectItem key="woori">{t("우리은행")}</SelectItem>
              <SelectItem key="hana">{t("하나은행")}</SelectItem>
              <SelectItem key="nh">{t("농협은행")}</SelectItem>
            </Select>
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              {t("계좌번호")}
            </label>
            <Input
              id="accountNumber"
              placeholder={t("계좌번호 입력")}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              {t("금액")}
            </label>
            <Select
              placeholder={t("금액 선택")}
              selectedKeys={new Set([amount])}
              onSelectionChange={(key) => setAmount(key as string)}
            >
              {amountOptions.map((amount) => (
                <SelectItem key={amount.toString()}>
                  {amount.toLocaleString()} {t("원")}
                </SelectItem>
              ))}
            </Select>
          </div>
        </form>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold">{t("출금안내")}</h3>
          </CardHeader>
          <CardBody className="text-sm space-y-2">
            <p>• {t("출금 요청은 평일 영업시간(오전 9시~오후 6시) 내에 처리됩니다.")}</p>
            <p>• {t("출금 금액은 3.3% 수수료와 500원의 추가 수수료를 제외한 금액으로 지급됩니다.")}</p>
            <p>• {t("예금주 정보가 가입 시 입력한 실명과 일치하지 않으면 출금 처리가 불가능할 수 있습니다.")}</p>
            <p>• {t("단, 처리 시간은 상황에 따라 달라질 수 있습니다.")}</p>
          </CardBody>
        </Card>
         {/* 하단 버튼 */}
         <div className="md:hidden">
    <div className="mb-4">
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 text-lg">
        {t("출금신청")}
      </Button>
    </div>
  </div>
      </main>
 {/* PC에서 버튼을 메인 아래쪽에 표시 */}
 <div className="hidden md:block">
    <div className="mb-4 mx-5">
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 text-lg">
        {t("출금신청")}
      </Button>
    </div>
  </div>
     
    </div>
  );
}
