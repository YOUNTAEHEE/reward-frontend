// "use client";
// import React, { useState, useEffect } from "react";
// import useUserStore from "@store/useUserStore";
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { Input } from "@nextui-org/input";
// import apiClient from "@handler/fetch/client";
// import useLocaleStore from "@store/useLocaleStore";
// import { useRouter } from "next/navigation";

// interface Mission {
//   rewardPoint: number;
//   keyword: string;
//   advertiserChannel: string;
//   productName: string;
//   rewardProductPrice: string;
// }
// interface ComponentProps {
//   params: {
//     rewardNo: string; // URL에서 전달받는 rewardNo는 보통 string 타입
//   };
// }

// export default function Component({ params }: ComponentProps) {
//   const { locale, toggleLocale } = useLocaleStore();
//   const router = useRouter();
//   const rewardNo = Number(params.rewardNo);
//   const [mission, setMission] = useState<Mission | null>(null);
//   const [answer, setAnswer] = useState<string>("");
//   const userInfo = useUserStore((state) => state.userInfo);

//   const fetchMission = async () => {
//     try {
//       const response = await apiClient.get(`/reward/mission/${rewardNo}`);
//       const missionData = response.data ? response.data : null;
//       setMission(missionData);
//     } catch (error) {
//       setMission(null);
//     }
//   };

//   const missionAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await apiClient.post(
//         `/reward/mission/success/${rewardNo}`,
//         {
//           userId: userInfo?.userId,
//           missionAnswer: answer,
//         }
//       );
//     } catch (error) {}
//   };

//   const handleCopyClick = async () => {
//     if (!navigator.clipboard) {
//       alert("클립보드 API가 지원되지 않는 브라우저입니다.");
//       return;
//     }

//     if (mission?.keyword) {
//       try {
//         await navigator.clipboard.writeText(mission.keyword);
//         alert("키워드가 클립보드에 복사되었습니다!");
//       } catch (err) {
//         alert("클립보드에 복사 실패!");
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("rewardNo:", rewardNo);
//     if (rewardNo) {
//       fetchMission();
//     }
//   }, []);

//   return (
//     <form onSubmit={missionAnswer}>
//     <div className="flex flex-col h-screen min-h-screen bg-gray-100 max-h-auto ">
//       <header className="flex items-center p-4 bg-white">
//         <ArrowLeft className="w-6 h-6 mr-4 text-gray-600" />
//         <h1 className="text-xl font-bold">미션하기</h1>
//       </header>
      
//       <main className="flex flex-wrap justify-between h-full p-4 pb-16 space-y-4 md:pb-2">
//         {mission ? (
//           <>
//               <div className="flex flex-wrap w-full">
//                 <Card className="w-full">
//                   <CardBody className="p-4 ">
//                     <h2 className="mb-2 text-lg font-bold">진행 설명</h2>
//                     <div className="flex items-center justify-between mb-4">
//                       <p className="text-sm">
//                         미션{" "}
//                         <span className="font-bold text-green-500">
//                           +{mission.rewardPoint}p
//                         </span>
//                       </p>
//                       <Button
//                         className="text-white bg-green-500 hover:bg-green-600"
//                         onClick={handleCopyClick}
//                       >
//                         키워드 복사 하기
//                       </Button>
//                     </div>
//                     <ol className="space-y-2 text-sm list-decimal list-inside">
//                       <li>키워드 복사 붙여넣기</li>
//                       <li>미션 시작</li>
//                       <li>가격비교 여부</li>
//                       <li>상품명 : {mission.productName}</li>
//                       <li>판매처 : {mission.advertiserChannel}</li>
//                       <li>가격 : {mission.rewardProductPrice}</li>
//                       <li>아래로 스크롤 해서 구매추가정보를 눌러</li>
//                       <li>상품번호를 복사후</li>
//                       <li>정답란에 붙여넣기 확인 입력</li>
//                     </ol>
//                     <form onSubmit={missionAnswer}>
//                       <div className="mt-4">
//                         <label
//                           htmlFor="product-number"
//                           className="block mb-1 text-sm font-medium text-gray-700"
//                         >
//                           상품번호 입력 :
//                         </label>
//                         <Input
//                           isRequired
//                           id="product-number"
//                           className="w-full"
//                           value={answer}
//                           onChange={(e) => setAnswer(e.target.value)}
//                         />
//                       </div>
//                     </form>
//                   </CardBody>
//                 </Card>

//                 <Card className="w-full mt-4">
//                   <CardBody className="p-4">
//                     <h3 className="mb-2 font-bold">진행팁</h3>
//                     <p className="text-sm text-gray-600">
//                       와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한
//                       키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
//                     </p>
//                   </CardBody>
//                 </Card>
//                 <Card className="w-full mt-4">
//                   <CardBody className="p-4">
//                     <h3 className="mb-2 font-bold">진행팁</h3>
//                     <p className="text-sm text-gray-600">
//                       와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한
//                       키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
//                     </p>
//                   </CardBody>
//                 </Card>
//                 <Card className="w-full mt-4">
//                   <CardBody className="p-4">
//                     <h3 className="mb-2 font-bold">진행팁</h3>
//                     <p className="text-sm text-gray-600">
//                       와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한
//                       키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
//                     </p>
//                   </CardBody>
//                 </Card>
//                 <Card className="w-full mt-4">
//                   <CardBody className="p-4">
//                     <h3 className="mb-2 font-bold">진행팁</h3>
//                     <p className="text-sm text-gray-600">
//                       와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한
//                       키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
//                     </p>
//                   </CardBody>
//                 </Card>
                
//               </div>
//               <div className="grid grid-cols-2 gap-4 py-4 bottom-16 ">
//                 <Button
//                   type="submit"
//                   className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600"
//                 >
//                   정답제출
//                 </Button>
//                 <Button className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
//                   미션시작
//                 </Button>
//               </div>
          
//           </>
//         ) : (
//           <p>로딩 중...</p>
//         )}
//       </main>
//       {/* <div className="hidden grid-cols-2 gap-4 p-4 md:grid bottom-16">
//         <Button
//           type="submit"
//           className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600"
//         >
//           정답제출
//         </Button>
//         <Button className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
//           미션시작
//         </Button>
//       </div> */}
     
//     </div>
//     </form>
//   );
// }

'use client'
import React, { useState, useEffect } from "react";
import useUserStore from "@store/useUserStore";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import apiClient from "@handler/fetch/client";
import useLocaleStore from "@store/useLocaleStore";
import { useRouter } from "next/navigation";

interface Mission{
  rewardPoint : number;
  keyword: string;
  advertiserChannel:string;
  productName:string;
  rewardProductPrice:string;
}
interface ComponentProps {
  params: {
    rewardNo: string; // URL에서 전달받는 rewardNo는 보통 string 타입
  };
}

export default function Component({ params } : ComponentProps) {
  const { locale, toggleLocale } = useLocaleStore();
  const router = useRouter();
  const rewardNo = Number(params.rewardNo);
  const [mission, setMission] = useState<Mission | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [message, setMessage] = useState<string>(''); // 메시지 상태 추가
  const userInfo = useUserStore((state) => state.userInfo);

  const fetchMission = async()=> {
    try{
      const response = await apiClient.get(`/reward/mission/${rewardNo}`);
      const missionData = response.data ? response.data : null;
      setMission(missionData);
    }catch (error){
      setMission(null);
    }
  }

  const missionAnswer = async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    try{
      const response = await apiClient.post(`/reward/mission/success/${rewardNo}`,
        {
          userId: userInfo?.userId,
          missionAnswer : answer
        }
      );
      setMessage('미션 성공했습니다!'); // 성공 메시지 설정
    }catch (error){
      setMessage('미션 실패!'); // 실패 메시지 설정
    }
  }

  const handleCopyClick = async () => {
    if (!navigator.clipboard) {
      alert('클립보드 API가 지원되지 않는 브라우저입니다.');
      return;
    }

    if (mission?.keyword) {
      try {
        await navigator.clipboard.writeText(mission.keyword);
        alert('키워드가 클립보드에 복사되었습니다!');
      } catch (err) {
        alert('클립보드에 복사 실패!');
      }
    }
  }

  useEffect(()=>{
    console.log('rewardNo:', rewardNo);
    if (rewardNo) {
      fetchMission();
    }
  },[rewardNo]) // rewardNo를 의존성 배열에 추가

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center p-4 bg-white">
        <ArrowLeft className="w-6 h-6 mr-4 text-gray-600" />
        <h1 className="text-xl font-bold">미션하기</h1>
      </header>

      <main className="flex-grow p-4 pb-16 space-y-4">
        {mission ? (
          <>
        <Card>
          <CardBody className="p-4">
            <h2 className="mb-2 text-lg font-bold">진행 설명</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm">
                미션 <span className="font-bold text-green-500">+{mission.rewardPoint}p</span>
              </p>
              <Button className="text-white bg-green-500 hover:bg-green-600"
                 onClick={handleCopyClick} >
                키워드 복사 하기
              </Button>
            </div>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>키워드 복사 붙여넣기</li>
              <li>미션 시작</li>
              <li>가격비교 여부</li>
              <li>상품명 : {mission.productName}</li>
              <li>판매처 : {mission.advertiserChannel}</li>
              <li>가격 : {mission.rewardProductPrice}</li>
              <li>아래로 스크롤 해서 구매추가정보를 눌러</li>
              <li>상품번호를 복사후</li>
              <li>정답란에 붙여넣기 확인 입력</li>
            </ol>
            {/* 폼 시작 */}
            <form onSubmit={missionAnswer}>
              <div className="mt-4">
                <label
                  htmlFor="product-number"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  상품번호 입력 :
                </label>
                <Input isRequired id="product-number" className="w-full" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
              </div>
              {/* 제출 버튼을 폼 내부로 이동 */}
              <div className="grid grid-cols-2 gap-4 py-4 pt-6 md:hidden bottom-16">
                <Button type="submit" className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
                  정답제출
                </Button>
                <Button className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
                  미션시작
                </Button>
              </div>
            </form>
            
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <h3 className="mb-2 font-bold">진행팁</h3>
            <p className="text-sm text-gray-600">
              와이파이를 해제 후 모바일 데이터를 켠 상태에서, 복사한 키워드를 네이버 쇼핑 검색창에 붙여넣기 하여 검색해주세요.
            </p>
          </CardBody>
        </Card>
        </>
        ):(
        <p>로딩 중...</p>
        )}
      </main>
      {/* 데스크톱 버전의 버튼도 폼 내부로 이동 */}
      <form onSubmit={missionAnswer}>
        <div className="hidden grid-cols-2 gap-4 p-4 md:grid bottom-16">
          <Button type="submit" className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
            정답제출
          </Button>
          <Button className="w-full py-3 text-lg font-bold text-white bg-green-500 hover:bg-green-600">
            미션시작
          </Button>
        </div>
      </form>
    </div>
  );
}

