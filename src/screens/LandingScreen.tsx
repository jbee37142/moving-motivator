type LandingScreenProps = {
  onStart: () => void
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm text-slate-500">Moving Motivator</p>
        <h2 className="text-3xl font-semibold leading-tight">
          나는 어떤 순간에 불붙고, 어떤 순간에 꺼질까?
        </h2>
        <p className="text-slate-600">
          상황별로 더 에너지를 받는 상황, 꺾이는 상황을 고르고 내가 중요하게 생각하는 동기부여 요소가 무엇인지 알아봐요.
        </p>
      </div>
      <img
        src="/main.png"
        alt="상황 카드를 고르는 장면 일러스트"
        className="w-full max-w-3xl rounded-2xl border border-slate-200 shadow-sm"
      />
      <button
        type="button"
        onClick={onStart}
        className="px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
      >
        시작하기
      </button>
    </section>
  )
}
