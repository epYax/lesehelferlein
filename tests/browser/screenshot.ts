import type { Page } from "@playwright/test";
/** Wait for all rendered illustrations, including below-the-fold lazy images. */
export async function artworkScreenshot(page: Page, path: string) {
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (node) => {
        const img = node as HTMLImageElement;
        img.loading = "eager";
        await img.decode();
      }),
    );
  });
  await page.screenshot({ path, fullPage: true, animations: "disabled" });
}
