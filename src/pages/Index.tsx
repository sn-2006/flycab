import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Plane, MapPin, Sparkles, Clock, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="font-medium">Now operating across Bengaluru</span>
              </div>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-balance">
                Skip the traffic.
                <br />
                <span className="italic text-primary">Take the sky.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Bengaluru's first autonomous flying-taxi network. Tap two points on a
                map, choose your tier, and arrive in minutes — not hours.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="xl" asChild>
                  <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                    <Plane className="-rotate-45" /> Book your first flight
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href="#how-it-works">How it works</a>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> 8-min avg trip</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> ISO-certified safety</div>
              </div>
            </div>

            {/* Floating ticket card */}
            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-2xl opacity-30 animate-pulse-glow" />
                <div className="relative bg-card rounded-3xl shadow-ink border border-border/60 overflow-hidden animate-float">
                  <div className="bg-gradient-ink p-6 text-secondary-foreground">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-widest opacity-70">Boarding pass</span>
                      <Plane className="h-5 w-5 -rotate-45 text-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-display font-black">BLR</div>
                        <div className="text-xs opacity-70">Koramangala</div>
                      </div>
                      <div className="flex-1 mx-4 border-t-2 border-dashed border-gold/40 relative">
                        <Plane className="h-4 w-4 text-gold absolute left-1/2 -top-2 -translate-x-1/2 -rotate-45" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-display font-black">WHF</div>
                        <div className="text-xs opacity-70">Whitefield</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Distance</div>
                        <div className="font-display font-bold text-lg">14.2 km</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Duration</div>
                        <div className="font-display font-bold text-lg">9 min</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Tier</div>
                        <div className="font-display font-bold text-lg">Premium</div>
                      </div>
                    </div>
                    <div className="border-t border-dashed border-border pt-4 flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Total fare</span>
                      <span className="font-display text-3xl font-black text-primary">₹384</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container py-20 lg:py-28">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">How it works</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-2 tracking-tight text-balance">
            Three taps. One flight. Zero traffic.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Pin your route", desc: "Tap pickup and destination directly on the Bengaluru map.", n: "01" },
            { icon: Sparkles, title: "Pick a tier", desc: "Economy, Premium, or Luxury — pricing updates live with distance.", n: "02" },
            { icon: Zap, title: "Take off", desc: "Confirm your booking and we'll dispatch the nearest aerial pod.", n: "03" },
          ].map((step) => (
            <div key={step.n} className="bg-gradient-card rounded-2xl border border-border/60 p-8 shadow-soft hover:shadow-elevated transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-5xl font-black text-muted/40">{step.n}</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers preview */}
      <section className="bg-gradient-ink text-secondary-foreground py-20 lg:py-28">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">Your sky, your style</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-2 tracking-tight text-balance">
              From everyday commute to first-class arrival.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Economy", base: 50, perKm: 10, color: "bg-accent" },
              { name: "Premium", base: 100, perKm: 20, color: "bg-primary" },
              { name: "Luxury", base: 200, perKm: 40, color: "bg-gold text-gold-foreground" },
            ].map((t) => (
              <div key={t.name} className="bg-secondary-foreground/5 backdrop-blur rounded-2xl border border-secondary-foreground/10 p-8">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${t.color} text-primary-foreground mb-6`}>{t.name}</span>
                <div className="font-display text-5xl font-black mb-2">₹{t.base}<span className="text-lg opacity-60"> base</span></div>
                <div className="text-sm opacity-70">+ ₹{t.perKm} per km</div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button variant="hero" size="xl" asChild>
              <Link to={user ? "/dashboard" : "/auth?mode=signup"}>Start booking</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 -rotate-45 text-primary" />
            <span>FlyCab — Bengaluru's aerial taxi network</span>
          </div>
          <span>© {new Date().getFullYear()} FlyCab. All flights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
