import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import NumberTicker, {
  NumberTickerRef,
} from "../fancy/text/basic-number-ticker";

interface TaskProps {
  title?: string;
  from: number;
  target: number;
  prefix?: string;
  suffix?: string;
  gradient?: string;
  size?: string;
}

export const Counter = ({
  task,
  index,
}: {
  task: TaskProps;
  index: number;
}) => {
  const taskRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<NumberTickerRef>(null);
  const inView = useInView(taskRef, { once: false });
  // Track previous target so we animate from the last shown value to the new one
  const prevTargetRef = useRef<number>(task.from);

  useEffect(() => {
    if (inView) {
      tickerRef.current?.startAnimation();
    }
  }, [inView]);

  // Re-run when values change while visible to keep in sync with circle progress
  useEffect(() => {
    if (inView) {
      tickerRef.current?.startAnimation();
    }
  }, [task.from, task.target, inView]);

  // After each render where target changes, update previous target for the next animation
  useEffect(() => {
    prevTargetRef.current = task.target;
  }, [task.target]);

  return (
    <motion.div
      ref={taskRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="tracking-tighter">
        <NumberTicker
          ref={tickerRef}
          from={prevTargetRef.current}
          target={task.target}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            type: "tween",
            delay: index * 0.2,
          }}
          className="tabular-nums"
          autoStart={false}
        />
        <span className="text-xs tracking-tighter scale-75">{task.suffix}</span>
      </div>
    </motion.div>
  );
};
