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

  if (input.includes("metal") || input.includes("metallica")) {
    tone = {
      gain: 9,
      treble: 7,
      mid: 4,
      bass: 8,
      reverb: 2,
      name: "🔥 Metal Tone"
    };
  }

  else if (input.includes("nirvana") || input.includes("grunge")) {
    tone = {
      gain: 8,
      treble: 7,
      mid: 3,
      bass: 7,
      reverb: 3,
      name: "🎸 Grunge Tone"
    };
  }

  else if (input.includes("blues") || input.includes("mayer")) {
    tone = {
      gain: 4,
      treble: 6,
      mid: 8,
      bass: 5,
      reverb: 5,
      name: "🎷 Blues Tone"
    };
  }

  else if (input.includes("acdc") || input.includes("queen")) {
    tone = {
      gain: 7,
      treble: 6,
      mid: 6,
      bass: 7,
      reverb: 4,
      name: "🎤 Classic Rock Tone"
    };
  }

  return tone;
}


function applyGear(tone, pickup, body, amp) {

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
  if (amp === "fender") {
    tone.treble += 2;
    tone.reverb += 2;
  }

  if (amp === "vox") {
    tone.mid += 2;
  }

  if (amp === "marshall") {
    tone.gain += 1;
    tone.mid += 1;
  }

  if (amp === "mesa") {
    tone.gain += 2;
    tone.bass += 2;
  }

  if (amp === "peavey") {
    tone.gain += 3;
  }

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

  let tone = getTone(input);
  tone = applyGear(tone, pickup, body, amp);

  document.getElementById("result").innerHTML = `
    <h2>${tone.name}</h2>
    <p>Gain: ${tone.gain}/10</p>
    <p>Treble: ${tone.treble}/10</p>
    <p>Mid: ${tone.mid}/10</p>
    <p>Bass: ${tone.bass}/10</p>
    <p>Reverb: ${tone.reverb}/10</p>
  `;
}