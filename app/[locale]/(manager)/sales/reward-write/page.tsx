"use client";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import apiClient from "@handler/fetch/client";
import { useRouter } from 'next/navigation';

type RewardStatus = "생성" | "비활성화";
type RewardInflowCount = 100 | 200;
type RewardPriceComparison = "유" | "무";
// formData의 타입 정의
interface FormData {
  advertiserId: string;
  rewardStatus: RewardStatus;
  productURL: string;
  keyword: string;
  salesChannel: string;
  rewardProductPrice: number | string; // 초기에는 빈 값일 수 있음
  rewardPoint: number | string; // 초기에는 빈 값일 수 있음
  productId: string;
  optionId: string;
  productName: string;
  priceComparison: string;
  rewardStartDate: string;
  rewardEndDate: string;
  inflowCount: number | string; // 초기에는 빈 값일 수 있음
  rewardMemo: string;
}

export default function Component() {
  // 모든 폼 필드를 하나의 객체로 관리
  const [formData, setFormData] = useState<FormData>({
    advertiserId: "",
    rewardStatus: "생성" as RewardStatus,
    productURL: "",
    keyword: "",
    salesChannel: "",
    rewardProductPrice: "",
    rewardPoint: "",
    productId: "",
    optionId:"",
    productName: "",
    priceComparison : "무" as RewardPriceComparison,
    rewardStartDate: "",
    rewardEndDate: "",
    inflowCount: 100 as RewardInflowCount,
    rewardMemo: "",
  });
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const convertRewardStatus = (status: RewardStatus): "ACTIVE" | "INACTIVE" => {
    return status === "생성" ? "ACTIVE" : "INACTIVE";
  };
  
  const validateDates = () => {
    const startDate = new Date(formData.rewardStartDate);
    const endDate = new Date(formData.rewardEndDate);
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (![10, 20, 30].includes(diffInDays)) {
      setError('시작 날짜와 종료 날짜 사이의 기간은 10일, 20일 또는 30일이어야 합니다.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateDates()) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }else {
    console.log('유효하지 않은 날짜 범위');
  }
    try {
      const response = await  apiClient.post("/my/reward/write", formData);
    } catch (error) {
     
    }
  };


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
                    value={formData.productURL}
                    onChange={(e) =>setFormData({...formData, productURL:e.target.value})}
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
                  value={formData.advertiserId}
                  onChange={(e) => setFormData({ ...formData, advertiserId: e.target.value })}
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
                  value={formData.rewardStatus}
                  // onChange={(e) => setRewardStatus(e.target.value as RewardStatus)}
                  readOnly
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
                  value={formData.keyword}
                  onChange={(e) => setFormData({...formData, keyword: e.target.value })}
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
                  value={formData.salesChannel}
                  onChange={(e) => setFormData({...formData, salesChannel: e.target.value})}
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
                  value={formData.rewardProductPrice}
                  onChange={(e) => setFormData({...formData, rewardProductPrice:Number(e.target.value) })}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // 숫자가 아닐 경우 입력 방지
                    }
                  }}
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
                  value={formData.rewardPoint}
                  onChange={(e) => setFormData({...formData, rewardPoint:Number(e.target.value) })}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // 숫자가 아닐 경우 입력 방지
                    }
                  }}
                />
              </div>

              <div>
                <label htmlFor="productId" className="text-sm font-medium">
                  상품ID<span className="text-red-500">*</span>
                </label>
                <Input
                  id="productId"
                  placeholder="상품ID 입력"
                  className="mt-1"
                  value={formData.productId}
                  onChange={(e) => setFormData({...formData, productId: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="optionId" className="text-sm font-medium">
                  옵션ID<span className="text-red-500">*</span>
                </label>
                <Input
                  id="optionId"
                  placeholder="옵션ID 입력"
                  className="mt-1"
                  value={formData.optionId}
                  onChange={(e) => setFormData({...formData, optionId: e.target.value})}
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
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName:e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="priceComparison" className="text-sm font-medium">
                  가격비교 여부<span className="text-red-500">*</span>
                </label>
                <select
                  id="priceComparison"
                  className="w-full p-2 mt-1 border rounded-lg"
                  value={formData.priceComparison}
                  onChange={(e) => setFormData({...formData, priceComparison: e.target.value as RewardPriceComparison })}
                >
                   <option value="유">유</option>
                   <option value="무">무</option>
                </select>
              </div>

              <div>
                <label htmlFor="rewardStartDate" className="text-sm font-medium">
                  리워드 시작날짜<span className="text-red-500">*</span>
                </label>
                <Input
                  id="rewardStartDate"
                  type="date"
                  className="mt-1"
                  value={formData.rewardStartDate}
                  onChange={(e) => setFormData({...formData, rewardStartDate: e.target.value})}
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
                  value={formData.rewardEndDate}
                  onChange={(e) =>setFormData({...formData, rewardEndDate:e.target.value})}
                />
              </div>

             
              <div>
                <label htmlFor="inflowCount" className="text-sm font-medium">
                  유입수<span className="text-red-500">*</span>
                </label>
                <select
                  id="inflowCount"
                  className="w-full p-2 mt-1 border rounded-lg"
                  value={formData.inflowCount}
                  onChange={(e) => setFormData({...formData, inflowCount:Number(e.target.value) as RewardInflowCount })}
                >
                   <option value={100}>100</option>
                   <option value={200}>200</option>
                </select>
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
                  value={formData.rewardMemo}
                  onChange={(e) => setFormData({...formData, rewardMemo:e.target.value})}
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
          <Button className="text-white bg-green-500" onClick={handleSubmit}>저장</Button>
          </div>
        </div>
      </div>      
    </div>
    
  );
}