import { test, expect, type Page } from "@playwright/test";
import { artworkScreenshot } from "./screenshot";
async function mockSpeech(
  page: Page,
  mode: "normal" | "empty" | "unsupported" = "normal",
) {
  await page.addInitScript({
    content: `
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: class { constructor(text) { this.text=text; } } });
  window.__speechTest = { calls: [], cancels: 0, current: null, previous: null };
  const test = window.__speechTest;
  const events = new EventTarget();
  const voices = [{ name:'Cloud Katja',lang:'de-DE',localService:false,voiceURI:'cloud',default:true },{ name:'Anna',lang:'de-DE',localService:true,voiceURI:'anna',default:false },{ name:'Hans',lang:'de-DE',localService:true,voiceURI:'hans',default:false }];
  test.voices = ${mode === "empty" ? "[]" : "voices"};
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    getVoices: () => test.voices,
    speak: utterance => { test.previous=test.current;test.current=utterance;test.calls.push({text:utterance.text,voice:utterance.voice.voiceURI,rate:utterance.rate});utterance.onstart?.(); },
    cancel: () => { test.cancels++; },
    addEventListener: (...args) => events.addEventListener(...args), removeEventListener: (...args) => events.removeEventListener(...args)
  }});
  test.load = () => {test.voices=voices;events.dispatchEvent(new Event('voiceschanged'));};
  test.boundary = (index) => test.current?.onboundary?.({name:'word',charIndex:index});
  test.endPrevious = () => test.previous?.onend?.();
  test.fail = () => test.current?.onerror?.({error:'synthesis-failed'});
  ${mode === "unsupported" ? "delete window.speechSynthesis;" : ""}
 `,
  });
}
type SpeechTest = {
  calls: { text: string; voice: string; rate: number }[];
  cancels: number;
  boundary: (n: number) => void;
  endPrevious: () => void;
  fail: () => void;
  load: () => void;
};
declare global {
  interface Window {
    __speechTest: SpeechTest;
  }
}

test("opt-in reads links before opening, uses local voice, tracks real boundaries and cancels stale speech", async ({
  page,
}, info) => {
  await mockSpeech(page);
  await page.goto("/");
  expect(await page.evaluate(() => window.__speechTest.calls)).toHaveLength(0);
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(
    page.getByRole("switch", { name: "Vorlesen", exact: true }),
  ).toHaveAttribute("aria-checked", "true");
  await page.getByRole("heading", { name: "Dein Geschichtenwald" }).click();
  expect(
    (await page.evaluate(() => window.__speechTest.calls)).at(-1)?.voice,
  ).toBe("anna");
  await expect(page.locator(".spoken-now")).toHaveCount(0);
  await page.evaluate(() => window.__speechTest.boundary(5));
  await expect(page.locator(".spoken-now")).toHaveText("Geschichtenwald ");
  await expect(page.locator("h1.read-target-active")).toHaveCount(1);
  await page.evaluate(() => window.__speechTest.endPrevious());
  await expect(page.locator(".spoken-now")).toHaveCount(1);
  if (await page.evaluate(() => "highlights" in CSS)) {
    expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
      true,
    );
  }
  await artworkScreenshot(
    page,
    `test-results/read-aloud-${info.project.name}.png`,
  );
  await page.getByRole("link", { name: "Abenteuerkarte", exact: true }).click();
  await expect(page).toHaveURL("/");
  await page.getByRole("button", { name: "Öffnen", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
  await expect(page.locator(".spoken-now")).toHaveCount(0);
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await page.getByRole("link", { name: "Reisealbum", exact: true }).click();
  await expect(page).toHaveURL("/album");
});
test("mode reads ordinary text and exposes action, voice, rate, repeat and stop without recording", async ({
  page,
}) => {
  await mockSpeech(page);
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await page.getByRole("button", { name: "Nächster Tipp der Lesefee" }).click();
  await expect(page.locator(".fairy-speech")).toContainText("Hallo");
  await page.getByRole("button", { name: "Ausführen", exact: true }).click();
  await expect(page.locator(".fairy-speech")).toContainText("drei goldenen");
  await page.getByRole("button", { name: "Stimme", exact: true }).click();
  await expect(
    page.getByLabel("Deutsche Gerätestimme").locator("option"),
  ).toHaveCount(2);
  await page.getByLabel("Deutsche Gerätestimme").selectOption("hans");
  await page.getByLabel("Tempo", { exact: true }).selectOption("0.75");
  await page.getByRole("button", { name: "Stimme anhören" }).click();
  const last = (await page.evaluate(() => window.__speechTest.calls)).at(-1)!;
  expect(last.voice).toBe("hans");
  expect(last.rate).toBe(0.75);
  await page.getByRole("button", { name: "Text noch einmal vorlesen" }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".read-bar")).toContainText("Gestoppt");
  await page.getByRole("button", { name: "Vorlesemodus ausschalten" }).click();
  await expect(page.locator(".read-bar")).toHaveCount(0);
});
test("missing local voices does not hijack navigation, late voices load and synthesis errors are recoverable", async ({
  page,
}) => {
  await mockSpeech(page, "empty");
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(page.locator(".read-bar")).toContainText(
    "Keine deutsche Gerätestimme",
  );
  expect(await page.evaluate(() => window.__speechTest.calls)).toHaveLength(0);
  await page.getByRole("link", { name: "Abenteuerkarte", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
  await page.evaluate(() => window.__speechTest.load());
  await page.getByRole("heading", { name: /Hier wohnen/ }).click();
  await page.evaluate(() => window.__speechTest.fail());
  await expect(page.locator(".read-bar")).toContainText("nicht geklappt");
  await page.getByRole("button", { name: "Text noch einmal vorlesen" }).click();
  await expect(page.locator(".read-bar")).toContainText("Ich lese vor.");
});
test("unsupported browsers retain normal controls and show an honest hint", async ({
  page,
}) => {
  await mockSpeech(page, "unsupported");
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(page.locator(".read-bar")).toContainText(
    "unterstützt das Vorlesen nicht",
  );
  await page.getByRole("link", { name: "Abenteuerkarte", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
});
