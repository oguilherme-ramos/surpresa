import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Gerar orbes flutuantes
  const orbes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    color: ['from-rose-400', 'from-pink-400', 'from-purple-400', 'from-fuchsia-400'][
      Math.floor(Math.random() * 4)
    ],
  }));

  // Gerar partículas
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Gradiente animado de fundo */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbes flutuantes grandes */}
      {orbes.map((orbe) => (
        <motion.div
          key={`orbe-${orbe.id}`}
          className={`absolute rounded-full blur-3xl bg-gradient-to-br ${orbe.color} to-transparent opacity-20`}
          style={{
            width: orbe.size,
            height: orbe.size,
            top: `${orbe.top}%`,
            left: `${orbe.left}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: orbe.duration,
            delay: orbe.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Partículas de brilho */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-gradient-to-r from-rose-300 to-pink-300"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={{
            y: [0, -300, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Ondas de fundo */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#gradient1)"
          animate={{
            d: [
              'M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z',
              'M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z',
              'M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.5)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Efeito de luz radial */}
      <motion.div
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Brilho de canto */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-300 to-transparent rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Brilho de canto inferior esquerdo */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-300 to-transparent rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

