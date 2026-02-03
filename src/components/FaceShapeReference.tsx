import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'

/**
 * Componente que exibe a referência visual dos 8 formatos de rosto
 */
export function FaceShapeReference() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          Referência: Os 8 Formatos de Rosto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-zinc-950 p-4 rounded-lg">
          <img
            src="/formato-rosto-masculino.jpg"
            alt="Referência dos 8 formatos de rosto masculino"
            className="w-full rounded-lg"
          />
          <p className="text-xs text-zinc-500 mt-3 text-center">
            Nossa análise classifica seu rosto em um destes 8 formatos principais
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white">Como funciona:</strong> Nossa tecnologia analisa as
            proporções do seu rosto comparando:
          </p>
          <ul className="space-y-1 text-sm text-zinc-400">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Largura da testa, maçãs do rosto e maxilar
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Comprimento total do rosto
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Angulação e definição da mandíbula
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Formato do queixo e testa
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
