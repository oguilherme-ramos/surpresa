import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useLocation } from 'wouter'
import AnimatedBackground from '../components/AnimatedBackground'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export default function Home() {
  const [revealed, setRevealed] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([])
  const [flowers, setFlowers] = useState<Array<{ id: number; left: number; delay: number }>>([])
  const [showMessage, setShowMessage] = useState(false)
  const [liberado, setLiberado] = useState(false)
  const [tempoRestante, setTempoRestante] = useState('')
  const [, setLocation] = useLocation()

  // DATA E HORA DA LIBERAÇÃO
  const dataLiberacao = dayjs('2025-10-25T00:00:00')

  // CONTAGEM REGRESSIVA
  useEffect(() => {
    const atualizar = () => {
      const agora = dayjs()
      if (agora.isAfter(dataLiberacao)) {
        setLiberado(true)
        return
      }

      const diff = dataLiberacao.diff(agora)
      const duracao = dayjs.duration(diff)
      const dias = String(duracao.days()).padStart(2, '0')
      const horas = String(duracao.hours()).padStart(2, '0')
      const minutos = String(duracao.minutes()).padStart(2, '0')
      const segundos = String(duracao.seconds()).padStart(2, '0')
      setTempoRestante(`${dias}d ${horas}h ${minutos}m ${segundos}s`)
    }

    atualizar()
    const intervalo = setInterval(atualizar, 1000)
    return () => clearInterval(intervalo)
  }, [])

  // CORAÇÕES FLUTUANTES
  useEffect(() => {
    if (revealed) {
      const interval = setInterval(() => {
        setHearts((prev) => [...prev, { id: Date.now(), left: Math.random() * 100 }])
      }, 200)
      return () => clearInterval(interval)
    }
  }, [revealed])

  // LIMPAR CORAÇÕES ANTIGOS
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hearts.length > 20) {
        setHearts((prev) => prev.slice(-20))
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [hearts])

  // FLORES FLUTUANTES
  useEffect(() => {
    const flowerArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setFlowers(flowerArray)
  }, [])

  // MOSTRAR MENSAGEM APÓS REVELAÇÃO
  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => setShowMessage(true), 800)
      return () => clearTimeout(timer)
    }
  }, [revealed])

  const handleReveal = () => setRevealed(true)
  const handleNavigateToMemories = () => setLocation('/memorias')

  // BLOQUEIO ATÉ O HORÁRIO
  if (!liberado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-6 drop-shadow-lg"
        >
          💞 Ainda não chegou a hora, vida
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg mb-10 max-w-md"
        >
          A surpresa será revelada exatamente à meia-noite do dia 25 de outubro  
          Segura o coração kkkkkkk, o melhor ainda está por vir 💖
        </motion.p>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl font-mono bg-white/20 backdrop-blur-md px-8 py-4 rounded-3xl shadow-lg border border-white/30"
        >
          {tempoRestante}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="mt-10 text-sm opacity-80"
        >
          Contagem regressiva para o nosso amor ser celebrado
        </motion.div>
      </div>
    )
  }

  // CONTEÚDO APÓS LIBERAÇÃO
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />

      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute text-4xl pointer-events-none z-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 0.6, 0] }}
          transition={{
            duration: 12 + Math.random() * 4,
            delay: flower.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: `${flower.left}%` }}
        >
          🌹
        </motion.div>
      ))}

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-3xl pointer-events-none z-10"
            initial={{ y: '100vh', opacity: 1, scale: 0.5 }}
            animate={{ y: '-10vh', opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            style={{ left: `${heart.left}%` }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6"
        >
          Oi vida 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 max-w-2xl text-xl md:text-2xl text-gray-700 font-light"
        >
          Prepare-se para uma surpresa feita só para você 💌
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto" />
            </motion.div>

            <p className="text-gray-700 text-lg mb-8 font-medium">
              Clique no botão e veja o que eu preparei para você 🎁
            </p>

            <div className="mb-8">
              <div className="h-1 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleReveal}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-all"
              >
                💌 Clique aqui
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 max-w-2xl"
            >
              <div className="bg-gradient-to-r from-rose-100 to-purple-100 rounded-2xl p-8 border-2 border-rose-200 shadow-xl">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-rose-600 mb-4"
                >
                  Eu te amo mais do que tudo nesse mundo 💕
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                >
                  Esse mês ao seu lado foi o mais especial da minha vida, cada instante contigo me mostrou que o amor verdadeiro não precisa ser buscado, ele simplesmente acontece e muda tudo. Você é o presente que a vida me deu quando eu menos esperava, e cada sorriso seu é um lembrete de que vale a pena acreditar no destino. Obrigado por ser tão incrível, por me fazer sentir amado de um jeito leve e profundo, e por nunca desistir de nós. Um mês parece pouco, mas ao seu lado, o tempo tem outro ritmo.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                >
                  Tenho certeza de que o que começou há um mês é apenas o primeiro capítulo de uma história eterna, porque você é meu amor, minha paz, minha inspiração diária e a razão mais doce de todos os meus sorrisos
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-6 text-4xl mb-8"
                >
                  🌹 Para sempre seu 🌹
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleNavigateToMemories}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Ver nossas memórias <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-0 right-0 text-9xl opacity-10 pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        ✨
      </motion.div>
    </div>
  )
}
