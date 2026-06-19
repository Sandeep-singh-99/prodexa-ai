import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, animate, frame, cancelFrame, MotionValue } from "motion/react";

// Hook to track pointer position using MotionValues
function usePointerPosition() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const updatePointer = () => {
      pointerX.set(currentX);
      pointerY.set(currentY);
    };

    // Handler for mouse movement
    const handleMousePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        currentX = e.clientX;
        currentY = e.clientY;
        frame.update(updatePointer);
      }
    };

    // Handler for touch movement
    const handleTouchPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        currentX = e.clientX;
        currentY = e.clientY;
        frame.update(updatePointer);
      }
    };

    // Handler for touch start
    const handleTouchPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        pointerX.jump(e.clientX);
        pointerY.jump(e.clientY);
      }
    };

    // Handle mouse re-entry to the document window.
    // When pointer enters the screen, we jump the value to the new coordinate
    // instead of creating a trailing line from its last recorded location.
    let isReEntry = true;
    const handleReEntryPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && isReEntry) {
        pointerX.jump(e.clientX);
        pointerY.jump(e.clientY);
        isReEntry = false;
      }
    };

    const handleDocumentPointerOut = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !e.relatedTarget) {
        isReEntry = true;
      }
    };

    window.addEventListener("pointermove", handleMousePointerMove);
    window.addEventListener("pointermove", handleTouchPointerMove);
    window.addEventListener("pointerdown", handleTouchPointerDown);
    window.addEventListener("pointermove", handleReEntryPointerMove);
    document.addEventListener("pointerout", handleDocumentPointerOut);

    return () => {
      window.removeEventListener("pointermove", handleMousePointerMove);
      window.removeEventListener("pointermove", handleTouchPointerMove);
      window.removeEventListener("pointerdown", handleTouchPointerDown);
      window.removeEventListener("pointermove", handleReEntryPointerMove);
      document.removeEventListener("pointerout", handleDocumentPointerOut);
      cancelFrame(updatePointer);
    };
  }, [pointerX, pointerY]);

  return { x: pointerX, y: pointerY };
}

// Swept AABB collision detection math
function testAxis(
  start: number,
  dir: number,
  min: number,
  max: number,
  t: { t0: number; t1: number }
): boolean {
  if (dir === 0) {
    return start >= min && start <= max;
  }
  let t0 = (min - start) / dir;
  let t1 = (max - start) / dir;
  if (t0 > t1) {
    const temp = t0;
    t0 = t1;
    t1 = temp;
  }
  if (t0 > t.t0) t.t0 = t0;
  if (t1 < t.t1) t.t1 = t1;
  return t.t0 <= t.t1;
}

function checkCollision(
  xPrev: number,
  yPrev: number,
  xCurr: number,
  yCurr: number,
  rect: DOMRect
): number | null {
  const t = { t0: 0, t1: 1 };
  const dx = xCurr - xPrev;
  const dy = yCurr - yPrev;

  if (
    !testAxis(xPrev, dx, rect.left, rect.right, t) ||
    !testAxis(yPrev, dy, rect.top, rect.bottom, t)
  ) {
    return null;
  }
  return t.t0;
}

// Collision detection hook per cell
function useCollision(
  cellRef: React.RefObject<HTMLDivElement | null>,
  pointerX: MotionValue<number>,
  pointerY: MotionValue<number>,
  activeCallback: () => void
) {
  const activeCallbackRef = useRef(activeCallback);
  useLayoutEffect(() => {
    activeCallbackRef.current = activeCallback;
  });

  useEffect(() => {
    let rect: DOMRect | null = null;
    let isColliding = false;
    let prevX: number | undefined;
    let prevY: number | undefined;

    function onRead() {
      const el = cellRef.current;
      if (el) {
        rect = el.getBoundingClientRect();
        frame.preRender(onRender);
      }
    }

    function onRender() {
      if (!rect) return;

      const x = pointerX.get();
      const y = pointerY.get();

      if (x === prevX && y === prevY) return;

      prevX = x;
      prevY = y;

      const xPrev = pointerX.getPrevious() ?? x;
      const yPrev = pointerY.getPrevious() ?? y;

      const collided = checkCollision(xPrev, yPrev, x, y, rect) !== null;

      if (collided && !isColliding) {
        activeCallbackRef.current();
      }
      isColliding = collided;
    }

    frame.read(onRead, true);

    return () => {
      cancelFrame(onRead);
      cancelFrame(onRender);
    };
  }, [cellRef, pointerX, pointerY]);
}

// Single Cell component
interface CellProps {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  cellSize: number;
  fadeDuration: number;
  restOpacity?: number;
}

function Cell({
  pointerX,
  pointerY,
  cellSize,
  fadeDuration,
  restOpacity = 0.04,
}: CellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(restOpacity);

  function activate() {
    animate(opacity, [1, restOpacity], {
      duration: fadeDuration,
      ease: "easeOut",
    });
  }

  useCollision(cellRef, pointerX, pointerY, activate);

  return (
    <motion.div
      ref={cellRef}
      className="bg-white dark:bg-white"
      style={{
        width: cellSize,
        height: cellSize,
        opacity: opacity,
      }}
    />
  );
}

// Main background component
export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition();
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });
  const cellSize = 30; // size of each cell in pixels

  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      setGridSize({ cols, rows });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const totalCells = gridSize.cols * gridSize.rows;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden bg-background pointer-events-none"
    >
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => (
          <Cell
            key={index}
            pointerX={pointer.x}
            pointerY={pointer.y}
            cellSize={cellSize}
            fadeDuration={0.6}
            restOpacity={0.04}
          />
        ))}
      </div>
    </div>
  );
}