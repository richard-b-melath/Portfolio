import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Sparkles, Shield, Cpu } from 'lucide-react';
import { useEnvironment } from '@/context/EnvironmentContext';

interface HudTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export const HudTerminalModal = ({ isOpen, onClose, onNavigate }: HudTerminalModalProps) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'RICHARD B MELATH // AI & SYSTEMS KERNEL v2.5.0 [ONLINE]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to view available terminal commands, or click commands below.',
    },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle matrix canvas animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [matrixActive]);

  const {
    weather,
    setWeather,
    showSnowman,
    setShowSnowman,
    showChristmas,
    setShowChristmas,
  } = useEnvironment();

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: CommandLog[] = [
      ...logs,
      { id: String(Date.now()), type: 'input', text: `$ ${rawCmd}` },
    ];

    switch (cmd) {
      case 'help':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: `AVAILABLE COMMANDS:
  • about       - Executive briefing & background
  • projects    - View flagship AI & software engineering works
  • achievements- View national hackathons & awards
  • skills      - List core competencies (FastAPI, LLMs, Docker, etc.)
  • resume      - Experience timeline & roles
  • contact     - Transmission channels & direct email
  • matrix      - Toggle monochrome matrix telemetry stream
  • clear       - Flush terminal buffer
  • exit        - Close terminal interface

ENVIRONMENT & EASTER EGGS:
  • snowman     - Summon / toggle cryogenic AI snowman in Hero ⛄
  • christmas   - Toggle festive holiday decor & garland 🎄
  • sunny       - Switch atmospheric weather to radiant sunny ☀️
  • rainy       - Switch atmospheric weather to cyber rain 🌧️
  • snow        - Switch atmospheric weather to winter snowfall ❄️`,
        });
        break;

      case 'about':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'RICHARD BIJU MELATH — AI Engineer & Software Developer.\nSpecializing in production healthcare intelligence (DoctorAssist.ai), LLM architectures, FastAPI microservices, and Data Science research at Universität Trier.',
        });
        onNavigate('about');
        break;

      case 'projects':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Navigating to [PROJECTS]... Flagship: DoctorAssist.ai, LegalTech Multi-Agent Simulation, Shankarani, HarithaMithram.',
        });
        onNavigate('projects');
        break;

      case 'achievements':
      case 'publications':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Navigating to [PUBLICATIONS & HONORS]... IEEE (2025), IJISAE (2024), Institutional Appreciation, IBM Watsonx Hackathon.',
        });
        onNavigate('featured');
        break;

      case 'skills':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'STACK: Python, FastAPI, Docker, MongoDB, React, PostgreSQL, LLMs & RAG, Deep Learning, Multi-Agent AI.',
        });
        onNavigate('skills');
        break;

      case 'resume':
      case 'experience':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'EXPERIENCE: DoctorAssist.ai (Software Dev), Senscript (AI & Automation), Information Kerala Mission (Civic AI). Education: M.Sc. Data Science Trier, B.Tech CSE AI (8.52 CGPA).',
        });
        onNavigate('resume');
        break;

      case 'contact':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'EMAIL: richardbmelath@gmail.com | PHONE: +91 9544211720 | LOCATION: Ernakulam, Kerala, India.',
        });
        onNavigate('contact');
        break;

      case 'matrix':
        setMatrixActive(!matrixActive);
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: matrixActive ? 'Matrix telemetry disabled.' : 'Matrix stream initialized.',
        });
        break;

      case 'snowman':
      case 'snow man':
      case 'frosty':
        setShowSnowman((prev) => {
          const next = !prev;
          if (next) {
            onNavigate('home');
          }
          return next;
        });
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: !showSnowman
            ? '⛄ [CRYOGENIC PROTOCOL]: Snowman deployed to Hero Section! Navigating to Hero view...'
            : '⛄ [CRYOGENIC PROTOCOL]: Snowman recalled from Hero Section.',
        });
        break;

      case 'merry christmas':
      case 'happy christmas':
      case 'christmas':
      case 'chrismas':
      case 'christmas decoration':
      case 'christmas decorations':
      case 'chrismas decoration':
      case 'chrismas decorations':
      case 'xmas':
        setShowChristmas((prev) => !prev);
        if (!showChristmas) setWeather('snow');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: !showChristmas
            ? '🎄 [HOLIDAY PROTOCOL]: Merry Christmas! Festive holographic garland, lights & winter snow engaged.'
            : '🎄 [HOLIDAY PROTOCOL]: Holiday decor deactivated.',
        });
        break;

      case 'sunny':
      case 'sun':
      case 'sunn':
        setWeather('sunny');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: '☀️ [WEATHER]: Solar flare online. Atmospheric background switched to SUNNY radiant beams.',
        });
        break;

      case 'rainy':
      case 'rain':
      case 'raining':
        setWeather('rain');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: '🌧️ [WEATHER]: Precipitation matrix online. Atmospheric background switched to CYBER RAIN streaks.',
        });
        break;

      case 'snow':
      case 'snowy':
      case 'snowfall':
      case 'winter':
        setWeather('snow');
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'system',
          text: '❄️ [WEATHER]: Cryo snowfall online. Atmospheric background switched to WINTER SNOWFALL.',
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: `Command not recognized: "${rawCmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl bg-black border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.12)] flex flex-col h-[520px] relative font-mono tech-bracket"
      >
        {/* Matrix Canvas Overlay if active */}
        {matrixActive && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
          />
        )}

        {/* Terminal Header */}
        <div className="relative z-10 px-4 py-3 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
            </div>
            <Terminal size={14} className="text-white" />
            <span className="text-xs text-white font-semibold tracking-wider">
              COMMAND_TELEMETRY.SYS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 uppercase hidden sm:inline">
              ESC to Exit
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="relative z-10 px-4 py-2 bg-neutral-950/70 border-b border-white/5 flex items-center gap-1.5 flex-wrap text-[11px]">
          <span className="text-neutral-500 mr-1 text-[10px]">QUICK:</span>
          {['help', 'about', 'projects', 'skills', 'resume', 'contact', 'matrix'].map((c) => (
            <button
              key={c}
              onClick={() => handleCommand(c)}
              className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white hover:text-black text-neutral-300 border border-white/10 transition-colors cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Terminal Log Output */}
        <div
          ref={scrollRef}
          className="relative z-10 flex-1 p-4 overflow-y-auto space-y-2 text-xs leading-relaxed"
        >
          {logs.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap">
              {log.type === 'input' && (
                <span className="text-white font-semibold">{log.text}</span>
              )}
              {log.type === 'output' && (
                <span className="text-neutral-300">{log.text}</span>
              )}
              {log.type === 'system' && (
                <span className="text-neutral-400 italic">{log.text}</span>
              )}
              {log.type === 'error' && (
                <span className="text-neutral-300 underline decoration-white/40">
                  {log.text}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="relative z-10 p-3 bg-neutral-950 border-t border-white/10 flex items-center gap-2"
        >
          <span className="text-white font-bold text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g. projects, skills, help)..."
            className="flex-1 bg-transparent text-white placeholder-neutral-600 text-xs focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1"
          >
            <span>Run</span>
            <CornerDownLeft size={11} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
