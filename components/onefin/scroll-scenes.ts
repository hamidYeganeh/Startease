const clamp = (value: number) => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

// Source poses: the front card is centered; the other two sit behind it.
// Interpolate the actual transforms instead of switching flex alignment classes.
const poses = [
  [[0, 1, 0, 1], [1, -400, 10, .5], [-1, -400, -10, .5]],
  [[-1, -400, -10, .5], [0, 1, 0, 1], [1, -400, 10, .5]],
  [[1, -400, 10, .5], [-1, -400, -10, .5], [0, 1, 0, 1]],
];

export function mountScrollScenes(reducedMotion: boolean) {
  const panels = Array.from(document.querySelectorAll<HTMLElement>('.framer-Cvj7R')).map(panel => {
    const stage = panel.querySelector<HTMLElement>('.framer-mxks8r')!;
    const wrappers = Array.from(stage.children) as HTMLElement[];
    const cards = wrappers.map(wrapper => wrapper.firstElementChild as HTMLElement);
    panel.classList.remove('framer-v-lee138', 'framer-v-nlvy4t');
    panel.classList.add('scroll-investments');
    return { panel, stage, wrappers, cards };
  });
  let frame = 0;
  let lastTime = 0;
  let current: number | undefined;

  const render = (time: number) => {
    frame = 0;
    const visible = panels.find(({ panel }) => panel.offsetWidth > 0 && panel.getClientRects().length > 0);
    if (!visible) return;
    const rect = visible.stage.getBoundingClientRect();
    const target = reducedMotion ? 0 : clamp((innerHeight * .85 - rect.top) / (innerHeight * .77)) * 2;
    const elapsed = Math.min(64, Math.max(1, time - lastTime));
    lastTime = time;
    current = current === undefined || reducedMotion ? target : mix(current, target, 1 - Math.exp(-elapsed / 70));
    if (Math.abs(target - current) < .0001) current = target;
    const index = Math.min(1, Math.floor(current));
    const fraction = current - index;
    const progress = fraction * fraction * (3 - 2 * fraction);
    panels.forEach(({ panel, stage, cards, wrappers }) => {
      if (!panel.offsetWidth) return;
      const height = Math.max(...cards.map(card => card.offsetHeight));
      stage.style.height = `${height}px`;
      const distance = (stage.clientWidth - cards[0].offsetWidth) / 2;
      cards.forEach((card, i) => {
        const start = poses[index][i];
        const end = poses[index + 1][i];
        const x = mix(start[0], end[0], progress) * distance;
        const z = mix(start[1], end[1], progress);
        const rotation = mix(start[2], end[2], progress);
        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotate(${rotation}deg)`;
        card.style.opacity = String(mix(start[3], end[3], progress));
        wrappers[i].style.zIndex = String(Math.round(z + 500));
      });
      panel.dataset.scrollProgress = current!.toFixed(4);
    });
    if (current !== target) frame = requestAnimationFrame(render);
  };
  const schedule = () => {
    if (!frame) {
      lastTime = performance.now() - 16;
      frame = requestAnimationFrame(render);
    }
  };
  const downloads = Array.from(document.querySelectorAll<HTMLElement>('.framer-bpnHt'));
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('download-revealed');
      reveal.unobserve(entry.target);
    }
  }), { threshold: .2 });
  downloads.forEach(section => {
    if (reducedMotion) section.classList.add('download-revealed');
    else reveal.observe(section);
  });
  const resize = new ResizeObserver(schedule);
  panels.forEach(({ cards }) => cards.forEach(card => resize.observe(card)));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    reveal.disconnect();
    resize.disconnect();
  };
}
