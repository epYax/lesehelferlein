# LeseHelferlein — Der Geschichtenwald
Eine magische Lese-Erlebniswelt für Grundschulkinder. Die Original-LeseFee begleitet Kinder von der Waldlichtung durch sechs Geschichten bis ins eigene Reisealbum.

## Lokal starten
Node.js 20.9+ (entwickelt mit Node 24), npm.

```sh
npm ci
npm run dev
```
http://127.0.0.1:3000 öffnen.

## Was es zu entdecken gibt
- **Lichtung:** eigens erzeugte Bilderbuch-Waldlandschaft, interaktive Lesefee, drei sammelbare Lichtfunken und eine Überraschungsgeschichte.
- **Abenteuerkarte:** sechs frei zugängliche Geschichtenorte, Suche, Schwierigkeitsfilter und alternative Bücheransicht.
- **Lesetraining:** ruhiger Text, anpassbare Schriftgröße, transparenter Demo-Lesefluss und wortgenaues Alignment.
- **Reisealbum:** einmalige Demo-Reisestempel und Lichtfunken-Abzeichen; lokal gespeichert, ohne Konto oder Leistungsbewertung.
- **Elternbereich:** transparente Hinweise zu Demo, Datenverarbeitung und künftiger Spracherkennung.

**Kein Mikrofon, keine echte Spracherkennung.** Fortschritt und Transkript der Demo sind simuliert; der Textvergleich ist real. Transkripte werden nicht gespeichert. Das Album speichert nur bekannte Geschichten-IDs und Funken-IDs im lokalen Browser (`lesehelferlein.journey.v2`). Zurücksetzen ist im Album mit Bestätigung möglich. Blockierter Speicher fällt auf den laufenden Besuch zurück; Neuladen kann diese temporären Daten verlieren. Keine Konten, Telemetrie, Audioübertragung oder externen Fonts. Ein separates Bildlogo liegt lokal nicht vor; Originalfigur und typografischer Name bilden die Marke.

## Prüfung
```sh
npm test
npm run lint
npm run build
npm run typecheck
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npm run test:e2e
```

Browserprüfungen starten einen eigenen Produktionsserver auf **Port 3100**. Vorher `npm run build` ausführen. Port 3000 bleibt für die Entwicklung frei. Chromium läuft in vier Größen (320, 390, 820, 1440 px). Temporäre Screenshots landen in `test-results/`; archivierte Vergleichsbilder liegen in `docs/design-versions/`.

## Architektur
- `app/`: Routen und Styling; `globals.css` enthält Basis/Lesetraining, `adventure.css` die Erlebniswelt, `illustrations.css` die Bilderbuchgestaltung.
- `components/adventure-home.tsx`, `world-art.tsx`: interaktive Waldlichtung und Bilderbuch-Kulisse.
- `components/library.tsx`, `journey-album.tsx`: Karte/Bücheransicht und Reisealbum.
- `components/reader.tsx`: abbruchfähiger Demo-Lesefluss, Wortauswertung und einmaliger Reisestempel.
- `components/use-journey.ts`, `lib/journey.ts`: lokale Speicherung, Validierung, Deduplizierung und Fehlertoleranz.
- `lib/alignment.ts`: Levenshtein-Alignment mit deutscher Normalisierung; maximal 1000 Tokens pro Eingabe.
- `lib/transcription.ts`: austauschbarer Provider mit AbortSignal; aktuell lokale Demo.
- `lib/stories.ts`: sechs eigene deutsche Geschichten.

Alignment bewertet Transkript-Übereinstimmung, keine Lesefähigkeit. Dialekte, Selbstkorrekturen, Komposita und größere ausgeschriebene Zahlen benötigen künftig erweiterte Verarbeitung. Keine produktiven Integrationen oder Deployments.

## Designhistorie
`design-v1` bewahrt die ursprüngliche App, `design-v2` den Geschichtenwald und `design-v3` die eigene Bildwelt mit 20 Lesezeichen-Icons. Entwicklung: `feature/eigene-bildwelt`.

**[Versionen parallel starten und GitHub-Sicherung](docs/VERSION_CONTROL.md)** · [Designkonzept](docs/REDESIGN.md) · [Fortschritt / Prüfungen](docs/PROGRESS.md)

## Eigene Icons
Die 20 SVG-Icons in `components/reading-icons.tsx` bilden das eigene Set **Lesezeichen**: Buchseiten, Blätter und Feensterne in Waldgrün, Creme, Gold und Beerenlila. Keine externe Icon-Bibliothek.

Mit `npm run icons:export` werden die einzelnen SVGs und ihre Größenvorschau in `public/icons/lesezeichen/` aktualisiert. Bei laufender App: [Icon-Galerie](http://127.0.0.1:3000/icons/lesezeichen/index.html). [Bildherkunft und Gestaltung](docs/art-direction/README.md).
