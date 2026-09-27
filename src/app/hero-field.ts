import { clock, effect, frameLoop, init, surface, type FrameLoopHandle } from "vgpu";
import heroFieldShader from "./hero-field.wgsl";

type PointerState = {
  x: number;
  y: number;
  active: number;
};

export function startHeroField(canvas: HTMLCanvasElement, onReady: () => void): () => void {
  let disposed = false;
  let loop: FrameLoopHandle | undefined;
  let gpu: Awaited<ReturnType<typeof init>> | undefined;
  const pointer: PointerState = { x: 0.5, y: 0.5, active: 0 };
  const target = canvas.parentElement;

  const cleanupPointer = () => {
    target?.removeEventListener("pointermove", handlePointerMove);
    target?.removeEventListener("pointerleave", handlePointerLeave);
  };

  const handlePointerMove = (event: Event) => {
    const pointerEvent = event as PointerEvent;
    const bounds = target?.getBoundingClientRect();
    if (!bounds) return;

    pointer.x = Math.min(1, Math.max(0, (pointerEvent.clientX - bounds.left) / bounds.width));
    pointer.y = Math.min(1, Math.max(0, (pointerEvent.clientY - bounds.top) / bounds.height));
    pointer.active = 1;
  };

  const handlePointerLeave = () => {
    pointer.active = 0;
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("gpu" in navigator)) {
    return cleanupPointer;
  }

  target?.addEventListener("pointermove", handlePointerMove, { passive: true });
  target?.addEventListener("pointerleave", handlePointerLeave, { passive: true });

  void (async () => {
    try {
      gpu = await init();
      if (disposed) {
        gpu.dispose();
        return;
      }

      const canvasSurface = surface(gpu, canvas, {
        dpr: [1, 2],
        alphaMode: "premultiplied",
        label: "hero-systems-field",
      });
      const field = effect(gpu, heroFieldShader, {
        label: "hero-systems-network",
        set: {
          params: {
            time: 0,
            texel: canvasSurface.texelSize,
            pointer: [pointer.x, pointer.y],
            pointerActive: pointer.active,
          },
        },
      });

      canvasSurface.onResize(() => field.set({ params: { texel: canvasSurface.texelSize } }));
      await field.compile(canvasSurface);
      if (disposed) {
        gpu.dispose();
        return;
      }

      onReady();
      const time = clock(gpu);
      loop = frameLoop(gpu, (frame) => {
        field.set({
          params: {
            time: time.time,
            pointer: [pointer.x, pointer.y],
            pointerActive: pointer.active,
          },
        });
        frame.pass(canvasSurface, field);
      }, { fps: 60 });
    } catch {
      cleanupPointer();
      gpu?.dispose();
    }
  })();

  return () => {
    disposed = true;
    cleanupPointer();
    loop?.stop();
    gpu?.dispose();
  };
}
