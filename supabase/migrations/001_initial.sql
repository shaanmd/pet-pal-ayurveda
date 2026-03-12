-- PetPal Ayurveda: Initial schema
-- All tables are prefixed with petpal_ to avoid clashes in a shared Supabase project.
-- Run this in Supabase SQL Editor or via `supabase db push`

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- petpal_quiz_results: one row per completed quiz submission
-- ---------------------------------------------------------------------------
create table if not exists petpal_quiz_results (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  email        text not null,
  primary_dosha text not null check (primary_dosha in ('vata', 'pitta', 'kapha')),
  vata_score   int not null default 0,
  pitta_score  int not null default 0,
  kapha_score  int not null default 0,
  tips_json    jsonb
);

-- Index for quick lookup by email
create index if not exists petpal_quiz_results_email_idx on petpal_quiz_results (email);

-- Row-level security
alter table petpal_quiz_results enable row level security;

-- Allow anonymous INSERT (quiz submissions)
create policy "petpal: allow anonymous insert" on petpal_quiz_results
  for insert with check (true);

-- Only service role can SELECT
create policy "petpal: allow service role select" on petpal_quiz_results
  for select using (auth.role() = 'service_role');


-- ---------------------------------------------------------------------------
-- petpal_dosha_tips: dynamic per-dosha content (optional — can stay in code)
-- ---------------------------------------------------------------------------
create table if not exists petpal_dosha_tips (
  id          uuid primary key default gen_random_uuid(),
  dosha       text not null check (dosha in ('vata', 'pitta', 'kapha')),
  title       text not null,
  subtitle    text not null,
  description text not null,
  massage_tips text[] not null default '{}',
  diet_tips    text[] not null default '{}',
  herb_tips    text[] not null default '{}',
  pdf_url     text
);

-- Seed with initial content
insert into petpal_dosha_tips (dosha, title, subtitle, description, massage_tips, diet_tips, herb_tips) values
(
  'vata',
  'Your pet is Vata-dominant',
  'Air & Space — light, quick, sensitive',
  'Vata pets are lively, creative, and quick to react. They thrive with warm, grounding routines and gentle touch. Irregular schedules can increase anxiety, so consistency is key.',
  array[
    'Use slow, warm, grounding strokes — avoid quick or light touches.',
    'Focus on the lower back and hindquarters to support stability.',
    'Keep sessions short (5–10 min) to avoid overstimulation.',
    'Warm the room first; Vata types are sensitive to cold drafts.',
    'Warm sesame oil (vet-approved) can be applied in small amounts.'
  ],
  array[
    'Warm, moist, easily digestible foods — avoid cold raw diets.',
    'Small, frequent meals to support an irregular appetite.',
    'Add cooked sweet potato, warm broths, or ghee (in moderation).',
    'Avoid dry, rough, or cold foods that aggravate Vata.'
  ],
  array[
    'Ashwagandha (vet-approved dose) — calming adaptogen.',
    'Brahmi — supports nervous system balance.',
    'Warm ginger in small amounts — aids digestion.',
    'Always consult your vet before introducing any herb.'
  ]
),
(
  'pitta',
  'Your pet is Pitta-dominant',
  'Fire & Water — intense, focused, driven',
  'Pitta pets are alert, athletic, and can be strong-willed. They thrive with cooling, calming routines and moderate exercise. Overheating or overstimulation can lead to irritability.',
  array[
    'Use cooling, calming strokes — avoid vigorous or heating techniques.',
    'Focus on the chest and belly to support digestion and calm.',
    'Keep the room cool; avoid sessions during peak afternoon heat.',
    'Shorter, regular sessions work better than long intense ones.',
    'Coconut or sunflower oil (vet-approved) has a cooling effect.'
  ],
  array[
    'Cooling, fresh foods — lightly cooked chicken, cucumber, zucchini.',
    'Avoid spicy, sour, or overly rich foods.',
    'Room-temperature or slightly cool water; hydration is key.',
    'Regular meal times help balance Pitta intensity.'
  ],
  array[
    'Triphala — gentle digestive support and detox.',
    'Coriander or fennel — cooling digestive herbs.',
    'Aloe vera (pet-safe formula) — cooling for skin and digestion.',
    'Always consult your vet before introducing any herb.'
  ]
),
(
  'kapha',
  'Your pet is Kapha-dominant',
  'Earth & Water — steady, loving, calm',
  'Kapha pets are affectionate, loyal, and enjoy routine. They can be prone to weight gain and low energy. Gentle stimulation and regular movement support their circulation and vitality.',
  array[
    'Use invigorating but gentle strokes to encourage circulation.',
    'Focus on limbs and joints to support mobility and warmth.',
    'Slightly longer sessions (10–15 min) are usually well tolerated.',
    'Morning massage can energise a sluggish Kapha start to the day.',
    'Light, dry massage (without oil) or mustard oil (vet-approved) works well.'
  ],
  array[
    'Light, warm, easily digestible foods — avoid heavy or fatty meals.',
    'Lean proteins; reduce dairy and starchy treats.',
    'Encourage hydration — Kapha types may under-drink.',
    'Two measured meals per day; avoid free-feeding.'
  ],
  array[
    'Trikatu (ginger, black pepper, long pepper — vet-approved micro-dose) — warming and stimulating.',
    'Turmeric — anti-inflammatory support.',
    'Hawthorn berry — supports cardiovascular health.',
    'Always consult your vet before introducing any herb.'
  ]
);
