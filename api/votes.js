import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const NAMESPACE = 'svadba:market:v1';
const RATE_LIMIT_WINDOW_MS = 500;
const RATE_LIMIT_PREFIX = 'svadba:market:rl:';

// Whitelist of question IDs we allow voting on. Keep in sync with
// QUESTIONS in src/components/PredictionMarket.jsx so a typo in the client
// can't pollute the store.
const ALLOWED_QUESTIONS = new Set([
  'q-dano-saty',
  'q-walter-pride',
  'q-rachel-pohare',
  'q-vypije-viac',
  'q-kytica',
  'q-babky-vlasy',
  'q-skok-lyziach',
  'q-skotulanie',
  'q-drei-hasselnusse',
  'q-secret-hitler',
]);

const ALLOWED_SIDES = new Set(['left', 'right']);

const fieldKey = (qId, side) => `${qId}:${side}`;

export default async function handler(req, res) {
  // CORS — same-origin in prod but harmless to set
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const raw = (await redis.hgetall(NAMESPACE)) || {};
      const counts = {};
      for (const qId of ALLOWED_QUESTIONS) {
        counts[qId] = {
          left: Number(raw[fieldKey(qId, 'left')] || 0),
          right: Number(raw[fieldKey(qId, 'right')] || 0),
        };
      }
      return res.status(200).json({ counts });
    }

    if (req.method === 'POST') {
      const body =
        typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const { questionId, side, prevSide } = body;

      if (!ALLOWED_QUESTIONS.has(questionId) || !ALLOWED_SIDES.has(side)) {
        return res.status(400).json({ error: 'Invalid questionId or side' });
      }

      // Per-IP rate limit: max 1 vote per 500ms.
      // Uses Redis SET NX with a short TTL as the lock; if the key exists,
      // the IP is voting too fast.
      const ip =
        req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
        req.headers['x-real-ip']?.toString() ||
        'unknown';
      const rlKey = `${RATE_LIMIT_PREFIX}${ip}`;
      const acquired = await redis.set(rlKey, 1, {
        nx: true,
        px: RATE_LIMIT_WINDOW_MS,
      });
      if (acquired === null) {
        return res.status(429).json({ error: 'Príliš rýchlo' });
      }

      // If the user is switching sides, decrement the previous side first.
      // Polymarket-style: re-voting the same side stacks the count.
      if (prevSide && ALLOWED_SIDES.has(prevSide) && prevSide !== side) {
        const prevField = fieldKey(questionId, prevSide);
        const prev = Number(
          (await redis.hget(NAMESPACE, prevField)) || 0,
        );
        if (prev > 0) {
          await redis.hincrby(NAMESPACE, prevField, -1);
        }
      }

      await redis.hincrby(NAMESPACE, fieldKey(questionId, side), 1);

      const raw = (await redis.hgetall(NAMESPACE)) || {};
      const counts = {};
      for (const qId of ALLOWED_QUESTIONS) {
        counts[qId] = {
          left: Number(raw[fieldKey(qId, 'left')] || 0),
          right: Number(raw[fieldKey(qId, 'right')] || 0),
        };
      }
      return res.status(200).json({ counts });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('votes API error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
