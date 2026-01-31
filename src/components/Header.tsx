import Link from 'next/link'

export default function Header() {
  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white text-slate-900 border-b border-slate-200">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Moving Motivator
      </Link>
    </header>
  )
}
