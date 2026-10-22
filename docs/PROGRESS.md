# Entwicklungsfortschritt

## 2026-10-22 — Design v7: Das Geschichtenportal

- Startseite vollständig als zusammenhängende Spielszene aufgebaut: großes illustriertes Geschichtenportal, sechs Bildziele mit ausgewähltem Zustand, direkter Einstieg ins Lesen und Überraschungskompass (wählt immer eine andere Geschichte).
- Original-LeseFee unverändert, mit sanftem Schweben, warmem Lichtschein und dekorativen Glühwürmchen. Sprechblase unmittelbar darüber bzw. mobil neben ihr. Reduced Motion deaktiviert sämtliche Animationen.
- Funkenmission, Sammelknöpfe und Abzeichenoberfläche entfernt. Bestehende gültige lokale Daten bleiben unangetastet; Demo-Reisestempel und explizites Zurücksetzen funktionieren weiterhin. Keine neue Speicherung und keine Leistungsbewertung.
- Vorlesen bleibt ohne Popup/Rahmen mit Anna-Priorität. Bildknöpfe lassen sich ebenfalls erst vorlesen und dann aktivieren; doppelt eingefügte Leerzeichen zwischen formatierten Textteilen korrigiert.
- Verifiziert: 16 Logiktests, Typecheck, ESLint, Produktionsbuild; 65 Browserprüfungen bestanden (3 redundante Viewport-Matrix-Läufe bewusst übersprungen). Nach letztem Mobil-Feinschliff Layout und Kernabläufe erneut geprüft. Chromium-Produktion auf Port 3100; Nutzervorschau auf 3000 unberührt. Bildschirmgrößen 320×568, 320×740, 390×844, 768×1024, 820×1180, 844×390, 1366×768 und 1440×1000 geprüft.
- Grenze: Für extrem kurze schmale Fenster gibt es weiterhin Scrollen; tatsächliche Anna-Verfügbarkeit und Wortereignisse hängen vom Browser/Gerät ab. Sprachereignisse im Browsertest sind simuliert. Animationen in Vergleichsbildern angehalten.
- Ausgangsstand `design-v6` samt Vergleichsbildern erhalten. Entwicklungsbranch `feature/abenteuer-szene`, Abschluss `design-v7`; Screenshots unter `docs/design-versions/design-v7/`.

## 2026-10-22 — Design v6: Direktes Vorlesen ohne Zusatzoberfläche

- Vorleseleiste und zugehörige Stimmeneinstellungen entfernt. Keine zusätzliche Umrahmung oder Abschnittsmarkierung am angeklickten Text; die gelbe Markierung folgt ausschließlich echten Wortereignissen im Originaltext.
- Anna erhält Vorrang vor anderen weiblichen/default deutschen Gerätestimmen. Fehlt Anna, bleibt eine andere lokale deutsche Stimme als Fallback; keine Cloud-Ausgabe. Tempo fest auf ruhige 0,9 gesetzt.
- Erster Klick auf Link/Knopf liest vor, ein weiterer Klick auf dasselbe unveränderte Element führt die native Aktion aus; gilt auch für SVG-Icons und Tastaturaktivierung. Normalen Text erneut anklicken wiederholt die Ausgabe. Escape, Ausschalten, Routenwechsel und Tab-Verbergen stoppen.
- Die Startansicht benötigt keine Platzreserve für eine Vorleseleiste. Elterninformationen und Dokumentation aktualisiert.
- Verifiziert: 16 Logiktests, 60 Browserprüfungen, Produktionsbuild, Typecheck und ESLint erfolgreich. Browser-Sprachereignisse sind Testsimulationen; keine neue akustische Qualitätsbehauptung. Screenshots unter `docs/design-versions/design-v6/`.
- Ausgangsstand v5 und dessen Screenshots bleiben erhalten. Entwicklung auf `feature/direktes-vorlesen`; Abschluss-Tag `design-v6`. Öffentliche main-Pushes sind ausdrücklich freigegeben.

## 2026-10-22 — Öffentlicher main-Push freigegeben

- Nutzer bestätigt die bewusst öffentliche Repository-Sichtbarkeit und gibt den öffentlichen Push auf main ausdrücklich frei. Diese Freigabe ersetzt die frühere Privat-Vorgabe; AGENTS.md aktualisiert.
- Vorbereiteten und geprüften main erneut gegen origin geprüft: bestehender Remote-main ist Vorfahr des lokalen Stands. Normaler Fast-forward-Push, keine Historie oder Design-Tags überschrieben.
- App unverändert gegenüber der bereits geprüften Integration; anschließend ausschließlich Dokumentation und Freigaberegel aktualisiert.

## 2026-10-22 — main-Integration vorbereitet

- Auf ausdrücklichen Nutzerwunsch lokalen `main` auf Design v5 gebracht und die getrennte bestehende GitHub-main-Historie per normalem Merge eingebunden. Mergecommit: `2709035`. Die ursprüngliche `fee.png` bleibt unverändert erhalten; beide bisherigen Historien sind Vorfahren des neuen main.
- App-Quellstand entspricht Design v5. 15 Logiktests, Produktionsbuild, Typecheck, ESLint und Diff-Prüfung erfolgreich; keine erneute Browserprüfung, da der Merge ausschließlich `fee.png` ergänzt.
- GitHub meldet `epYax/lesehelferlein` jetzt als öffentlich (`private: false`). Wegen der bisherigen Vorgabe „GitHub ausschließlich privat“ kein Push ausgeführt und keine Sichtbarkeit geändert. Klärung erforderlich: privat stellen oder öffentliche Veröffentlichung ausdrücklich freigeben.
- Alle Design-Tags unverändert; Arbeitsstand lokal committed. Kein Force-Push und kein Verlust der bestehenden Remote-Historie.

## 2026-10-22 — Design v5: Bildschirmfüllende Lichtung und Vorlesehilfe

### Umsetzung
- Vor Änderungen war `design-v4` vollständig committed, getaggt und privat gesichert, inklusive Screenshots. Neuer Branch: `feature/vorlesen-und-bildschirm`.
- Startbildschirm füllt den verfügbaren Viewport unter dem gemessenen Header. Dynamische Bildschirmhöhe und Vorleseleiste werden berücksichtigt; kompakte Anordnung für Hoch-/Querformat statt pauschaler Verkleinerung aller Texte. Hauptaktionen bleiben im Blick. Die LeseFee liegt weiterhin vor der Szene, Text und Figur belegen getrennte Bereiche.
- Neue globale Vorlesehilfe mit eigenem Lautsprecher-Icon und Ein-/Aus-Schalter im Header. Opt-in, Hinweis beim Aktivieren, sichtbare Texte anklicken, Links/Knöpfe erst mit separater Aktion öffnen/ausführen. Icon- und Textklicks behandeln denselben Knopf gleich.
- Browser-Sprachausgabe mit ausschließlich als lokal gemeldeten deutschen Stimmen, weibliche Stimmennamen bevorzugt; frei wählbare Stimme, Hörprobe und drei Tempi. Kein Cloud-Fallback, kein Mikrofon, kein TTS-Endpunkt und keine zusätzliche Persistenz.
- Wortmarkierung über echte Wortgrenzen-Ereignisse in der Mitleseleiste und, mit CSS Highlight API, direkt im Ursprungstext. Kein geschätzter Worttimer. Abbruch, Wiederholung, Escape, Tab-Verbergen und Routenwechsel räumen laufende Sprachausgabe/Markierungen auf. Veraltete Ereignisse werden ignoriert.
- Deutsche TTS-Alternativen mit Primärquellen recherchiert; Browser-API umgesetzt, Piper als möglicher späterer einheitlicher Stimmenanbieter dokumentiert. Elterninformationen und README aktualisiert. 21 eigene SVG-Icons inklusive Lautsprecher exportiert.

### Verifiziert
- 15 Logiktests, Typecheck, ESLint und Produktionsbuild erfolgreich.
- 60 Browserprüfungen erfolgreich auf vier Größen (320/390/820/1440 px), Produktionsserver Port 3100. 16 davon prüfen den Sprachadapter mit bewusst simulierten Browser-Sprachereignissen: kein akustischer Qualitätstest, keine echte Aufnahme.
- Tests prüfen unter anderem Opt-in, lokale Stimme statt Cloud, Stimmenwechsel, Tempo, Text-/Iconklick, separate Aktion, Wiederholung, Stoppen, fehlende und verspätet verfügbare Stimmen, fehlende Browser-Unterstützung, Synthesefehler, echte Wortpositionen und veraltete Callbacks.
- Zusätzlich 320×568, 844×390, 1366×768 und 768×1024 geprüft: Dokument und Spieloberfläche ohne Höhenüberlauf, Hauptaktionen innerhalb des Bildschirms. Screenshots von Startbildschirm und aktivierter Mitleseleiste archiviert. Desktop, kleines Smartphone und Querformat visuell geprüft.
- Nutzervorschau auf Port 3000 nicht beendet. Originalmaskottchen unverändert. Kein Deployment oder produktiver Sprachdienst aktiviert.

### Grenzen und Dokumentation
- Stimme, tatsächliche Klangqualität und Wortereignisse hängen von Browser/Betriebssystem ab. Weibliche Stimmennamen sind eine Präferenz, keine Garantie. Native Audioausgabe auf realen Endgeräten und subjektive Kinderfreundlichkeit der Stimmen sind nicht akustisch validiert.
- Bei fehlenden Wortereignissen wird der ganze Abschnitt markiert. Ohne lokale deutsche Stimme bleibt die gewöhnliche Navigation erhalten und ein Installationshinweis erscheint.
- Bei extrem kurzen Fenstern, großen Bedienhilfeschriften oder geöffneten Einstellungen hat Erreichbarkeit Vorrang: Scrollen bleibt möglich, statt Text abzuschneiden.
- Recherche und UI-Entscheidung: `docs/research/DEUTSCHE_VORLESEFUNKTION.md`. Screenshots: `docs/design-versions/design-v5/`.
- Abschluss-Tag: `design-v5`; private Sicherung im bereits freigegebenen Repository, ohne bestehende Tags oder Remote-main zu überschreiben.

## 2026-10-22 — Design v4: spielbare Startseite im Stil der LeseFee

- Vor Änderungen stand der vollständige, geprüfte und privat gesicherte Stand als `design-v3` inklusive Vergleichsbildern fest. Neuer Branch: `feature/spielbare-lichtung`.
- Eine neue Waldkulisse im einfachen, runden und fein gekörnten Illustrationsstil der Original-LeseFee erzeugt und eingebunden. Herkunft, finaler Assetpfad und vollständiger Prompt unter `docs/art-direction/v4/`.
- Startseite als zusammenhängender Spielbildschirm aufgebaut: großes Startfeld, drei sammelbare Funken, Nebenmission mit Abschlusszustand, Überraschungsgeschichte und Reisealbum als Spielmenü.
- Deckende helle Textflächen, größere Texte und Bedienelemente; Demo-Hinweis direkt am Abenteuerstart. Originalfigur unverändert auf eigener vorderster Szenenebene, Sprechblase getrennt oberhalb des Figurenbilds. Transparente Bildflächen fangen keine Klicks ab.
- Bestehenden mobilen Versatz der Fee korrigiert. Lange Tipps und Sammelbuttons zusätzlich auf vier Bildschirmgrößen geprüft. Reduced Motion weiterhin berücksichtigt.
- Prüfung: 13 Logiktests, 40 Browserprüfungen, Typecheck, ESLint und Produktionsbuild erfolgreich. Browserprüfungen auf Port 3100; Nutzervorschau auf 3000 nicht beendet. Kein vollständiger Accessibility-Audit oder Test auf echten Geräten.
- Abschlussversion: `design-v4`; Vergleichsbilder in `docs/design-versions/design-v4/`. Keine produktiven Dienste oder Deployments. Private GitHub-Sicherung im bereits freigegebenen Rahmen; vorhandener Remote-main und alte Tags bleiben unverändert.

## 2026-10-22 — Design v3: eigene Bildwelt und Lesezeichen-Icons

### Umsetzung
- Eigene Bilderbuch-Waldlichtung und sechs zusammengehörige Abenteuerillustrationen integriert. Insgesamt elf zuvor erzeugte WebP-Assets; Promptserie und Herkunft unter `docs/art-direction/`.
- Auf Nutzerwunsch anschließend keine weiteren Rasterbilder erzeugt: 20 eigene SVG-Icons mit Buchseiten, Blättern und Feensternen direkt als Vektorpfade gestaltet. Karte, Album, Kompass, Sammelstern und Lesebedienung verwenden dieselbe Familie.
- Externe Icon-Bibliothek entfernt. Alle Icons einzeln exportierbar, reproduzierbar mit `npm run icons:export`; Größengalerie unter `/icons/lesezeichen/index.html`.
- Originalmaskottchen unverändert. Die bestehenden Demo-, Filter-, Speicher- und Leseabläufe bleiben erhalten. Sammelanimation bewegt nur das Symbol, nicht die Klickfläche.

### Verifiziert
- 13 Logiktests und 36 Browserprüfungen erfolgreich. Chromium auf 320, 390, 820 und 1440 px gegen Produktionsserver auf Port 3100.
- Typecheck, ESLint und Produktionsbuild erfolgreich. Screenshots von Lichtung, Karte, Album und Auswertung sowie Icon-Galerie archiviert; Lichtung Desktop/Mobil, Karte, mobile Auswertung und Icon-Größen visuell geprüft.
- Keine echten Kinderaufnahmen, Audioübertragung, produktiven Dienste oder Deployments. Port 3000 nicht beendet. Kein vollständiger Accessibility-Audit oder Test auf echten Geräten.
- Screenshots: `docs/design-versions/design-v3/`. Vorheriger Illustrationsstand bleibt als `design-v3-art-preview` erhalten.

### Versionen und Sicherung
- Branch: `feature/eigene-bildwelt`. Abschluss-Tag: `design-v3`. Bestehende Tags unverändert.
- Die zuvor freigegebenen Versionen v1/v2 wurden bereits nach GitHub übertragen. Nutzerfreigabe zum Push liegt vor; Ziel `epYax/lesehelferlein` erneut als privat geprüft. Version 3 wird mit eigenem Branch und eigenen Tags gesichert, ohne Remote-main zu ändern.
- Wiederherstellung in `docs/VERSION_CONTROL.md` dokumentiert.

### Grenzen
Die Anwendung bleibt eine ausdrücklich gekennzeichnete Lese-Demo. Reisestempel stehen für Demo-Teilnahme und Entdeckung, nicht für gemessene Leseleistung. Größere Illustrationen sind KI-generiert; SVG-Icons sind direkt im Projekt gestaltete Vektoren.

## 2026-10-21 — Design v2: Geschichtenwald

### Umsetzung
- Vor Designänderungen Git initialisiert, kompletten vorhandenen Stand inklusive Screenshots committed und mit `design-v1` markiert. Redesign auf `feature/magisches-redesign`.
- Marketing-Startseite durch eine eigene interaktive SVG-Waldlichtung ersetzt: Buchhaus, Wege, Pflanzen, Lichtfunken und unveränderte Original-LeseFee.
- Lesefee mit vier wechselnden Tipps, drei einmalig sammelbare Funken, Entdeckerabzeichen und Überraschungsauswahl mit echtem Geschichtenlink.
- Sechs Abenteuerorte auf einer zusammenhängenden Karte; Bücheransicht, Suche und Schwierigkeitsfilter weiterhin nutzbar.
- Reisealbum als aufgeschlagenes Buch mit sechs Stempelplätzen. Ein Stempel je abgeschlossenem Demo-Abenteuer, Wiederholung ohne Duplikate; manuelle Textauswertung vergibt keine Reisestempel.
- Lokaler Speicher mit Whitelist-Validierung, Deduplizierung, browserübergreifender Tab-Aktualisierung über Storage-Events und Speicherfehler-Fallback für den laufenden Besuch. Keine Namen, Audios, Transkripte, Zeitstempel oder Leistungsdaten gespeichert. Album-Zurücksetzen erfordert explizite Bestätigung.
- Ruhige Leseansicht und bestehendes Alignment erhalten. Elterninformationen und README an den lokalen Albumspeicher angepasst.
- Unterschiedliche Layouts für Desktop, Tablet und kleine Smartphones; Reduced Motion, Tastaturbedienung und Statusmeldungen. Lesbarkeit über Landschaft mit heller Lichtung verbessert.

### Verifiziert
- 13 Logiktests erfolgreich (10 bestehende + 3 Tests für sichere und idempotente Belohnungen).
- 32 Browserprüfungen erfolgreich gegen separaten **Produktionsserver auf Port 3100**, vier Größen: 320, 390, 820, 1440 px.
- Tests umfassen ursprünglichen Demo-Fluss, Filter, Suche, Ansichtwechsel, Schriftgröße, Abbruch, Wiederholung, 404, Tipps, Sammeln, Persistenz, Bestätigung beim Zurücksetzen, Stempel-Deduplizierung, manuelle Auswertung ohne Stempel, Überraschung, Reduced Motion und blockierten Browser-Speicher.
- Typecheck, ESLint, Produktionsbuild und `git diff --check` erfolgreich.
- Produktions-Abhängigkeiten: `npm audit --omit=dev` meldet 0 bekannte Schwachstellen. Bereits dokumentierte Entwicklungsabhängigkeitsmeldungen bleiben offen.
- Screenshots visuell geprüft; dauerhafte Vergleichsbilder in `docs/design-versions/design-v2/`. Browserprüfung in Chromium mit simulierten Größen; keine Behauptung einer Prüfung auf echten Geräten oder eines vollständigen Accessibility-Audits.
- Vorhandener Nutzer-Entwicklungsserver auf Port 3000 nicht beendet. Separater Testserver automatisch beendet.

### GitHub und Versionen
- Vorhandene Git-Credential-Anmeldung erfolgreich geprüft. Ziel `epYax/lesehelferlein` ist privat, origin ohne eingebettete Zugangsdaten eingerichtet.
- Remote-main enthält eine eigene Historie mit `fee.png`; diese bleibt unverändert. Nur lesendes Fetch ausgeführt.
- Der im Chat eingefügte Token wurde weder verwendet noch gespeichert.
- Lokale Abschlussversion: `design-v2`. Alle Quelländerungen und Vergleichsbilder committed.
- **Erster Push wartet auf Nutzerfreigabe.** Geplant: ausschließlich `feature/magisches-redesign`, `design-v1`, `design-v2`; kein Remote-main-Update, keine Repository-Erstellung, kein Deployment.
- Wiederherstellung/Parallelstart mit sicheren Worktrees: `docs/VERSION_CONTROL.md`.

### Weiterhin bewusst offen
Echte Spracherkennung, Konten und geräteübergreifender Lernfortschritt gehören weiterhin zur nächsten Produktphase. Das Reisealbum zeigt Entdeckungen und Demo-Teilnahme, keine Leseleistung. Separates Bildlogo nicht vorhanden; Branding nutzt Original-LeseFee und typografischen Namen.

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
