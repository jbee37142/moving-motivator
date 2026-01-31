type ReportCopy = {
  why: string
  tips: string[]
}

export const reportCopyByElementId: Record<string, ReportCopy> = {
  E01: {
    why: '완료와 성취의 순간이 동력을 키웁니다.',
    tips: ['작은 체크리스트를 쪼개서 자주 완료하기', '완료 기준을 문장으로 합의하기'],
  },
  E02: {
    why: '실력이 눈에 보일 때 몰입이 깊어집니다.',
    tips: ['진척 로그를 남겨 성장 곡선을 보기', '루틴으로 연습 시간을 확보하기'],
  },
  E03: {
    why: '결과가 영향력을 만들 때 에너지가 올라갑니다.',
    tips: ['의사결정에 영향 미치는 지점을 맡기', '성과가 닿는 대상을 명확히 보기'],
  },
  E04: {
    why: '경쟁과 승부의 긴장이 집중을 높입니다.',
    tips: ['작은 목표를 게임처럼 기록하기', '비교 기준을 명확히 정하기'],
  },
  E05: {
    why: '스스로 선택할 수 있을 때 동기가 강해집니다.',
    tips: ['일의 범위 안에서 선택지를 만들기', '결정 이유를 스스로 정리하기'],
  },
  E06: {
    why: '주도적으로 책임질 때 몰입이 커집니다.',
    tips: ['의사결정 권한과 책임을 함께 설정하기', '내가 맡을 범위를 명확히 하기'],
  },
  E07: {
    why: '새로운 시도를 할 때 에너지가 살아납니다.',
    tips: ['작은 실험을 주 단위로 넣기', '탐색 시간을 일정에 고정하기'],
  },
  E08: {
    why: '우선순위와 방향이 정리될 때 안심합니다.',
    tips: ['이번 주 목표를 3개로 제한하기', '오늘의 기준을 한 줄로 정리하기'],
  },
  E09: {
    why: '인정과 평판이 동기의 큰 축입니다.',
    tips: ['성과를 공유할 채널을 확보하기', '기여를 명확히 보이는 방식 사용하기'],
  },
  E10: {
    why: '팀과의 소속감이 에너지를 만듭니다.',
    tips: ['정기적으로 팀 컨텍스트를 공유하기', '함께 만드는 결과물을 강조하기'],
  },
  E11: {
    why: '누군가에게 도움이 될 때 의미가 커집니다.',
    tips: ['도움이 필요한 사람을 선명히 보기', '작은 도움을 반복적으로 제공하기'],
  },
  E12: {
    why: '공정함과 존중이 지속 동력을 만듭니다.',
    tips: ['의사결정 기준을 투명하게 공유하기', '피드백을 일관된 규칙으로 받기'],
  },
  E13: {
    why: '예측 가능한 환경이 안정감을 줍니다.',
    tips: ['일정 변경을 미리 공유받기', '불확실 요소를 사전에 체크리스트화하기'],
  },
  E14: {
    why: '보상과 실리가 분명할 때 집중합니다.',
    tips: ['보상 기준을 구체적으로 맞추기', '성과와 보상의 연결을 기록하기'],
  },
  E15: {
    why: '회복과 균형이 유지될 때 지속 가능합니다.',
    tips: ['회복 시간을 일정에 고정하기', '에너지 소모를 기록하고 조절하기'],
  },
  E16: {
    why: '간단하고 효율적인 흐름이 동기를 지킵니다.',
    tips: ['작업 단계를 단순화하기', '반복 작업을 자동화하기'],
  },
}

export const animalByElementId: Record<string, string> = {
  E01: 'Amazon',
  E02: 'NVIDIA',
  E03: 'OpenAI',
  E04: 'Meta',
  E05: 'Netflix',
  E06: 'SpaceX',
  E07: 'Perplexity',
  E08: 'Microsoft',
  E09: 'Figma',
  E10: 'Notion',
  E11: 'Tesla(Optimus)',
  E12: 'Salesforce',
  E13: 'Vercel',
  E14: 'Stripe',
  E15: 'Asana',
  E16: 'Apple',
}

export const animalEmojiByElementId: Record<string, string> = {
  E01: '📦',
  E02: '🖥️',
  E03: '🧠',
  E04: '🏁',
  E05: '🎬',
  E06: '🚀',
  E07: '🔎',
  E08: '🪟',
  E09: '🎨',
  E10: '🗒️',
  E11: '🤖',
  E12: '☁️',
  E13: '▲',
  E14: '💳',
  E15: '🧘',
  E16: '🍎',
}

export const animalBgByElementId: Record<string, string> = {
  E01: 'bg-amber-100', // 📦 Amazon
  E02: 'bg-amber-200', // 🖥️ NVIDIA
  E03: 'bg-stone-200', // 🧠 OpenAI
  E04: 'bg-slate-300', // 🏁 Meta
  E05: 'bg-orange-100', // 🎬 Netflix
  E06: 'bg-stone-200', // 🚀 SpaceX
  E07: 'bg-orange-200', // 🔎 Perplexity
  E08: 'bg-amber-200', // 🪟 Microsoft
  E09: 'bg-yellow-200', // 🎨 Figma
  E10: 'bg-sky-200', // 🗒️ Notion
  E11: 'bg-blue-200', // 🤖 Tesla(Optimus)
  E12: 'bg-slate-200', // ☁️ Salesforce
  E13: 'bg-emerald-200', // ▲ Vercel
  E14: 'bg-amber-300', // 💳 Stripe
  E15: 'bg-amber-200', // 🧘 Asana
  E16: 'bg-yellow-200', // 🍎 Apple
}

export const animalSummaryByElementId: Record<string, string> = {
  E01: '완결·체크에서 불붙는 실행형.',
  E02: '난이도와 성능 개선에서 자라는 숙련형.',
  E03: '내 일이 세상에 닿을 때 살아나는 임팩트형.',
  E04: '비교 가능한 무대에서 에너지가 오르는 경쟁형.',
  E05: '간섭이 줄고 선택권이 늘수록 몰입하는 자율형.',
  E06: '문제 정의→결정→실행을 쥘 때 강한 오너십형.',
  E07: '궁금한 걸 파고들며 답을 찾는 탐색형.',
  E08: '기준과 프로세스로 혼란이 정리될 때 강한 명료형.',
  E09: '피드백과 가시성 속에서 인정받을 때 강한 평판형.',
  E10: '같은 문맥을 공유할 때 안정되는 소속형.',
  E11: '반복/부담을 덜어줄 때 의미가 커지는 기여형.',
  E12: '공정·존중이 지켜질 때 안정되는 신뢰형.',
  E13: '예측 가능한 바닥에서 깊게 집중하는 안정형.',
  E14: '성과↔보상이 선명할 때 달리는 실리형.',
  E15: '리듬과 회복이 있어야 오래 가는 지속형.',
  E16: '마찰이 낮을수록 바로 움직이는 효율형.',
}
