function getTone(input) {
  input = input.toLowerCase();

  let tone = {
    gain: 5,
    treble: 5,
    mid: 5,
    bass: 5,
    reverb: 4,
    name: "🎵 Default Tone"
  };

  if (input.includes("metallica") || input.includes("metal") || input.includes("slayer")) {
    return {
      gain: 9, treble: 7, mid: 4, bass: 8, reverb: 2,
      name: "🔥 Metal Tone"
    };
  }

  if (input.includes("nirvana") || input.includes("grunge")) {
    return {
      gain: 8, treble: 7, mid: 3, bass: 7, reverb: 3,
      name: "🎸 Grunge Tone"
    };
  }

  if (input.includes("blues") || input.includes("clapton") || input.includes("mayer")) {
    return {
      gain: 4, treble: 6, mid: 8, bass: 5, reverb: 5,
      name: "🎷 Blues Tone"
    };
  }

  return tone;
}


function applyGear(tone, pickup, body, amp, effects) {

  // pickups
  if (pickup === "humbucker") {
    tone.gain += 1;
    tone.bass += 1;
  }

  if (pickup === "p90") {
    tone.mid += 2;
    tone.gain += 1;
  }

  if (pickup === "single") {
    tone.treble += 1;
    tone.bass -= 1;
  }

  // body
  if (body === "hollow") {
    tone.reverb += 2;
    tone.mid += 1;
  }

  // amps
  const amps = {
    fender: { treble: 2, reverb: 2, gain: -1 },
    vox: { mid: 2 },
    marshall: { gain: 2, mid: 1 },
    mesa: { gain: 3, bass: 2 },
    peavey: { gain: 4 },
    orange: { mid: 2, bass: 1 },
    roland: { reverb: 3, treble: 1 }
  };

  if (amps[amp]) {
    for (let key in amps[amp]) {
      tone[key] += amps[amp][key];
    }
  }

  // effects (multi-select)
  effects.forEach(effect => {

    if (effect === "overdrive") tone.gain += 1;

    if (effect === "distortion") {
      tone.gain += 2;
      tone.mid -= 1;
    }

    if (effect === "delay") tone.reverb += 2;

    if (effect === "chorus") {
      tone.mid += 1;
      tone.treble += 1;
    }

    if (effect === "reverb") tone.reverb += 3;
  });

  // clamp values
  for (let key in tone) {
    if (typeof tone[key] === "number") {
      tone[key] = Math.max(0, Math.min(10, tone[key]));
    }
  }

  return tone;
}


function findTone() {
  const input = document.getElementById("songInput").value;
  const pickup = document.getElementById("pickup").value;
  const body = document.getElementById("body").value;
  const amp = document.getElementById("amp").value;

  const fxNodes = document.querySelectorAll(".fx");
  let effects = [];

  fxNodes.forEach(fx => {
    if (fx.checked) effects.push(fx.value);
  });

  let tone = getTone(input);
  tone = applyGear(tone, pickup, body, amp, effects);

  document.getElementById("result").innerHTML = `
    <h2>${tone.name}</h2>
    <p>Gain: ${tone.gain}/10</p>
    <p>Treble: ${tone.treble}/10</p>
    <p>Mid: ${tone.mid}/10</p>
    <p>Bass: ${tone.bass}/10</p>
    <p>Reverb: ${tone.reverb}/10</p>
  `;
}
