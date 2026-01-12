import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Flame, Droplets, Dumbbell, Sparkles, Scissors } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Habit {
  id: string
  label: string
  icon: any
  completed: boolean
}

interface HabitData {
  date: string
  habits: Habit[]
  streak: number
  lastCompletedDate: string
}

export default function HabitTracker() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [habitData, setHabitData] = useState<HabitData>({
    date: new Date().toISOString().split('T')[0],
    habits: [
      { id: 'hydration', label: 'Hidratação (2L água)', icon: Droplets, completed: false },
      { id: 'workout', label: 'Treino físico', icon: Dumbbell, completed: false },
      { id: 'skincare', label: 'Cuidado pessoal', icon: Sparkles, completed: false },
      { id: 'beard', label: 'Cuidados com a barba', icon: Scissors, completed: false }
    ],
    streak: 0,
    lastCompletedDate: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('alphacut-habits')
    if (saved) {
      const data = JSON.parse(saved)
      const today = new Date().toISOString().split('T')[0]

      // Se for um novo dia, resetar os hábitos
      if (data.date !== today) {
        // Verificar se todos os hábitos do dia anterior foram completados
        const allCompleted = data.habits.every((h: Habit) => h.completed)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let newStreak = data.streak

        if (allCompleted && data.date === yesterdayStr) {
          // Continua a sequência
          newStreak += 1
        } else if (data.date !== yesterdayStr) {
          // Quebrou a sequência (pulou um dia)
          newStreak = 0
        }

        setHabitData({
          ...data,
          date: today,
          habits: data.habits.map((h: Habit) => ({ ...h, completed: false })),
          streak: newStreak
        })
      } else {
        setHabitData(data)
      }
    }
  }, [])

  const toggleHabit = (habitId: string) => {
    const newHabits = habitData.habits.map(h =>
      h.id === habitId ? { ...h, completed: !h.completed } : h
    )

    const allCompleted = newHabits.every(h => h.completed)
    const today = new Date().toISOString().split('T')[0]

    let newStreak = habitData.streak
    if (allCompleted && habitData.lastCompletedDate !== today) {
      newStreak = habitData.streak + 1
      toast({
        title: '🔥 Dia completo!',
        description: `Parabéns! Você está em uma sequência de ${newStreak} dias!`
      })
    }

    const newData = {
      ...habitData,
      habits: newHabits,
      streak: newStreak,
      lastCompletedDate: allCompleted ? today : habitData.lastCompletedDate
    }

    setHabitData(newData)
    localStorage.setItem('alphacut-habits', JSON.stringify(newData))
  }

  const completedCount = habitData.habits.filter(h => h.completed).length
  const totalCount = habitData.habits.length
  const progress = (completedCount / totalCount) * 100

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-600 to-orange-800 mb-4">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Rastreador de Hábitos</h1>
          <p className="text-zinc-400">Construa consistência todos os dias</p>
        </div>

        {/* Streak Card */}
        <Card className="bg-gradient-to-r from-orange-950 to-zinc-900 border-orange-900 mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Flame className="w-8 h-8 text-orange-500" />
                <span className="text-5xl font-bold text-white">{habitData.streak}</span>
              </div>
              <p className="text-zinc-400">
                {habitData.streak === 0
                  ? 'Comece sua sequência hoje!'
                  : habitData.streak === 1
                  ? 'dia seguido'
                  : 'dias seguidos'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Progresso de Hoje</CardTitle>
            <CardDescription className="text-zinc-400">
              {completedCount} de {totalCount} hábitos concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {completedCount === totalCount && (
              <p className="text-center text-green-500 font-semibold mt-3">
                ✓ Todos os hábitos concluídos hoje!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Habits List */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Metas Diárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {habitData.habits.map((habit) => {
              const Icon = habit.icon
              return (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                    habit.completed
                      ? 'bg-blue-950/30 border-2 border-blue-900'
                      : 'bg-zinc-950 border-2 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => toggleHabit(habit.id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      habit.completed ? 'bg-blue-900' : 'bg-zinc-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${habit.completed ? 'text-blue-400' : 'text-zinc-500'}`} />
                  </div>
                  <span className={`flex-1 font-medium ${habit.completed ? 'text-white' : 'text-zinc-400'}`}>
                    {habit.label}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Motivational Card */}
        <Card className="bg-zinc-900 border-zinc-800 mt-6">
          <CardContent className="pt-6">
            <p className="text-center text-zinc-400 italic">
              "A excelência não é um ato, mas um hábito. Você é o que faz repetidamente."
            </p>
            <p className="text-center text-zinc-600 text-sm mt-2">- Aristóteles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
