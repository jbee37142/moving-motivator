import { useId, useState } from 'react'

type NameScreenProps = {
  name: string
  onNameChange: (value: string) => void
  onContinue: () => void
}

export default function NameScreen({
  name,
  onNameChange,
  onContinue,
}: NameScreenProps) {
  const errorId = useId()
  const [touched, setTouched] = useState(false)
  const trimmedName = name.trim()
  const isValid = trimmedName.length > 0

  const handleSubmit = (event: { preventDefault(): void }) => {
    event.preventDefault()
    setTouched(true)
    if (!isValid) return
    onContinue()
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">이름을 알려주세요</h2>
        <p className="text-slate-600">
          리포트에 이름이 반영됩니다.
        </p>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event: { target: { value: string } }) =>
            onNameChange(event.target.value)
          }
          onBlur={() => setTouched(true)}
          required
          enterKeyHint="go"
          aria-invalid={touched && !isValid}
          aria-describedby={touched && !isValid ? errorId : undefined}
          className="w-full max-w-md mr-4 rounded-lg bg-white border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="이름"
        />

        <p
          id={errorId}
          aria-live="polite"
          className={`text-sm min-h-5 ${touched && !isValid ? 'text-rose-600' : 'invisible'}`}
        >
          이름을 입력해 주세요.
        </p>

        <button
          type="submit"
          disabled={!isValid}
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          시작하기
        </button>
      </form>
    </section>
  )
}
