import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useToast } from '@/hooks/use-toast'
import { Camera, Upload, ArrowLeft, Sparkles } from 'lucide-react'

export default function Analysis() {
  const [goal, setGoal] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const navigate = useNavigate()
  const { incrementAnalysis } = useSubscription()
  const { toast } = useToast()

  const goals = [
    { value: 'younger', label: 'Parecer mais jovem', desc: 'Cortes que rejuvenescem a aparência' },
    { value: 'authority', label: 'Passar autoridade', desc: 'Estilo profissional e confiante' },
    { value: 'modern', label: 'Visual moderno', desc: 'Cortes atuais e estilosos' },
    { value: 'elegant', label: 'Elegância clássica', desc: 'Estilo atemporal e sofisticado' }
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFace = (_photoData: string): { faceShape: string; hairType: string } => {
    // Simulação de análise de IA (em produção, isso seria uma API real)
    const faceShapes = ['Oval', 'Retangular', 'Redondo', 'Quadrado', 'Triangular']
    const hairTypes = ['Liso', 'Ondulado', 'Cacheado', 'Crespo']

    const faceShape = faceShapes[Math.floor(Math.random() * faceShapes.length)]
    const hairType = hairTypes[Math.floor(Math.random() * hairTypes.length)]

    return { faceShape, hairType }
  }

  const handleSubmit = async () => {
    if (!goal) {
      toast({
        title: 'Escolha seu objetivo',
        description: 'Selecione o que você quer alcançar com seu novo visual',
        variant: 'destructive'
      })
      return
    }

    if (!photo) {
      toast({
        title: 'Envie uma foto',
        description: 'Precisamos de uma foto do seu rosto para a análise',
        variant: 'destructive'
      })
      return
    }

    setIsAnalyzing(true)

    // Simular análise de IA
    await new Promise(resolve => setTimeout(resolve, 2000))

    const { faceShape, hairType } = analyzeFace(photo)

    // Salvar análise
    const analysis = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      goal: goals.find(g => g.value === goal)?.label || goal,
      faceShape,
      hairType,
      photo
    }

    const savedAnalyses = localStorage.getItem('alphacut-analyses')
    const analyses = savedAnalyses ? JSON.parse(savedAnalyses) : []
    analyses.unshift(analysis)
    localStorage.setItem('alphacut-analyses', JSON.stringify(analyses))

    // Incrementar contador
    incrementAnalysis()

    toast({
      title: 'Análise concluída!',
      description: 'Sua consultoria de estilo está pronta'
    })

    navigate(`/results/${analysis.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Análise de Visagismo</h1>
          <p className="text-zinc-400">Vamos descobrir o estilo perfeito para você</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Qual seu objetivo?</CardTitle>
            <CardDescription className="text-zinc-400">
              Escolha o que você quer alcançar com seu novo visual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
              {goals.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    goal === option.value
                      ? 'border-blue-600 bg-blue-950/30'
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950'
                  }`}
                  onClick={() => setGoal(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1">
                    <p className="font-medium text-white">{option.label}</p>
                    <p className="text-sm text-zinc-500">{option.desc}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Envie sua foto</CardTitle>
            <CardDescription className="text-zinc-400">
              Tire uma selfie de frente, com boa iluminação
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!photo ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors bg-zinc-950">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-zinc-600 mb-4" />
                  <p className="mb-2 text-sm text-zinc-400">
                    <span className="font-semibold">Clique para enviar</span> ou arraste a foto
                  </p>
                  <p className="text-xs text-zinc-600">PNG, JPG até 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={photo}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-zinc-950/80 hover:bg-zinc-950"
                >
                  Trocar foto
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={isAnalyzing || !goal || !photo}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Camera className="w-5 h-5 mr-2 animate-pulse" />
              Analisando seu rosto...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analisar Meu Rosto
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
