export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FEF0FF]">
      {children}
    </div>
  )
}
