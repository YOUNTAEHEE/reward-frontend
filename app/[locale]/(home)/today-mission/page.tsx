import { ArrowLeft } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white p-4 flex items-center">
        <ArrowLeft className="h-6 w-6 text-gray-600 mr-4" />
        <h1 className="text-xl font-bold">미션하기</h1>
      </header>

      <main className="flex-grow p-4 space-y-4 pb-16">
        <Card>
          <CardBody className="p-4">
            <h2 className="text-lg font-bold mb-2">진행 설명</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm">
                미션 <span className="text-green-500 font-bold">+10p</span>
              </p>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                키워드 복사 하기
              </Button>
            </div>
            <ol className="list-decimal list-inside text-sm space-y-2">
              <li>키워드 복사 붙여넣기</li>
              <li>미션 시작</li>
              <li>가격비교 여부</li>
              <li>상품명</li>
              <li>판매처</li>
              <li>가격</li>
              <li>아래로 스크롤 해서 구매추가정보를 눌러</li>
              <li>상품번호를 복사후</li>
              <li>정답란에 붙여넣기 확인 입력</li>
            </ol>
            <div className="mt-4">
              <label
                htmlFor="product-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                상품번호 입력 :
              </label>
              <Input id="product-number" className="w-full" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <h3 className="font-bold mb-2">진행팁</h3>
            <p className="text-sm text-gray-600">
              와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한 키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
            </p>
          </CardBody>
        </Card>
        <div className=" md:hidden bottom-16  grid grid-cols-2 gap-4 p-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
            정답제출
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
            미션시작
          </Button>
        </div>
       
      </main>
      <div className="md:grid hidden grid-cols-2 gap-4 p-4 bottom-16">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
            정답제출
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-bold">
            미션시작
          </Button>
        </div>
    </div>
  );
}
