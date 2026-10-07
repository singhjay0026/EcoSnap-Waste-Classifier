import React from 'react';
import { Award, Flame, Leaf, CheckCircle2, RotateCcw, Sparkles, TrendingUp, Camera } from 'lucide-react';
import type { UserStats, HistoryRecord } from '../types';
import { IMPACT_METHODOLOGY_NOTE } from '../data/wasteDatabase';

interface DashboardViewProps {
  userStats: UserStats;
  scanHistory: HistoryRecord[];
  onStartNewScan: () => void;
  onResetStats: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userStats,
  scanHistory,
  onStartNewScan,
  onResetStats
}) => {
  const totalCo2Kg = (userStats.totalImpactCo2eGrams / 1000).toFixed(2);

  // Derive counts directly from scanHistory if populated, falling back to userStats.categoryCounts
  const countsFromHistory = scanHistory.reduce(
    (acc, record) => {
      const cat = record.result?.item?.category;
      if (cat && acc[cat] !== undefined) {
        acc[cat] += 1;
      }
      return acc;
    },
    { recyclable: 0, wet: 0, dry: 0, ewaste: 0 } as Record<string, number>
  );

  const hasHistory = scanHistory.length > 0;
  const effectiveCounts = hasHistory ? countsFromHistory : userStats.categoryCounts;
  const totalScansCount = hasHistory
    ? scanHistory.length
    : Object.values(userStats.categoryCounts).reduce((a, b) => a + b, 0);

  const streamConfig = [
    {
      key: 'recyclable',
      label: 'Recyclable Stream',
      emoji: '♻️',
      description: 'Paper, cardboard, PET bottles & clean plastics',
      targetBin: 'Blue Recycling Bin',
      location: 'Academic Block A & Canteen',
      barColor: 'bg-blue-600',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-900',
      badgeBorder: 'border-blue-300'
    },
    {
      key: 'wet',
      label: 'Wet / Organic Stream',
      emoji: '🌱',
      description: 'Food scraps, fruit peels & organic waste',
      targetBin: 'Green Organic Bin',
      location: 'Hostel Zone Composter',
      barColor: 'bg-emerald-600',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-950',
      badgeBorder: 'border-emerald-300'
    },
    {
      key: 'dry',
      label: 'Dry Waste Stream',
      emoji: '🗑️',
      description: 'Multi-layer food wrappers & dry packaging',
      targetBin: 'Dry Waste Collection Point',
      location: 'Main Canteen Waste Hub',
      barColor: 'bg-amber-600',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-950',
      badgeBorder: 'border-amber-300'
    },
    {
      key: 'ewaste',
      label: 'Toxic E-Waste',
      emoji: '⚡',
      description: 'Batteries, cables, chargers & electronic accessories',
      targetBin: 'Library E-Waste Drop Box',
      location: 'Central Library Entrance',
      barColor: 'bg-purple-600',
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-950',
      badgeBorder: 'border-purple-300'
    }
  ] as const;

  const getPersonalizedInsight = () => {
    if (userStats.totalScans === 0) {
      return `Welcome to EcoSnap! Point your camera at any trash item to get instant AI disposal guidance and start earning Eco Points.`;
    }
    const recyclableCount = effectiveCounts['recyclable'] || 0;
    const ewasteCount = effectiveCounts['ewaste'] || 0;
    if (ewasteCount > 0) {
      return `Awesome work! You've safely diverted ${ewasteCount} toxic e-waste item(s) from municipal landfills to the Library Drop Point.`;
    }
    if (recyclableCount > 0) {
      return `You're on a roll! You've correctly segregated ${recyclableCount} PET & paper recyclables on campus.`;
    }
    return `Building sustainable habits: Scan your canteen waste after every meal to build your streak and earn Eco Points.`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Top Header */}
      <div className="rounded-3xl paper-card border border-stone-300 p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm bg-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>YOUR CAMPUS IMPACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Campus Sustainability Profile
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
            Personalized waste reduction stats, habit streaks, and carbon offset tracking.
          </p>
        </div>

        <button
          onClick={onStartNewScan}
          className="px-5 py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs shadow-sm flex items-center gap-2 shrink-0 transition-all min-h-[44px] cursor-pointer"
        >
          <Camera className="w-4 h-4 text-emerald-300" />
          <span>Scan New Item</span>
        </button>
      </div>

      {/* Personalized AI Insight Callout Card */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>SUSTAINABILITY INSIGHT</span>
        </div>
        <p className="text-sm font-bold text-emerald-950 leading-relaxed">
          "{getPersonalizedInsight()}"
        </p>
      </div>

      {/* 4 Primary Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl paper-card border border-stone-300 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-black text-emerald-800 uppercase tracking-wider">
            <span>Eco Points</span>
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-stone-900">{userStats.ecoPoints}</div>
          <div className="text-[11px] text-stone-500 font-medium">+10 to +25 pts per item</div>
        </div>

        <div className="p-5 rounded-2xl paper-card border border-stone-300 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-black text-amber-800 uppercase tracking-wider">
            <span>Active Streak</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-stone-900">{userStats.currentStreakDays} Days</div>
          <div className="text-[11px] text-stone-500 font-medium">Daily campus segregation</div>
        </div>

        <div className="p-5 rounded-2xl paper-card border border-stone-300 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-black text-teal-800 uppercase tracking-wider">
            <span>Disposals</span>
            <CheckCircle2 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-3xl font-black text-stone-900">{userStats.confirmedDisposals}</div>
          <div className="text-[11px] text-stone-500 font-medium">Items correctly binned</div>
        </div>

        <div className="p-5 rounded-2xl paper-card border border-stone-300 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs font-black text-stone-800 uppercase tracking-wider">
            <span>CO₂e Avoided</span>
            <Leaf className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-stone-900">{totalCo2Kg} kg</div>
          <div className="text-[11px] text-stone-500 font-medium">Estimated carbon offset*</div>
        </div>
      </div>

      {/* Tangible Real-World Environmental Equivalency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1">
          <div className="text-[10px] font-black text-emerald-900 uppercase tracking-wider">SMARTPHONE CHARGES EQUIVALENT</div>
          <div className="text-xl font-black text-emerald-950">
            ~{Math.round(userStats.totalImpactCo2eGrams / 8.4)} Full Charges
          </div>
          <p className="text-[11px] text-emerald-900/80 font-medium">
            Based on ~8.4g CO₂e avoided per phone charge cycle.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 border border-stone-300 space-y-1">
          <div className="text-[10px] font-black text-stone-700 uppercase tracking-wider">LED LIGHTING EQUIVALENT</div>
          <div className="text-xl font-black text-stone-900">
            ~{Math.round(userStats.totalImpactCo2eGrams / 3.2)} Hours
          </div>
          <p className="text-[11px] text-stone-600 font-medium">
            Equivalent to powering an 8W campus LED bulb.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1">
          <div className="text-[10px] font-black text-amber-900 uppercase tracking-wider">LANDFILL DIVERSION RATE</div>
          <div className="text-xl font-black text-amber-950">
            {userStats.totalScans > 0 ? '100% Diverted' : '0 Items Diverted'}
          </div>
          <p className="text-[11px] text-amber-900/80 font-medium">
            Items routed to designated campus drop-off streams.
          </p>
        </div>
      </div>

      {/* Category Stream Breakdown Section */}
      <div className="p-6 sm:p-8 rounded-3xl paper-card border border-stone-300 space-y-6 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-stone-900 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>WASTE STREAM BREAKDOWN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              Campus Stream Distribution Analytics
            </h3>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-300 text-xs font-extrabold text-stone-800 shrink-0">
            {totalScansCount} Total Confirmed Scans
          </div>
        </div>

        {totalScansCount === 0 ? (
          <div className="p-8 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">No Stream Data Available Yet</h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto font-medium">
              Start scanning campus waste items using EcoSnap AI to generate live stream breakdown analytics and carbon offset tracking.
            </p>
            <button
              onClick={onStartNewScan}
              className="px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs transition-colors cursor-pointer"
            >
              Scan Your First Item
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Multi-Segment Stacked Proportion Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span>Stream Proportion Bar</span>
                <span>100% Total Segregation</span>
              </div>
              <div className="h-5 w-full rounded-2xl bg-stone-100 overflow-hidden flex shadow-inner border border-stone-200">
                {streamConfig.map((stream) => {
                  const count = effectiveCounts[stream.key] || 0;
                  const pct = totalScansCount > 0 ? (count / totalScansCount) * 100 : 0;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={stream.key}
                      style={{ width: `${pct}%` }}
                      className={`${stream.barColor} h-full transition-all flex items-center justify-center text-[10px] font-black text-white`}
                      title={`${stream.label}: ${count} items (${pct.toFixed(1)}%)`}
                    >
                      {pct >= 10 ? `${pct.toFixed(0)}%` : ''}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Stream Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streamConfig.map((stream) => {
                const count = effectiveCounts[stream.key] || 0;
                const pctNumber = totalScansCount > 0 ? (count / totalScansCount) * 100 : 0;
                const pctStr = pctNumber.toFixed(1);

                return (
                  <div
                    key={stream.key}
                    className={`p-4 sm:p-5 rounded-2xl border ${stream.bgColor} ${stream.borderColor} space-y-3 transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{stream.emoji}</span>
                        <div className="font-extrabold text-stone-900 text-sm">{stream.label}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${stream.badgeBg} ${stream.badgeText} ${stream.badgeBorder}`}>
                        {pctStr}%
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium leading-snug">
                      {stream.description}
                    </p>

                    {/* CSS Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                        <span>Items: {count}</span>
                        <span>{pctStr}% of total</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                        <div
                          style={{ width: `${pctNumber}%` }}
                          className={`h-full ${stream.barColor} transition-all`}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-stone-700">
                      <span>Bin: <strong className="text-stone-900">{stream.targetBin}</strong></span>
                      <span className="text-emerald-800">📍 {stream.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="text-[11px] text-stone-500 italic leading-snug">
        {IMPACT_METHODOLOGY_NOTE}
      </p>

      {/* Reset Stats Control */}
      {userStats.totalScans > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              if (window.confirm('Reset local Eco Points and scan history?')) {
                onResetStats();
              }
            }}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
            <span>Reset Statistics</span>
          </button>
        </div>
      )}
    </div>
  );
};
