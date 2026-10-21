export type Story = {
  id: string;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  minutes: number;
  theme: string;
  scene: string;
  text: string;
};
export const levels = { 1: "Lesestart", 2: "Leseentdecker", 3: "Leseprofi" };
export const stories: Story[] = [
  {
    id: "kleiner-fuchs",
    title: "Der kleine Fuchs und der Mond",
    description:
      "Ein kleiner Fuchs macht sich auf die Suche nach einem ganz besonderen Freund.",
    level: 1,
    minutes: 2,
    theme: "Freundschaft",
    scene: "fox",
    text: "Der kleine Fuchs sitzt vor seinem Haus. Es ist Abend. Am Himmel steht der Mond. „Bist du allein?“, fragt der Fuchs. Der Mond sagt nichts. Da kommt eine kleine Eule. Sie setzt sich neben den Fuchs. Zusammen sehen sie in den Himmel. „Jetzt sind wir zu zweit“, sagt die Eule. Der Fuchs lächelt. Der Mond leuchtet hell.",
  },
  {
    id: "zaubersamen",
    title: "Ein Garten voller Wunder",
    description: "Was wohl aus dem winzigen Samen in Emmas Garten wächst?",
    level: 1,
    minutes: 2,
    theme: "Natur",
    scene: "garden",
    text: "Emma findet einen Samen. Er ist klein und rund. Sie legt ihn in die Erde. Jeden Tag gibt Emma ihm Wasser. Bald schaut ein grünes Blatt heraus. Emma freut sich. Nach einer Woche ist die Pflanze groß. Eine gelbe Blume öffnet sich. Eine Biene kommt zu Besuch. „Willkommen in meinem Garten“, sagt Emma. Die Biene summt leise.",
  },
  {
    id: "wolkenreise",
    title: "Auf Reisen mit der Wolke",
    description:
      "Komm mit auf eine luftige Reise über Wiesen, Wälder und das Meer.",
    level: 2,
    minutes: 3,
    theme: "Abenteuer",
    scene: "cloud",
    text: "Hoch über der Wiese schwebt eine kleine Wolke. Sie möchte wissen, wie die Welt hinter den Bergen aussieht. Der Wind nimmt sie mit auf eine Reise. Unter ihr werden die Häuser immer kleiner. Bald entdeckt sie einen Fluss, der wie ein silbernes Band durch den Wald fließt. Am Abend erreichen sie das Meer. Die Wolke staunt über das glitzernde Wasser. „Morgen reisen wir weiter“, flüstert der Wind. Doch heute möchte die kleine Wolke einfach nur den Sonnenuntergang ansehen.",
  },
  {
    id: "waldpost",
    title: "Die geheimnisvolle Waldpost",
    description: "Ein Brief ohne Namen bringt den ganzen Wald in Bewegung.",
    level: 2,
    minutes: 3,
    theme: "Freundschaft",
    scene: "forest",
    text: "Vor der Tür des Igels liegt ein kleiner Brief. Darauf steht: Heute wartet eine Überraschung auf dich. Der Igel zieht seine roten Schuhe an und läuft zum Eichhörnchen. Gemeinsam folgen sie einer Spur aus bunten Blättern. Hinter der alten Eiche hören sie ein leises Kichern. Dort stehen alle ihre Freunde an einem gedeckten Tisch. „Alles Gute zum Geburtstag!“, rufen sie. Der Igel hat seinen Geburtstag ganz vergessen. Zum Glück haben seine Freunde daran gedacht.",
  },
  {
    id: "sternensammler",
    title: "Die Sternensammlerin",
    description:
      "Mila entdeckt, dass die schönsten Schätze manchmal ganz nah sind.",
    level: 3,
    minutes: 4,
    theme: "Fantasie",
    scene: "stars",
    text: "Mila hatte einen ungewöhnlichen Wunsch: Sie wollte einen Stern in ihrem Zimmer aufbewahren. Deshalb stellte sie jeden Abend ein leeres Marmeladenglas auf die Fensterbank. Doch am nächsten Morgen war es immer noch leer. Eines Nachts klopfte ihre Großmutter an die Tür. Sie brachte eine kleine Laterne mit ausgeschnittenen Sternen. Als sie das Licht einschaltete, tanzten helle Sterne über die Wände. Mila staunte. Vielleicht musste man nicht jeden Schatz vom Himmel holen. Manchmal konnte man mit etwas Fantasie selbst einen erschaffen.",
  },
  {
    id: "mutiger-drache",
    title: "Ein Drache traut sich",
    description:
      "Für einen großen Schritt braucht man manchmal nur ein kleines bisschen Mut.",
    level: 3,
    minutes: 4,
    theme: "Abenteuer",
    scene: "dragon",
    text: "Der kleine Drache Bruno konnte wunderschöne Funken pusten. Aber vor dem Fliegen hatte er Angst. Während seine Geschwister über den Hügel segelten, blieb er lieber im weichen Gras sitzen. Eines Tages landete ein Schmetterling auf seiner Nase. „Auch ich konnte früher nicht fliegen“, erzählte er. Bruno breitete vorsichtig seine Flügel aus. Zuerst hüpfte er nur ein kleines Stück. Dann versuchte er es noch einmal. Plötzlich trug ihn der Wind. Es war kein weiter Flug, aber für Bruno war es der größte aller Schritte.",
  },
];
export const getStory = (id: string) =>
  stories.find((story) => story.id === id);
