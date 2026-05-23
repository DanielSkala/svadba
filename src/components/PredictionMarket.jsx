import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

// `left`/`right` map to blue/red on the bar.
// If `leftLabel`/`rightLabel` are omitted, fall back to "Áno"/"Nie".
const QUESTIONS = [
  { id: 'q-dano-saty',     text: 'Oblečie si Dano po polnoci svadobné šaty?' },
  { id: 'q-walter-pride',  text: 'Vznikne na svadbe Walter?' },
  { id: 'q-rachel-pohare', text: 'Rozbije Rachel omylom aspoň 3 poháre?' },
  { id: 'q-vypije-viac',   text: 'Kto vypije viac?', leftLabel: 'Nejtáš', rightLabel: 'Simonka' },
  { id: 'q-kytica',        text: 'Kto vyhrá hádzanie kytice?', leftLabel: 'Tana', rightLabel: 'Dada' },
  { id: 'q-babky-vlasy',   text: 'Budú naše babky judgovať Alexove vlasy?' },
  { id: 'q-skok-lyziach',  text: 'Kto by vyhral v skoku na lyžiach?', leftLabel: 'Dada', rightLabel: 'Rachel' },
  { id: 'q-skotulanie',    text: 'Kto sa rýchlejšie skotúľa z kopca k stodole?', leftLabel: 'Rachel', rightLabel: 'Nejtáš' },
  { id: 'q-drei-hasselnusse', text: 'Kto si bude viac vajbiť na Drei Haselnüsse remix?', leftLabel: 'Henry', rightLabel: 'Rado' },
  { id: 'q-secret-hitler', text: 'Kto vyhrá najbližšieho Secret Hitlera?', leftLabel: 'Liberáli', rightLabel: 'Fašisti' },
];

const CHOICES_KEY = 'svadba-prediction-market-choices-v1';
const UNLOCK_KEY = 'svadba-prediction-market-unlocked-v2';
const PASSWORD = 'HALUSKY';
const POLL_INTERVAL_MS = 5000;
const VOTE_THROTTLE_MS = 500;
const API_URL = '/api/votes';

// Per-device memory of which side I voted for (UI highlight only).
// Counts are sourced from the server.
const loadChoices = () => {
  try {
    const raw = localStorage.getItem(CHOICES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {}
  return {};
};

const saveChoices = (choices) => {
  try {
    localStorage.setItem(CHOICES_KEY, JSON.stringify(choices));
  } catch {}
};

const blankCounts = () => {
  const base = {};
  for (const q of QUESTIONS) {
    base[q.id] = { left: 0, right: 0 };
  }
  return base;
};

const buildVotes = (counts, choices) => {
  const out = {};
  for (const q of QUESTIONS) {
    const c = counts[q.id] || { left: 0, right: 0 };
    out[q.id] = {
      left: c.left || 0,
      right: c.right || 0,
      myChoice:
        choices[q.id] === 'left' || choices[q.id] === 'right' ? choices[q.id] : null,
    };
  }
  return out;
};

const QuestionRow = ({ question, state, onVote }) => {
  const leftLabel = question.leftLabel || 'Áno';
  const rightLabel = question.rightLabel || 'Nie';
  const total = state.left + state.right;
  const leftPct = total === 0 ? 50 : (state.left / total) * 100;
  const rightPct = 100 - leftPct;
  const hasVotes = total > 0;
  const leftLeading = state.left > state.right;
  const rightLeading = state.right > state.left;

  return (
    <div className="py-3.5 border-b border-sage/15 last:border-b-0">
      <p className="font-serif text-[15px] sm:text-base text-gray-800 leading-snug mb-2">
        {question.text}
      </p>

      <div className="relative h-2 rounded-full overflow-hidden bg-gray-100">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
          style={{
            width: hasVotes ? `${leftPct}%` : '50%',
            background: 'linear-gradient(90deg, #4A90E2 0%, #6BA8E8 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 transition-all duration-700 ease-out"
          style={{
            width: hasVotes ? `${rightPct}%` : '50%',
            background: 'linear-gradient(270deg, #E25555 0%, #E87878 100%)',
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-2">
        <span
          className={`font-serif tabular-nums text-xs sm:text-sm ${
            leftLeading ? 'text-[#3273B5] font-semibold' : 'text-gray-500'
          }`}
        >
          {hasVotes ? `${Math.round(leftPct)}% · ` : ''}{state.left} {leftLabel}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onVote(question.id, 'left')}
            className={`px-3 py-0.5 rounded-full font-serif text-xs sm:text-[13px] border transition-all active:scale-95 ${
              state.myChoice === 'left'
                ? 'bg-[#4A90E2] text-white border-[#4A90E2]'
                : 'bg-transparent text-[#4A90E2] border-[#4A90E2]/40 hover:border-[#4A90E2] hover:bg-[#4A90E2]/5'
            }`}
            aria-pressed={state.myChoice === 'left'}
          >
            {leftLabel}
          </button>
          <button
            onClick={() => onVote(question.id, 'right')}
            className={`px-3 py-0.5 rounded-full font-serif text-xs sm:text-[13px] border transition-all active:scale-95 ${
              state.myChoice === 'right'
                ? 'bg-[#E25555] text-white border-[#E25555]'
                : 'bg-transparent text-[#E25555] border-[#E25555]/40 hover:border-[#E25555] hover:bg-[#E25555]/5'
            }`}
            aria-pressed={state.myChoice === 'right'}
          >
            {rightLabel}
          </button>
        </div>

        <span
          className={`font-serif tabular-nums text-xs sm:text-sm text-right ${
            rightLeading ? 'text-[#B53939] font-semibold' : 'text-gray-500'
          }`}
        >
          {state.right} {rightLabel}{hasVotes ? ` · ${Math.round(rightPct)}%` : ''}
        </span>
      </div>
    </div>
  );
};

const PredictionMarket = () => {
  // ---- LOCK CONTROL ----
  // To force everyone (including yourself) back to the locked state,
  // change `false` below to `true`. The page will then ignore any
  // previously saved unlock and require the password again.
  const FORCE_LOCKED = true;

  const [unlocked, setUnlocked] = useState(() => {
    if (FORCE_LOCKED) return false;
    try {
      return localStorage.getItem(UNLOCK_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);

  // Server counts (source of truth) + per-device choices (UI highlight only)
  const [counts, setCounts] = useState(blankCounts);
  const [choices, setChoices] = useState(loadChoices);
  const [loadFailed, setLoadFailed] = useState(false);
  const inFlight = useRef(false);
  const lastVoteAt = useRef(0);

  const votes = buildVotes(counts, choices);

  // Persist per-device choices
  useEffect(() => {
    saveChoices(choices);
  }, [choices]);

  // Initial fetch + polling while the section is unlocked and tab is visible
  useEffect(() => {
    if (!unlocked) return;

    let cancelled = false;
    const fetchCounts = async () => {
      if (inFlight.current) return;
      inFlight.current = true;
      try {
        const r = await fetch(API_URL, { method: 'GET' });
        if (!r.ok) throw new Error('bad response');
        const json = await r.json();
        if (!cancelled && json && json.counts) {
          setCounts(json.counts);
          setLoadFailed(false);
        }
      } catch {
        if (!cancelled) setLoadFailed(true);
      } finally {
        inFlight.current = false;
      }
    };

    fetchCounts();
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') fetchCounts();
    }, POLL_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') fetchCounts();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [unlocked]);

  const tryUnlock = (e) => {
    e.preventDefault();
    if (pwInput.trim().toUpperCase() === PASSWORD) {
      setUnlocked(true);
      try {
        localStorage.setItem(UNLOCK_KEY, '1');
      } catch {}
    } else {
      setPwError(true);
      setPwInput('');
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const handleVote = async (qId, side) => {
    // Client-side throttle: 1 vote per 500ms across the whole market
    const now = Date.now();
    if (now - lastVoteAt.current < VOTE_THROTTLE_MS) return;
    lastVoteAt.current = now;

    const prevSide = choices[qId] || null;

    // Optimistic local update for instant feedback
    setCounts((prev) => {
      const cur = prev[qId] || { left: 0, right: 0 };
      let left = cur.left;
      let right = cur.right;
      if (prevSide && prevSide !== side) {
        if (prevSide === 'left') left = Math.max(0, left - 1);
        else right = Math.max(0, right - 1);
      }
      if (side === 'left') left += 1;
      else right += 1;
      return { ...prev, [qId]: { left, right } };
    });
    setChoices((prev) => ({ ...prev, [qId]: side }));

    // Persist to server; reconcile counts with the authoritative response
    try {
      const r = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId, side, prevSide }),
      });
      if (!r.ok) throw new Error('vote failed');
      const json = await r.json();
      if (json && json.counts) {
        setCounts(json.counts);
        setLoadFailed(false);
      }
    } catch {
      setLoadFailed(true);
    }
  };

  // Locked state: an ornament that blends with the heart-divider aesthetic.
  // Two sage hairlines flank a small diamond-shaped input slot.
  if (!unlocked) {
    return (
      <section
        aria-hidden="true"
        className="relative px-4 py-10 md:py-12"
      >
        <form
          onSubmit={tryUnlock}
          aria-label="Skrytý vstup"
          className="flex items-center justify-center gap-3 max-w-md mx-auto"
        >
          <span
            aria-hidden="true"
            className="flex-1 h-px bg-gradient-to-r from-transparent via-sage/40 to-sage/50"
          />
          <span
            aria-hidden="true"
            className="text-sage/70 text-xs font-serif select-none"
          >
            ✦
          </span>
          <div className="relative">
            <input
              type="password"
              value={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
                if (pwError) setPwError(false);
              }}
              placeholder={pwError ? 'Nesprávne heslo' : 'heslo'}
              aria-label="Heslo"
              autoComplete="off"
              spellCheck="false"
              className={`w-32 sm:w-40 bg-white/70 backdrop-blur-sm font-serif text-center text-sm tracking-[0.18em] py-1.5 px-3 rounded-full border outline-none transition-all shadow-sm ${
                pwError
                  ? 'border-red-300 text-red-500 placeholder:text-red-400 placeholder:tracking-[0.05em]'
                  : 'border-sage/40 focus:border-sage focus:bg-white text-gray-700 placeholder:text-gray-400 placeholder:tracking-normal placeholder:italic hover:border-sage/70'
              }`}
            />
          </div>
          <span
            aria-hidden="true"
            className="text-sage/70 text-xs font-serif select-none"
          >
            ✦
          </span>
          <span
            aria-hidden="true"
            className="flex-1 h-px bg-gradient-to-l from-transparent via-sage/40 to-sage/50"
          />
        </form>
      </section>
    );
  }

  return (
    <section
      id="market"
      aria-label="Svadobný PolyMarket"
      className="relative px-4 py-14 md:py-16 bg-cream-center-glow"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <TrendingUp className="w-9 h-9 mx-auto mb-3 text-sage" strokeWidth={1.5} />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-800 font-bold mb-2">
            Svadobný PolyMarket
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-sage/15 px-5 sm:px-6 py-1">
          {QUESTIONS.map((q) => (
            <QuestionRow
              key={q.id}
              question={q}
              state={votes[q.id]}
              onVote={handleVote}
            />
          ))}
        </div>

        {loadFailed && (
          <p className="text-center font-serif italic text-xs text-red-500 mt-3">
            Spojenie zlyhalo – výsledky sa nemusia synchronizovať. Skúste obnoviť stránku.
          </p>
        )}
      </div>
    </section>
  );
};

export default PredictionMarket;
