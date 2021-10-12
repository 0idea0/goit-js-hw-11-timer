// Декларация класса
class NewTimer {
  constructor({ selector, targetDate, intervalId = null }) {
    (this.selector = selector),
      (this.targetDate = targetDate),
      (this.intervalId = intervalId);
  }

  // Запускает отсчёт
  start() {
    this.updateTimer(0);

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;

      this.updateTimer(deltaTime);

      if (deltaTime <= 0) {
        this.stop();
        return;
      }
    }, 1000);
  }

  // Останавливает отсчёт
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.updateTitle();
    this.updateTimer(0);
  }

  // Обновляет таймер
  updateTimer(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    const timerRef = document.querySelector('#timer-1');
    const daysRef = timerRef.querySelector('[data-value="days"]');
    const hoursRef = timerRef.querySelector('[data-value="hours"]');
    const minsRef = timerRef.querySelector('[data-value="mins"]');
    const secsRef = timerRef.querySelector('[data-value="secs"]');

    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${mins}`;
    secsRef.textContent = `${secs}`;
  }

  // Корректирует числовой формат
  pad(value) {
    return String(value).padStart(2, '0');
  }

}

// Конструктор класса
const newYearTimer = new NewTimer({
  selector: '#timer-1',
  targetDate: new Date(2022, 0, 1, 0, 0, 0),
});

// Запускает отсчёт немедленно
newYearTimer.start();