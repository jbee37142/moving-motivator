import { useRouter } from 'next/router'

import NameScreen from '../src/screens/NameScreen'
import Seo from '../src/components/Seo'
import { useSessionContext } from '../src/state/sessionContext'

export default function NamePage() {
  const router = useRouter()
  const { state, dispatch } = useSessionContext()

  return (
    <>
      <Seo
        title="이름 입력"
        description="리포트에 표시될 이름을 입력하고 다음 단계로 진행하세요."
      />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <NameScreen
          name={state.name}
          onNameChange={(value) => dispatch({ type: 'setName', name: value })}
          onContinue={() => void router.push('/keywords')}
        />
      </div>
    </>
  )
}
