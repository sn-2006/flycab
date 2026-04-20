import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  start_label: string | null;
  dest_label: string | null;
  distance_km: number;
  fare: number;
  tier_name: string;
  status: string;
  created_at: string;
}

const tierColor: Record<string, string> = {
  Economy: "bg-accent text-accent-foreground",
  Premium: "bg-primary text-primary-foreground",
  Luxury: "bg-gold text-gold-foreground",
};

const History = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error("Couldn't load history");
          return;
        }
        setBookings(
          (data || []).map((b) => ({
            ...b,
            distance_km: Number(b.distance_km),
            fare: Number(b.fare),
          }))
        );
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10 max-w-4xl">
        <div className="mb-8">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Your flights</span>
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight mt-2">
            Ride history
          </h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-gradient-card rounded-2xl border border-border/60">
            <div className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 mb-4">
              <Plane className="h-8 w-8 -rotate-45 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">No flights yet</h2>
            <p className="text-muted-foreground mb-6">Your aerial commute starts with a single tap.</p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/dashboard">Book your first flight</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-card rounded-2xl border border-border/60 p-6 shadow-soft hover:shadow-elevated transition-all"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${tierColor[b.tier_name] || "bg-secondary text-secondary-foreground"}`}>
                        {b.tier_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(b.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-accent shrink-0" />
                        <span className="truncate">{b.start_label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Navigation className="h-4 w-4 text-primary shrink-0" />
                        <span className="truncate">{b.dest_label}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      {b.distance_km.toFixed(2)} km · status: {b.status}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Fare</div>
                    <div className="font-display text-3xl font-black text-primary">
                      ₹{b.fare.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
