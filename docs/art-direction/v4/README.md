# Design v4 — Spielbare Lichtung

Ein neues Hintergrundbild wurde mit dem eingebauten **image_gen** erzeugt. Stilreferenz war ausschließlich die originale `public/child-reading.png`: runde Flächen, warme Farben, feine Papiertextur. Keine zusätzliche Figur, keine Änderung am Originalmaskottchen. Der Hintergrund enthält keine gerenderten Texte; alle Inhalte bleiben zugängliches HTML.

- Finale Datei: `public/art/lesehelferlein-v4/play-clearing.webp` (1536 × 1024).
- Vollständiger Generierungsprompt: [prompt.txt](prompt.txt).
- Export mit Sharp als WebP, Qualität 90. Kein direkter kostenpflichtiger API-/CLI-Aufruf; eingebautes Bildwerkzeug verwendet.
- Neue Startseite: `components/adventure-home.tsx`, eigene scoped Styles in `app/play-home.css`.
- Ebenen: Kulisse hinten, Spieloberflächen und Funken darüber, Original-LeseFee vorne. Das transparente Maskottchen blockiert keine Klickflächen. Tipps stehen oberhalb des gesamten Figurenbilds.
- Text auf deckenden cremefarbenen Flächen, gut erkennbare gedrückte Spielbuttons, Funken-Nebenmission und Ausrüstungsmenü statt nachgelagerter Marketingsektionen.

Die Lese-Demo, das Album und die bestehende Geschichtenbibliothek behalten ihre Funktionen. Reisestempel drücken Demo-Teilnahme aus; Funken stehen für Entdeckung. Keine Tonaufnahme, Konten, Ranglisten oder Leistungsbewertung hinzugefügt.
