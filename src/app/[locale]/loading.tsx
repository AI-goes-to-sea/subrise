// import SubriseLogoAnimation from "../components/SubriseLogoAnimation";
import Image from 'next/image';
import loadingGif from '@/../public/loading.gif';

export default function Loading () {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-60 w-full min-h-screen">
      <div className="flex w-full h-full justify-center items-center">
        <Image src={loadingGif} alt="loading" width={600} height={600} />
      </div>
    </div>
  )
}