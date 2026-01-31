import { useRouter } from 'next/router'

import LandingScreen from '../src/screens/LandingScreen'
import Seo from '../src/components/Seo'

export default function LandingPage() {
  const router = useRouter()

  return (
    <>
      <Seo
        title="나의 동기 스위치 찾기"
        description="무빙 모티베이터로 동기부여/동기저해 패턴을 간단한 선택으로 분석하고, 나만의 Top 3 리포트를 받아보세요."
      />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <LandingScreen onStart={() => void router.push('/name')} />
      </div>
    </>
  )
}
