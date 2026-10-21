# Designversionen sicher vergleichen und wiederherstellen

## Lokale Historie
- `main` / `design-v1`: unveränderte ursprüngliche Anwendung, gesichert **vor** dem Redesign. Zusätzliche `.gitignore`-Regeln und archivierte Original-Screenshots gehören zu diesem Sicherungscommit.
- `feature/magisches-redesign`: neue Geschichtenwelt, Abenteuerkarte und Reisealbum.
- `design-v2`: abgeschlossene und geprüfte zweite Designversion.
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

Version 1: http://127.0.0.1:3001. Die aktuelle Entwicklung kann gleichzeitig auf Port 3000 laufen. Für Version 2 denselben Ablauf mit `.versions/design-v2`, `design-v2` und Port `3002` verwenden. Existiert ein Arbeitsverzeichnis bereits, direkt hineingehen; keine Dateien überschreiben.

Zum Weiterentwickeln einer älteren Version einen neuen Branch im Arbeitsverzeichnis anlegen, beispielsweise `git switch -c experiment/ausgehend-von-v1`. Vor jedem Branchwechsel lokale Änderungen mit `git status` prüfen und sinnvoll committen. Kein `reset --hard`, kein `clean`, kein erzwungener Push nötig.

## Screenshots
Unter `docs/design-versions/design-v1/` liegt die ursprüngliche Startseite (Desktop/Mobil) und Leseauswertung. Unter `design-v2/` liegen Startseite, Karte, Album und Leseauswertung. Dateinamen nennen Ansicht und Viewport. Die Version-2-Screenshots stammen aus den automatisierten Chromium-Tests gegen den Produktionsbuild. Das Album-Beispiel zeigt das freigeschaltete Lichtfunken-Abzeichen.

## Private GitHub-Sicherung
- Geprüftes Ziel: https://github.com/epYax/lesehelferlein — privat.
- `origin` nutzt eine HTTPS-URL **ohne Zugangsdaten**. Die bereits vorhandene Git-Credential-Anmeldung funktioniert; kein Chat-Token wurde gespeichert oder verwendet.
- Der bestehende entfernte `main` enthält `fee.png` und bleibt erhalten. Seine Historie wurde nur gelesen (`fetch`), nicht ersetzt oder zusammengeführt.
- Nach ausdrücklicher Freigabe werden ausschließlich der Redesign-Branch und beide Tags übertragen. Damit ist auch der vollständige Ausgangsstand über `design-v1` gesichert.

Vorgesehener erster Push, **nur nach Zustimmung**:

```sh
git push --atomic origin feature/magisches-redesign refs/tags/design-v1 refs/tags/design-v2
```

Danach die Remote-Referenzen mit `git ls-remote --heads --tags origin` gegen lokale Commit-/Tag-IDs prüfen. Bei kollidierenden vorhandenen Branches oder Tags abbrechen und vergleichen, niemals erzwingen. Repository-Sichtbarkeit unmittelbar vor dem Push erneut prüfen. Ein Git-Push ist kein Web-Deployment.

GitHub-Sicherung ist erst abgeschlossen, wenn dieser Push freigegeben, durchgeführt und verifiziert wurde. Bis dahin existieren die neuen Versionen lokal.

## Geheimnisse und reproduzierbare Builds
`.env*`, private Schlüssel, Logs, Caches, Build-Verzeichnisse, `node_modules/`, Browser-Downloads und temporäre Prüfergebnisse sind ignoriert. Es wurden keine Secrets eingecheckt. Die finale getrackte Dateiliste wird zusätzlich auf typische Token-/Schlüsselmuster geprüft; das ist kein vollständiger Secret-Audit. Dependencies sind im `package-lock.json` festgehalten.
