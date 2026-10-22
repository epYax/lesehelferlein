import { test, expect } from "@playwright/test";

test("fairy and every tip stay in view without covering their text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const fairy = page.locator(".fairy-guide > img");
  const speech = page.locator(".fairy-speech");
  const viewport = page.viewportSize()!;
  for (let tip = 0; tip < 4; tip++) {
    const bubble = (await speech.boundingBox())!;
    const character = (await fairy.boundingBox())!;
    expect(bubble.x).toBeGreaterThanOrEqual(0);
    expect(bubble.x + bubble.width).toBeLessThanOrEqual(viewport.width);
    expect(character.x).toBeGreaterThanOrEqual(0);
    expect(character.x + character.width).toBeLessThanOrEqual(viewport.width);
    // Side-by-side on compact screens; stacked on large screens. Neither covers the other.
    const overlapX =
      Math.min(bubble.x + bubble.width, character.x + character.width) -
      Math.max(bubble.x, character.x);
    const overlapY =
      Math.min(bubble.y + bubble.height, character.y + character.height) -
      Math.max(bubble.y, character.y);
    expect(overlapX <= 1 || overlapY <= 1).toBe(true);
    await page
      .getByRole("button", { name: "Nächster Tipp der Lesefee" })
      .click();
  }
  for (const n of [1, 2, 3]) {
    await page
      .getByRole("button", { name: `Lichtfunke ${n} sammeln`, exact: true })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Der Wald leuchtet!" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Abzeichen ansehen", exact: true })
    .click();
  await expect(page.locator(".explorer-badge.earned")).toBeVisible();
});

test("entire front screen fits the viewport with every game action visible", async ({
  page,
}) => {
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(() =>
        Math.abs(document.documentElement.scrollHeight - window.innerHeight),
      ),
    )
    .toBeLessThanOrEqual(1);
  for (const selector of [
    ".play-welcome",
    ".fairy-guide",
    ".play-mission",
    ".play-dock",
  ]) {
    const rect = (await page.locator(selector).boundingBox())!;
    expect(rect.y).toBeGreaterThanOrEqual(0);
    expect(rect.y + rect.height).toBeLessThanOrEqual(
      page.viewportSize()!.height + 1,
    );
  }
});
