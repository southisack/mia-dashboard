'use client'

import { useMemo, useState } from 'react'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import type { Reward } from '@/lib/types'
import { illustrationGradient } from '@/lib/illustrationGradients'

const FILTERS = [
  { id: 'tous', label: 'Tous', test: () => true },
  { id: 'petit', label: '≤ 100 pts', test: (r: Reward) => r.pointCost <= 100 },
  { id: 'moyen', label: '101-300 pts', test: (r: Reward) => r.pointCost > 100 && r.pointCost <= 300 },
  { id: 'grand', label: '300+ pts', test: (r: Reward) => r.pointCost > 300 },
] as const

export default function CadeauxPage() {
  const allRewards = useStore(s => s.rewards)
  const ledger = useStore(s => s.ledger)
  const requests = useStore(s => s.requests)
  const requestRewardRedemption = useStore(s => s.requestRewardRedemption)
  const [filter, setFilter] = useState<typeof FILTERS[number]['id']>('tous')

  const rewards = useMemo(() => {
    const active = allRewards.filter(r => r.active)
    const activeFilter = FILTERS.find(f => f.id === filter) ?? FILTERS[0]
    return active.filter(activeFilter.test)
  }, [allRewards, filter])
  const totalPoints = useMemo(() => ledger.reduce((sum, e) => sum + e.amount, 0), [ledger])

  const isPending = (rewardId: string) =>
    requests.some(r => r.refId === rewardId && r.status === 'pending')

  return (
    <main className="px-6 pt-8 pb-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Mes Cadeaux</h1>
          <p className="text-sm text-[#9B7DB5] mt-0.5">Ce que tu peux obtenir ✨</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(213,192,232,0.31)]">
          <span className="text-lg">✨</span>
          <span className="text-base font-bold text-[#1A1A1A]">{totalPoints}</span>
          <span className="text-xs text-[#9B7DB5]">pts</span>
        </div>
      </div>

      {/* Segmented filter */}
      <div className="flex bg-[#F5E0FF] rounded-full p-1 gap-1">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="relative flex-1 py-2 rounded-full text-xs font-bold transition-colors"
          >
            {filter === f.id && (
              <motion.div
                layoutId="cadeaux-filter-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(213,192,232,0.6)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative ${filter === f.id ? 'text-[#FF6BB5]' : 'text-[#9B7DB5]'}`}>
              {f.label}
            </span>
          </button>
        ))}
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-2 gap-4">
        {rewards.map((reward, i) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            totalPoints={totalPoints}
            pending={isPending(reward.id)}
            onRedeem={() => requestRewardRedemption(reward)}
            index={i}
          />
        ))}
      </div>
    </main>
  )
}

function RewardCard({
  reward,
  totalPoints,
  pending,
  onRedeem,
  index,
}: {
  reward: Reward
  totalPoints: number
  pending: boolean
  onRedeem: () => void
  index: number
}) {
  const canAfford = totalPoints >= reward.pointCost
  const progress = Math.min(totalPoints / reward.pointCost, 1)

  return (
    <motion.div
      className="flex flex-col rounded-[20px] bg-white shadow-[0_4px_20px_rgba(213,192,232,0.40)] overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.06 }}
    >
      {/* Illustration area — square corners on purpose, card clips the bottom only. */}
      <div className="relative w-full aspect-[4/3]">
        <div
          className="w-full h-full flex items-center justify-center text-5xl"
          style={{ background: illustrationGradient(reward.gradientIndex) }}
        >
          {reward.emoji ?? '🎁'}
        </div>
        {canAfford && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6BB5]/20 pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <p className="font-bold text-sm text-[#1A1A1A] leading-snug">{reward.name}</p>

        {/* Progress bar */}
        <div className="flex flex-col gap-1">
          <div className="h-2 rounded-full bg-[#F5E0FF] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: index * 0.06 + 0.2 }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] text-[#9B7DB5]">{totalPoints} pts</span>
            <span className="text-[10px] font-semibold text-[#FF6BB5]">{reward.pointCost} pts</span>
          </div>
        </div>

        {/* Button */}
        <motion.button
          onClick={pending || !canAfford ? undefined : onRedeem}
          disabled={!canAfford || pending}
          className={`w-full h-10 rounded-full text-xs font-bold transition-opacity ${
            pending
              ? 'bg-[#FFF3E0] text-[#FFB347]'
              : canAfford
              ? 'text-white'
              : 'bg-[#F5E0FF] text-[#9B7DB5]'
          }`}
          style={canAfford && !pending ? { background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' } : {}}
          whileTap={canAfford && !pending ? { scale: 0.96 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {pending
            ? 'En attente... ⏳'
            : canAfford
            ? 'Je le veux ! ✨'
            : `Il manque ${reward.pointCost - totalPoints} pts`}
        </motion.button>
      </div>
    </motion.div>
  )
}
