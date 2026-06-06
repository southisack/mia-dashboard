'use client'

import { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import type { Job } from '@/lib/types'

export default function MissionsPage() {
  const allJobs = useStore(s => s.jobs)
  const requests = useStore(s => s.requests)
  const requestJobCompletion = useStore(s => s.requestJobCompletion)

  const jobs = useMemo(() => allJobs.filter(j => j.active), [allJobs])

  const isPending = (jobId: string) =>
    requests.some(r => r.refId === jobId && r.status === 'pending')

  const isApproved = (jobId: string) =>
    requests.some(r => r.refId === jobId && r.status === 'approved')

  return (
    <main className="px-6 pt-8 pb-4 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Missions Spéciales</h1>
        <p className="text-sm text-[#9B7DB5] mt-0.5">Des défis qui valent le coup 🌟</p>
      </div>

      {/* Jobs list */}
      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <JobCard
            key={job.id}
            job={job}
            pending={isPending(job.id)}
            approved={isApproved(job.id)}
            onAccept={() => requestJobCompletion(job)}
            index={i}
          />
        ))}
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-5xl">🌸</span>
          <p className="text-[#9B7DB5] text-sm text-center">
            Pas de missions pour l&apos;instant.<br />Reviens bientôt !
          </p>
        </div>
      )}
    </main>
  )
}

function JobCard({
  job,
  pending,
  approved,
  onAccept,
  index,
}: {
  job: Job
  pending: boolean
  approved: boolean
  onAccept: () => void
  index: number
}) {
  return (
    <motion.div
      className={`rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(213,192,232,0.40)] ${
        approved ? 'bg-[#F6FFF6]' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.08 }}
    >
      {/* Top banner */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: approved ? '#6BC96B' : 'linear-gradient(135deg, #FFBF8C 0%, #FF6BB5 100%)' }}
      >
        <span className="text-white text-xs font-bold uppercase tracking-wide">
          {approved ? 'Mission accomplie ✓' : `+ ${job.points} points`}
        </span>
        <span className="text-white text-lg">
          {approved ? '🏆' : '⭐'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug">{job.name}</h3>
          <p className="text-sm text-[#9B7DB5] mt-1 leading-relaxed">{job.description}</p>
        </div>

        {/* Reward tag */}
        <div className="flex items-center gap-2 bg-[#F5E0FF] rounded-[12px] px-3 py-2 self-start">
          <span className="text-sm">🎁</span>
          <span className="text-xs font-semibold text-[#9B7DB5]">{job.reward}</span>
        </div>

        {/* Action button */}
        {!approved && (
          <motion.button
            onClick={pending ? undefined : onAccept}
            className={`w-full h-12 rounded-full text-sm font-bold mt-1 ${
              pending
                ? 'bg-[#FFF3E0] text-[#FFB347]'
                : 'text-white'
            }`}
            style={!pending ? { background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' } : {}}
            whileTap={!pending ? { scale: 0.97 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {pending ? 'En attente d\'approbation... ⏳' : 'J\'ai terminé cette mission ! 🙋'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
