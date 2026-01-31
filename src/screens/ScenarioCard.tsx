type ScenarioCardProps = {
  text: string
  onSelect: () => void
  toneClass?: string
}

export default function ScenarioCard({
  text,
  onSelect,
  toneClass,
}: ScenarioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-2xl border border-slate-200 bg-white p-6 min-h-[180px] hover:-translate-y-0.5 transition ${toneClass ?? ''}`}
    >
      <p className="text-lg leading-relaxed text-slate-900">{text}</p>
    </button>
  )
}
