# Design v2 — Der Geschichtenwald

## Konzept
Kein Marketing-Funnel: Die Startseite ist eine spielbare Waldlichtung. Eine handgezeichnet wirkende SVG-Landschaft mit Buchhaus, Hügeln und Pflanzen bildet die Bühne. Die Original-Lesefee begrüßt Kinder mit wechselnden Hilfen. Drei sammelbare Lichtfunken laden zum Entdecken ein. Wege führen zu Geschichten, einer Überraschung und dem eigenen Reisealbum.

Die Bibliothek wird zur Abenteuerkarte mit sechs frei zugänglichen Orten. Eine alternative Bücheransicht und bekannte Such-/Schwierigkeitsfilter bleiben verfügbar. Nichts ist hinter einer Belohnung gesperrt. Alle Orte können mit Tastatur erreicht werden. Die Leseansicht bleibt ruhig.

## Sinnvolle Belohnungen
- Drei einmalig sammelbare Lichtfunken auf der Lichtung → Entdeckerabzeichen.
- Eine abgeschlossene Demo pro Geschichte → ein Reisestempel (keine Lesefähigkeitsbewertung).
- Reisealbum mit allen sechs Orten, Wiederbesuch und explizitem lokalem Zurücksetzen.
- Lokaler Browser-Speicher nur für bekannte Geschichten-IDs und Funken-IDs, keine Namen, Audio, Zeitstempel, Transkripte oder Ranglisten.
- Alle Erfolge als Demo/Entdeckung erläutert. Gesperrter Browser-Speicher blockiert den Lesefluss nicht.

## Visuelle Sprache
Tiefes Waldgrün, helles Pergament, sonniges Gelb, Beerenlila, orangefarbene Details. Organische Formen, gepunktete Wege, unregelmäßige Papierkanten, kräftige Schilder und große direkt bedienbare Elemente. Systemschriften, SVG/CSS statt externer Assets. Vorhandene Figur unverändert. Animationen respektieren Reduced Motion.

## Versionierung und Prüfung
Ausgangszustand vor allen Designänderungen als design-v1 gesichert. Branch feature/magisches-redesign. Konzept/Funktionalität und final geprüftes Design in nachvollziehbaren Commits. Screenshots je Version unter docs/design-versions/. Abschluss-Tag design-v2 erst nach Tests.

Keine Veröffentlichung. GitHub-Ziel muss vor dem ersten Push als privat verifiziert und explizit freigegeben werden. Keine Tokens in Dateien oder Remote-URLs.
