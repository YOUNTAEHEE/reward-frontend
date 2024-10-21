// "use client";
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
// import { useState } from "react";

// export default function Component() {
//   const [productUrl, setProductUrl] = useState("");
//   const [productNumber, setProductNumber] = useState("");
//   const [vendor, setVendor] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");

//   return (
//     <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow">
//       <h1 className="mb-6 text-2xl font-bold">슬롯 관리</h1>
//       <div className="mb-4">
//         <Button variant="bordered" size="sm">
//           <span className="mr-2">←</span> 수정하기
//         </Button>
//       </div>
//       <form className="space-y-4">
//         <div>
//           <label htmlFor="productUrl" className="text-sm font-medium">
//             상품 URL<span className="text-red-500">*</span>
//           </label>
//           <div className="flex">
//             <Input
//               id="productUrl"
//               placeholder="https://www.example.com/product/123"
//               className="flex-grow"
//               value={productUrl}
//               onChange={(e) => setProductUrl(e.target.value)}
//             />
//             <Button className="ml-2" size="sm">
//               조회
//             </Button>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="productNumber" className="text-sm font-medium">
//             프로덕트<span className="text-red-500">*</span>
//           </label>
//           <Input
//             id="productNumber"
//             placeholder="예: 8350028549"
//             value={productNumber}
//             onChange={(e) => setProductNumber(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="vendor" className="text-sm font-medium">
//             벤더<span className="text-red-500">*</span>
//           </label>
//           <Input
//             id="vendor"
//             placeholder="예: 91141529592"
//             value={vendor}
//             onChange={(e) => setVendor(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="category" className="text-sm font-medium">
//             카테고리<span className="text-red-500">*</span>
//           </label>
//           <Input
//             id="category"
//             placeholder="예: 다이슨배터리"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="text-sm font-medium">
//             메모
//           </label>
//           <textarea
//             id="description"
//             placeholder="메모를 입력해주세요"
//             rows={4}
//             className="w-full p-2 mt-1 border rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="pt-4">
//           <p className="mb-2 text-sm font-medium">정렬 방법</p>
//           <ol className="space-y-1 text-sm list-decimal list-inside">
//             <li>상품 URL 입력 (Product, Product / Vendor)</li>
//             <li>조회 버튼 클릭</li>
//             <li>카테고리 - 직접 입력 또는 카테고리 변경해주세요.</li>
//           </ol>
//         </div>
//         <div className="flex justify-end pt-4 space-x-2">
//           <Button variant="bordered">취소</Button>
//           <Button>저장</Button>
//         </div>
//       </form>
//     </div>
//   );
// }


"use client";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";

export default function Component() {
  const [productUrl, setProductUrl] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");

  return (
    <div className="container p-4 mx-auto ">
      <header className="flex items-center mb-6">
        <Button isIconOnly variant="light" className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">슬롯 관리</h1>
      </header>
      
      <div className="flex flex-wrap items-center justify-center w-auto">
        <div className="w-full">
        <div className="w-full md:w-[80%] mx-auto">
          <Card className="w-full mb-6">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label htmlFor="productUrl" className="text-sm font-medium">
                    상품 URL<span className="text-red-500">*</span>
                  </label>
                  <div className="flex mt-1">
                    <Input
                      id="productUrl"
                      placeholder="https://www.coupang.com/vp/products/8350028549?itemId=..."
                      className="flex-grow"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                    />
                    <Button className="ml-2">조회</Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <label htmlFor="productNumber" className="text-sm font-medium">
                    프로덕트<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="productNumber"
                    placeholder="8350028549"
                    className="mt-1"
                    value={productNumber}
                    onChange={(e) => setProductNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="vendor" className="text-sm font-medium">
                    벤더<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="vendor"
                    placeholder="91141529592"
                    className="mt-1"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="text-sm font-medium">
                    카테고리<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="category"
                    placeholder="다이슨배터리"
                    className="mt-1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="memo" className="text-sm font-medium">
                    메모
                  </label>
                  <textarea
                    id="memo"
                    placeholder="메모를 입력해주세요"
                    className="w-full p-2 mt-1 border rounded"
                    rows={4}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="mb-2 font-semibold">정렬 방법</h2>
              <ol className="space-y-1 text-sm list-decimal list-inside">
                <li>상품 URL 입력 (Product, Product / Vendor)</li>
                <li>조회 버튼 클릭</li>
                <li>카테고리 - 직접 입력 또는 카테고리 변경해주세요.</li>
              </ol>
            </CardBody>
          </Card>
        </div>
   </div>
        <div className="w-full md:w-[80%]">
          <div className="flex justify-end mt-6 space-x-2 ">
          <Button variant="bordered">취소</Button>
          <Button>저장</Button>
          </div>
        </div>
      </div>      
     
     
    </div>
    
  );
}