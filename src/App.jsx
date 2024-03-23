import styles from './App.module.css'
import { For, Show, createSignal } from 'solid-js'

function App() {
  const [timerIntervalSignal, setTimerIntervalSignal] = createSignal()
  const [time, setTime] = createSignal({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  const [splits, setSplits] = createSignal([])

  const startTimer = () => {
    if (!timerIntervalSignal()) {
      const timerInterval = setInterval(() => {
        setTime((prevTime) => {
          const newMilliseconds =
            prevTime.milliseconds === 990 ? 0 : prevTime.milliseconds + 10

          const newSeconds = () => {
            if (prevTime.milliseconds === 990) return prevTime.seconds + 1
            if (prevTime.seconds === 60) return 0
            else return prevTime.seconds
          }

          const newMinutes = () => {
            if (prevTime.seconds === 60) return prevTime.minutes + 1
            if (prevTime.minutes === 60) return 0
            else return prevTime.minutes
          }

          const newHours = () => {
            if (prevTime.minutes === 60) return prevTime.hours + 1
            else return prevTime.hours
          }

          return {
            hours: newHours(),
            minutes: newMinutes(),
            seconds: newSeconds(),
            milliseconds: newMilliseconds,
          }
        })
      }, 10)
      setTimerIntervalSignal(timerInterval)
    }
  }

  const pauseTimer = () => {
    clearInterval(timerIntervalSignal())
    setTimerIntervalSignal(null)
  }

  const handleSplit = (splitTime) => {
    setSplits([...splits(), splitTime])
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>The Stopwatch 0.1.0</header>
      <div class={styles.watchContainer}>
        {time().hours}:{time().minutes}:{time().seconds}:{time().milliseconds}
      </div>
      <div class={styles.buttonContainer}>
        <Show
          when={timerIntervalSignal()}
          fallback={<button onClick={startTimer}>Start</button>}
        >
          <button onClick={pauseTimer}>Pause</button>
        </Show>
        <button
          onClick={() => handleSplit(time())}
          disabled={!timerIntervalSignal()}
        >
          Split
        </button>
        <button
          onClick={() => {
            setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
            setSplits([])
          }}
          disabled={timerIntervalSignal()}
        >
          Reset
        </button>
      </div>
      <ol>
        <For each={splits()}>
          {(split, index) => {
            return (
              <li class={styles.watchContainer}>
                {split.hours}:{split.minutes}:{split.seconds}:
                {split.milliseconds}
              </li>
            )
          }}
        </For>
      </ol>
    </div>
  )
}

export default App
