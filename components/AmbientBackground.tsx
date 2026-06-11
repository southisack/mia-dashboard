const sparkles = [
  { top: '8%', left: '18%', size: 14, color: '#9B7DB5', delay: '0s', duration: '5.5s' },
  { top: '14%', left: '78%', size: 10, color: '#FF6BB5', delay: '1.2s', duration: '6.5s' },
  { top: '34%', left: '8%', size: 8, color: '#FFB347', delay: '2.4s', duration: '5s' },
  { top: '46%', left: '88%', size: 12, color: '#9B7DB5', delay: '0.6s', duration: '7s' },
  { top: '64%', left: '14%', size: 10, color: '#FF6BB5', delay: '3.1s', duration: '6s' },
  { top: '78%', left: '70%', size: 14, color: '#FFB347', delay: '1.8s', duration: '6.8s' },
  { top: '90%', left: '30%', size: 8, color: '#9B7DB5', delay: '2.9s', duration: '5.8s' },
]

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.16] animate-[driftA_22s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, #FF6BB5 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-28 w-[460px] h-[460px] rounded-full blur-3xl opacity-[0.14] animate-[driftB_26s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, #FFBF8C 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-15%] left-[10%] w-[380px] h-[380px] rounded-full blur-3xl opacity-[0.18] animate-[driftA_30s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, #E8D5F5 0%, transparent 70%)' }}
      />

      {sparkles.map((s, i) => (
        <SparkleIcon
          key={i}
          className="absolute animate-[twinkle_var(--dur)_ease-in-out_infinite]"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            color: s.color,
            animationDelay: s.delay,
            ['--dur' as string]: s.duration,
          }}
        />
      ))}
    </div>
  )
}

function SparkleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  )
}
