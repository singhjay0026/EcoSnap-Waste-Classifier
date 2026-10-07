export interface EcoLevelInfo {
  name: string;
  badge: string;
  minPoints: number;
  maxPoints: number | null;
  progressPct: number;
  nextLevelName: string | null;
  pointsNeeded: number;
}

export const getEcoLevelInfo = (points: number): EcoLevelInfo => {
  const pts = Math.max(0, points);

  if (pts >= 300) {
    return {
      name: 'Planet Protector',
      badge: '🌍',
      minPoints: 300,
      maxPoints: null,
      progressPct: 100,
      nextLevelName: null,
      pointsNeeded: 0
    };
  }

  if (pts >= 150) {
    const minP = 150;
    const maxP = 300;
    const progressPct = Math.min(100, Math.round(((pts - minP) / (maxP - minP)) * 100));
    return {
      name: 'Eco Champion',
      badge: '🏆',
      minPoints: minP,
      maxPoints: maxP,
      progressPct,
      nextLevelName: 'Planet Protector',
      pointsNeeded: maxP - pts
    };
  }

  if (pts >= 50) {
    const minP = 50;
    const maxP = 150;
    const progressPct = Math.min(100, Math.round(((pts - minP) / (maxP - minP)) * 100));
    return {
      name: 'Green Learner',
      badge: '🌱',
      minPoints: minP,
      maxPoints: maxP,
      progressPct,
      nextLevelName: 'Eco Champion',
      pointsNeeded: maxP - pts
    };
  }

  const minP = 0;
  const maxP = 50;
  const progressPct = Math.min(100, Math.round(((pts - minP) / (maxP - minP)) * 100));
  return {
    name: 'Eco Starter',
    badge: '🌿',
    minPoints: minP,
    maxPoints: maxP,
    progressPct,
    nextLevelName: 'Green Learner',
    pointsNeeded: maxP - pts
  };
};
