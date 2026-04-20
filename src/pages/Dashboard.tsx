import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FlyMap, type LatLng } from "@/components/FlyMap";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { haversineKm } from "@/lib/distance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MapPin, Navigation, Plane, RotateCcw } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  description: string | null;
  base_fare: number;
  cost_per_km: number;
  sort_order: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [start, setStart] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    supabase
      .from("taxi_tiers")
      .select("*")
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) {
          toast.error("Couldn't load taxi tiers");
          return;
        }
        const rows = (data || []).map((t) => ({
          ...t,
          base_fare: Number(t.base_fare),
          cost_per_km: Number(t.cost_per_km),
        }));
        setTiers(rows);
        if (rows.length && !selectedTier) setSelectedTier(rows[1]?.id ?? rows[0].id);
      });
  }, []);

  const distanceKm = useMemo(() => {
    if (!start || !destination) return 0;
    return haversineKm(start.lat, start.lng, destination.lat, destination.lng);
  }, [start, destination]);

  const fareFor = (tier: Tier) => tier.base_fare + distanceKm * tier.cost_per_km;
  const selectedTierObj = tiers.find((t) => t.id === selectedTier) || null;
  const fare = selectedTierObj ? fareFor(selectedTierObj) : 0;

  const handleMapClick = (pt: LatLng) => {
    if (!start) {
      setStart(pt);
      toast.success("Pickup point set");
    } else if (!destination) {
      setDestination(pt);
      toast.success("Destination set");
    } else {
      // both set — replace destination
      setDestination(pt);
    }
  };

  const reset = () => {
    setStart(null);
    setDestination(null);
  };

  const handleBook = async () => {
    if (!user || !start || !destination || !selectedTierObj) return;
    setBooking(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        start_lat: start.lat,
        start_lng: start.lng,
        start_label: `Pickup (${start.lat.toFixed(3)}, ${start.lng.toFixed(3)})`,
        dest_lat: destination.lat,
        dest_lng: destination.lng,
        dest_label: `Destination (${destination.lat.toFixed(3)}, ${destination.lng.toFixed(3)})`,
        distance_km: Number(distanceKm.toFixed(2)),
        fare: Number(fare.toFixed(2)),
        tier_name: selectedTierObj.name,
      });
      if (error) throw error;
      toast.success("🚁 Flight booked! See you on the rooftop.");
      navigate("/history");
    } catch (err: any) {
      toast.error(err.message || "Couldn't book ride");
    } finally {
      setBooking(false);
    }
  };

  const canBook = !!start && !!destination && !!selectedTier && distanceKm > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container py-6 flex-1 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Map */}
        <div className="relative rounded-2xl overflow-hidden shadow-soft border border-border/60 min-h-[60vh] lg:min-h-0">
          <FlyMap start={start} destination={destination} onSelect={handleMapClick} />

          {/* Floating instruction */}
          <div className="absolute top-4 left-4 right-4 z-[400] pointer-events-none">
            <div className="bg-card/95 backdrop-blur border border-border/60 rounded-xl px-4 py-3 shadow-soft inline-flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">
                {!start
                  ? "Tap the map to set pickup point"
                  : !destination
                  ? "Now tap your destination"
                  : "Tap again to change destination"}
              </span>
            </div>
          </div>

          {(start || destination) && (
            <Button
              onClick={reset}
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 z-[400] shadow-elevated"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-gradient-card rounded-2xl border border-border/60 p-6 shadow-soft">
            <h2 className="font-display text-2xl font-black tracking-tight">Your route</h2>
            <p className="text-sm text-muted-foreground mb-4">Bengaluru aerial corridor</p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-bold">A</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Pickup</div>
                  <div className="font-medium truncate">
                    {start ? `${start.lat.toFixed(4)}, ${start.lng.toFixed(4)}` : "Select on map"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">B</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Destination</div>
                  <div className="font-medium truncate">
                    {destination ? `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}` : "Select on map"}
                  </div>
                </div>
              </div>
            </div>

            {distanceKm > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
                  <Navigation className="h-4 w-4" /> Distance
                </span>
                <span className="font-display text-2xl font-black">{distanceKm.toFixed(2)} km</span>
              </div>
            )}
          </div>

          {/* Tiers */}
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold px-1">Choose your tier</h3>
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              const tierFare = fareFor(tier);
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-elevated"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-lg">{tier.name}</span>
                        {isSelected && <span className="text-xs text-primary font-semibold">SELECTED</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ₹{tier.base_fare} base + ₹{tier.cost_per_km}/km
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl font-black text-primary">
                        {distanceKm > 0 ? `₹${tierFare.toFixed(0)}` : "—"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Book */}
          <div className="bg-gradient-ink text-secondary-foreground rounded-2xl p-6 shadow-ink">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm opacity-70">Total fare</span>
              <span className="font-display text-4xl font-black text-gold">
                {fare > 0 ? `₹${fare.toFixed(0)}` : "₹—"}
              </span>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              disabled={!canBook || booking}
              onClick={handleBook}
            >
              <Plane className="-rotate-45" />
              {booking ? "Booking..." : "Book this flight"}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
