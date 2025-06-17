import { MeasurementType } from '@prisma/client'

export interface LessonData {
  title: string
  description: string
  objectives: string[]
  gameRecommendations: string[]
  difficulty: number
  minimumScore: number
  measurementType: MeasurementType
}

export const defaultLessons: LessonData[] = [
  {
    title: "Crosshair Placement Fundamentals",
    description: "Master the foundation of FPS games by learning proper crosshair positioning. Good crosshair placement reduces reaction time and improves accuracy by pre-aiming at common angles.",
    objectives: [
      "Keep crosshair at head level at all times",
      "Pre-aim corners and common angles",
      "Maintain crosshair placement while moving",
      "Achieve 80%+ pre-aim accuracy in scenarios"
    ],
    gameRecommendations: [
      "Aim Lab - Gridshot Ultimate",
      "Kovaak's - 1Wall6Targets TE",
      "CS2 - Aim_botz with crosshair placement focus",
      "Valorant - Range with Hard difficulty bots"
    ],
    difficulty: 1,
    minimumScore: 80.0,
    measurementType: MeasurementType.CROSSHAIR_PLACEMENT
  },
  {
    title: "Tracking Moving Targets",
    description: "Develop smooth mouse control and consistent aim while tracking moving targets. This skill is crucial for games with continuous movement and tracking scenarios.",
    objectives: [
      "Maintain smooth mouse movements without micro-corrections",
      "Track targets at various speeds consistently",
      "Minimize aim deviation during tracking",
      "Achieve 75%+ accuracy on moving targets"
    ],
    gameRecommendations: [
      "Aim Lab - Circular Tracking",
      "Kovaak's - Close Long Strafes Invincible",
      "Kovaak's - Thin Gauntlet",
      "3D Aim Trainer - Tracking scenarios"
    ],
    difficulty: 2,
    minimumScore: 75.0,
    measurementType: MeasurementType.TRACKING_SCORE
  },
  {
    title: "Flick Shot Precision",
    description: "Build muscle memory for quick, accurate flick shots to targets at various distances and angles. Essential for quick target acquisition and reaction-based gameplay.",
    objectives: [
      "Execute consistent flick shots to targets",
      "Maintain accuracy at different distances",
      "Minimize overshoot and undershoot errors",
      "Achieve sub-300ms reaction time with 70%+ accuracy"
    ],
    gameRecommendations: [
      "Aim Lab - Sixshot",
      "Kovaak's - 1Wall6Targets TE",
      "CS2 - Aim_botz flick training",
      "Aim Lab - Spider Shot"
    ],
    difficulty: 3,
    minimumScore: 70.0,
    measurementType: MeasurementType.FLICK_SPEED
  },
  {
    title: "Target Switching & Multi-Target Engagement",
    description: "Learn to efficiently switch between multiple targets while maintaining accuracy. Critical for multi-enemy scenarios and clutch situations.",
    objectives: [
      "Quickly identify and prioritize multiple targets",
      "Maintain accuracy while switching between targets",
      "Develop efficient target acquisition patterns",
      "Complete multi-target scenarios with 65%+ accuracy"
    ],
    gameRecommendations: [
      "Aim Lab - Multishot",
      "Kovaak's - 6 Sphere Hipfire Extra Small",
      "Valorant - Range with multiple targets",
      "Aim Lab - Detection"
    ],
    difficulty: 4,
    minimumScore: 65.0,
    measurementType: MeasurementType.TARGET_SWITCHING
  },
  {
    title: "Reaction Time & Accuracy Under Pressure",
    description: "Combine speed with precision under time pressure. The ultimate test of FPS fundamentals, requiring quick decision-making and accurate execution.",
    objectives: [
      "Maintain accuracy while under time constraints",
      "React quickly to visual stimuli",
      "Perform consistently under pressure",
      "Achieve sub-250ms reaction time with 60%+ accuracy"
    ],
    gameRecommendations: [
      "Aim Lab - Reflexshot",
      "Human Benchmark - Reaction Time Test",
      "Kovaak's - 1Wall1Targets",
      "CS2 - Aim_reflex workshop maps"
    ],
    difficulty: 5,
    minimumScore: 60.0,
    measurementType: MeasurementType.REACTION_TIME
  }
]