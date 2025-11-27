// src/components/ui/MapPicker.jsx
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  TargetIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component for click handler
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

// Component for map controls (flyTo)
function MapControls({ onLocate }) {
  const map = useMap();

  useEffect(() => {
    if (onLocate) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, [map, onLocate]);

  return null;
}

/**
 * Map Picker Component
 * مكون اختيار الموقع على الخريطة
 *
 * @param {Function} onLocationChange - callback عند تغيير الموقع
 * @param {Object} initialPosition - الموقع الابتدائي {lat, lng}
 */
export default function MapPicker({
  onLocationChange,
  initialPosition = { lat: 30.0444, lng: 31.2357 }, // Cairo default
}) {
  const [position, setPosition] = useState(initialPosition);
  const [addressDetails, setAddressDetails] = useState({
    city: "",
    district: "",
    street: "",
    building: "",
    notes: "",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [locateTrigger, setLocateTrigger] = useState(0);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  useEffect(() => {
    // Skip fetching for the exact default coordinates to avoid initial load error and CORS issues on localhost
    // Also skip if lat/lng are null
    if (
      !position.lat ||
      !position.lng ||
      (Math.abs(position.lat - 30.0444) < 0.0001 &&
        Math.abs(position.lng - 31.2357) < 0.0001)
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setIsFetchingAddress(true);
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json&accept-language=ar`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          const addr = data.address || {};
          const newDetails = {
            city: addr.city || addr.town || addr.village || addr.state || "",
            district:
              addr.suburb ||
              addr.neighbourhood ||
              addr.city_district ||
              addr.quarter ||
              "",
            street: addr.road || addr.pedestrian || addr.street || "",
            building: addr.house_number || "",
            notes: addressDetails.notes, // Keep existing notes
          };

          setAddressDetails(newDetails);

          const displayAddress = data.display_name;
          onLocationChange?.({
            lat: position.lat,
            lng: position.lng,
            address: displayAddress,
            details: newDetails,
          });
        })
        .catch((err) => {
          console.warn("Geocoding skipped or failed:", err.message);
          // Fallback if fetch fails - just keep coordinates
          onLocationChange?.({
            lat: position.lat,
            lng: position.lng,
            address: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
            details: addressDetails,
          });
        })
        .finally(() => {
          setIsFetchingAddress(false);
        });
    }, 800); // Debounce for 800ms

    return () => clearTimeout(timer);
  }, [position]);

  const handleDetailChange = (field, value) => {
    const newDetails = { ...addressDetails, [field]: value };
    setAddressDetails(newDetails);
    onLocationChange?.({
      lat: position.lat,
      lng: position.lng,
      address: Object.values(newDetails).filter(Boolean).join(", "),
      details: newDetails,
    });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setLocateTrigger((prev) => prev + 1); // Trigger map flyTo
        },
        (err) => {
          console.error("Error getting location:", err);
          alert("تعذر تحديد موقعك الحالي. يرجى التحقق من إعدادات الموقع.");
        }
      );
    } else {
      alert("المتصفح لا يدعم تحديد الموقع.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Force map resize after transition
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Map Container */}
      <div
        className={cn(
          "relative overflow-hidden transition-all duration-500 shadow-lg",
          isFullscreen
            ? "fixed inset-0 z-50 h-screen w-screen rounded-none bg-background"
            : "h-[350px] md:h-[450px] rounded-2xl border-2 border-slate-100 dark:border-slate-800"
        )}
      >
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
          <MapControls onLocate={locateTrigger} />
        </MapContainer>

        {/* Map Controls (Floating Pills) */}
        <div className="absolute top-4 right-4 z-1000 flex flex-col gap-3">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleLocateMe}
            className="h-12 w-12 rounded-full shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 hover:scale-110 transition-all duration-300 text-primary"
            title="موقعي الحالي"
          >
            <TargetIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="h-12 w-12 rounded-full shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 hover:scale-110 transition-all duration-300 text-slate-700 dark:text-slate-300"
            title={isFullscreen ? "تصغير الخريطة" : "تكبير الخريطة"}
          >
            {isFullscreen ? (
              <ExitFullScreenIcon className="h-6 w-6" />
            ) : (
              <EnterFullScreenIcon className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Loading Indicator */}
        {isFetchingAddress && (
          <div className="absolute bottom-4 left-4 z-1000 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold text-primary animate-in slide-in-from-bottom-2">
            <ReloadIcon className="w-3 h-3 animate-spin" />
            جاري تحديد العنوان...
          </div>
        )}
      </div>

      {/* Address Display */}
      <div className="space-y-4 bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <Label className="text-base font-bold text-slate-800 dark:text-slate-200">
            العنوان التفصيلي
          </Label>
          <span className="text-xs text-muted-foreground bg-white dark:bg-slate-900 px-2 py-1 rounded-full border dir-ltr">
            {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              المدينة
            </Label>
            <Input
              id="city"
              value={addressDetails.city}
              onChange={(e) => handleDetailChange("city", e.target.value)}
              placeholder="مثال: الرياض"
              className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
              dir="rtl"
            />
          </div>

          {/* District */}
          <div className="space-y-2">
            <Label
              htmlFor="district"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              الحي
            </Label>
            <Input
              id="district"
              value={addressDetails.district}
              onChange={(e) => handleDetailChange("district", e.target.value)}
              placeholder="مثال: حي العليا"
              className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
              dir="rtl"
            />
          </div>

          {/* Street */}
          <div className="space-y-2">
            <Label
              htmlFor="street"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              الشارع
            </Label>
            <Input
              id="street"
              value={addressDetails.street}
              onChange={(e) => handleDetailChange("street", e.target.value)}
              placeholder="مثال: شارع الملك فهد"
              className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
              dir="rtl"
            />
          </div>

          {/* Building Number */}
          <div className="space-y-2">
            <Label
              htmlFor="building"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              رقم المبنى
            </Label>
            <Input
              id="building"
              value={addressDetails.building}
              onChange={(e) => handleDetailChange("building", e.target.value)}
              placeholder="مثال: 15"
              className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
              dir="rtl"
            />
          </div>

          {/* Extra Notes */}
          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="notes"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              ملاحظات إضافية (اختياري)
            </Label>
            <Input
              id="notes"
              value={addressDetails.notes}
              onChange={(e) => handleDetailChange("notes", e.target.value)}
              placeholder="أقرب معلم، رقم الطابق، أو أي تفاصيل أخرى..."
              className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
              dir="rtl"
            />
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          يمكنك النقر على الخريطة لتحديد موقع دقيق تلقائياً
        </p>
      </div>
    </div>
  );
}
