# Entwicklungsplan
## Architektur
Next.js App Router + React + TypeScript. Server-Komponenten für Seitenrahmen, Client-Komponenten für Bibliothek und Training. Individuelles CSS mit Design-Tokens statt Tailwind: kleine Oberfläche, keine zusätzliche Styling-Abhängigkeit. Originalfigur als lokales PNG; Systemschriften ohne externe Requests. Die schlichte Wortmarke ist kein Ersatz für ein später geliefertes Logo.

lib/stories.ts: redaktionelle Geschichten. lib/alignment.ts: normalisierte Tokens und dynamisches Levenshtein-Alignment mit Rückverfolgung. lib/transcription.ts: austauschbare asynchrone Transkriptionsschnittstelle mit AbortSignal; deterministischer lokaler Demo-Adapter. Komponenten verwalten Zustände bereit → Demo läuft → Auswertung → Ergebnis, Abbrechen und Wiederholung. Keine Audioaufnahme im MVP.

## 1 — Funktionales MVP
- [x] Startseite in Grün, Mint, Creme, Gelb; responsiv, Originalmaskottchen.
- [x] Bibliothek mit mindestens sechs Geschichten, Suche, Schwierigkeitsfilter und Leerzustand.
- [x] Individuelle Leserouten, Textgröße, Fortschritt, transparente Demo, manuelle Transkripte, Wiederholung.
- [x] Alignment unterscheidet korrekt, ausgelassen, abweichend, zusätzlich; deutsche Normalisierung.
- [x] Ermutigendes Ergebnis mit Sternen und nachvollziehbarer Wortauswertung.
- [x] Unit-Tests, Typecheck, Lint, Produktionsbuild; Browserprüfung falls verfügbar.
- [x] README und ehrliche Dokumentation aller Grenzen.

## 2 — Echte Spracherkennung (nicht Teil des MVP)
MediaRecorder-Adapter mit expliziter Mikrofonaktion, begrenzter Dauer/Größe, Stream-Cleanup und verständlichen Fehlern. Serverseitiger Whisper-Adapter hinter derselben Schnittstelle; keine API-Schlüssel im Client. Freigabe des Dienstes und Datenschutzkonzept vor Integration. Audio nur temporär verarbeiten; Löschung bei Abbruch/Abschluss. Qualität anhand freigegebener Testdaten prüfen; Erkennung bleibt unsicher.

## 3 — Lernplattform
Elternfreigabe, Authentifizierung und Supabase mit Row Level Security, Löschkonzept und minimaler Datenerfassung; Fortschritt und individuelle Lernziele. Keine Ranglisten oder Leistungsdruck.
