import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b0614", color: "#f6f0ff", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 700, width: 420, height: 630, background: "linear-gradient(to bottom, rgba(255,46,147,.55), transparent)", clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)", display: "flex" }} />
        <div style={{ position: "absolute", top: 0, left: 300, width: 420, height: 630, background: "linear-gradient(to bottom, rgba(25,227,255,.4), transparent)", clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)", display: "flex" }} />
        <div style={{ display: "flex", fontSize: 34, color: "#ffb800" }}>TONIGHT&apos;S HEADLINER</div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 900, lineHeight: 1, marginTop: 16, textTransform: "uppercase" }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 40, color: "#19e3ff", marginTop: 28 }}>{profile.tagline}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#b3a5cf", marginTop: 16 }}>Web developer · Project manager · Guitarist</div>
      </div>
    ),
    size,
  );
}
