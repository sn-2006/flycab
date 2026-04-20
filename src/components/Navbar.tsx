import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Plane } from "lucide-react";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero shadow-elevated transition-transform group-hover:scale-105">
            <Plane className="h-5 w-5 text-primary-foreground -rotate-45" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-black tracking-tight">
            Fly<span className="text-primary">Cab</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                Book a ride
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                  }`
                }
              >
                History
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/auth?mode=signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
