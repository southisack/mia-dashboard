import BottomNav from '@/components/BottomNav'

export default function KidLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {children}
      <BottomNav />
    </div>
  )
}
