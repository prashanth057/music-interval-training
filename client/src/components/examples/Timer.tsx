import { Timer } from '../Timer';

export default function TimerExample() {
  return <Timer isRunning={true} onTimeUpdate={(time) => console.log('Time:', time)} />;
}
