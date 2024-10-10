"use client";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import React from "react";

export default function AttendanceCheck() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-20 shadow-sm flex items-center">
        <ChevronLeft className="h-6 w-6 text-gray-600 mr-2" />
        <h1 className="text-xl font-bold">출석체크</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow p-4 space-y-4 pb-16">
        {/* 달력 카드 */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold mb-4">2024년 9월</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* 요일 헤더 */}
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="font-bold">{day}</div>
              ))}
              {/* 빈 칸 */}
              {emptyDays.map((day) => (
                <div key={`empty-${day}`}></div>
              ))}
              {/* 날짜 */}
              {days.map((day) => (
                <div
                  key={day}
                  className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto
                    ${day <= 19 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 출석체크 버튼 */}
        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold"
          
        >
          출석체크
        </Button>

        {/* 유의사항/환불기준 카드 */}
        <Card>
          <CardBody className="p-4 space-y-4">
            <h3 className="font-bold">유의사항/환불기준</h3>
            <p className="text-sm text-gray-600">
              출석체크는 매일 자정 기준으로 적립되며, 출석체크 버튼을 클릭해야만 캐시가 적립됩니다. 
              놓친 날짜의 캐시는 적립되지 않으며, 적립된 캐시는 내역에서 확인 가능합니다. 
              출석체크 이벤트는 매월 변경될 수 있으며, 하루라도 놓치면 처음부터 다시 시작해야 합니다. 
              출석체크를 누르면 적립 페이지로 이동하며, 미션 완료 시 체크가 완료됩니다. 
              부정한 방법으로 출석체크 시 포인트는 회수됩니다.
            </p>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
