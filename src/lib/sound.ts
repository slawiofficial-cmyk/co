/**
 * Web Audio API Acoustic Sound Synthesizer for Tactile 3D Coin Toss
 * Supports automatic iOS Safari AudioContext unlocking on the first user interaction.
 * Produces crisp acoustic transients: launch thumb snap, aerial flutter, and resonant multi-harmonic ring.
 */

class CoinSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('flipandcoin_muted');
      this.isMuted = storedMute === 'true';

      // Setup one-time interaction listeners to eagerly unlock Web Audio on iOS Safari
      const unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'keydown'];
      const unlockAudio = () => {
        if (this.isUnlocked) return;
        const ctx = this.getContext();
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume().then(() => {
              this.isUnlocked = true;
            }).catch(() => {});
          } else {
            this.isUnlocked = true;
          }
          // Play silent buffer to unlock iOS hardware mute switch restrictions if allowed
          try {
            const buffer = ctx.createBuffer(1, 1, 22050);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
          } catch {
            // Silently ignore
          }
        }
        unlockEvents.forEach((evt) => window.removeEventListener(evt, unlockAudio));
      };

      unlockEvents.forEach((evt) => {
        window.addEventListener(evt, unlockAudio, { passive: true, once: true });
      });
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('flipandcoin_muted', String(muted));
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Sound 1: Launch Thumb Flick
   * Transient snap impulse + 2.7kHz metallic edge chime
   */
  public playFlick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Transient snap impulse (filtered noise burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.035);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3100, now);
      noiseFilter.Q.setValueAtTime(3.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.38, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // Resonant metallic launch ping
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2720, now);
      osc.frequency.exponentialRampToValueAtTime(2350, now + 0.12);

      oscGain.gain.setValueAtTime(0.28, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Fail silently if browser audio subsystem is restricted
    }
  }

  /**
   * Sound 2: Aerial Flutter
   */
  public playSpin(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(510, now);
      osc.frequency.linearRampToValueAtTime(780, now + 0.4);
      osc.frequency.linearRampToValueAtTime(420, now + 0.9);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2300, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.065, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch {
      // Fail silently
    }
  }

  /**
   * Sound 3: Landing Clatter & Resonant Metal Ring
   */
  public playLanding(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Realistic acoustic harmonics of a gold/silver coin impact
      const harmonics = [
        { freq: 3480, amp: 0.24, decay: 0.5 },
        { freq: 5220, amp: 0.14, decay: 0.35 },
        { freq: 6960, amp: 0.07, decay: 0.22 },
      ];

      harmonics.forEach(({ freq, amp, decay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 30 - 15), now);

        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.05);
      });

      // Sharp initial strike impact
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1200, now);
      clickOsc.frequency.exponentialRampToValueAtTime(150, now + 0.02);

      clickGain.gain.setValueAtTime(0.22, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.025);

      // Micro secondary bounce after 85ms
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        try {
          const bTime = this.ctx.currentTime;
          const bOsc = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          bOsc.type = 'sine';
          bOsc.frequency.setValueAtTime(3510, bTime);
          bGain.gain.setValueAtTime(0.09, bTime);
          bGain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.22);
          bOsc.connect(bGain);
          bGain.connect(this.ctx.destination);
          bOsc.start(bTime);
          bOsc.stop(bTime + 0.23);
        } catch {
          // Fail silently
        }
      }, 85);
    } catch {
      // Fail silently
    }
  }
}

export const soundEngine = new CoinSoundEngine();
