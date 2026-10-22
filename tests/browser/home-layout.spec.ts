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
  await expect(page.locator(".lobby-dock a")).toHaveCount(2);
  await expect(page.locator('a[href^="/lesen/"]')).toHaveCount(0);
  await expect(
    page.locator(".story-portal,.adventure-path,.collect-spark,.play-mission"),
  ).toHaveCount(0);
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
    ".lobby-play",
    ".lobby-dock",
  ]) {
    const rect = (await page.locator(selector).boundingBox())!;
    expect(rect.y).toBeGreaterThanOrEqual(0);
    expect(rect.y + rect.height).toBeLessThanOrEqual(
      page.viewportSize()!.height + 1,
    );
  }
});

test("compact viewports keep the lobby action and fairy inside the screen", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "Explicit viewport matrix");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [
    [320, 568],
    [844, 390],
    [1366, 768],
    [768, 1024],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollHeight - innerHeight,
        ),
      )
      .toBeLessThanOrEqual(1);
    for (const selector of [
      ".lobby-play",
      ".fairy-speech",
      ".fairy-guide > img",
      ".lobby-dock",
    ]) {
      const r = (await page.locator(selector).boundingBox())!;
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.x + r.width).toBeLessThanOrEqual(width);
      expect(r.y + r.height).toBeLessThanOrEqual(height);
    }
  }
});
