# 05_Test_Suite_Prompts — Suno Songmaker Pro (Public GPT)
Version: v1.0 (2025-08-08)

Purpose: 20 golden prompts + acceptance criteria to regression‑test outputs. Each test should pass the checklist below.

## Global Acceptance Checklist (apply to all)
- **Style** includes: BPM, Key, sound palette, **mono sub 40–80 Hz**, HPF non‑bass @100 Hz (or implied), and is ≤8 lines.
- **Avoid** bans: spoken/rap (unless prompt asks), trap hats/808 slides (unless genre requires), genre‑drift items.
- **Arrangement** has explicit bar counts and ends with **[2‑bar tail]** (unless lofi/acoustic outro specified).
- **Lyrics**: sung‑only; chorus lines ≤9 syllables; short, repeatable hook; no “pulse”/“neon.”
- **Alt take** present (tiny hook variant).

---

### T1 — Dance‑Pop Radio
Prompt: “124 BPM, A minor, female airy belt, theme: late‑night city, short chorus.”  
Pass if: Style mentions pluck arp + pads + piano hook; Avoid bans spoken/rap & trap/808; Arrangement follows Intro4/Verse12/Pre8/Ch16/Post8…; chorus has a 2–3 word tag repeated.

### T2 — Melodic EDM Core
Prompt: “140 BPM, G minor, male tenor, theme: second chances; post‑chorus vocal chops.”  
Pass if: Style includes supersaws + pluck arps; post‑chorus tag shown; Avoid bans future‑bass chord swells; mono sub present.

### T3 — Liquid DnB Warmth
Prompt: “172 BPM, D minor, airy female lead; warm piano + pads.”  
Pass if: rolling breaks; mono sub; Avoid bans neuro/dubstep; 4‑line chorus with repeat.

### T4 — Synthwave Nostalgia
Prompt: “108 BPM, E minor, midnight highway; male baritone.”  
Pass if: analog polys/arps; gated snares; Avoid bans trap/808; 4–6 line chorus.

### T5 — Lofi/Chillhop Intimate
Prompt: “80 BPM, D major, quiet morning, minimal vox.”  
Pass if: dusty drums; Rhodes/piano; no vocal chops; tiny 2–4 line hook.

### T6 — Acoustic Pop
Prompt: “98 BPM, A major, reconciliation, gentle duet option.”  
Pass if: strummed guitar; no EDM elements; singable chorus ≤9 syllables/line.

### T7 — Pop‑Punk Energy
Prompt: “168 BPM, E major, high‑energy, big chorus tag.”  
Pass if: crunchy guitars; clean mono bass; gang tag; Avoid bans EDM/trap.

### T8 — Cinematic / Trailer
Prompt: “90 BPM, C minor, epic rise, choir.”  
Pass if: strings/brass/choir; no EDM drops; collective language in lyrics.

### T9 — Dance‑Pop (male tenor)
Prompt: “120 BPM, B minor, catchy phone‑call hook.”  
Pass if: Style mentions plucks/pads; hook uses phone/call image; chorus repeats.

### T10 — Melodic EDM (female airy)
Prompt: “138 BPM, F# minor, hopeful tone, lift in chorus.”  
Pass if: supersaws + plucks; Avoid bans trap/808; post‑chorus vocal chop tag.

### T11 — Liquid DnB (alt key)
Prompt: “174 BPM, A minor, stars imagery.”  
Pass if: warm sub; no neuro; chorus repeats a 3–4 word tag.

### T12 — Synthwave (slow)
Prompt: “92 BPM, C minor, after‑hours calm.”  
Pass if: arps + pads + gated snares; no modern trap hats.

### T13 — Lofi (instrument‑forward)
Prompt: “77 BPM, G major, mostly instrumental; 1 short vocal tag.”  
Pass if: minimal lyrics; hook tag 1–2 lines; gentle master.

### T14 — Acoustic (duet)
Prompt: “102 BPM, Bb major, shared lines in pre‑chorus.”  
Pass if: male+female call‑and‑response; no vocal chops; short chorus.

### T15 — Pop‑Punk (mid tempo)
Prompt: “152 BPM, D major, summer nostalgia.”  
Pass if: driving drums; bright chords; repeatable 2–3 word tag.

### T16 — Cinematic (slow build)
Prompt: “72 BPM, A minor, fragile to triumphant.”  
Pass if: piano → strings → choir; [2‑bar tail] included.

### T17 — Dance‑Pop (duet)
Prompt: “124 BPM, A minor, call‑and‑response verse, unified chorus.”  
Pass if: clear duet structure; simple chorus tag.

### T18 — Melodic EDM (countdown)
Prompt: “142 BPM, F minor, sung countdown into drop.”  
Pass if: countdown is pitched; first 8 bars drop = kick+bass only.

### T19 — Liquid DnB (short song)
Prompt: “170 BPM, D minor, 2:20 target, compact sections.”  
Pass if: sections shortened proportionally; still ends with [2‑bar tail].

### T20 — Synthwave (instrumental post)
Prompt: “110 BPM, E minor, post‑chorus instrumental hook.”  
Pass if: post uses arp/melody without vocal chops; chorus remains short/repeatable.


---

## QA Rubric (score 0–2 each, pass ≥8/10)
1) Mix safety (mono sub/HPF/mud control present)  
2) Drop control (kick+bass-only staging where relevant)  
3) Structure (bar counts; [2-bar tail])  
4) Lyrics/Hook (≤9 syll/line; repeatable; open vowels; no banned words)  
5) Localization (natural phrasing; uses Language Pack when not EN)

### Edge Case Tests
**T21 — Chorus-First (30s)**: passes if chorus-first arrangement used and hook repeats.  
**T22 — Sung Countdown**: passes if “three-two-one” (or localized) appears **sung**, not spoken.  
**T23 — Duet Pop**: passes if A/B call-and-response in verse; unified chorus.  
**T24 — Bilingual Chorus (EN + target)**: passes if both versions fit ≤9 syllables/line.  
**T25 — Headroom/Harshness**: passes if Style mentions `leave ~1 dB headroom; de-harsh hats`.

---

## Genre Tempo/Arrangement Checks (add to all tests)
- **Tempo Range:** Verify BPM is within the genre guardrail in 09_Genre_Mix_Targets.md. If not, FAIL and auto-retry with corrected BPM.  
- **Arrangement Shape:** Dance-Pop/Melodic EDM must show [Verse→Pre→Chorus] with a distinct **pre-chorus lift**. Liquid DnB must use **rolling drums** from bar 1 of chorus.

### T26 — Dance-Pop (pre-lift check)
Prompt: “Dance-Pop 124 BPM, A minor; city night; female airy; short chorus.”  
Pass if: pre-chorus has a 2-stage lift (drum fill + harmony rise); BPM=110–128 guardrail.

### T27 — Liquid DnB (tempo guardrail)
Prompt: “Liquid DnB, stars imagery, soft piano.”  
Pass if: BPM 170–175; rolling drums; mono sub; no halftime drop.

### T28 — Synthwave crossover (dry drums)
Prompt: “Synth-pop crossover, 112 BPM, analog polys, minimal reverb on drums.”  
Pass if: gated rooms only; dry-ish kit; chorus bass with light chorus; no modern trap hats.

### T29 — Pop-Punk gang tag
Prompt: “Pop-punk 168 BPM; summer nostalgia; gang tag at end.”  
Pass if: gang vocal tag appears in final chorus; mono bass; no EDM/trap drums.

### T30 — Acoustic pop (sparse elements)
Prompt: “Acoustic pop 98 BPM; intimate; piano + guitar only.”  
Pass if: ≤7 major elements; doubles in chorus; arrangement dynamics via mutes.
