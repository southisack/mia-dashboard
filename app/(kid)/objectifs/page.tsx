'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import type { Reward } from '@/lib/types'

export default function ObjectifsPage() {
  const allRewards = useStore(s => s.rewards)
  const goals = useStore(s => s.goals)
  const ledger = useStore(s => s.ledger)
  const setGoal = useStore(s => s.setGoal)

  const rewards = useMemo(() => allRewards.filter(r => r.active), [allRewards])
  const totalPoints = useMemo(() => ledger.reduce((sum, e) => sum + e.amount, 0), [ledger])
  const activeGoalId = useMemo(() => goals.find(g => g.active)?.rewardId ?? null, [goals])
  const activeGoal = useMemo(() => rewards.find(r => r.id === activeGoalId), [rewards, activeGoalId])

  return (
    <main className="px-6 pt-8 pb-4 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Mon Objectif</h1>
        <p className="text-sm text-[#9B7DB5] mt-0.5">Choisis ce que tu veux obtenir 🎯</p>
      </div>

      {/* Active goal hero */}
      {activeGoal ? (
        <ActiveGoalCard
          reward={activeGoal}
          totalPoints={totalPoints}
          onClear={() => setGoal(activeGoal.id)}
        />
      ) : (
        <div className="rounded-[24px] p-7 flex flex-col items-center gap-3 bg-[#F5E0FF]">
          <span className="text-5xl">🎯</span>
          <p className="text-base font-semibold text-[#9B7DB5] text-center">
            Choisis un objectif ci-dessous<br />pour commencer !
          </p>
        </div>
      )}

      {/* Rewards to set as goal */}
      <div>
        <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Tous les cadeaux</h2>
        <div className="flex flex-col gap-3">
          {rewards.map((reward, i) => (
            <GoalOption
              key={reward.id}
              reward={reward}
              totalPoints={totalPoints}
              isActive={reward.id === activeGoalId}
              onSelect={() => setGoal(reward.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function ActiveGoalCard({
  reward,
  totalPoints,
  onClear,
}: {
  reward: Reward
  totalPoints: number
  onClear: () => void
}) {
  const progress = Math.min(totalPoints / reward.pointCost, 1)
  const remaining = Math.max(reward.pointCost - totalPoints, 0)
  const done = totalPoints >= reward.pointCost

  return (
    <motion.div
      className="rounded-[24px] p-7 flex flex-col gap-4"
      style={{ background: 'linear-gradient(135deg, #FFBF8C 0%, #FF6BB5 100%)' }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-4">
        {reward.image ? (
          <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0">
            <Image src={reward.image} alt={reward.name} fill className="object-cover" sizes="64px" />
          </div>
        ) : (
          <span className="text-5xl shrink-0">{reward.emoji ?? '🎁'}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white/80 text-xs font-medium">Objectif actuel</p>
          <p className="text-white font-bold text-lg leading-snug">{reward.name}</p>
        </div>
      </div>

      {/* Big progress */}
      <div className="flex flex-col gap-2">
        <div className="h-4 rounded-full bg-white/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-white/90 text-sm font-bold">{totalPoints} pts</span>
          <span className="text-white/90 text-sm font-bold">{reward.pointCost} pts</span>
        </div>
      </div>

      {done ? (
        <p className="text-white font-bold text-center text-base">
          Tu as assez de points ! Va dans Cadeaux 🎉
        </p>
      ) : (
        <p className="text-white/90 text-sm text-center">
          Encore <span className="font-bold">{remaining} points</span> à gagner !
        </p>
      )}

      <button
        onClick={onClear}
        className="self-center text-white/70 text-xs underline"
      >
        Changer d&apos;objectif
      </button>
    </motion.div>
  )
}

function GoalOption({
  reward,
  totalPoints,
  isActive,
  onSelect,
  index,
}: {
  reward: Reward
  totalPoints: number
  isActive: boolean
  onSelect: () => void
  index: number
}) {
  const progress = Math.min(totalPoints / reward.pointCost, 1)

  return (
    <motion.button
      onClick={onSelect}
      className={`w-full flex items-center gap-4 rounded-[16px] p-4 text-left shadow-[0_2px_12px_rgba(213,192,232,0.31)] transition-colors ${
        isActive ? 'bg-[#F5E0FF]' : 'bg-white'
      }`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.06 }}
      whileTap={{ scale: 0.98 }}
    >
      {reward.image ? (
        <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0">
          <Image src={reward.image} alt={reward.name} fill className="object-cover" sizes="48px" />
        </div>
      ) : (
        <span className="text-3xl shrink-0">{reward.emoji ?? '🎁'}</span>
      )}

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm text-[#1A1A1A] truncate">{reward.name}</p>
          <span className="text-xs font-semibold text-[#FF6BB5] shrink-0 ml-2">{reward.pointCost} pts</span>
        </div>
        <div className="h-2 rounded-full bg-[#F5E0FF] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)',
            }}
          />
        </div>
      </div>

      <div
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isActive ? 'border-[#FF6BB5] bg-[#FF6BB5]' : 'border-[#D5C0E8]'
        }`}
      >
        {isActive && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </motion.button>
  )
}
