# Deutsche Vorlesehilfe: Recherche und UI-Entscheidung

**Aktualisierung für Design v6:** Auf Nutzerwunsch entfallen Vorleseleiste, Stimmeneinstellungen und Textrahmen. Anna wird bevorzugt (sonst andere lokale deutsche Stimme), Tempo 0,9. Text anklicken liest vor; derselbe Link/Knopf wird beim nächsten Klick aktiviert. Escape oder Ausschalten stoppt. Wortmarkierung erfolgt ausschließlich im Originaltext; ohne Wortereignisse gibt es keine Ersatzmarkierung. Die unten stehende UI-Entscheidung beschreibt den historischen Stand v5; technische Recherche bleibt relevant.

Stand: 22. Oktober 2026. Nur Primärquellen; keine kostenpflichtigen Dienste oder Cloud-TTS aktiviert.

| Lösung | Deutsch / Stimme | Aufwand und Grenzen | Entscheidung |
| --- | --- | --- | --- |
| Browser Web Speech API (`speechSynthesis`) | Verfügbare Stimmen stammen vom Gerät; Auswahl über `getVoices()`. | Kein eigener TTS-Server und keine API-Abrechnung. Stimme und Wortereignisse variieren je Browser/Betriebssystem. | Jetzt integriert; ausschließlich lokale deutsche Stimmen. |
| Piper (aktuelles OHF-Projekt) | Unterstützt Deutsch; unter anderem Modell Kerstin, basierend auf einer deutschen Sprecherin. | Eigene Laufzeit plus Modelldateien erforderlich. Engine GPL-3.0; Modellkarten separat prüfen. Einheitliche Stimme möglich, zusätzliche Integration und Wortzeitmarken nötig. | Kandidat für einen späteren einheitlichen Stimmenausbau; nicht installiert oder produktiv aktiviert. |

Quellen: [MDN getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), [Piper-Projekt](https://github.com/OHF-Voice/piper1-gpl), [Piper-Sprachen](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md).

## Stimme und Datenschutz

`localService` unterscheidet lokale und entfernte Sprachdienste. Die Implementierung lässt nur `localService === true` und deutsche Sprachkennungen zu und prüft die Auswahl vor jeder Ausgabe erneut. Kein automatischer Cloud-Fallback, keine Texte an einen eigenen TTS-Endpunkt, keine Aufnahme, keine zusätzliche Speicherung. Die Einstufung stammt vom Browser; die App auditiert nicht die interne Sprachimplementierung des Betriebssystems. [MDN localService](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService)

Bekannte weibliche Stimmennamen wie Anna, Petra oder Hedda werden bevorzugt, sofern lokal vorhanden. Das ist eine Namensheuristik: Die Browser-API liefert kein verlässliches Geschlechtsfeld. Auswahl, Hörprobe und Tempo bleiben deshalb zugänglich. Standardtempo 0,9, natürliche Tonhöhe 1. Eine angenehme Stimme ist eine subjektive Hörentscheidung; die automatisierten Tests bewerten keine Klangqualität.

Pipers Kerstin-Datensatz stammt laut Projekt von einer deutschen Sprecherin. Die Modellkarte nennt die Qualitätsstufe „low“, 16 kHz und CC0 für den Datensatz. Das ist keine Empfehlung als hochwertigste Stimme; vor einem Ausbau sind Hörvergleich und Prüfung der konkreten Modelldateien nötig. [Datensatz](https://github.com/rhasspy/dataset-voice-kerstin), [Modellkarte](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/kerstin/low/MODEL_CARD).

## Saubere Interaktion

1. Der beschriftete Lautsprecher-Schalter im Header aktiviert den Modus bewusst und spricht eine kurze Anleitung.
2. Ein Klick liest einen sichtbaren Text, einen Link oder einen Knopf vor. Die zugehörige Aktion wird dabei noch nicht ausgeführt. Auch ein Klick direkt auf das SVG im Knopf zählt.
3. In der Vorleseleiste erscheint bei Aktionen „Öffnen“ oder „Ausführen“. Dadurch gibt es keinen versteckten Doppelklick und kein Rennen zwischen Vorlesen und Navigation. Wenn keine Stimme verfügbar ist, bleiben Aktionen normal nutzbar.
4. Wiederholen, Stoppen und Ausschalten sind jederzeit erreichbar. Escape stoppt; ein Routenwechsel oder ein versteckter Tab beendet die Ausgabe. Eingabefelder und editierbare Texte werden bewusst nicht ausgelesen.
5. Stimme und Tempo liegen hinter einem separaten Einstellknopf; kein automatisches Vorlesen beim Überfahren mit der Maus.

## Mitlesen ohne erfundenen Fortschritt

Die Leiste zeigt den tatsächlich gesprochenen Text. Ein `boundary`-Ereignis mit Wortposition markiert genau dieses Wort; UTF-16-Offsets bleiben erhalten. Zusätzlich markiert die CSS Highlight API das Wort im Originaltext, sofern unterstützt. React-Textknoten werden nicht verändert. Die UI ist eine Mitlesehilfe, keine Karaoke-Punktewertung oder Messung der Lesefähigkeit.

Nicht alle Browser/Stimmen liefern Wortgrenzen. Dann zeigt die Oberfläche den ganzen laufenden Abschnitt, ohne Wörter über geschätzte Timer weiterzuschalten. [MDN boundary](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/boundary_event)

## Prüfgrenzen

Playwright prüft die Sprachintegration mit einem ausdrücklich simulierten Browser-Sprachadapter: Opt-in, Stimmfilter, Sprachereignisse, veraltete Callbacks, Abbruch, Aktionen und Fehlersituationen. Keine echte Kinderaufnahme und keine behauptete akustische Prüfung. Echte Stimmen auf Safari/iOS, Android und Windows müssen zusätzlich auf dem jeweiligen Gerät angehört werden. Ohne passende lokale deutsche Stimme zeigt die App einen Hinweis statt eine andere Sprache oder einen Cloud-Dienst zu verwenden.
