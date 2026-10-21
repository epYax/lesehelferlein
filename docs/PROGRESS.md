# Entwicklungsfortschritt

## 2026-10-21 — Funktionales MVP

### Umgesetzt
- Greenfield-Projekt mit Next.js 16.4.2, React, TypeScript und eigenem responsivem CSS-Designsystem. Kein Backend-Dienst aktiviert.
- Originalfigur unverändert eingebunden. Palette: Waldgrün, Salbei, Mint, Creme und Sonnengelb; Systemschriften ohne externe Font-Requests. Subtile Animation mit Reduced-Motion-Unterstützung.
- Startseite, Bibliothek mit sechs eigenen deutschen Geschichten, Suchfunktion, drei Schwierigkeitsfiltern und Leerzustand.
- Eigene Leseroute je Geschichte, Schriftgrößen 22–34 px, Fortschrittsanzeige, Abbrechen und Wiederholung.
- Vollständiger, ausdrücklich gekennzeichneter Demo-Ablauf; deterministisches simuliertes Transkript. Keine Mikrofonberechtigung und keine Audioaufnahme.
- Editierbares Beispieltranskript, ausschließlich im Browser verarbeitet; auch leere Eingaben werden nachvollziehbar ausgewertet.
- Globales Minimum-Edit-Alignment mit Rückverfolgung statt Positionsvergleich. Korrekt, nicht gefunden, anders erkannt und zusätzlich erkannt werden getrennt behandelt. Harte Eingabegrenze schützt vor übergroßen Matrizen.
- Deutsche Normalisierung: Groß-/Kleinschreibung, Unicode, Satzzeichen, ß/ss und Ziffern 0–12. Keine unbegründete Gleichsetzung ähnlich klingender Wörter.
- Freundliche Demo-Belohnung und detaillierte Wortliste. Ergebnisse werden nicht als Bewertung des Kindes ausgegeben.
- Eltern-/Datenschutzhinweise, 404-Seite, Fokusführung zum Ergebnis, semantische Buttons, Textbeschriftungen zusätzlich zur Farbe, Skip-Link.
- Provider-Schnittstelle mit AbortSignal für spätere echte Transkription. Architektur und Folgephasen dokumentiert.

### Qualitätssicherung
- `npm test`: 10 Tests erfolgreich; Normalisierung, Löschung/Einfügung/Ersetzung, kombinierte Fälle, Wiederholungen, leere Texte, Eingabegrenze, Geschichten und Abbruch.
- `npm run typecheck`: erfolgreich.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, alle sechs Geschichten statisch vorgerendert.
- `npm run test:e2e`: 16 von 16 Prüfungen erfolgreich. Playwright gegen Produktionsserver: vier Abläufe je Viewport (1440, 820, 390 und 320 px). Navigation, Filter, Suche, Leerzustand, Schriftgröße, Demo, Abbruch, manuelles leeres Transkript, Wiederholung und 404 werden geprüft.
- Screenshots von Startseite und Leseauswertung werden unter `test-results/` erzeugt. Desktop, Tablet und Smartphone visuell geprüft. Gefundene Überläufe im Hero korrigiert; Test prüft jetzt gegen die tatsächliche Layoutbreite statt gegen die durch Überlauf vergrößerte mobile Fensterbreite.
- `npm audit --omit=dev`: 0 bekannte Schwachstellen.
- Vollständiger Audit: 5 hohe Meldungen innerhalb derselben Entwicklungsabhängigkeitskette `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` (GHSA-vfj7-8cjw-p6xm). Kein ungeprüfter automatischer Downgrade auf ESLint-Konfiguration 14.2.35. Vor produktiver CI-Nutzung erneut prüfen und upstream Patch übernehmen. Keine dieser Abhängigkeiten ist Teil des produktiven Laufzeitbundles.

### Bewusste Grenzen / offene Punkte
- Separates Logo nicht mitgeliefert: vorläufige typografische Namensdarstellung mit Originalfigur, kein neues Bildlogo.
- Echte Spracherkennung, Mikrofonaufnahme, Supabase, Konten und dauerhafter Fortschritt sind Folgephasen. Dafür fehlen Dienstfreigabe und Datenschutzkonzept; keine Zugangsdaten nötig für diese Demo.
- Demo-Fortschritt ist eine Simulation, kein Live-Alignment. Ein Demo-Stern zeigt Teilnahme am Ablauf, keine gemessene Lesefähigkeit.
- Alignment bleibt bei wiederholten Wörtern mehrdeutig. Dialekte, Selbstkorrekturen, Komposita und größere ausgeschriebene Zahlen sind noch nicht gesondert behandelt.
- Geschichten-Cover nutzen dekorative CSS-Landschaften und System-Emojis; Emoji-Darstellung variiert nach Betriebssystem. Die Lesefee bleibt das einzige Maskottchen.
- Browserprüfungen laufen mit Chromium und simulierten Gerätegrößen, nicht auf echten Mobilgeräten oder in Safari/Firefox. Kein vollständiges Accessibility-Audit behauptet.
- Keine externen produktiven Dienste, kostenpflichtigen Aufrufe oder Deployments. Temporäre Prüfserver werden nach den Tests beendet.

### Nächster Meilenstein
Freigabe und Ausarbeitung echter Whisper-Transkription: kurzlebige Audioverarbeitung, serverseitiger Provider, Größen-/Dauerlimits, sichere Berechtigungs- und Fehlerbehandlung, Löschkonzept und Qualitätsprüfung mit ausdrücklich freigegebenen Daten.
