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

test("direct reading uses Anna without a panel or outline, tracks real words and opens on second activation", async ({
  page,
}, info) => {
  await mockSpeech(page);
  await page.goto("/");
  expect(await page.evaluate(() => window.__speechTest.calls)).toHaveLength(0);
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  const heading = page.getByRole("heading", { name: "Dein Geschichtenwald" });
  await heading.click();
  expect(
    (await page.evaluate(() => window.__speechTest.calls)).at(-1)?.voice,
  ).toBe("anna");
  await expect(
    page.locator(".read-bar,.read-follow,.read-target-active"),
  ).toHaveCount(0);
  await expect(heading).toHaveCSS("outline-style", "none");
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    false,
  );
  await page.evaluate(() => window.__speechTest.boundary(5));
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    true,
  );
  await page.evaluate(() => window.__speechTest.endPrevious());
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    true,
  );
  await artworkScreenshot(
    page,
    `test-results/read-aloud-${info.project.name}.png`,
  );
  const link = page.getByRole("link", { name: "Abenteuerkarte", exact: true });
  await link.click();
  await expect(page).toHaveURL("/");
  await link.press("Enter");
  await expect(page).toHaveURL("/geschichten");
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    false,
  );
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await page.getByRole("link", { name: "Reisealbum", exact: true }).click();
  await expect(page).toHaveURL("/album");
});
test("buttons act on the second click, ordinary text repeats, Escape and toggle stop", async ({
  page,
}) => {
  await mockSpeech(page);
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  const tip = page.getByRole("button", { name: "Nächster Tipp der Lesefee" });
  await tip.locator("svg").click();
  await expect(page.locator(".fairy-speech")).toContainText("Hallo");
  await tip.click();
  await expect(page.locator(".fairy-speech")).toContainText("drei goldenen");
  const heading = page.getByRole("heading", { name: "Dein Geschichtenwald" });
  await heading.click();
  const count = await page.evaluate(() => window.__speechTest.calls.length);
  await heading.click();
  expect(await page.evaluate(() => window.__speechTest.calls.length)).toBe(
    count + 1,
  );
  expect(
    (await page.evaluate(() => window.__speechTest.calls)).at(-1)?.rate,
  ).toBe(0.9);
  await page.evaluate(() => window.__speechTest.boundary(5));
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    false,
  );
  await expect(page.locator("#read-help")).toContainText("Gestoppt");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(
    page.getByRole("switch", { name: "Vorlesen", exact: true }),
  ).toHaveAttribute("aria-checked", "false");
});
test("missing local voices preserve navigation, late voices load and errors allow retry on the text", async ({
  page,
}) => {
  await mockSpeech(page, "empty");
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(page.locator("#read-help")).toContainText(
    "Keine lokale deutsche Stimme",
  );
  expect(await page.evaluate(() => window.__speechTest.calls)).toHaveLength(0);
  await page.getByRole("link", { name: "Abenteuerkarte", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
  await page.evaluate(() => window.__speechTest.load());
  const heading = page.getByRole("heading", { name: /Hier wohnen/ });
  await heading.click();
  await page.evaluate(() => window.__speechTest.fail());
  await expect(page.locator("#read-help")).toContainText("nicht geklappt");
  await heading.click();
  await expect(page.locator("#read-help")).toContainText("Anna liest vor");
});
test("unsupported browsers retain ordinary actions without displaying a popup", async ({
  page,
}) => {
  await mockSpeech(page, "unsupported");
  await page.goto("/");
  await page.getByRole("switch", { name: "Vorlesen", exact: true }).click();
  await expect(page.locator("#read-help")).toContainText(
    "unterstützt das Vorlesen nicht",
  );
  await expect(page.locator(".read-bar")).toHaveCount(0);
  await page.getByRole("link", { name: "Abenteuerkarte", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
});
