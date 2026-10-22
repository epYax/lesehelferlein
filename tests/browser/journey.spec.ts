import { artworkScreenshot } from "./screenshot";
import { test, expect } from "@playwright/test";
test("existing discoveries survive redesign and reset requires confirmation", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "lesehelferlein.journey.v2",
      JSON.stringify({ sparks: [1, 2, 3], stories: ["kleiner-fuchs"] }),
    ),
  );
  await page.reload();
  await page.getByRole("button", { name: "Nächster Tipp der Lesefee" }).click();
  await expect(page.locator(".fairy-speech")).toContainText("Lesen starten");
  await expect(page.locator(".collect-spark")).toHaveCount(0);
  await page.getByRole("link", { name: "Reisealbum", exact: true }).click();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
  await expect(page.locator(".explorer-badge")).toHaveCount(0);
  await artworkScreenshot(page, `test-results/album-${info.project.name}.png`);
  await page.getByText("Für Eltern: Album-Speicher verwalten").click();
  await page
    .getByRole("button", { name: "Album zurücksetzen", exact: true })
    .click();
  await page.getByRole("button", { name: "Behalten", exact: true }).click();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Album zurücksetzen", exact: true })
    .click();
  await page.getByRole("button", { name: "Ja, Album zurücksetzen" }).click();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("lesehelferlein.journey.v2")!),
    ),
  ).toEqual({ sparks: [], stories: [] });
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
test("lobby opens the catalog and reduced motion disables fairy movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".fairy-guide>img")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.getByRole("link", { name: "Lesen starten", exact: true }).click();
  await expect(page).toHaveURL("/geschichten");
  await expect(page.locator(".location-island")).toHaveCount(6);
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
  await page.goto("/lesen/kleiner-fuchs");
  await page.getByRole("button", { name: "Demo starten", exact: true }).click();
  await page
    .getByRole("button", { name: "Demo auswerten", exact: true })
    .click();
  await page.getByRole("link", { name: "Im Album ansehen" }).click();
  await expect(page.locator(".album-stamp.earned")).toHaveCount(1);
  await expect(
    page.getByText("Dein Browser kann das Album gerade nicht speichern.", {
      exact: false,
    }),
  ).toBeVisible();
});
