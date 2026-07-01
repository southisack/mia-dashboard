const sparkles = [
  { top: '4%',  left: '10%', size: 10, color: '#FF6BB5', delay: '0s',   duration: '5.5s' },
  { top: '8%',  left: '55%', size: 8,  color: '#9B7DB5', delay: '1.1s', duration: '6.2s' },
  { top: '12%', left: '82%', size: 13, color: '#FFB347', delay: '0.4s', duration: '7s'   },
  { top: '18%', left: '30%', size: 7,  color: '#FF6BB5', delay: '2.0s', duration: '5.8s' },
  { top: '24%', left: '92%', size: 10, color: '#9B7DB5', delay: '3.2s', duration: '6.5s' },
  { top: '32%', left: '5%',  size: 12, color: '#FFB347', delay: '1.5s', duration: '5.2s' },
  { top: '38%', left: '68%', size: 8,  color: '#FF6BB5', delay: '0.8s', duration: '6.8s' },
  { top: '45%', left: '42%', size: 6,  color: '#9B7DB5', delay: '2.6s', duration: '5s'   },
  { top: '52%', left: '88%', size: 11, color: '#FF6BB5', delay: '1.9s', duration: '7.2s' },
  { top: '58%', left: '20%', size: 9,  color: '#FFB347', delay: '0.3s', duration: '6s'   },
  { top: '65%', left: '75%', size: 7,  color: '#9B7DB5', delay: '3.5s', duration: '5.6s' },
  { top: '70%', left: '48%', size: 13, color: '#FF6BB5', delay: '1.2s', duration: '6.4s' },
  { top: '76%', left: '8%',  size: 8,  color: '#FFB347', delay: '2.3s', duration: '5.9s' },
  { top: '83%', left: '62%', size: 10, color: '#9B7DB5', delay: '0.7s', duration: '7.1s' },
  { top: '90%', left: '35%', size: 7,  color: '#FF6BB5', delay: '1.6s', duration: '5.3s' },
  { top: '94%', left: '85%', size: 12, color: '#FFB347', delay: '2.9s', duration: '6.7s' },
  { top: '28%', left: '55%', size: 9,  color: '#FF6BB5', delay: '3.8s', duration: '5.7s' },
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
