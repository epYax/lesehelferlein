import { artworkScreenshot } from "./screenshot";
import { test, expect } from "@playwright/test";
test("fairy tips, collecting sparks, album persistence and explicit reset", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Nächster Tipp der Lesefee" }).click();
  await expect(page.locator(".fairy-speech")).toContainText(
    "drei goldenen Lichtfunken",
  );
  for (const n of [1, 2, 3])
    await page
      .getByRole("button", { name: `Lichtfunke ${n} sammeln`, exact: true })
      .click();
  await expect(page.getByRole("status")).toContainText("Alle drei");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Lichtfunke 1 gefunden" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Reisealbum", exact: true }).click();
  await expect(page.locator(".explorer-badge.earned")).toBeVisible();
  await expect(page.locator(".album-stamp")).toHaveCount(6);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await artworkScreenshot(page, `test-results/album-${info.project.name}.png`);
  await page.getByText("Für Eltern: Album-Speicher verwalten").click();
  await page
    .getByRole("button", { name: "Album zurücksetzen", exact: true })
    .click();
  await page.getByRole("button", { name: "Behalten", exact: true }).click();
  await expect(page.locator(".explorer-badge.earned")).toBeVisible();
  await page
    .getByRole("button", { name: "Album zurücksetzen", exact: true })
    .click();
  await page.getByRole("button", { name: "Ja, Album zurücksetzen" }).click();
  await expect(page.locator(".explorer-badge.earned")).toHaveCount(0);
});
test("demo stamp survives reload, repeat earns no duplicate, manual transcript earns none", async ({
  page,
}) => {
  await page.goto("/lesen/kleiner-fuchs");
  for (let n = 0; n < 2; n++) {
    await page
      .getByRole("button", { name: "Demo starten", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Demo auswerten", exact: true })
      .click();
    await expect(
      page.getByText("Ein Reisestempel für dein Album!"),
    ).toBeVisible();
    if (!n)
      await page.getByRole("button", { name: "Noch einmal lesen" }).click();
  }
  await page.getByRole("link", { name: "Im Album ansehen" }).click();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
  await page.goto("/lesen/zaubersamen");
  await page
    .getByText("Für Neugierige: Beispieltranskript selbst ausprobieren")
    .click();
  await page.getByRole("button", { name: "Beispieltext auswerten" }).click();
  await expect(
    page.getByRole("heading", { name: "Ein Abenteuer geschafft!" }),
  ).toBeVisible();
  await expect(page.locator(".stamp-earned")).toHaveCount(0);
  await page.goto("/album");
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
});
test("surprise opens a real story and reduced motion disables fairy movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".fairy-guide>img")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page
    .getByRole("button", { name: "Überraschungsgeschichte ziehen" })
    .click();
  await page.getByRole("link", { name: "Dieses Abenteuer öffnen" }).click();
  await expect(
    page.getByRole("button", { name: "Demo starten", exact: true }),
  ).toBeVisible();
});
test("blocked browser storage still allows collecting and navigating", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "setItem", {
      value: () => {
        throw new DOMException("blocked", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Lichtfunke 1 sammeln", exact: true })
    .click();
  await page.getByRole("link", { name: "Reisealbum", exact: true }).click();
  await expect(page.locator(".explorer-badge")).toContainText("1 von 3");
  await expect(
    page.getByText("Dein Browser kann das Album gerade nicht speichern.", {
      exact: false,
    }),
  ).toBeVisible();
});
