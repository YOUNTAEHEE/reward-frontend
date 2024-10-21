"use client";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";

type RewardStatus = "ACTIVE" | "INACTIVE";

export default function Component() {
  const [advertiserId, setAdvertiserId] = useState<string>(""); 
  const [rewardStatus, setRewardStatus] = useState<RewardStatus>('INACTIVE'); 
  const [productURL, setProductURL] = useState<string>(""); 
  const [keyword, setKeyword] = useState<string>(""); 
  const [salesChannel, setSalesChannel] = useState<string>(""); 
  const [rewardProductPrice, setRewardProductPrice] = useState<number>(0); 
  const [rewardPoint, setRewardPoint] = useState<number>(0); 
  const [productCode, setProductCode] = useState<string>("");
  const [productName, setProductName] = useState<string>(""); 
  const [rewardStartDate, setRewardStartDate] = useState<string>(""); 
  const [rewardEndDate, setRewardEndDate] = useState<string>(""); 
  const [inflowCount, setInflowCount] = useState<number>(0); 
  const [rewardMemo, setRewardMemo] = useState<string>(""); 

  return (
    <div className="container p-4 mx-auto ">
      <header className="flex items-center mb-12">
        <Button isIconOnly variant="light" className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">리워드 관리</h1>
      </header>
      
      <div className="flex flex-wrap items-center justify-center w-auto">
        <div className="w-full">
        <div className="w-full mx-auto md:w-full">
        <Card className="w-full mb-6">
          <CardBody>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">
                <label htmlFor="productURL" className="text-sm font-medium">
                  상품URL<span className="text-red-500">*</span>
                </label>
                <div className="flex mt-1">
                  <Input
                    id="productURL"
                    placeholder="https://www.example.com/product/123"
                    className="flex-grow"
                    value={productURL}
                    onChange={(e) => setProductURL(e.target.value)}
                  />
                  <Button className="ml-2 text-white bg-green-500">조회</Button>
                </div>
              </div>

              <div>
                <label htmlFor="advertiserId" className="text-sm font-medium">
                  광고주ID<span className="text-red-500">*</span>
                </label>
                <Input
                  id="advertiserId"
                  placeholder="사용자 ID"
                  className="mt-1"
                  value={advertiserId}
                  onChange={(e) => setAdvertiserId(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="rewardStatus" className="text-sm font-medium">
                  리워드 생성여부<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardStatus"
                  placeholder="생성 여부 입력"
                  className="mt-1"
                  value={rewardStatus}
                  onChange={(e) => setRewardStatus(e.target.value as RewardStatus)}
                />
              </div>

              <div>
                <label htmlFor="keyword" className="text-sm font-medium">
                  키워드<span className="text-red-500">*</span>
                </label>
                <Input
                  id="keyword"
                  placeholder="키워드 입력"
                  className="mt-1"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="salesChannel" className="text-sm font-medium">
                  스토어 이름<span className="text-red-500">*</span>
                </label>
                <Input
                  id="salesChannel"
                  placeholder="스토어 이름 입력"
                  className="mt-1"
                  value={salesChannel}
                  onChange={(e) => setSalesChannel(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="rewardProductPrice" className="text-sm font-medium">
                  상품 가격<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardProductPrice"
                  placeholder="상품 가격 입력"
                  className="mt-1"
                  type="number"
                  value={rewardProductPrice}
                  onChange={(e) => setRewardProductPrice(Number(e.target.value))}
                />
              </div>

              <div>
                <label htmlFor="rewardPoint" className="text-sm font-medium">
                  리워드 포인트<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardPoint"
                  placeholder="리워드 포인트 입력"
                  className="mt-1"
                  type="number"
                  value={rewardPoint}
                  onChange={(e) => setRewardPoint(Number(e.target.value))}
                />
              </div>

              <div>
                <label htmlFor="productCode" className="text-sm font-medium">
                  상품 코드<span className="text-red-500">*</span>
                </label>
                <Input
                  id="productCode"
                  placeholder="상품 코드 입력"
                  className="mt-1"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="productName" className="text-sm font-medium">
                  상품명<span className="text-red-500">*</span>
                </label>
                <Input
                  id="productName"
                  placeholder="상품명 입력"
                  className="mt-1"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="rewardStartDate" className="text-sm font-medium">
                  리워드 시작날짜<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardStartDate"
                  type="date"
                  className="mt-1"
                  value={rewardStartDate}
                  onChange={(e) => setRewardStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="rewardEndDate" className="text-sm font-medium">
                  리워드 종료날짜<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardEndDate"
                  type="date"
                  className="mt-1"
                  value={rewardEndDate}
                  onChange={(e) => setRewardEndDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="inflowCount" className="text-sm font-medium">
                  유입수<span className="text-red-500">*</span>
                </label>
                <Input
                  id="inflowCount"
                  placeholder="유입수 입력"
                  className="mt-1"
                  type="number"
                  value={inflowCount}
                  onChange={(e) => setInflowCount(Number(e.target.value))}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="rewardMemo" className="text-sm font-medium">
                  메모
                </label>
                <textarea
                  id="rewardMemo"
                  placeholder="메모를 입력해주세요"
                  className="w-full p-2 mt-1 border rounded"
                  rows={4}
                  value={rewardMemo}
                  onChange={(e) => setRewardMemo(e.target.value)}
                />
              </div>
            </div>
          </CardBody>
        </Card>
          <Card>
            <CardBody>
              <h2 className="mb-2 font-semibold">셋팅 방법</h2>
              <ol className="space-y-1 text-sm list-decimal list-inside">
                <li>상품 URL 입력 (Product, Product / Vendor)</li>
                <li>조회 버튼 클릭</li>
                <li>카테고리 - 직접 입력 또는 카테고리 변경해주세요.</li>
              </ol>
            </CardBody>
          </Card>
        </div>
   </div>
        <div className="w-full">
          <div className="flex justify-end mt-6 space-x-2 ">
          <Button variant="bordered">취소</Button>
          <Button className="text-white bg-green-500">저장</Button>
          </div>
        </div>
      </div>      
    </div>
    
  );
}