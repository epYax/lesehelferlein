# LeseHelferlein
Lokales, deutschsprachiges Lese-MVP mit Original-Lesefee, sechs Geschichten, Bibliothek mit Suche/Filtern, anpassbarer Leseansicht und wortgenauem Demo-Textvergleich.

## Start
Node.js 20.9+ (entwickelt mit Node 24), npm.

```sh
npm ci
npm run dev
```
Öffnen: http://127.0.0.1:3000

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

## Ablauf
Geschichte wählen → Demo starten → im eigenen Tempo mitlesen → Demo auswerten → Wortmarkierungen und Demo-Stern ansehen. Abbrechen und Wiederholen sind jederzeit möglich. Unter „Für Neugierige“ lässt sich das Transkript bearbeiten, auch vollständig leeren, um eigene Vergleichsfälle auszuprobieren.

**Kein Mikrofon, keine echte Spracherkennung.** Fortschritt und Transkript der Demo sind simuliert; die Textauswertung ist real. Es gibt keine Konten, Speicherung, Telemetrie, externen Fonts oder Audioübertragung. Beim Neuladen werden Eingaben verworfen. Das separate Logo fehlt; der Name wird typografisch neben der Originalfigur dargestellt.

## Architektur
- `app/`: App-Router-Seiten, Layout und Design-Tokens/CSS.
- `components/`: Bibliothek, Story-Karten, Header, zustandsbasiertes Training.
- `lib/alignment.ts`: Levenshtein-Alignment, deutsche Unicode-Normalisierung, ß/ss, Zahlen 0–12; Grenzwert 1000 Tokens je Eingabe.
- `lib/transcription.ts`: austauschbarer Provider mit Abbruchsignal; aktuell nur lokale Demo.
- `lib/stories.ts`: sechs selbst verfasste Beispielgeschichten.
- `docs/`: Architektur, Akzeptanzkriterien, Testergebnisse und nächste Schritte.

Alignment bewertet die Übereinstimmung eines Transkripts, nicht die Lesefähigkeit. Dialekte, Komposita, ausgeschriebene Zahlen über 12 und Selbstkorrekturen benötigen künftig erweiterte Verarbeitung. Gleichwertige Alignments werden deterministisch aufgelöst; einzelne Zuordnungen bleiben mehrdeutig.

Individuelles CSS statt Tailwind hält die kleine Oberfläche übersichtlich. Keine produktiven Integrationen oder Deployments. Architektur gemäß [Next.js App Router Dokumentation](https://nextjs.org/docs/app/getting-started/installation).

## Browserprüfungen
```sh
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npm run test:e2e
```
Alle Browserdateien bleiben im Projekt. Screenshots werden in `test-results/` erzeugt.
