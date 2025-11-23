import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MapPicker } from "@/components/MapPicker";
import { ArrowLeft, Save } from "lucide-react";
import { GeoAlarm } from "@/types/alarm";
import { useGeoAlarms } from "@/hooks/useGeoAlarms";
import { formatDistance } from "@/utils/distance";
import { useToast } from "@/hooks/use-toast";

export default function CreateAlarm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { alarms, addAlarm, updateAlarm } = useGeoAlarms();
  const { toast } = useToast();

  const existingAlarm = editId ? alarms.find((a) => a.id === editId) : null;

  const [name, setName] = useState(existingAlarm?.name || "");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(existingAlarm?.location || null);
  const [radius, setRadius] = useState(existingAlarm?.radius || 500);
  const [isActive, setIsActive] = useState(existingAlarm?.isActive ?? true);

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your alarm",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please select a location on the map",
        variant: "destructive",
      });
      return;
    }

    if (editId && existingAlarm) {
      updateAlarm(editId, {
        name,
        location,
        radius,
        isActive,
      });
      
      toast({
        title: "Alarm updated",
        description: `${name} has been updated successfully`,
      });
    } else {
      const newAlarm: GeoAlarm = {
        id: Date.now().toString(),
        name,
        location,
        radius,
        isActive,
        createdAt: new Date().toISOString(),
      };
      
      addAlarm(newAlarm);
      
      toast({
        title: "Alarm created",
        description: `${name} is now ${isActive ? "active" : "inactive"}`,
      });
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">
            {editId ? "Edit Alarm" : "Create Alarm"}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Alarm Name</Label>
            <Input
              id="name"
              placeholder="e.g., Home, Office, College"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Destination</Label>
            <MapPicker
              initialPosition={location || undefined}
              radius={radius}
              onLocationSelect={setLocation}
            />
            {location?.address && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {location.address}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Alert Radius</Label>
              <span className="text-sm font-medium text-primary">
                {formatDistance(radius)}
              </span>
            </div>
            <Slider
              value={[radius]}
              onValueChange={([value]) => setRadius(value)}
              min={100}
              max={1500}
              step={50}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              You'll be alerted when you're within this distance
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label htmlFor="active" className="cursor-pointer">
                Activate alarm now
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Start tracking immediately after saving
              </p>
            </div>
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </Card>

        <Button onClick={handleSave} className="w-full" size="lg">
          <Save className="h-5 w-5 mr-2" />
          {editId ? "Update Alarm" : "Create Alarm"}
        </Button>
      </div>
    </div>
  );
}
