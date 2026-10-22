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
    // Entire original mascot canvas is below the speech, including the tip button.
    expect(character.y).toBeGreaterThanOrEqual(bubble.y + bubble.height);
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
