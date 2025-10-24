import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocation } from 'wouter'
import AnimatedBackground from '@/components/AnimatedBackground'

interface Foto {
  id: number
  src: string
  titulo: string
  descricao: string
}

export default function Memorias() {
  const [fotos, setFotos] = useState<Foto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid')
  const [, setLocation] = useLocation()

  useEffect(() => {
    const fotosPadrao: Foto[] = [
      { id: 1, src: '/images/chacara.jpg', titulo: 'Onde tudo começou', descricao: 'Foi ali, entre risadas e olhares tímidos, que meu mundo mudou pra sempre. Eu nem sabia, mas naquele instante meu coração já te escolhia.' },

      { id: 2, src: '/images/meu aniversario.jpg', titulo: 'Dia 02/05/2025', descricao: 'Você ao meu lado no meu aniversário foi o presente que eu nunca vou superar. Nada brilhou mais que o seu sorriso naquele dia.' },

      { id: 3, src: '/images/ibira.jpg', titulo: 'Nosso reencontro no Ibirapuera', descricao: 'Entre o vento, o lago e o som das bicicletas, te olhar de novo foi como respirar depois de muito tempo sem ar. Eu só queria congelar aquele instante.' },

      { id: 4, src: '/images/despedida.jpg', titulo: 'A despedida', descricao: 'Eu te abracei forte tentando enganar o tempo. Cada beijo no Tucuruvi tinha gosto de saudade antecipada e promessa silenciosa de reencontro.' },

      { id: 5, src: '/images/dormindo.jpg', titulo: 'Noites ao seu lado', descricao: 'Te ver dormindo é como observar a paz vestida de amor. Eu só pensava que sorte a minha poder te chamar de minha.' },

      { id: 6, src: '/images/dates_diarios.jpg', titulo: 'Nossos dias', descricao: 'Mesmo longe, você é a parte mais bonita do meu dia. Sua voz me acalma, seu riso me renova, e o amor que a gente tem me move.' },

      { id: 7, src: '/images/dia do primeiro buque.jpg', titulo: 'O primeiro buquê', descricao: 'Cada flor ali era um pequeno pedaço do que eu sentia. E ver seu sorriso quando recebeu foi a prova de que amar você sempre vai ser a escolha certa.' },

      { id: 8, src: '/images/encontro.mp4', titulo: 'O reencontro', descricao: 'Te ver de novo foi como sentir o sol depois de dias de tempestade. Eu só consegui sorrir, porque tudo em mim gritava agora sim, eu tô completo.' },

      { id: 9, src: '/images/flores_pessoalmente.jpg', titulo: 'Flores e presença', descricao: 'Aquelas flores tinham perfume de saudade. Mas quando te abracei, percebi que nenhum perfume do mundo se compara ao cheiro do teu abraço.' },

      { id: 10, src: '/images/modelos_kkk.jpg', titulo: 'Modelos por um dia', descricao: 'Entre risadas e poses tortas, percebi que com você até o improviso vira lembrança eterna.' },

      { id: 11, src: '/images/aliancas.jpg', titulo: 'Nosso compromisso', descricao: 'Essas alianças não são só metal. São o reflexo do que a gente construiu, do que prometemos e do que ainda vamos viver.' },

      { id: 12, src: '/images/1024.mp4', titulo: 'O começo do “nós”', descricao: 'Aquele momento ficou gravado no tempo. Eu te olhei, pedi pra ficar, e o universo inteiro pareceu sorrir junto com a gente.' },

      { id: 13, src: '/images/vino.jpg', titulo: 'Noites de vinho', descricao: 'O vinho esquentava o corpo, mas era você quem incendiava minha alma. Entre olhares e silêncios, o amor só crescia.' },

      { id: 14, src: '/images/primeira_praia.jpg', titulo: 'Nossa primeira praia', descricao: 'O mar tocava nossos pés, o sol tocava sua pele e eu só pensava: que sorte a minha viver isso com você.' },

      { id: 15, src: '/images/beijo_praia.jpg', titulo: 'Beijo à beira-mar', descricao: 'O vento misturado ao seu beijo fez o mundo desaparecer por um instante. Foi ali que percebi que o amor também tem cheiro de mar.' },

      { id: 16, src: '/images/trabalhando.jpg', titulo: 'Nosso cotidiano', descricao: 'Mesmo entre correria e cansaço, você é meu refúgio. Amar você me faz querer vencer o mundo.' },

      { id: 17, src: '/images/aniversario.jpg', titulo: 'Seu aniversário', descricao: 'Ver você celebrar mais um ano de vida foi um presente pra mim. Porque cada dia seu é uma nova chance de te amar mais.' },

      { id: 18, src: '/images/passeio_shopping.jpg', titulo: 'Nosso passeio', descricao: 'Entre vitrines e risadas, o que realmente importava era a sua mão na minha. O resto era só cenário.' },

      { id: 19, src: '/images/beijo_praia.jpg', titulo: 'Beijo repetido, amor maior', descricao: 'O mesmo mar, o mesmo beijo, mas um amor que só cresce. Porque amar você é se apaixonar de novo a cada toque.' },

      { id: 20, src: '/images/vino2.jpg', titulo: 'Brindes e promessas', descricao: 'A cada brinde, um desejo que a vida nunca nos falte tempo pra viver tudo o que ainda queremos.' },

      { id: 21, src: '/images/dunas.jpg', titulo: 'Nas dunas', descricao: 'O vento batia forte, mas o que me balançava de verdade era você, rindo, livre, linda. E eu ali, tentando guardar cada detalhe.' },

      { id: 22, src: '/images/quadriciclo.jpg', titulo: 'Aventura a dois', descricao: 'Entre velocidade e adrenalina, a melhor parte da viagem sempre foi olhar pro lado e te ver sorrindo.' },

      { id: 23, src: '/images/portinho.jpg', titulo: 'Dia no Portinho', descricao: 'O sol, o vento e o som da sua voz tudo naquele dia parecia girar em torno do que a gente sente.' },

      { id: 24, src: '/images/delta.jpg', titulo: 'Delta do Parnaíba', descricao: 'Ali entre o silêncio da natureza e o barulho do rio, eu percebi que o amor que temos é o tipo que o tempo respeita.' },


    ]

    setFotos(fotosPadrao)
  }, [])

  const handlePrevious = () => setCurrentIndex(prev => (prev === 0 ? fotos.length - 1 : prev - 1))
  const handleNext = () => setCurrentIndex(prev => (prev === fotos.length - 1 ? 0 : prev + 1))
  const handleGoHome = () => setLocation('/')

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">Nossas Memórias 💕</h1>
          <p className="text-xl text-gray-700 font-light">Uma história de momentos incríveis ao seu lado</p>
        </motion.div>

        {/* Carousel */}
        {viewMode === 'carousel' && fotos.length > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-full max-w-2xl mb-12">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border border-white/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-square overflow-hidden"
                  >
                    {fotos[currentIndex].src.endsWith('.mp4') ? (
                      <video src={fotos[currentIndex].src} controls className="w-full h-full object-cover rounded-3xl shadow-2xl" />
                    ) : (
                      <img src={fotos[currentIndex].src} alt={fotos[currentIndex].titulo} className="w-full h-full object-cover" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <motion.h2 key={`title-${currentIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl font-bold mb-2">
                    {fotos[currentIndex].titulo}
                  </motion.h2>
                  <motion.p key={`desc-${currentIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg">
                    {fotos[currentIndex].descricao}
                  </motion.p>
                </div>
              </div>

              {/* Navegação */}
              <div className="flex items-center justify-between mt-6">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handlePrevious} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <div className="flex gap-2">
                  {fotos.map((_, index) => (
                    <motion.button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-gradient-to-r from-rose-500 to-pink-500 w-8' : 'bg-gray-300 w-2'}`} whileHover={{ scale: 1.2 }} />
                  ))}
                </div>

                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleNext} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all">
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Contador */}
              <div className="text-center mt-6 text-gray-700 font-semibold">{currentIndex + 1} de {fotos.length}</div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {viewMode === 'grid' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full max-w-5xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fotos.map((foto, index) => (
                <motion.div
                  key={foto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => {
                    setCurrentIndex(index)
                    setViewMode('carousel')
                  }}
                  className="cursor-pointer group"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-md border border-white/50 h-64">
                    {foto.src.endsWith('.mp4') ? (
                      <video src={foto.src} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={foto.src} alt={foto.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{foto.titulo}</h3>
                      <p className="text-sm">{foto.descricao}</p>
                    </div>

                    <motion.div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Botões */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 flex-wrap justify-center">
          <Button onClick={() => setViewMode(viewMode === 'grid' ? 'carousel' : 'grid')} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition-all">
            {viewMode === 'grid' ? '🎠 Ver Carrossel' : '🎨 Ver Grade'}
          </Button>

          <Button onClick={handleGoHome} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition-all flex items-center gap-2">
            <Home className="w-5 h-5" /> Voltar
          </Button>
        </motion.div>

        {/* Mensagem final */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 max-w-2xl text-center bg-gradient-to-r from-rose-100 to-purple-100 rounded-2xl p-6 border-2 border-rose-200 shadow-xl">
          <p className="text-lg text-gray-700 leading-relaxed">Um mês, trinta dias que pareceram uma vida inteira, e ao mesmo tempo o primeiro capítulo de uma história que eu nunca quero que acabe.
            Cada foto aqui guarda um fragmento do que somos, risadas misturadas com saudade, abraços que falam sem palavras, beijos que acalmam e ao mesmo tempo incendiam.
            Eu olho pra tudo isso e sinto o coração apertar, mas é um aperto bom, aquele que vem quando a alma reconhece o que é verdadeiro.
            Você chegou como o sol depois de um inverno longo, trazendo calor, cor e sentido pra tudo que antes era cinza.
            Desde o dia em que te vi, algo em mim mudou, e eu sou eternamente grato por cada instante que você escolheu compartilhar comigo, o tempo passou a ter outro ritmo, as horas ficaram mais curtas quando estou com você, e infinitas quando não estou. Você é a calma no meu caos, o riso que desarma meus medos, o abraço que me devolve pra casa mesmo a quilômetros de distância. Com você, eu descobri que o amor não é um conto de fadas, ele é real, intenso, e se constrói dia após dia, gesto após gesto.
            E nesse primeiro mês o que eu mais aprendi foi que te amar é o que dá sentido a tudo, se essas fotos falassem elas diriam o quanto te admiro, o quanto te quero bem, o quanto sou grato por cada segundo ao seu lado. Elas contariam sobre o brilho dos seus olhos, sobre o som da sua risada, sobre a forma como você faz o mundo parecer leve, você é o meu agora, meu depois e todos os meus futuros. Um mês é pouco pra tudo que sinto, mas é o suficiente pra saber que encontrei o amor da minha vida, e eu vou passar todos os próximos meses, anos e vidas amando você do mesmo jeito que amo hoje com a alma inteira, sem freio, sem fim ❤️</p>
        </motion.div>
      </div>

      {/* Decoração de canto */}
      <motion.div className="absolute bottom-0 left-0 text-9xl opacity-10 pointer-events-none z-0" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>✨</motion.div>
    </div>
  )
}
