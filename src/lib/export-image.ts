// Use dynamic import so html-to-image is only evaluated in the browser
async function getHtmlToImage() {
  return await import("html-to-image");
}


export interface ExportOptions {
  filename?: string;
  pixelRatio?: number;
}

/**
 * Ensures all custom fonts (e.g. Playfair Display, Manrope) are loaded before rendering to canvas.
 */
async function ensureFontsReady() {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Graceful fallback if document.fonts is not supported
    }
  }
}

/**
 * Generates and downloads an invitation card DOM element as a high-resolution PNG image.
 */
export async function downloadInvitationPng(
  element: HTMLElement,
  title: string = "invitation",
  pixelRatio: number = 2
): Promise<string> {
  await ensureFontsReady();

  const { toPng } = await getHtmlToImage();
  const dataUrl = await toPng(element, {
    quality: 1.0,
    pixelRatio,
    cacheBust: true,
  });

  const sanitizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "invitation";
  const filename = `${sanitizedTitle}-invitation.png`;

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return dataUrl;
}

/**
 * Shares invitation via Web Share API if native image sharing is supported,
 * otherwise triggers PNG download and returns false so the caller can open WhatsApp / Email.
 */
export async function shareInvitationWithImage(
  element: HTMLElement,
  shareData: {
    title: string;
    text: string;
    url?: string;
  },
  pixelRatio: number = 2
): Promise<{ sharedViaNative: boolean; downloaded: boolean }> {
  await ensureFontsReady();

  // Try to generate Blob
  let blob: Blob | null = null;
  try {
    const { toBlob } = await getHtmlToImage();
    blob = await toBlob(element, {
      quality: 1.0,
      pixelRatio,
      cacheBust: true,
    });
  } catch (err) {
    console.warn("Failed to generate Blob directly, falling back to download", err);
  }


  const sanitizedTitle = shareData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "invitation";
  const filename = `${sanitizedTitle}-invitation.png`;

  // Test if Web Share API supports file sharing
  if (
    blob &&
    typeof navigator !== "undefined" &&
    navigator.share &&
    navigator.canShare
  ) {
    try {
      const file = new File([blob], filename, { type: "image/png" });
      const dataToShare = {
        title: shareData.title,
        text: shareData.text,
        url: shareData.url,
        files: [file],
      };

      if (navigator.canShare(dataToShare)) {
        await navigator.share(dataToShare);
        return { sharedViaNative: true, downloaded: false };
      }
    } catch (err) {
      // User cancelled share or failed
      if ((err as Error)?.name === "AbortError") {
        return { sharedViaNative: true, downloaded: false };
      }
      console.warn("Native file share failed, falling back to download", err);
    }
  }

  // Fallback: Download PNG to device
  await downloadInvitationPng(element, shareData.title, pixelRatio);
  return { sharedViaNative: false, downloaded: true };
}
