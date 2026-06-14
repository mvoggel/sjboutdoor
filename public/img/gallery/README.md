# Gallery photos — drop them here

Each subfolder is a **category** that shows up as a filter on the `/gallery`
page and as the "The Gallery" strip at the bottom of the matching product page.

```
public/img/gallery/
  louvered-pergolas/
  retractable-awnings/
  exterior-shutters/
  bahama-shutters/
  storm-shutters/
  exterior-shades/
  patio-shades/          → shown on the Patio Screens product page
  garage-door-screens/
```

## How to add photos

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) into the folder
   for that product. That's it — they'll appear in the gallery and on the
   product page automatically.

2. **Caption (optional).** The filename sets the city caption shown on the
   photo. Use a double underscore to separate the city from the rest of the
   name, and dashes for spaces in the city:

   | Filename                         | Caption shown |
   | -------------------------------- | ------------- |
   | `Naples__back-patio.jpg`         | Naples        |
   | `Fort-Myers__evening-3.jpg`      | Fort Myers    |
   | `Marco-Island__install.png`      | Marco Island  |
   | `random-photo.jpg`               | _(no caption)_ |

3. The manifest regenerates automatically when you run `npm run dev` or
   `npm run build`. If you added photos while the dev server is already
   running, restart it (or run `node scripts/gen-gallery.mjs`) to pick them up.

The order photos appear in is alphabetical by filename, so prefix with a number
(`01-`, `02-`) if you want to control it — e.g. `01-Naples__hero.jpg`.
