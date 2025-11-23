import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Bell, Navigation } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Bell className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">Welcome to GeoClock</h1>
          <p className="text-muted-foreground">
            Never miss your stop again. Set location-based alarms that wake you up when you're near your destination.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Set Your Destination</h3>
              <p className="text-sm text-muted-foreground">
                Choose your stop on the map or search for it by name.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Set Alert Radius</h3>
              <p className="text-sm text-muted-foreground">
                Define how close you need to be before the alarm triggers.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-accent/20 h-fit">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Get Alerted</h3>
              <p className="text-sm text-muted-foreground">
                Relax knowing you'll be woken up when you're near your stop.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={onComplete} className="w-full" size="lg">
            Get Started
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            GeoClock works best when the app is open. Location tracking may be limited in the background.
          </p>
        </div>
      </Card>
    </div>
  );
}
