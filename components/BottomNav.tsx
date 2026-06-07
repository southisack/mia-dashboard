'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'

const tabs = [
  { href: '/', label: 'Accueil', icon: HouseIcon },
  { href: '/cadeaux', label: 'Cadeaux', icon: GiftIcon },
  { href: '/missions', label: 'Missions', icon: BriefcaseIcon },
  { href: '/objectifs', label: 'Objectifs', icon: TrophyIcon },
]

export default function BottomNav() {
  const pathname = usePathname()
  const pendingCount = useStore(s => s.requests.filter(r => r.status === 'pending').length)

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white rounded-t-[20px] shadow-[0_-4px_16px_rgba(213,192,232,0.25)] flex justify-around items-start px-4 pt-2 pb-6 z-50">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 min-w-[64px] pt-1">
            <Icon className={`w-6 h-6 ${active ? 'text-[#FF6BB5]' : 'text-[#9B7DB5]'}`} />
            <span className={`text-[10px] font-${active ? '600' : '500'} ${active ? 'text-[#FF6BB5]' : 'text-[#9B7DB5]'}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" />
      <line x1="12" y1="17" x2="12" y2="11" />
      <path d="M7 4H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h.5" />
      <path d="M17 4h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-.5" />
      <rect x="7" y="2" width="10" height="9" rx="1" />
    </svg>
  )
}
