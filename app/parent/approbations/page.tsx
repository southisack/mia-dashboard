'use client'

import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { PendingRequest } from '@/lib/types'

export default function ApprobationsPage() {
  const requests = useStore(s => s.requests)
  const approveRequest = useStore(s => s.approveRequest)
  const rejectRequest = useStore(s => s.rejectRequest)
  const router = useRouter()


  const pending = requests.filter(r => r.status === 'pending')
  const history = requests.filter(r => r.status !== 'pending').slice(-10).reverse()

  return (
    <main className="px-6 pt-8 pb-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(213,192,232,0.31)] flex items-center justify-center text-[#9B7DB5]"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Approbations</h1>
          {pending.length > 0 && (
            <p className="text-sm text-[#FF6BB5]">{pending.length} en attente</p>
          )}
        </div>
      </div>

      {/* Pending requests */}
      {pending.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-[#1A1A1A]">En attente</h2>
          <AnimatePresence>
            {pending.map(req => (
              <RequestCard
                key={req.id}
                request={req}
                onApprove={() => approveRequest(req.id)}
                onReject={() => rejectRequest(req.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 gap-3">
          <span className="text-4xl">✅</span>
          <p className="text-[#9B7DB5] text-sm text-center">
            Tout est approuvé !<br />Aucune demande en attente.
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-[#1A1A1A]">Historique récent</h2>
          {history.map(req => (
            <div
              key={req.id}
              className={`flex items-center gap-3 rounded-[16px] px-4 py-3 ${
                req.status === 'approved' ? 'bg-[#F6FFF6]' : 'bg-[#FFF5F5]'
              }`}
            >
              <span className="text-lg">
                {req.status === 'approved' ? '✅' : '❌'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A1A] truncate">{req.name}</p>
                <p className="text-xs text-[#9B7DB5]">
                  {req.type === 'task' ? 'Tâche' : req.type === 'job' ? 'Mission' : 'Cadeau'}
                  {' · '}
                  {new Date(req.requestedAt).toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <span className={`text-sm font-bold ${req.points > 0 ? 'text-[#6BC96B]' : 'text-[#FF6B6B]'}`}>
                {req.points > 0 ? '+' : ''}{req.points}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Nav links */}
      <div className="flex flex-col gap-3 pt-2">
        <h2 className="text-base font-bold text-[#1A1A1A]">Gérer</h2>
        {[
          { href: '/parent/taches', label: 'Tâches', emoji: '📋' },
          { href: '/parent/missions', label: 'Missions', emoji: '⭐' },
          { href: '/parent/cadeaux', label: 'Cadeaux', emoji: '🎁' },
        ].map(item => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className="flex items-center gap-4 rounded-[16px] bg-white shadow-[0_2px_12px_rgba(213,192,232,0.31)] px-4 py-4 text-left"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-semibold text-[#1A1A1A]">{item.label}</span>
            <span className="ml-auto text-[#D5C0E8]">→</span>
          </button>
        ))}
      </div>
    </main>
  )
}

function RequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: PendingRequest
  onApprove: () => void
  onReject: () => void
}) {
  const typeLabel = request.type === 'task' ? 'Tâche' : request.type === 'job' ? 'Mission' : 'Cadeau'
  const typeEmoji = request.type === 'task' ? '📋' : request.type === 'job' ? '⭐' : '🎁'

  return (
    <motion.div
      className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(213,192,232,0.40)] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      layout
    >
      <div className="px-5 py-4 flex items-start gap-3">
        <span className="text-2xl mt-0.5">{typeEmoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#1A1A1A]">{request.name}</p>
          <p className="text-xs text-[#9B7DB5] mt-0.5">
            {typeLabel} · {new Date(request.requestedAt).toLocaleDateString('fr-CA', {
              weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <span
          className="shrink-0 font-bold text-sm px-2 py-1 rounded-full text-white"
          style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
        >
          {request.points > 0 ? '+' : ''}{request.points}
        </span>
      </div>

      <div className="flex border-t border-[#F5E0FF]">
        <motion.button
          onClick={onReject}
          className="flex-1 py-3 text-sm font-semibold text-[#FF6B6B]"
          whileTap={{ scale: 0.97 }}
        >
          Refuser
        </motion.button>
        <div className="w-px bg-[#F5E0FF]" />
        <motion.button
          onClick={onApprove}
          className="flex-1 py-3 text-sm font-bold text-[#6BC96B]"
          whileTap={{ scale: 0.97 }}
        >
          Approuver ✓
        </motion.button>
      </div>
    </motion.div>
  )
}
