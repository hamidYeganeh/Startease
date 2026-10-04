'use client';

import { useEffect, useRef } from 'react';
import { StoreButtons } from './StoreButtons';
import { mountScrollScenes } from './scroll-scenes';

const spendVideos = ['KFtIcX7GdqPTQHZRYZX6qYlc', 'MscrnjR1iuLhruQCSOc1zX0gg', 'OffojyX4UvsVJxYMoqZ3HP8K00', 'pdMhBaYUg3dnuPdVSTLGur8PQE'];
const paymentStates = [
  ['Nc4Wf8Vq30wog0oQNeUrpRWgB44', 'Integrated Checkout Gateways', 'Accept and process payments effortlessly across platforms.'],
  ['UbAOyMvBx5ltvUh0AqzNkCc8yUw', 'Invoice Automation', 'Streamline vendor payments and reduce processing time.'],
  ['asuqySE4aexx13y9SVD2PpjcsBw', 'Fraud Protection Suite', 'Monitor anomalies and ensure every transaction stays safe.'],
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const all = <T extends HTMLElement = HTMLElement>(selector: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(selector));

export function PageInteractions() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanupScenes = mountScrollScenes(reduced);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed', 'integrations-in');
      observer.unobserve(entry.target);
    }), { threshold: 0.15 });
    all('[data-reveal]').forEach(heading => {
      all('[data-letter]', heading).forEach((letter, i) => letter.style.setProperty('--delay', `${i * 0.017}s`));
      observer.observe(heading);
    });
    all('.framer-ztC2N').forEach(panel => observer.observe(panel));
    const desktopNav = document.querySelector<HTMLElement>('nav[data-framer-name="Desktop - Primary"]');
    const mobileNav = document.querySelector<HTMLElement>('nav[data-framer-name="Mobile - Close"]');
    const hero = document.querySelector<HTMLElement>('#home');
    const about = document.querySelector<HTMLElement>('#about');
    const aboutWords = all('.framer-vbwbkt', about || document);
    const testimonials = document.querySelector<HTMLElement>('#testimonials');
    const testimonialCards = all('[data-framer-name^="Testimonial Card "]', testimonials || document);
    const payments = document.querySelector<HTMLElement>('.framer-9j69ck');
    const paymentPanels = all('.framer-IUzw1');
    let paymentState = -1;
    let frame = 0;
    let annual = false;
    let menuOpen = false;
    let scrolled: boolean | null = null;
    let returnFocus: HTMLElement | null = null;
    const setMenu = (open: boolean) => {
      menuOpen = open;
      if (!mobileNav) return;
      mobileNav.classList.toggle('framer-v-kx5ue2', open);
      mobileNav.classList.toggle('framer-v-1ntxijd', !open);
      mobileNav.classList.toggle('menu-open', open);
      const trigger = mobileNav.querySelector<HTMLElement>('[aria-expanded]');
      trigger?.setAttribute('aria-expanded', String(open));
      trigger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    const setPricing = (value: boolean) => {
      annual = value;
      all('.framer-NQIh8').forEach(toggle => {
        toggle.classList.toggle('annual', annual);
        toggle.querySelector('[role="switch"]')?.setAttribute('aria-checked', String(annual));
      });
      all('.framer-rqaxnc p').forEach(p => { p.innerHTML = `<span class="framer-text">$</span>${annual ? '6.49' : '7.99'}`; });
      all('.framer-syt1cs p').forEach(p => { p.innerHTML = `<span class="framer-text">$</span>${annual ? '12.49' : '14.99'}`; });
    };
    const setFaq = (row: HTMLElement) => {
      const open = row.getAttribute('aria-expanded') !== 'true';
      const group = row.closest('.framer-xVZzo');
      all('.framer-eLgIX', group || document).forEach(item => {
        const active = item === row && open;
        const mobile = item.dataset.framerName?.startsWith('Mobile');
        item.classList.remove('framer-v-kj25cf', 'framer-v-8knmgh', 'framer-v-1eekr2q', 'framer-v-1senyho');
        item.classList.add(mobile ? (active ? 'framer-v-1eekr2q' : 'framer-v-1senyho') : (active ? 'framer-v-kj25cf' : 'framer-v-8knmgh'));
        item.setAttribute('aria-expanded', String(active));
        item.style.backgroundColor = active ? 'rgba(170,157,236,.1)' : 'transparent';
      });
    };
    const setSpend = (row: HTMLElement) => {
      const panel = row.closest<HTMLElement>('.framer-BZHiH');
      if (!panel) return;
      const index = Number(row.dataset.spend);
      all('[data-spend]', panel).forEach(item => {
        const active = item === row;
        item.classList.toggle('framer-v-gtti5x', active);
        item.classList.toggle('framer-v-1kuyhck', !active);
        item.setAttribute('aria-pressed', String(active));
        item.style.backgroundColor = active ? 'rgba(170,157,236,.1)' : 'transparent';
      });
      const video = panel.querySelector('video');
      if (video) { video.src = `/onefin/${spendVideos[index]}.webm`; video.play().catch(() => {}); }
    };
    const setPayment = (index: number) => {
      if (paymentState === index) return;
      paymentState = index;
      paymentPanels.forEach(panel => {
        const video = panel.querySelector('video');
        if (video) { video.src = `/onefin/${paymentStates[index][0]}.webm`; video.play().catch(() => {}); }
        const title = panel.querySelector('.framer-j40m76 p');
        const description = panel.querySelector('.framer-cevhkr > div:last-child p');
        if (title) title.textContent = paymentStates[index][1];
        if (description) description.textContent = paymentStates[index][2];
        panel.dataset.paymentStep = String(index);
        all('[data-payment-indicator]', panel).forEach((indicator, step) => {
          const active = step === index;
          indicator.classList.toggle('framer-v-mgyskq', active);
          indicator.classList.toggle('framer-v-jum3uh', !active);
          indicator.dataset.active = String(active);
        });
      });
    };
    const update = () => {
      const nextScrolled = scrollY > 220;
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled;
        document.documentElement.classList.toggle('scrolled', scrolled);
        desktopNav?.classList.toggle('framer-v-1k1mnqh', scrolled);
        desktopNav?.classList.toggle('framer-v-15o89ul', !scrolled);
      }
      if (!reduced) {
        const heroY = Math.max(0, -(hero?.getBoundingClientRect().top || 0));
        if (heroY < (hero?.offsetHeight || 0) + innerHeight) {
          const motions: [string, number, string][] = [['.framer-giti9r', .65, ''], ['.framer-1154f73', .4, 'rotate(18deg)'], ['.framer-8ytohn', .5, 'rotate(9deg)']];
          motions.forEach(([selector, speed, rotate]) => all(selector, hero || document).forEach(el => { el.style.transform = `translateY(${heroY * speed}px) ${rotate}`; }));
        }
        if (about) {
          const progress = clamp(-about.getBoundingClientRect().top / Math.max(1, about.offsetHeight - innerHeight));
          aboutWords.forEach((el, i) => { const word = i % 28; el.style.opacity = String(.18 + .82 * clamp(progress * 1.8 - word / 28)); });
          all('[data-framer-name="Bubble"]', about).forEach(el => { el.style.opacity = String(clamp(progress * 5)); el.style.transform = `translateY(${-40 * (1-clamp(progress*5))}px)`; });
        }
        if (testimonials && innerWidth >= 1200) {
          const progress = clamp(-testimonials.getBoundingClientRect().top / Math.max(1, testimonials.offsetHeight-innerHeight));
          const points = [[-240,300],[-490,110],[-250,-330],[420,-260],[450,230]];
          testimonialCards.slice(0,5).forEach((card,i) => {
            const spread = .4 + progress * .6;
            card.style.transform = `translate(-50%, -50%) translate(${points[i][0]*spread}px,${points[i][1]*spread}px) rotate(${(1-progress)*[6,-7,-5,9,-16][i]}deg) scale(${1-progress*.2})`;
          });
        }
      }
      if (payments) {
        const progress = clamp((innerHeight * .35-payments.getBoundingClientRect().top) / Math.max(1, payments.offsetHeight-innerHeight));
        setPayment(Math.min(2, Math.floor(progress*3)));
      }
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('nav .framer-78iO7')) { setMenu(!menuOpen); return; }
      if (target.closest('nav a')) setMenu(false);
      const toggle = target.closest('.framer-NQIh8');
      if (toggle) { setPricing(target.closest('.framer-1qfbty1') ? false : target.closest('.framer-19kkv1h') ? true : !annual); return; }
      const faq = target.closest<HTMLElement>('[data-faq]');
      if (faq) { setFaq(faq); return; }
      const spend = target.closest<HTMLElement>('[data-spend]');
      if (spend && innerWidth >= 810) { setSpend(spend); return; }
      if (target.closest('[aria-label="Scroll to top"]')) { event.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }); }
      if (target.closest('[data-download-trigger]')) {
        returnFocus = target.closest<HTMLElement>('[data-download-trigger]');
        dialog.current?.showModal();
        document.body.style.overflow = 'hidden';
      }
      if (target.closest('.framer-1e5wakb [data-highlight]')?.textContent?.trim() === 'View all Articles') location.href = 'https://onefin.framer.website/blog';
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); if (dialog.current?.open) dialog.current.close(); }
      if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof HTMLElement && event.target.matches('[role="button"],[role="switch"]')) { event.preventDefault(); event.target.click(); }
    };
    const close = () => { document.body.style.overflow = ''; returnFocus?.focus(); };
    dialog.current?.addEventListener('close',close);
    const dialogElement = dialog.current;
    setMenu(false);
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize',onScroll);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      cleanupScenes();
      observer.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize',onScroll); cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); dialogElement?.removeEventListener('close',close); document.body.style.overflow = '';
    };
  }, []);
  return <dialog ref={dialog} className="download-dialog" aria-labelledby="download-title" onClick={event => { if(event.target === event.currentTarget) event.currentTarget.close(); }}>
    <button className="dialog-close" aria-label="Close download dialog" onClick={() => dialog.current?.close()}>×</button>
    <h2 id="download-title">Download OneFin with<br />your phone</h2>
    {/* Original downloadable QR artwork, kept at its source dimensions. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="download-qr-space" src="/onefin/download-qr.png" alt="Scan to download OneFin" width="200" height="200" />
    <div className="download-stores"><StoreButtons /></div>
  </dialog>;
}
