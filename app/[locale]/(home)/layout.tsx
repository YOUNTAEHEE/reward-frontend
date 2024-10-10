import { Home, Wallet, ShoppingBag, FileSpreadsheet, User } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();  // 번역 훅 사용
  const menuItems = [
    { icon: Home, label: t("홈") },  // 한국어 키 사용
    { icon: Wallet, label: t("적립") },
    { icon: ShoppingBag, label: t("스토어") },
    { icon: FileSpreadsheet, label: t("캐시내역") },
    { icon: User, label: t("마이페이지") },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-6xl">
        {/* 데스크탑용 Navbar */}
        <aside className="hidden md:flex flex-col h-screen p-4 border-r
                         md:w-48 lg:w-64">
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <Button key={index} variant="light" className="justify-start w-full text-left">
                <item.icon className="w-6 h-6 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-grow">
          {children}
        </div>

        {/* 광고 영역 (데스크탑에서만 표시) */}
        <aside className="hidden md:flex flex-col h-screen p-4 border-l
                         md:w-48 lg:w-64">
          {/* 광고 내용을 여기에 추가 */}
          <div className="h-full space-y-4">
            {/* 예시 광고 배너 */}
            <div className="bg-gray-200 md:h-32 lg:h-48 flex items-center justify-center">
              <span className="text-gray-500">광고 배너 1</span>
            </div>
            <div className="bg-gray-200 md:h-32 lg:h-48 flex items-center justify-center">
              <span className="text-gray-500">광고 배너 2</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 모바일용 Footer */}
      <footer className="fixed bottom-0 w-full border-t md:hidden">
        <div className="flex justify-around py-2 bg-white">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
