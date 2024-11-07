"use client";
import { useMemo, useState , useEffect } from "react";
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
import { useRouter } from "next/navigation";
import useLocaleStore from "@store/useLocaleStore";
import apiClient from "@handler/fetch/client";
import useUserStore from "@store/useUserStore";

type RewardStatus = "생성" | "비활성화";
type RewardInflowCount = 100 | 200;
type RewardPriceComparison = "유" | "무";
interface RewardList {
  rewardId: string;
  advertiserId: string;
  rewardStatus: RewardStatus;
  productUrl: string;
  keyword: string;
  advertiserChannel: string;
  rewardProductPrice: number | string; // 초기에는 빈 값일 수 있음
  rewardPoint: number | string; // 초기에는 빈 값일 수 있음
  productId: string;
  optionId: string;
  productName: string;
  priceComparison: string;
  rewardStartDate: string;
  rewardEndDate: string;
  inflowCount: number | string; // 초기에는 빈 값일 수 있음
  actualInflowCount:number | string;
  rewardMemo: string;
}
export default function InspectorScreen() {
  const [salesRewards, setSalesRewards] = useState<RewardList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set<number>()); // 선택된 항목을 관리하는 상태
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태를 관리하는 상태
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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKeys(new Set()); // 전체 해제
    } else {
      setSelectedKeys(new Set(salesRewards.map((reward) => Number(reward.rewardId)))); // 전체 선택
    }
    setSelectAll(!selectAll); // selectAll 상태를 토글
  };

  const handleSelectRow = (id: number) => {
    const updatedSelectedKeys = new Set(selectedKeys);
    if (updatedSelectedKeys.has(id)) {
      updatedSelectedKeys.delete(id); // 선택 해제
    } else {
      updatedSelectedKeys.add(id); // 선택
    }

    setSelectedKeys(updatedSelectedKeys);
    setSelectAll(updatedSelectedKeys.size === salesRewards.length); // 전체 선택 여부 업데이트
  };

  const { userInfo } = useUserStore();
  const userName = userInfo?.userName || "";
  const userId = userInfo?.userId || "";
  
  const fetchSalesRewards = async()=> {
    try{
      const response = await apiClient.post('/reward/sales/list', {userId});
      const salesRewardsData = Array.isArray(response.data) ? response.data : [];
      setSalesRewards(salesRewardsData); 
    }catch (error){
      setSalesRewards([]); 
    }
  }
  
  useEffect(()=>{
    fetchSalesRewards();
  },[])

  return (
    <>
      <div className="container p-4 mx-auto">
        <header className="flex items-center mb-12">
          <Button isIconOnly variant="light" className="mr-2">
            <ArrowLeft className="w-6 h-6" onClick={() => router.push(`/${locale}/sales/login`)}/>
          </Button>
          <h1 className="text-2xl font-bold">리워드 관리 : {userName}</h1>
        </header>
        {/* <div className="relative flex items-center w-full mb-6 md:w-full ">
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
        </div> */}
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
            <div className="flex gap-2">
              <Button variant="bordered" className="flex-grow">
                사용자변경버튼
              </Button>
              <Input placeholder="KKY" className="w-50" />
            </div>

            <Button
              color="success"
              onClick={() => router.push(`/${locale}/sales/reward-write`)}
            >
              <Plus className="w-4 h-4 mr-2" /> 리워드 추가 신청하기
            </Button>
          </div>
        </div>

        <div className="mb-6">
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
              <Trash2 className="w-4 h-4 mr-2" /> 선택 삭제
            </Button>
            {/* <Button color="success">
              <Download className="w-4 h-4 mr-2" /> 선택 저장
            </Button> */}
            {/* <Button color="primary" onClick={()=>router.push(`/${locale}/sales/reward-write`)}>리워드 만들기</Button> */}
          </div>
          <Card>
            <CardBody className="p-0">
              <Table aria-label="Rewards Table">
                <TableHeader>
                  <TableColumn>
                    <Checkbox
                      isSelected={selectAll}
                      onChange={handleSelectAll}
                    />
                  </TableColumn>
                  <TableColumn>No</TableColumn>
                  <TableColumn>사용자ID</TableColumn>
                  <TableColumn>리워드ID</TableColumn>
                  <TableColumn>관리자</TableColumn>
                  <TableColumn>생성여부</TableColumn>
                  <TableColumn>상품URL</TableColumn>
                  <TableColumn>키워드</TableColumn>
                  <TableColumn>판매처</TableColumn>
                  <TableColumn>상품가격</TableColumn>
                  <TableColumn>리워드 포인트</TableColumn>
                  <TableColumn>상품ID</TableColumn>
                  <TableColumn>옵션ID</TableColumn>
                  <TableColumn>상품명</TableColumn>
                  <TableColumn>가격비교 여부</TableColumn>
                  <TableColumn>리워드 시작일시</TableColumn>
                  <TableColumn>리워드 종료일시</TableColumn>
                  <TableColumn>유입</TableColumn>
                  <TableColumn>실유입</TableColumn>
                  <TableColumn>메모</TableColumn>
                  <TableColumn>수정</TableColumn>
                </TableHeader>
                <TableBody>
                  {salesRewards.map((reward, index) => (
                    <TableRow key={reward.rewardId}>
                      <TableCell>
                        <Checkbox
                          isSelected={selectedKeys.has(Number(reward.rewardId))}
                          onChange={() => handleSelectRow(Number(reward.rewardId))}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{reward.advertiserId}</TableCell>
                      <TableCell>{reward.rewardId}</TableCell>
                      <TableCell>{userName}</TableCell>
                      <TableCell>{reward.rewardStatus}</TableCell>
                      <TableCell>{reward.productUrl}</TableCell>
                      <TableCell>{reward.keyword}</TableCell>
                      <TableCell>{reward.advertiserChannel}</TableCell>
                      <TableCell>{reward.rewardProductPrice}</TableCell>
                      <TableCell>{reward.rewardPoint}</TableCell>
                      <TableCell>{reward.productId}</TableCell>
                      <TableCell>{reward.optionId}</TableCell>
                      <TableCell>{reward.productName}</TableCell>
                      <TableCell>{reward.priceComparison}</TableCell>
                      <TableCell>{reward.rewardStartDate}</TableCell>
                      <TableCell>{reward.rewardEndDate}</TableCell>
                      <TableCell>{reward.inflowCount}</TableCell>
                      <TableCell>{reward.actualInflowCount}</TableCell>
                      <TableCell className="flex items-center">{reward.rewardMemo}</TableCell>
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
