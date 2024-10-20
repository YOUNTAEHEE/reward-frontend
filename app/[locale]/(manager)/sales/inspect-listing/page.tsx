"use client";
import { useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  ArrowLeft,
  Search,
  Trash2,
  Download,
  Plus,
  Edit,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@nextui-org/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Card, CardBody } from "@nextui-org/card";
import {
  TrashIcon,
  CheckCircleIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid"; // Example with Heroicons
import { Pagination } from "@nextui-org/pagination";
import { rewardData } from "../../rewardData";
import { useAsyncList } from "@react-stately/data";
import { useRouter } from 'next/navigation';
import useLocaleStore from "@store/useLocaleStore";

export default function InspectorScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const router = useRouter();
  const { locale, toggleLocale } = useLocaleStore();
  const pages = Math.ceil(rewardData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rewardData.slice(start, end);
  }, [page, rewardData]);
  const filteredData = rewardData.filter((item) =>
    item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rewards = [
    {
      id: 20001,
      user: "KKY",
      status: "생성",
      keyword: "수건",
      admin: "코트리빙",
      price: 4090,
      code: "2102111",
      startDate: "2409181230",
      endDate: "2409281230",
      inflow: 100,
      actualInflow: 89,
    },
    {
      id: 20002,
      user: "KKY",
      status: "생성",
      keyword: "타올",
      admin: "코트리빙",
      price: 4190,
      code: "2102112",
      startDate: "2409181230",
      endDate: "2409281230",
      inflow: 100,
      actualInflow: 89,
    },
    {
      id: 20003,
      user: "KKY",
      status: "비활성",
      keyword: "베개",
      admin: "코트리빙",
      price: 4290,
      code: "2102113",
      startDate: "2409181230",
      endDate: "2409281230",
      inflow: 100,
      actualInflow: 89,
    },
    {
      id: 20004,
      user: "KKY",
      status: "생성",
      keyword: "수건2",
      admin: "코트리빙",
      price: 4090,
      code: "2102114",
      startDate: "2409181230",
      endDate: "2409281230",
      inflow: 100,
      actualInflow: 89,
    },
    {
      id: 20005,
      user: "KKY",
      status: "생성",
      keyword: "타올2",
      admin: "코트리빙",
      price: 4190,
      code: "2102115",
      startDate: "2409181230",
      endDate: "2409281230",
      inflow: 100,
      actualInflow: 89,
    },
  ];

  return (
    <>
      {/* 헤더 */}
      {/* <header className="sticky top-0 z-20 flex p-4 bg-white shadow-sm ">
        <Button isIconOnly variant="ghost" className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold">리워드 관리 : 박기완</h1>
      </header> */}
      {/* <div className="container p-4 mx-auto ">
        <header className="flex items-center mb-6">
          <Button isIconOnly variant="light" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">리워드 관리 : 박기완</h1>
        </header>
      </div>
      <div className="p-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <Card>
            <CardBody className="p-4">
              <h2 className="mb-2 font-bold">사용자: KKY</h2>
              <p>슬롯 전체 개수: 50</p>
              <p>전체 개수중 가용 개수: 5</p>
              <p>등록자: A1</p>
            </CardBody>
          </Card>
          <div className="flex justify-between">
            <div className="space-y-2">
              <Button color="success" className="w-auto">
                추가신청하기
              </Button>
              <div className="flex items-center py-3 space-x-2">
                <Button color="success" className="w-auto">
                  사용자변경버튼
                </Button>
                <Input type="text" placeholder="KKY" className="w-24" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="KKY 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button color="success">검색</Button>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <Button color="success" className="flex items-center space-x-1">
                <TrashIcon className="w-5 h-5" />
                <span>전체 삭제</span>
              </Button>
              <Button color="success" className="flex items-center space-x-1">
                <ArrowDownIcon className="w-5 h-5" />
                <span>선택 저장</span>
              </Button>
              <Button color="success" className="w-auto">
                리워드 만들기
              </Button>
            </div>
          </div>
        </div>
        <Table
          aria-label="리워드 테이블"
          selectionMode="multiple"
          defaultSelectedKeys={["2", "3"]}
          bottomContent={
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>등록 번호</TableColumn>
            <TableColumn>사용자</TableColumn>
            <TableColumn>리워드 ID</TableColumn>
            <TableColumn>생성여부</TableColumn>
            <TableColumn>키워드</TableColumn>
            <TableColumn>판매처</TableColumn>
            <TableColumn>단가</TableColumn>
            <TableColumn>상품 코드</TableColumn>
            <TableColumn>슬롯시작일시</TableColumn>
            <TableColumn>슬롯종료일시</TableColumn>
            <TableColumn>유입</TableColumn>
            <TableColumn>실유입</TableColumn>
            <TableColumn>메모</TableColumn>
          </TableHeader>
          <TableBody>
            {rewardData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.rewardId}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.keyword}</TableCell>
                <TableCell>{item.vendor}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.productCode}</TableCell>
                <TableCell>{item.slotStart}</TableCell>
                <TableCell>{item.slotEnd}</TableCell>
                <TableCell>{item.inflow}</TableCell>
                <TableCell>{item.actualInflow}</TableCell>
                <TableCell>?</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}

      <div className="container p-4 mx-auto">
        <header className="flex items-center mb-12">
          <Button isIconOnly variant="light" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">리워드 관리 : 박기환</h1>
        </header>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardBody className="p-4">
              <h2 className="mb-2 text-lg font-semibold">사용자: KKY</h2>
              <p>슬롯 전체 개수: 50</p>
              <p>전체 개수중 가용 개수: 5</p>
              <p>등록자: A1</p>
            </CardBody>
          </Card>
          <div className="flex flex-col gap-2">
            <Button color="success">
              <Plus className="w-4 h-4 mr-2" /> 추가신청하기
            </Button>
            <div className="flex gap-2">
              <Button variant="bordered" className="flex-grow">
                사용자변경버튼
              </Button>
              <Input placeholder="KKY" className="w-50" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          {/* <div className="flex flex-wrap gap-2 mb-4">
          <Input placeholder="KKY 검색" className="flex-grow" />
          <Button color="success">
            <Search className="w-4 h-4 mr-2" /> 검색
          </Button>
          <Button color="danger">
            <Trash2 className="w-4 h-4 mr-2" /> 전체 삭제
          </Button>
          <Button color="success">
            <Download className="w-4 h-4 mr-2" /> 선택 저장
          </Button>
          <Button color="primary">리워드 만들기</Button>
         </div> */}
          {/* <div className="mb-4">
          <div className="flex w-full md:w-auto">
            <Input placeholder="KKY 검색" className="flex-grow" />
            <Button color="success" className="ml-2">
              <Search className="w-4 h-4 mr-2" /> 검색
            </Button>
          </div>
          </div> */}

          <div className="relative flex items-center w-full mb-6 md:w-full ">
            <Input
              placeholder="KKY 검색"
              className="" // 왼쪽에 아이콘 공간을 마련하기 위해 여백을 추가
            />
            <button
              className="absolute transform -translate-r-1/2 right-3"
              onClick={() => {
                // 여기에 검색 기능을 구현
                console.log("Search icon clicked");
              }}
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button color="danger">
              <Trash2 className="w-4 h-4 mr-2" /> 전체 삭제
            </Button>
            <Button color="success">
              <Download className="w-4 h-4 mr-2" /> 선택 저장
            </Button>
            <Button color="primary" onClick={()=>router.push(`/${locale}/sales/reward-write`)}>리워드 만들기</Button>
          </div>
          <Card>
            <CardBody className="p-0">
              <Table aria-label="Rewards Table">
                <TableHeader>
                  <TableColumn>선택</TableColumn>
                  <TableColumn>No</TableColumn>
                  <TableColumn>사용자</TableColumn>
                  <TableColumn>리워드 ID</TableColumn>
                  <TableColumn>생성여부</TableColumn>
                  <TableColumn>키워드</TableColumn>
                  <TableColumn>관리자</TableColumn>
                  <TableColumn>단가</TableColumn>
                  <TableColumn>상품 코드</TableColumn>
                  <TableColumn>슬롯 시작일시</TableColumn>
                  <TableColumn>슬롯 종료일시</TableColumn>
                  <TableColumn>유입</TableColumn>
                  <TableColumn>실유입</TableColumn>
                  <TableColumn>메모</TableColumn>
                  <TableColumn>수정</TableColumn>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward, index) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{reward.user}</TableCell>
                      <TableCell>{reward.id}</TableCell>
                      <TableCell>{reward.status}</TableCell>
                      <TableCell>{reward.keyword}</TableCell>
                      <TableCell>{reward.admin}</TableCell>
                      <TableCell>{reward.price}</TableCell>
                      <TableCell>{reward.code}</TableCell>
                      <TableCell>{reward.startDate}</TableCell>
                      <TableCell>{reward.endDate}</TableCell>
                      <TableCell>{reward.inflow}</TableCell>
                      <TableCell>{reward.actualInflow}</TableCell>
                      <TableCell className="flex items-center">?</TableCell>
                      <TableCell>
                        <Button isIconOnly size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>

        <div className="flex justify-center space-x-1">
          <Button isIconOnly variant="bordered" color="primary">
            1
          </Button>
          <Button isIconOnly variant="light">
            2
          </Button>
          <Button isIconOnly variant="light">
            3
          </Button>
          <Button isIconOnly variant="light">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
