# Designversionen sicher vergleichen und wiederherstellen

**Aktueller Freigabestand (2026-10-22):** Der Nutzer hat das Repository bewusst öffentlich gestellt und öffentliche Pushes auf `main` ausdrücklich freigegeben. Die unten beschriebenen privaten Sicherungen dokumentieren frühere Versionen. `main` vereint jetzt Design v8 mit der ursprünglichen GitHub-Historie einschließlich `fee.png`; bestehende Tags bleiben unverändert.

## Lokale Historie
- `main` / `design-v1`: unveränderte ursprüngliche Anwendung, gesichert **vor** dem Redesign. Zusätzliche `.gitignore`-Regeln und archivierte Original-Screenshots gehören zu diesem Sicherungscommit.
- `feature/magisches-redesign`: neue Geschichtenwelt, Abenteuerkarte und Reisealbum.
- `design-v2`: abgeschlossene und geprüfte zweite Designversion.
- `feature/eigene-bildwelt` / `design-v3`: eigene Illustrationen und 20 Lesezeichen-SVG-Icons; `design-v3-art-preview` bewahrt den Zwischenstand vor dem Icon-Set.
- `feature/spielbare-lichtung` / `design-v4`: neue spielbare Startseite im Stil der Original-LeseFee, mit lesbaren Flächen und geprüften Maskottchenebenen.
- `feature/vorlesen-und-bildschirm` / `design-v5`: Bildschirmfüllende Lichtung und lokale deutsche Vorlesehilfe mit Wortmarkierung.
- `design-v6`: direktes Vorlesen ohne Leiste/Textrahmen, Anna bevorzugt; Implementierung auf `feature/direktes-vorlesen`, anschließend main.
- `feature/abenteuer-szene` / `design-v7`: Geschichtenportal, direkt wählbare Abenteuer, schwebende LeseFee mit naher Sprechblase; keine Funkenmission.
- `feature/leselobby` / `design-v8`: allgemeine Leselobby ohne Bindung an einzelne Geschichten, mit festem Lese-Einstieg und Bereichsnavigation.
- Tags sind feste Vergleichspunkte und werden nicht verschoben. Weitere abgeschlossene Designs erhalten neue Tags.

Der Ausgangsordner hatte kein Git-Repository. Sämtliche vorhandenen Quell-, Konfigurations-, Dokumentations- und Original-Assetdateien wurden zusammen gesichert. Build-Ausgaben und installierte Abhängigkeiten werden aus dem Lockfile reproduziert; lokale Caches und Betriebssystemdateien bleiben ausgeschlossen.

```sh
git log --oneline --decorate --all
git diff --stat design-v1 design-v2
git status --short
```

## Version 1 parallel ansehen (ohne aktuellen Stand anzufassen)
Aus dem Projektordner ausführen. `.versions/` ist ignoriert; zusätzliche Arbeitsverzeichnisse bleiben im Projekt.

```sh
git worktree add --detach .versions/design-v1 design-v1
cd .versions/design-v1
npm ci --cache ../../.cache/npm
npm run build
npm start -- --port 3001
```

Für Version 8 `.versions/design-v8`, `design-v8` und Port `3008` verwenden.

Für Version 7 `.versions/design-v7`, `design-v7` und Port `3007` verwenden.

Für Version 5 `.versions/design-v5`, `design-v5` und Port `3005` verwenden.

Für Version 4 `.versions/design-v4`, `design-v4` und Port `3004` verwenden.

Für Version 3 `.versions/design-v3`, `design-v3` und Port `3003` verwenden.

Version 1: http://127.0.0.1:3001. Die aktuelle Entwicklung kann gleichzeitig auf Port 3000 laufen. Für Version 2 denselben Ablauf mit `.versions/design-v2`, `design-v2` und Port `3002` verwenden. Existiert ein Arbeitsverzeichnis bereits, direkt hineingehen; keine Dateien überschreiben.

Zum Weiterentwickeln einer älteren Version einen neuen Branch im Arbeitsverzeichnis anlegen, beispielsweise `git switch -c experiment/ausgehend-von-v1`. Vor jedem Branchwechsel lokale Änderungen mit `git status` prüfen und sinnvoll committen. Kein `reset --hard`, kein `clean`, kein erzwungener Push nötig.

## Screenshots
Unter `docs/design-versions/design-v1/` liegt die ursprüngliche Startseite (Desktop/Mobil) und Leseauswertung. Unter `design-v2/` liegen Startseite, Karte, Album und Leseauswertung. Dateinamen nennen Ansicht und Viewport. Die Version-2-Screenshots stammen aus den automatisierten Chromium-Tests gegen den Produktionsbuild. Das Album-Beispiel zeigt das freigeschaltete Lichtfunken-Abzeichen.

## Private GitHub-Sicherung
- Geprüftes Ziel: https://github.com/epYax/lesehelferlein — privat.
- `origin` nutzt eine HTTPS-URL **ohne Zugangsdaten**. Die bereits vorhandene Git-Credential-Anmeldung funktioniert; kein Chat-Token wurde gespeichert oder verwendet.
- Der bestehende entfernte `main` enthält `fee.png` und bleibt erhalten. Seine Historie wurde nur gelesen (`fetch`), nicht ersetzt oder zusammengeführt.
- Die ausdrückliche Push-Freigabe wurde erteilt; `feature/magisches-redesign`, `design-v1` und `design-v2` sind bereits gesichert.
- Version 3 verwendet ausschließlich `feature/eigene-bildwelt`, `design-v3-art-preview` und `design-v3`. Kein Force-Push und kein Remote-main-Update.

Reproduzierbarer Push dieser Version:

```sh
git push --atomic origin feature/eigene-bildwelt refs/tags/design-v3-art-preview refs/tags/design-v3
git ls-remote --heads --tags origin
```

Vor künftigen Pushes Repository-Sichtbarkeit prüfen und Remote-Referenzen anschließend mit lokalen Commit-/Tag-IDs vergleichen. Bei kollidierenden Tags abbrechen, niemals erzwingen. Ein Git-Push ist kein Web-Deployment.

## Geheimnisse und reproduzierbare Builds
`.env*`, private Schlüssel, Logs, Caches, Build-Verzeichnisse, `node_modules/`, Browser-Downloads und temporäre Prüfergebnisse sind ignoriert. Es wurden keine Secrets eingecheckt. Die finale getrackte Dateiliste wird zusätzlich auf typische Token-/Schlüsselmuster geprüft; das ist kein vollständiger Secret-Audit. Dependencies sind im `package-lock.json` festgehalten.

Version 4 wird mit `git push --atomic origin feature/spielbare-lichtung refs/tags/design-v4` im bereits freigegebenen privaten Repository gesichert. Bestehende Tags und Remote-main werden nicht geändert.

Version 5: `git push --atomic origin feature/vorlesen-und-bildschirm refs/tags/design-v5`. Bereits erteilte Push-Freigabe; private Sichtbarkeit vor Übertragung erneut prüfen und Remote-Referenzen anschließend verifizieren.

Version 6 parallel ansehen: `git worktree add --detach .versions/design-v6 design-v6`; dort wie oben installieren/builden und auf Port 3006 starten.
