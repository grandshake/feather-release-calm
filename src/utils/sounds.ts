
// Create a simple audio context for playing the chime sound
class SoundPlayer {
  private audioContext: AudioContext | null = null;
  
  constructor() {
    // Initialize audio context on user interaction to comply with browser policies
    this.setupAudioContext = this.setupAudioContext.bind(this);
    this.playChime = this.playChime.bind(this);
  }
  
  private setupAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }
  
  public async playChime() {
    this.setupAudioContext();
    
    if (!this.audioContext) return;
    
    // Create oscillator for a gentle chime sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Configure sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    
    // Envelope
    gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2.0);
    
    // Play and stop
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 2.0);
    
    // Play a second tone for harmony
    setTimeout(() => {
      if (!this.audioContext) return;
      
      const oscillator2 = this.audioContext.createOscillator();
      const gainNode2 = this.audioContext.createGain();
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(this.audioContext.destination);
      
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(783.99, this.audioContext.currentTime); // G5
      gainNode2.gain.setValueAtTime(0, this.audioContext.currentTime);
      
      gainNode2.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.1);
      gainNode2.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.5);
      
      oscillator2.start();
      oscillator2.stop(this.audioContext.currentTime + 1.5);
    }, 200);
  }
}

export const soundPlayer = new SoundPlayer();
