# Gallery photos — drop them here

Each subfolder is a **category** that shows up as a filter on the `/gallery`
page and as the "The Gallery" strip at the bottom of the matching product page.

```
public/img/gallery/
  louvered-pergolas/
  exterior-shades-and-screens/   → also feeds the Patio Screens & Garage Door Screens pages
  exterior-shutters/             → also feeds the Bahama Shutters & Storm Shutters pages
  retractable-awnings/
```

There are four categories. Sub-products share their parent's folder: the Bahama
Shutters and Storm Shutters pages both pull from `exterior-shutters/`, and the
Patio Screens and Garage Door Screens pages both pull from
`exterior-shades-and-screens/`. The list of categories lives in
`lib/gallery-categories.ts` — edit there if you ever add or rename one.

## How to add photos

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) into the folder
   for that product. That's it — they'll appear in the gallery and on the
   product page automatically.

2. **Caption (optional).** The filename sets the city caption shown on the
   photo. Use a double underscore to separate the city from the rest of the
   name, and dashes for spaces in the city:

   | Filename                         | Caption shown |
   | -------------------------------- | ------------- |
   | `Gainesville__back-patio.jpg`    | Gainesville   |
   | `Santa-Rosa-Beach__evening-3.jpg`| Santa Rosa Beach |
   | `St-Augustine__install.png`      | St Augustine  |
   | `random-photo.jpg`               | _(no caption)_ |

   Only caption a photo with a city we actually serve — see
   `SERVICE_CITIES` in `lib/service-areas.ts`. Leave the city off (no `__`)
   for installs outside the current service area.

3. The manifest regenerates automatically when you run `npm run dev` or
   `npm run build`. If you added photos while the dev server is already
   running, restart it (or run `node scripts/gen-gallery.mjs`) to pick them up.

The order photos appear in is alphabetical by filename, so prefix with a number
(`01-`, `02-`) if you want to control it — e.g. `01-Gainesville__hero.jpg`.
