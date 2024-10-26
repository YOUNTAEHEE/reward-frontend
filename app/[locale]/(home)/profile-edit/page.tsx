// 필요한 패키지에서 직접 import
'use client'

import { Bell, Gift, Users } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { useRouter } from "next/navigation";
import useLocaleStore from "@store/useLocaleStore";
import { Input } from '@nextui-org/input';
import { useState , useEffect} from "react";
import { Select, SelectItem } from '@nextui-org/select';

export default function Component() {
  const [formData, setFormData] = useState({
    password: '',
    nickname: '',
    phoneNumber: '',
    bank: '',
    accountNumber: '',
    accountHolder: ''
  });
  
  const [editableFields, setEditableFields] = useState({
    password: false,
    nickname: false,
    phoneNumber: false,
    bank: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (value) => {
    setFormData(prev => ({ ...prev, bank: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

 

  return (
 
    <div className="flex-1 min-h-screen p-10 bg-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">회원정보 수정</h1>
    </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              비밀번호
            </label>
            <Input
              isRequired
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nickname" className="block mb-1 text-sm font-medium">
              닉네임
            </label>
            <Input
              isRequired
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">
              핸드폰 번호
            </label>
            <Input
              isRequired
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="핸드폰 번호를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bank" className="block mb-1 text-sm font-medium">
              은행
            </label>
            <Select
              placeholder="은행을 선택하세요"
              selectedValue={formData.bank}
              onSelectionChange={handleBankChange}
              className="w-full"
            >
              <SelectItem key="shinhan" value="shinhan">
                신한은행
              </SelectItem>
              <SelectItem key="kb" value="kb">
                국민은행
              </SelectItem>
              <SelectItem key="woori" value="woori">
                우리은행
              </SelectItem>
              {/* Add more banks as needed */}
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block mb-1 text-sm font-medium">
              계좌번호
            </label>
            <Input
              isRequired
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="계좌번호를 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="accountHolder" className="block mb-1 text-sm font-medium">
              예금주 이름
            </label>
            <Input
              isRequired
              type="text"
              id="accountHolder"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleInputChange}
              placeholder="예금주 이름을 입력하세요"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" color="success" variant="solid">
              수정 완료
            </Button>
          </div>
        </form>
      </div>
  );
}
