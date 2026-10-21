import { test, expect } from "@playwright/test";
test("home is responsive and original mascot loads", async ({ page }, info) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /In jedem Kind/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /Deine freundliche/ }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .getByRole("img", { name: /Deine freundliche/ })
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `test-results/home-${info.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("link", { name: "Mein Leseabenteuer starten" }).click();
  await expect(page.getByRole("heading", { name: /Eine Welt/ })).toBeVisible();
});
test("library search, filters and empty recovery", async ({ page }) => {
  await page.goto("/geschichten");
  await expect(page.locator(".story-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Lesestart", exact: true }).click();
  await expect(page.locator(".story-card")).toHaveCount(2);
  await page
    .getByRole("textbox", { name: "Geschichten suchen" })
    .fill("unauffindbar");
  await expect(page.locator(".story-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Alle Geschichten zeigen" }).click();
  await expect(page.locator(".story-card")).toHaveCount(6);
  await page.getByRole("textbox", { name: "Geschichten suchen" }).fill("Fuchs");
  await expect(page.locator(".story-card")).toHaveCount(1);
  await page.locator(".story-card").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Der kleine Fuchs und der Mond",
  );
});
test("demo cancel, complete, manual alignment and repeat", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/lesen/kleiner-fuchs");
  await page.getByRole("button", { name: "Text vergrößern" }).click();
  await expect(page.locator(".reading-text")).toHaveCSS("font-size", "28px");
  await page.getByRole("button", { name: "Demo starten", exact: true }).click();
  await page.getByRole("button", { name: "Abbrechen", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Demo starten", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Demo starten", exact: true }).click();
  await page
    .getByRole("button", { name: "Demo auswerten", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Ein Abenteuer geschafft!" }),
  ).toBeVisible();
  await expect(page.locator(".word.omitted")).toHaveCount(1);
  await expect(page.locator(".word.different")).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `test-results/reader-${info.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByText("Für Neugierige: Beispieltranskript selbst ausprobieren")
    .click();
  await page
    .getByRole("textbox", { name: "Beispieltranskript (maximal 6000 Zeichen)" })
    .fill("");
  await page.getByRole("button", { name: "Beispieltext auswerten" }).click();
  await expect(page.locator(".result-stat")).toContainText("0 von");
  await page.getByRole("button", { name: "Noch einmal lesen" }).click();
  await expect(page.locator(".result-panel")).toHaveCount(0);
  await expect(page.locator(".word.omitted")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("parents and unknown story", async ({ page }) => {
  await page.goto("/eltern");
  await expect(
    page.getByRole("heading", { name: "Keine Aufnahmen. Kein Konto." }),
  ).toBeVisible();
  const response = await page.goto("/lesen/unbekannt");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Zur Geschichtenwelt", exact: true }),
  ).toBeVisible();
});
