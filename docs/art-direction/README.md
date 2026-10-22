# LeseHelferlein — eigene Bildwelt (Design v3)

## Bildsprache
Eine zusammengehörige Bilderbuchwelt in Gouache-/Buntstiftoptik: warmes Creme, Wald-/Salbeigrün, Honiggold und kleine Beerenlila-Akzente. Wiederkehrende Motive sind die Buchseiten-Bibliothek, das Blatt-Lesezeichen und ein goldener Feenstern. Keine Stockgrafiken oder übernommene Icon-Bibliothek.

Die Bilder wurden mit dem eingebauten **image_gen** eigens für dieses Projekt generiert; sie sind keine von einem menschlichen Illustrator handgemalten Auftragsarbeiten. Die konkrete Promptserie ist vollständig in [prompts-v3.json](prompts-v3.json) dokumentiert. Es wurden keine zusätzlichen direkten API-Aufrufe oder CLI-Bildgenerierungen verwendet. Die ursprüngliche LeseFee bleibt unverändert; der Fuchs ist eine Figur der bestehenden Geschichte, kein zusätzliches Markenmaskottchen.

## Finale Assets
Alle elf Assets liegen als WebP in `public/art/lesehelferlein-v3/`:

| Datei | Einsatz |
| --- | --- |
| `forest-clearing.webp` | Gemalte Waldlichtung mit Bibliothek aus Buchseiten |
| `fox.webp` | Mondlichtwiese: Fuchsbau, Mond und Glühwürmchen |
| `garden.webp` | Wundergarten: Sonnenblume, Keimlinge, Sternengießkanne |
| `cloud.webp` | Wolkenhafen: segelndes Geschichtenbuch mit Blattsegel |
| `forest.webp` | Flüsterwald: alte Eiche, Briefkasten und Sternenbrief |
| `stars.webp` | Sternenwarte: Observatorium auf einem Bücherstapel |
| `dragon.webp` | Drachenhügel: Mutpfad und handwerklich gebauter Drachen-Drachen |
| `icon-map.webp` | Abenteuerkarte aus gerolltem Papier |
| `icon-album.webp` | Grünes Stoff-Reisealbum mit Stern und Blattverschluss |
| `icon-compass.webp` | Messingkompass mit Blattzeiger und lila Band |
| `icon-spark.webp` | Individueller goldener Sammelstern mit Salbeiblatt |

Sechs Schauplätze und vier Symbolbilder haben echte Alphatransparenz. WebP-Export bewahrt Alpha; keine nachträgliche automatische Freistellung, kein Zuschneiden. Next Image liefert bedarfsgerechte Größen aus. Die Waldkulisse erhält auf schmalen hohen Bildschirmen eine bewusst größere Quelldarstellung, damit der Ausschnitt scharf bleibt.

`components/brand-art.tsx` ist die zentrale Asset-Anbindung. Karte, Cover und Album verwenden dieselben Geschichtenbilder. `components/reading-icons.tsx` enthält das eigene Set **Lesezeichen** mit 20 direkt als Vektorpfade gestalteten SVG-Icons. Auch Karte, Album, Kompass und Sammelstern verwenden jetzt diese klare, gemeinsam gestaltete Familie. Die vier generierten Symbolbilder bleiben als alternative größere Illustrationen archiviert; weitere Rasterbilder wurden für das Icon-Set nicht erzeugt. `lucide-react` wurde aus Quellcode und Abhängigkeiten entfernt.

## UX
Der vorhandene Ablauf bleibt erhalten. Grafiken in beschrifteten Bedienelementen sind dekorativ und werden für Screenreader ausgeblendet, damit Namen nicht doppelt vorgelesen werden. Sammelsterne bewegen nur ihr Bild, nicht die Klickfläche. Reduced Motion wird respektiert. Die Leseansicht enthält keine bewegte Hintergrundillustration.

## Versionierung
Vorgänger `design-v1` und `design-v2` bleiben unverändert. Neue Arbeit: `feature/eigene-bildwelt`; abgeschlossene Version: `design-v3`. Vergleichsbilder unter `docs/design-versions/design-v3/`.

## Lesezeichen-Icons weiterentwickeln
Quelle: `components/reading-icons.tsx`; gemeinsames 32-Pixel-Raster, gerundete Linien, Blatt-/Buch-/Sternmotive. Icons ergänzen Textbeschriftungen. Wiedergabe, Stopp und Pfeile behalten ihre vertraute Bedienbedeutung.

Nach Änderungen `npm run icons:export` ausführen. Export nach `public/icons/lesezeichen/`, inklusive eigenständig öffnungsfähiger HTML-Galerie mit 18-, 28- und 64-Pixel-Ansichten. Diese Galerie ist auch unter `/icons/lesezeichen/index.html` erreichbar.
