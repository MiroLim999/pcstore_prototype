# Hero Image Resolution Guide

**Aspect Ratio:** 2.4:1 (1920:800)  
**CSS:** `aspect-ratio: 1920 / 800`  
**Formula:** Width ÷ 2.4 = Height

All resolutions below will fit the hero section **perfectly with zero cropping**.

---

| Resolution | Scale | Use Case |
|-----------|-------|----------|
| 960 × 400 | 0.5× | Thumbnails, low-bandwidth |
| 1280 × 533 | 0.67× | Small laptops, previews |
| 1440 × 600 | 0.75× | Budget laptops |
| 1600 × 667 | 0.83× | Older monitors |
| **1920 × 800** | **1×** | **Standard 1080p displays (recommended)** |
| 2160 × 900 | 1.125× | Between standard and retina |
| 2304 × 960 | 1.2× | MacBook Air |
| 2400 × 1000 | 1.25× | Mid-range HiDPI |
| 2560 × 1067 | 1.33× | 1440p / QHD monitors |
| 2880 × 1200 | 1.5× | MacBook Pro retina |
| 3072 × 1280 | 1.6× | High-end laptops |
| 3200 × 1333 | 1.67× | Ultrawide QHD |
| 3360 × 1400 | 1.75× | Surface Studio |
| 3456 × 1440 | 1.8× | iMac 5K (scaled) |
| 3600 × 1500 | 1.875× | Large retina |
| **3840 × 1600** | **2×** | **4K / UHD displays (retina recommended)** |
| 4320 × 1800 | 2.25× | 4K retina |
| 4608 × 1920 | 2.4× | Pro displays |
| 4800 × 2000 | 2.5× | Studio monitors |
| 5120 × 2133 | 2.67× | 5K displays |
| 5760 × 2400 | 3× | Apple Pro Display XDR |
| 7680 × 3200 | 4× | 8K displays |

---

## Canva Recommendations

- **For web (fast loading):** 1920 × 800
- **For retina/HiDPI:** 3840 × 1600
- **Sweet spot (quality + speed):** 2560 × 1067

## Notes

- All resolutions maintain the exact **2.4:1** ratio
- The image uses `object-fit: cover` but since the container matches the ratio, no cropping occurs
- Keep important content centered — on mobile the section becomes narrower but maintains the same ratio
