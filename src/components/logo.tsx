import Image from 'next/image';
import logo from '@/../public/subrise_logo.svg';

export default function Logo () {
  return <Image src={logo} alt="logo" width={136} height={10} className="text-orange-500" />
}