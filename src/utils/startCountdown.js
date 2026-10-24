export default function startCountdown(timestampMs, lifetimeSMS, setCountdown) {
    const targetTime = timestampMs + lifetimeSMS;
    const now = Date.now();
    let remainingSeconds = Math.ceil((targetTime - now) / 1000);
    setCountdown(remainingSeconds);
    const timer = setInterval(() => {
      if (remainingSeconds <= 0) {
        setCountdown(null);
        clearInterval(timer);
        return;
      }
      setCountdown(remainingSeconds--);
    }, 1000);
  }