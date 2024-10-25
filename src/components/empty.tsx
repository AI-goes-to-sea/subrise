import empty from '@/../public/empty.svg';
import Image from 'next/image';

export default function Empty() {
  return (
    <div className="flex h-full flex-col bg-white justify-center items-center space-y-5">
      <Image width={100} height={100} src={empty} alt="empty" />
      <span>暂无数据</span> 
    </div>
    
  )
}