"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import useUserStore from "@store/useUserStore";
import apiClient from "@handler/fetch/client";

interface ModifyUserInfo {
  userId: string;
  userPassword: string;
  userName: string;
  userNickname: string;
  userPhone: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
}

export default function Component() {
  const userId = useUserStore((state) => state.userInfo?.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [modifyData, setModifyData] = useState(false);
  const [formData, setFormData] = useState<ModifyUserInfo>({
    userId: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userPhone: "",
    accountHolder: "",
    bankName: "",
    accountNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // 그룹별 편집 상태 추가
  const [passwordGroupEditing, setPasswordGroupEditing] = useState(false);
  const [bankGroupEditing, setBankGroupEditing] = useState(false);
  const [nicknameEditing, setNicknameEditing] = useState(false);
  const [phoneEditing, setPhoneEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getUserInfo = async () => {
    try {
      const response = await apiClient.post("api/v1/user/info", { userId });
      const infoData = response.data ? response.data : null;
      setIsLoading(false);
      if (infoData) {
        setFormData({
          userId: infoData.userId,
          userPassword: "",
          userName: infoData.userName,
          userNickname: infoData.userNickname,
          userPhone: infoData.userPhone,
          accountHolder: infoData.accountHolder,
          bankName: infoData.bankName,
          accountNumber: infoData.accountNumber,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await apiClient.post("/my/info/modify",  formData );
        setModifyData(true);
    } catch (error) {
      setModifyData(false);
      alert("정보 수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (userId) {
      getUserInfo();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId && modifyData) {
      getUserInfo();
    }
  }, [modifyData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!formData) {
    return <div>유저 정보를 찾을 수 없습니다.</div>;
  }

  // 비밀번호 그룹 버튼 핸들러
  const handlePasswordGroupButtonClick = () => {
    if (!passwordGroupEditing) {
      // 편집 시작
      setPasswordGroupEditing(true);
    } else {
      // 완료 버튼 클릭 시
      if (formData.userPassword !== "" && confirmPassword !== "") {
        // 두 필드 모두 입력되었을 때
        setPasswordGroupEditing(false);
      } else {
        alert("비밀번호와 비밀번호 확인을 모두 입력해주세요.");
      }
    }
  };

  // 은행 정보 그룹 버튼 핸들러
  const handleBankGroupButtonClick = () => {
    if (!bankGroupEditing) {
      // 편집 시작
      setBankGroupEditing(true);
    } else {
      // 완료 버튼 클릭 시
      if (
        formData.accountHolder !== "" &&
        formData.bankName !== "" &&
        formData.accountNumber !== ""
      ) {
        // 세 필드 모두 입력되었을 때
        setBankGroupEditing(false);
      } else {
        alert("은행 정보의 모든 필드를 입력해주세요.");
      }
    }
  };

  // 닉네임 버튼 핸들러
  const handleNicknameButtonClick = () => {
    if (!nicknameEditing) {
      // 편집 시작
      setNicknameEditing(true);
    } else {
      // 완료 버튼 클릭 시
      if (formData.userNickname !== "") {
        // 필드가 입력되었을 때
        setNicknameEditing(false);
      } else {
        alert("닉네임을 입력해주세요.");
      }
    }
  };

  // 핸드폰 번호 버튼 핸들러
  const handlePhoneButtonClick = () => {
    if (!phoneEditing) {
      // 편집 시작
      setPhoneEditing(true);
    } else {
      // 완료 버튼 클릭 시
      if (formData.userPhone !== "") {
        // 필드가 입력되었을 때
        setPhoneEditing(false);
      } else {
        alert("핸드폰 번호를 입력해주세요.");
      }
    }
  };

  return (
    <div className="flex-1 p-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">회원정보 수정</h1>
      <form onSubmit={handleSubmit}>
        {/* 기본 정보 수정 못함 */}
        <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg">
          <div className="flex flex-wrap items-center mb-4">
            <label htmlFor="userId" className="block mr-4 text-sm font-medium">
              아이디
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center mb-4 bg-white">
            <label htmlFor="userName" className="block mr-4 text-sm font-medium">
              이름
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 비밀번호 및 비밀번호 확인 입력 그룹 */}
        <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg">
          <div className="flex flex-wrap items-center mb-4">
            <label htmlFor="userPassword" className="block mr-4 text-sm font-medium">
              비밀번호
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="password"
                id="userPassword"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                autoComplete="new-password"
                required={passwordGroupEditing}
                disabled={!passwordGroupEditing}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4 bg-white">
            <label htmlFor="confirmPassword" className="block mr-4 text-sm font-medium">
              비밀번호 확인
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호를 다시 입력하세요"
                autoComplete="new-password"
                required={passwordGroupEditing}
                disabled={!passwordGroupEditing}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              className="bg-green-500"
              onClick={handlePasswordGroupButtonClick}
            >
              {passwordGroupEditing ? "완료" : "변경"}
            </Button>
          </div>
        </div>

        {/* 닉네임 입력 */}
        <div className="flex flex-wrap items-center p-4 mb-4 bg-white border border-gray-300 rounded-lg">
          <label htmlFor="userNickname" className="block mr-4 text-sm font-medium">
            닉네임
          </label>
          <div className="flex w-full mt-2">
            <Input
              isRequired
              type="text"
              id="userNickname"
              name="userNickname"
              value={formData.userNickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
              required={nicknameEditing}
              disabled={!nicknameEditing}
            />
          </div>
          <div className="flex justify-end w-full mt-2">
            <Button
              type="button"
              className="bg-green-500"
              onClick={handleNicknameButtonClick}
            >
              {nicknameEditing ? "완료" : "변경"}
            </Button>
          </div>
        </div>

        {/* 핸드폰 번호 입력 */}
        <div className="flex flex-wrap items-center p-4 mb-4 bg-white border border-gray-300 rounded-lg">
          <label htmlFor="userPhone" className="block mr-4 text-sm font-medium">
            핸드폰 번호
          </label>
          <div className="flex w-full mt-2">
            <Input
              isRequired
              type="tel"
              id="userPhone"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleInputChange}
              placeholder="핸드폰 번호를 입력하세요"
              required={phoneEditing}
              disabled={!phoneEditing}
            />
          </div>
          <div className="flex justify-end w-full mt-2">
            <Button
              type="button"
              className="bg-green-500"
              onClick={handlePhoneButtonClick}
            >
              {phoneEditing ? "완료" : "변경"}
            </Button>
          </div>
        </div>

        {/* 은행, 계좌번호, 예금주 이름 필드 그룹화 */}
        <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg">
          <div className="flex flex-wrap items-center mb-4">
            <label htmlFor="accountHolder" className="block mr-4 text-sm font-medium">
              예금주 이름
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="text"
                id="accountHolder"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                placeholder="예금주 이름을 입력하세요"
                required={bankGroupEditing}
                disabled={!bankGroupEditing}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4">
            <label htmlFor="bankName" className="block mr-4 text-sm font-medium">
              은행
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="은행 이름을 입력하세요"
                required={bankGroupEditing}
                disabled={!bankGroupEditing}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center mb-4">
            <label htmlFor="accountNumber" className="block mr-4 text-sm font-medium">
              계좌번호
            </label>
            <div className="flex w-full mt-2">
              <Input
                isRequired
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="계좌번호를 입력하세요"
                required={bankGroupEditing}
                disabled={!bankGroupEditing}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              className="bg-green-500"
              onClick={handleBankGroupButtonClick}
            >
              {bankGroupEditing ? "완료" : "변경"}
            </Button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" className="bg-green-500" variant="solid">
            수정
          </Button>
        </div>
      </form>
    </div>
  );
}
