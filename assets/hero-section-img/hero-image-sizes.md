# Hero Image Resolution Guide

**Aspect Ratio:** ~2.595:1 (1920:740)  
**CSS:** `aspect-ratio: 1920 / 740`  
**Formula:** Width ÷ 2.595 = Height

All resolutions below will fit the hero section **perfectly with zero cropping**.

---

| Resolution | Scale | Use Case |
|-----------|-------|----------|
| 960 × 370 | 0.5× | Thumbnails, low-bandwidth |
| 1280 × 493 | 0.67× | Small laptops, previews |
| 1440 × 555 | 0.75× | Budget laptops |
| 1600 × 617 | 0.83× | Older monitors |
| **1920 × 740** | **1×** | **Standard 1080p displays (recommended)** |
| 2160 × 833 | 1.125× | Between standard and retina |
| 2304 × 888 | 1.2× | MacBook Air |
| 2400 × 925 | 1.25× | Mid-range HiDPI |
| 2560 × 987 | 1.33× | 1440p / QHD monitors |
| 2880 × 1110 | 1.5× | MacBook Pro retina |
| 3072 × 1184 | 1.6× | High-end laptops |
| 3200 × 1233 | 1.67× | Ultrawide QHD |
| 3360 × 1295 | 1.75× | Surface Studio |
| 3456 × 1332 | 1.8× | iMac 5K (scaled) |
| 3600 × 1388 | 1.875× | Large retina |
| **3840 × 1480** | **2×** | **4K / UHD displays (retina recommended)** |
| 4320 × 1665 | 2.25× | 4K retina |
| 4608 × 1776 | 2.4× | Pro displays |
| 4800 × 1850 | 2.5× | Studio monitors |
| 5120 × 1973 | 2.67× | 5K displays |
| 5760 × 2220 | 3× | Apple Pro Display XDR |
| 7680 × 2960 | 4× | 8K displays |

---

## Canva Recommendations

- **For web (fast loading):** 1920 × 740
- **For retina/HiDPI:** 3840 × 1480
- **Sweet spot (quality + speed):** 2560 × 987

## Notes

- All resolutions maintain the exact **~2.595:1** ratio (1920:740)
- The image uses `object-fit: cover` but since the container matches the ratio, no cropping occurs
- Keep important content centered — on mobile the section becomes narrower but maintains the same ratio
