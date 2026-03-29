import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, FileText, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Create your resume in under 5 minutes with our intuitive builder.' },
  { icon: FileText, title: 'ATS-Friendly', description: 'Optimized layouts that pass Applicant Tracking Systems every time.' },
  { icon: Sparkles, title: 'Professional Templates', description: 'Choose from beautifully crafted templates designed by hiring experts.' },
];

const templates = [
  { name: 'Minimal', style: 'Clean & simple', color: 'bg-background' },
  { name: 'Modern', style: 'Bold & creative', color: 'bg-primary/5' },
  { name: 'Professional', style: 'Classic & polished', color: 'bg-muted' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-card">
              <Sparkles className="h-4 w-4 text-primary" />
              Free forever · No sign-up required
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              Create a Professional{' '}
              <span className="text-gradient">Resume in Minutes</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Free, fast, and ATS-friendly resume builder. Stand out from the crowd
              and land your dream job.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/builder"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Build My Resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Template Previews */}
      <section className="border-t bg-card py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl">Beautiful Templates</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Choose a template and customize it to match your style. Switch instantly.
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {templates.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className={`${t.color} aspect-[3/4] rounded-xl border shadow-card transition-all group-hover:shadow-elevated group-hover:-translate-y-1`}>
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
                    <div className="h-4 w-24 rounded bg-foreground/10" />
                    <div className="h-2 w-32 rounded bg-foreground/5" />
                    <div className="mt-4 space-y-2 w-full">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-2 w-full rounded bg-foreground/5" />
                      ))}
                    </div>
                    <div className="mt-4 space-y-2 w-full">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-2 w-full rounded bg-foreground/5" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display text-lg">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.style}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border bg-card p-8 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-normal">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t bg-card py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl">Simple Pricing</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Get started for free. Upgrade when you need more.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-3xl gap-8 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-xl border bg-background p-8 shadow-card">
              <p className="font-display text-2xl">Free</p>
              <p className="mt-1 text-muted-foreground text-sm">Perfect for getting started</p>
              <p className="mt-6 font-display text-4xl">$0</p>
              <ul className="mt-8 space-y-3">
                {['Basic template', 'Live preview', 'PDF download', 'Watermark included'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/builder"
                className="mt-8 block rounded-lg border px-6 py-2.5 text-center text-sm font-medium transition-colors hover:bg-muted"
              >
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div className="relative rounded-xl border-2 border-primary bg-background p-8 shadow-glow">
              <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                Popular
              </div>
              <p className="font-display text-2xl">Pro</p>
              <p className="mt-1 text-muted-foreground text-sm">For serious job seekers</p>
              <p className="mt-6 font-display text-4xl">$9<span className="text-lg text-muted-foreground">/mo</span></p>
              <ul className="mt-8 space-y-3">
                {['All templates', 'No watermark', 'Priority support', 'Custom colors', 'Multiple resumes'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl">Ready to Land Your Dream Job?</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Join thousands of job seekers who got hired with ResumeForge.
          </p>
          <Link
            to="/builder"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
          >
            Build My Resume Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
