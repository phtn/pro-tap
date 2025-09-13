export const AnimatedSVGGrid = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Animated SVG Components
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Component 1: Animated Circle */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="circleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <filter id="glow1">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#circleGradient)"
                strokeWidth="3"
                strokeDasharray="504"
                strokeDashoffset="504"
                filter="url(#glow1)"
                className="animate-[trace_3s_ease-in-out_infinite]"
              />
              <style jsx>{`
                @keyframes trace {
                  0% {
                    stroke-dashoffset: 502;
                  }
                  50% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -502;
                  }
                }
                .animate-trace {
                  animation: trace 3s ease-in-out infinite;
                }
              `}</style>
            </svg>
          </div>

          {/* Component 2: Hexagon */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="hexGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon
                points="100,20 160,60 160,140 100,180 40,140 40,60"
                fill="none"
                stroke="url(#hexGradient)"
                strokeWidth="2.5"
                strokeDasharray="480"
                strokeDashoffset="480"
                filter="url(#glow2)"
                className="animate-[hexTrace_4s_ease-in-out_infinite_0.5s_both]"
              />
              <style jsx>{`
                @keyframes hexTrace {
                  0% {
                    stroke-dashoffset: 480;
                  }
                  60% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -480;
                  }
                }
              `}</style>
            </svg>
          </div>

          {/* Component 3: Rounded Rectangle */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="rectGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="glow3">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect
                x="30"
                y="50"
                width="140"
                height="100"
                rx="20"
                fill="none"
                stroke="url(#rectGradient)"
                strokeWidth="3"
                strokeDasharray="400"
                strokeDashoffset="400"
                filter="url(#glow3)"
                className="animate-[rectTrace_3.5s_ease-in-out_infinite_0.5s_both]"
              />
              <style jsx>{`
                @keyframes rectTrace {
                  0% {
                    stroke-dashoffset: 150;
                  }
                  55% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -650;
                  }
                }
              `}</style>
            </svg>
          </div>

          {/* Component 4: Abstract Wave */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0%"
                  y1="0%"
                  x2="70%"
                  y2="50%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="25%" stopColor="#14b8a6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="glow4">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M30,100 Q60,50 100,100 T180,100"
                calcMode="spline"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="250"
                strokeDashoffset="310"
                strokeLinecap="round"
                // filter="url(#glow4)"
                className="blur-[6px] opacity-80 absolute animate-[waveTrace_5.5s_linear_infinite]"
              />
              <path
                d="M30,100 Q60,50 100,100 T180,100"
                calcMode="spline"
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                strokeDasharray="280"
                strokeDashoffset="280"
                strokeLinecap="round"
                filter="url(#glow4)"
                className="animate-[waveTrace_4s_ease-in_infinite]"
              />
              <style jsx>{`
                @keyframes waveTrace {
                  0% {
                    stroke-dashoffset: 250;
                  }
                  70% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -310;
                  }
                }
              `}</style>
            </svg>
          </div>

          {/* Component 5: Star Shape */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="starGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow5">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon
                points="100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70"
                fill="none"
                stroke="url(#starGradient)"
                strokeWidth="2.5"
                strokeDasharray="520"
                strokeDashoffset="520"
                filter="url(#glow5)"
                className="animate-[starTrace_4.5s_ease-in-out_infinite_2s_both]"
              />
              <style jsx>{`
                @keyframes starTrace {
                  0% {
                    stroke-dashoffset: 520;
                  }
                  65% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -520;
                  }
                }
              `}</style>
            </svg>
          </div>

          {/* Component 6: Double Circle */}
          <div className="bg-black rounded-xl p-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient
                  id="doubleGradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient
                  id="doubleGradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <filter id="glow6">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="url(#doubleGradient1)"
                strokeWidth="2"
                strokeDasharray="440"
                strokeDashoffset="440"
                filter="url(#glow6)"
                className="animate-[doubleTrace1_3s_ease-in-out_infinite_0.5s_both]"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="url(#doubleGradient2)"
                strokeWidth="2"
                strokeDasharray="314"
                strokeDashoffset="314"
                filter="url(#glow6)"
                className="animate-[doubleTrace2_3s_ease-in-out_infinite_1.5s_both]"
              />
              <style jsx>{`
                @keyframes doubleTrace1 {
                  0% {
                    stroke-dashoffset: 440;
                  }
                  50% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -440;
                  }
                }
                @keyframes doubleTrace2 {
                  0% {
                    stroke-dashoffset: 314;
                  }
                  50% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -314;
                  }
                }
              `}</style>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
