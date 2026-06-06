'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import type { Reward } from '@/lib/types'

export default function CadeauxPage() {
  const allRewards = useStore(s => s.rewards)
  const ledger = useStore(s => s.ledger)
  const requests = useStore(s => s.requests)
  const requestRewardRedemption = useStore(s => s.requestRewardRedemption)

  const rewards = useMemo(() => allRewards.filter(r => r.active), [allRewards])
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
      {/* Illustration area */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {reward.image ? (
          <Image
            src={reward.image}
            alt={reward.name}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: canAfford ? 'linear-gradient(135deg, #FFBF8C 0%, #FF6BB5 100%)' : '#F5E0FF' }}
          >
            {reward.emoji ?? '🎁'}
          </div>
        )}
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
