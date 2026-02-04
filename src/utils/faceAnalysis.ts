/**
 * Sistema de análise de formato de rosto
 * Baseado nos 8 formatos principais: Coração, Quadrado, Pêra, Retângulo, Redondo, Oval, Diamante, Oblongo
 */

export type FaceShape =
  | 'Coração'
  | 'Quadrado'
  | 'Pêra'
  | 'Retângulo'
  | 'Redondo'
  | 'Oval'
  | 'Diamante'
  | 'Oblongo'

export interface FaceAnalysisResult {
  faceShape: FaceShape
  confidence: number
  characteristics: string[]
  reason: string
}

/**
 * Características de cada formato de rosto
 */
export const faceShapeCharacteristics: Record<FaceShape, {
  description: string
  features: string[]
  hairRecommendations: string[]
}> = {
  'Coração': {
    description: 'Testa larga, maçãs proeminentes, queixo pontudo ou fino',
    features: [
      'Testa mais larga que as maçãs do rosto',
      'Queixo pontudo ou em forma de V',
      'Rosto afunila para baixo'
    ],
    hairRecommendations: [
      'Franjas laterais para suavizar a testa',
      'Volume nas laterais na altura do queixo',
      'Evitar topetes muito volumosos'
    ]
  },
  'Quadrado': {
    description: 'Testa, maçãs e maxilar com larguras similares, mandíbula angular',
    features: [
      'Maxilar angular e bem definido',
      'Largura da testa, maçãs e mandíbula similares',
      'Ângulos marcados e masculinos'
    ],
    hairRecommendations: [
      'Cortes que suavizam os ângulos',
      'Topete ou volume no topo',
      'Laterais curtas para destacar a mandíbula'
    ]
  },
  'Pêra': {
    description: 'Maxilar mais largo que a testa, queixo proeminente',
    features: [
      'Mandíbula mais larga que a testa',
      'Testa estreita em relação ao maxilar',
      'Formato triangular invertido'
    ],
    hairRecommendations: [
      'Volume no topo para equilibrar',
      'Franja ou cabelo na testa para alargar',
      'Evitar cortes muito curtos nas laterais'
    ]
  },
  'Retângulo': {
    description: 'Comprimento maior que largura, lados retos, testa alta',
    features: [
      'Rosto alongado com largura uniforme',
      'Testa, maçãs e maxilar alinhados',
      'Queixo reto e definido'
    ],
    hairRecommendations: [
      'Franjas para encurtar o rosto',
      'Volume nas laterais',
      'Evitar topetes muito altos'
    ]
  },
  'Redondo': {
    description: 'Comprimento e largura similares, linhas suaves e curvas',
    features: [
      'Proporções equilibradas entre comprimento e largura',
      'Bochechas cheias e arredondadas',
      'Poucos ângulos definidos'
    ],
    hairRecommendations: [
      'Altura no topo para alongar',
      'Laterais curtas para afinar',
      'Barba para criar definição no queixo'
    ]
  },
  'Oval': {
    description: 'Proporcional e equilibrado, testa ligeiramente mais larga que o queixo',
    features: [
      'Proporções harmoniosas e equilibradas',
      'Comprimento maior que largura (1.5x)',
      'Maçãs do rosto ligeiramente mais largas',
      'Queixo suavemente arredondado'
    ],
    hairRecommendations: [
      'Versátil - combina com quase todos os estilos',
      'Pode experimentar diversos comprimentos',
      'Tanto clássico quanto moderno funcionam'
    ]
  },
  'Diamante': {
    description: 'Maçãs do rosto proeminentes, testa e queixo estreitos',
    features: [
      'Maçãs do rosto são a parte mais larga',
      'Testa e queixo mais estreitos',
      'Formato angular com destaque no meio'
    ],
    hairRecommendations: [
      'Franjas para alargar a testa',
      'Volume no topo',
      'Barba para alargar o queixo'
    ]
  },
  'Oblongo': {
    description: 'Rosto muito alongado, testa alta, queixo alongado',
    features: [
      'Comprimento significativamente maior que largura',
      'Testa alta e proeminente',
      'Queixo alongado'
    ],
    hairRecommendations: [
      'Franjas para encurtar',
      'Volume nas laterais',
      'Bigode para quebrar o comprimento'
    ]
  }
}

/**
 * Análise simulada baseada em características visuais
 * Em produção, isso seria substituído por uma API de visão computacional
 * ou modelo de IA treinado para classificação de formatos de rosto
 */
export function analyzeFaceShape(_imageData: string): FaceAnalysisResult {
  // Simulação de análise de IA com distribuição realista
  // Em produção: usar TensorFlow.js, MediaPipe, ou API externa
  // Nota: _imageData será usado quando integrarmos com API de visão computacional

  const shapes: FaceShape[] = [
    'Oval',      // 25% - formato mais comum
    'Quadrado',  // 20%
    'Retângulo', // 15%
    'Redondo',   // 15%
    'Diamante',  // 10%
    'Coração',   // 7%
    'Oblongo',   // 5%
    'Pêra'       // 3%
  ]

  // Distribuição probabilística mais realista
  const weights = [25, 20, 15, 15, 10, 7, 5, 3]
  const totalWeight = weights.reduce((a, b) => a + b, 0)

  let random = Math.random() * totalWeight
  let selectedIndex = 0

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      selectedIndex = i
      break
    }
  }

  const faceShape = shapes[selectedIndex]
  const confidence = 75 + Math.floor(Math.random() * 20) // 75-95%

  const shapeData = faceShapeCharacteristics[faceShape]

  return {
    faceShape,
    confidence,
    characteristics: shapeData.features,
    reason: shapeData.description
  }
}

/**
 * Recomendações de corte baseadas no formato do rosto e objetivo
 */
export function getHaircutRecommendations(
  faceShape: FaceShape,
  goal: string,
  hairType: string
): {
  primary: string[]
  avoid: string[]
  styling: string[]
} {
  const baseRecommendations = faceShapeCharacteristics[faceShape].hairRecommendations

  // Ajustes baseados no objetivo
  const goalAdjustments: Record<string, string[]> = {
    'younger': [
      'Cortes texturizados e modernos',
      'Franjas laterais para suavizar',
      'Estilos descontraídos'
    ],
    'authority': [
      'Cortes clássicos e bem estruturados',
      'Laterais bem definidas',
      'Visual profissional e limpo'
    ],
    'modern': [
      'Fade ou degradê nas laterais',
      'Textura no topo',
      'Linhas bem desenhadas'
    ],
    'elegant': [
      'Cortes atemporais',
      'Comprimento médio a longo no topo',
      'Acabamento impecável'
    ]
  }

  // Ajustes baseados no tipo de cabelo
  const hairTypeAdjustments: Record<string, string[]> = {
    'Liso': ['Cortes geométricos', 'Franjas retas', 'Precisão nos detalhes'],
    'Ondulado': ['Aproveitar a textura natural', 'Camadas para movimento', 'Volume controlado'],
    'Cacheado': ['Cortes em camadas', 'Respeitar o cacho', 'Hidratação constante'],
    'Crespo': ['Cortes que valorizam o volume', 'Transições suaves', 'Finalização adequada']
  }

  return {
    primary: [
      ...baseRecommendations.slice(0, 2),
      ...(goalAdjustments[goal] || []).slice(0, 2)
    ],
    avoid: [
      baseRecommendations[baseRecommendations.length - 1]
    ],
    styling: hairTypeAdjustments[hairType] || []
  }
}

/**
 * Análise completa do tipo de cabelo
 */
export function analyzeHairType(_imageData: string): {
  type: string
  texture: string
  density: string
} {
  const hairTypes = ['Liso', 'Ondulado', 'Cacheado', 'Crespo']
  const textures = ['Fino', 'Médio', 'Grosso']
  const densities = ['Baixa', 'Média', 'Alta']

  return {
    type: hairTypes[Math.floor(Math.random() * hairTypes.length)],
    texture: textures[Math.floor(Math.random() * textures.length)],
    density: densities[Math.floor(Math.random() * densities.length)]
  }
}
