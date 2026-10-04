import { Navigation } from '@/components/onefin/Navigation';
import { Hero } from '@/components/onefin/Hero';
import { Benefits } from '@/components/onefin/Benefits';
import { About } from '@/components/onefin/About';
import { Statistics } from '@/components/onefin/Statistics';
import { Features } from '@/components/onefin/Features';
import { Integrations } from '@/components/onefin/Integrations';
import { Testimonials } from '@/components/onefin/Testimonials';
import { Pricing } from '@/components/onefin/Pricing';
import { Blog } from '@/components/onefin/Blog';
import { Faqs } from '@/components/onefin/Faqs';
import { Download } from '@/components/onefin/Download';
import { Footer } from '@/components/onefin/Footer';
import { PageInteractions } from '@/components/onefin/PageInteractions';
import layout from '@/components/onefin/layout-data.json';

export default function Home() {
  return (
    <div id="main">
      <a className="skip-link" href="#benefits">Skip to content</a>
      <div className={layout.rootClass} data-layout-template style={{ minHeight: '100vh', width: 'auto' }}>
        <Navigation />
        <main className={layout.mainClass} data-framer-root style={{ minHeight: "100vh", width: "auto", display: "contents" }}>
          <Hero />
          <Benefits />
          <About />
          <Statistics />
          <Features />
          <Integrations />
          <Testimonials />
          <Pricing />
          <Blog />
          <Faqs />
          <Download />
        </main>
        <Footer />
      </div>
      <PageInteractions />
    </div>
  );
}
