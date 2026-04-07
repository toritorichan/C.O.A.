let audioCtx: AudioContext | null = null
let staticNode: AudioBufferSourceNode | null = null
let staticGain: GainNode | null = null
let initialized = false

export function useAudio() {
  function initAudio() {
    if (initialized || audioCtx) return
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    initialized = true
  }

  function createNoiseBuffer(durationSec = 3): AudioBuffer {
    if (!audioCtx) throw new Error('AudioContext not initialized')
    const sr = audioCtx.sampleRate
    const buf = audioCtx.createBuffer(1, sr * durationSec, sr)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  function playStatic(volume = 0.04) {
    if (!audioCtx) return
    stopStatic()
    const buf = createNoiseBuffer(4)
    staticNode = audioCtx.createBufferSource()
    staticNode.buffer = buf
    staticNode.loop = true

    staticGain = audioCtx.createGain()
    staticGain.gain.value = volume

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1200
    filter.Q.value = 0.4

    staticNode.connect(filter)
    filter.connect(staticGain)
    staticGain.connect(audioCtx.destination)
    staticNode.start()
  }

  function stopStatic() {
    try { staticNode?.stop() } catch {}
    staticNode = null
  }

  function playAlarm() {
    if (!audioCtx) return
    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(660, t)
    osc.frequency.setValueAtTime(330, t + 0.15)
    osc.frequency.setValueAtTime(660, t + 0.3)
    osc.frequency.setValueAtTime(220, t + 0.45)
    gain.gain.setValueAtTime(0.35, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start(t)
    osc.stop(t + 1.2)
  }

  function playLowFreq(freq = 60, duration = 0.6) {
    if (!audioCtx) return
    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.25, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start(t)
    osc.stop(t + duration)
  }

  function playReversedSignal() {
    // FM synthesis simulating reversed voice
    if (!audioCtx) return
    const t = audioCtx.currentTime
    const mod = audioCtx.createOscillator()
    const modGain = audioCtx.createGain()
    const carrier = audioCtx.createOscillator()
    const master = audioCtx.createGain()

    mod.frequency.value = 4
    modGain.gain.value = 180
    carrier.type = 'sine'
    carrier.frequency.value = 280
    master.gain.setValueAtTime(0, t)
    master.gain.linearRampToValueAtTime(0.3, t + 0.5)
    master.gain.linearRampToValueAtTime(0, t + 3.5)

    mod.connect(modGain)
    modGain.connect(carrier.frequency)
    carrier.connect(master)
    master.connect(audioCtx.destination)

    mod.start(t); mod.stop(t + 3.5)
    carrier.start(t); carrier.stop(t + 3.5)
  }

  function playClickSound() {
    if (!audioCtx) return
    const t = audioCtx.currentTime
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.02, audioCtx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    const src = audioCtx.createBufferSource()
    src.buffer = buf
    const gain = audioCtx.createGain()
    gain.gain.value = 0.15
    src.connect(gain)
    gain.connect(audioCtx.destination)
    src.start(t)
  }

  return { initAudio, playStatic, stopStatic, playAlarm, playLowFreq, playReversedSignal, playClickSound }
}
