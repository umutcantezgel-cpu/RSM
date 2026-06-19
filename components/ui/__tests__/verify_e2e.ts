import { chromium } from 'playwright';
import { join } from 'path';

async function runTests() {
  console.log("Starting E2E verification tests...");
  
  const browser = await chromium.launch({ headless: true });
  
  const logs: { type: string; text: string }[] = [];
  const failedRequests: string[] = [];
  
  console.log("\n--- TEST CASE 1: Normal Motion & Hydration / Translations ---");
  const normalContext = await browser.newContext({
    reducedMotion: 'no-preference'
  });
  
  const page1 = await normalContext.newPage();
  
  page1.on('console', msg => {
    const text = msg.text();
    // Ignore console messages about resource loads for unimplemented routes
    const isExpectedPrefetch404 = text.includes('/unternehmen') || 
                                  text.includes('/leistungen') || 
                                  text.includes('/referenzen') || 
                                  text.includes('/karriere') || 
                                  text.includes('/portal') ||
                                  text.includes('Failed to load resource: the server responded with a status of 404');
    if (isExpectedPrefetch404) {
      return;
    }
    
    logs.push({ type: msg.type(), text });
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.warn(`[Browser ${msg.type()}]: ${text}`);
    }
  });

  page1.on('requestfailed', request => {
    const url = request.url();
    // Ignore aborted pre-fetch requests which are normal Next.js behavior
    if (request.failure()?.errorText === 'net::ERR_ABORTED') {
      return;
    }
    console.error(`[Request Failed]: ${url} - ${request.failure()?.errorText}`);
    failedRequests.push(url);
  });

  page1.on('response', response => {
    const url = response.url();
    if (response.status() >= 400) {
      // Ignore 404s for unimplemented pages/prefetches during Milestone 1
      const isExpectedPrefetch404 = url.includes('/unternehmen') || 
                                    url.includes('/leistungen') || 
                                    url.includes('/referenzen') || 
                                    url.includes('/karriere') || 
                                    url.includes('/portal');
      if (isExpectedPrefetch404) {
        return;
      }
      console.error(`[HTTP Error ${response.status()}]: ${url}`);
      failedRequests.push(`${response.status()}: ${url}`);
    }
  });

  await page1.goto('http://localhost:3001/de');
  
  await page1.waitForTimeout(2000);
  
  // Verify Header content
  const headerBrand = await page1.textContent('header');
  console.log("Header text:", headerBrand);
  const headerCorrect = headerBrand?.includes('RT HOLDING') && headerBrand?.includes('Start');
  console.log("Header translations resolve correctly:", headerCorrect);
  
  // Verify Footer content
  const footerText = await page1.textContent('footer');
  const footerCorrect = footerText?.includes('RSM SYSTEMBAU') && footerText?.includes('Bauen mit System.');
  console.log("Footer translations resolve correctly:", footerCorrect);
  
  // Verify MediaSlot renders
  const mediaSlotText = await page1.textContent('.relative.flex.flex-col.items-center.justify-center');
  const mediaSlotCorrect = mediaSlotText?.includes('[ PLATZHALTER: 3D-BIM Visualisierung EWS ]');
  console.log("MediaSlot placeholder renders label:", mediaSlotCorrect);
  
  // Extract styling on one of the Reveal elements
  const revealElement = page1.locator('div.p-4.bg-white\\/80').first();
  const styleAttr = await revealElement.getAttribute('style');
  console.log("Mounted Reveal element inline styles (Normal Motion):", styleAttr);
  
  const hydrationWarnings = logs.filter(l => l.text.toLowerCase().includes('hydration') || l.text.toLowerCase().includes('mismatch'));
  const errors = logs.filter(l => l.type === 'error');
  
  console.log("Hydration warnings count:", hydrationWarnings.length);
  console.log("Unexpected JavaScript errors count:", errors.length);

  const screenshotPathNormal = join(__dirname, 'screenshot-normal.png');
  await page1.screenshot({ path: screenshotPathNormal });
  console.log(`Normal motion screenshot saved to: ${screenshotPathNormal}`);
  
  console.log("\n--- TEST CASE 2: Reduced Motion ---");
  const reducedContext = await browser.newContext({
    reducedMotion: 'reduce'
  });
  
  const page2 = await reducedContext.newPage();
  
  await page2.goto('http://localhost:3001/de');
  await page2.waitForTimeout(2000);
  
  const revealCount = await page2.locator('div.p-4.bg-white\\/80').count();
  console.log("Number of Reveal elements found:", revealCount);
  
  const revealElementReduced = page2.locator('div.p-4.bg-white\\/80').first();
  const styleAttrReduced = await revealElementReduced.getAttribute('style');
  console.log("Mounted Reveal element inline styles (Reduced Motion):", styleAttrReduced);
  
  const screenshotPathReduced = join(__dirname, 'screenshot-reduced.png');
  await page2.screenshot({ path: screenshotPathReduced });
  console.log(`Reduced motion screenshot saved to: ${screenshotPathReduced}`);
  
  await browser.close();
  
  console.log("\n--- E2E Verification Summary ---");
  
  let passed = true;
  
  if (hydrationWarnings.length > 0) {
    console.error("❌ FAILED: Hydration warnings were detected!");
    passed = false;
  } else {
    console.log("✅ PASSED: No hydration warnings detected.");
  }
  
  if (errors.length > 0 || failedRequests.length > 0) {
    console.error("❌ FAILED: Unexpected browser JS errors or failed requests were detected!");
    passed = false;
  } else {
    console.log("✅ PASSED: No unexpected browser errors or failed requests detected.");
  }
  
  if (headerCorrect && footerCorrect && mediaSlotCorrect) {
    console.log("✅ PASSED: Component layout, labels and translations resolved successfully.");
  } else {
    console.error("❌ FAILED: Component layout/translations checks failed.");
    passed = false;
  }
  
  if (!passed) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
