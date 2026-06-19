/* eslint-disable @typescript-eslint/no-explicit-any, react/no-children-prop */
// Static imports for React and ReactDOMServer so React is mutable
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import { Reveal } from '../Reveal';
import { MediaSlot } from '../MediaSlot';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import deMessages from '../../../messages/de.json';

// Save original useState
const originalUseState = React.useState;

// Helper to set up mock DOM
const setupDOMMocks = (prefersReduced: boolean) => {
  const dummyFn = () => {};
  global.window = {
    addEventListener: dummyFn,
    removeEventListener: dummyFn,
    matchMedia: (query: string) => {
      const isMatch = query.includes('prefers-reduced-motion') ? prefersReduced : false;
      return {
        matches: isMatch,
        media: query,
        onchange: null,
        addListener: dummyFn,
        removeListener: dummyFn,
        addEventListener: dummyFn,
        removeEventListener: dummyFn,
        dispatchEvent: () => false,
      } as any;
    },
    requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(cb, 0) as any,
    cancelAnimationFrame: (id: any) => clearTimeout(id),
  } as any;

  global.document = {
    addEventListener: dummyFn,
    removeEventListener: dummyFn,
    createElement: () => ({
      style: {},
      setAttribute: dummyFn,
      appendChild: dummyFn,
    }),
    documentElement: {
      style: {},
    },
  } as any;
};

// Helper to clean up mock DOM
const cleanupDOMMocks = () => {
  delete (global as any).window;
  delete (global as any).document;
};

// Helper to precisely mock hooks inside Reveal
const mockUseStateForReveal = (mockReducedVal: boolean, forceMountedVal: boolean) => {
  let callCount = 0;
  React.useState = function<S>(initialState: S | (() => S)): [any, any] {
    callCount++;
    if (callCount === 1) {
      // First hook call: useReducedMotion()'s useState
      return [mockReducedVal, () => {}];
    }
    if (callCount === 2) {
      // Second hook call: Reveal's useState(false) for isMounted
      return [forceMountedVal, () => {}];
    }
    return (originalUseState as any).call(React, initialState);
  } as any;
};

const restoreUseState = () => {
  React.useState = originalUseState;
};

async function run() {
  let testFailed = false;
  
  function assert(condition: boolean, message: string) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      testFailed = true;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  console.log("\n========================================================");
  console.log("STARTING EMPIRICAL VERIFICATION OF COMPONENTS");
  console.log("========================================================\n");

  // --- PART 1: Reveal Prop Combinations ---
  console.log("--- Prop combinations of <Reveal /> ---");
  const directions: Array<'up' | 'down' | 'left' | 'right' | 'none' | undefined> = ['up', 'down', 'left', 'right', 'none', undefined];
  const delays = [0, 100, 500, undefined];
  const classNames = ['custom-class', '', undefined];

  let renderCount = 0;
  for (const dir of directions) {
    for (const del of delays) {
      for (const cls of classNames) {
        try {
          const html = ReactDOMServer.renderToString(
            React.createElement(Reveal, { direction: dir as any, delay: del, className: cls, children: React.createElement('span', null, 'Test Child') })
          );
          
          // Verify className is present if defined
          if (cls) {
            assert(html.includes(cls), `HTML should contain className "${cls}" for direction "${dir}", delay "${del}"`);
          }
          // Verify child is present
          assert(html.includes('Test Child'), `HTML should contain child for direction "${dir}", delay "${del}"`);
          renderCount++;
        } catch (e: any) {
          assert(false, `Should not throw for direction "${dir}", delay "${del}", className "${cls}": ${e.message}`);
        }
      }
    }
  }
  console.log(`Successfully tested ${renderCount} prop combinations for <Reveal />.`);

  // --- PART 2: Framer Motion Variants and Reduced Motion ---
  console.log("\n--- Framer Motion Variants and Transition Properties ---");
  
  // Case 2a: Client Mounted, Normal Motion Preference (prefers-reduced-motion = false)
  setupDOMMocks(false);
  mockUseStateForReveal(false, true); // reduced = false, mounted = true
  
  const htmlNormalUp = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'up', children: React.createElement('div', null, 'Normal Motion') })
  );
  assert(htmlNormalUp.includes('translateY(22px)'), 'Normal motion with direction="up" should translate Y by 22px');
  
  mockUseStateForReveal(false, true);
  const htmlNormalLeft = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'left', children: React.createElement('div', null, 'Normal Motion') })
  );
  assert(htmlNormalLeft.includes('translateX(22px)'), 'Normal motion with direction="left" should translate X by 22px');

  mockUseStateForReveal(false, true);
  const htmlNormalRight = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'right', children: React.createElement('div', null, 'Normal Motion') })
  );
  assert(htmlNormalRight.includes('translateX(-22px)'), 'Normal motion with direction="right" should translate X by -22px');

  mockUseStateForReveal(false, true);
  const htmlNormalDown = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'down', children: React.createElement('div', null, 'Normal Motion') })
  );
  assert(htmlNormalDown.includes('translateY(-22px)'), 'Normal motion with direction="down" should translate Y by -22px');

  mockUseStateForReveal(false, true);
  const htmlNormalNone = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'none', children: React.createElement('div', null, 'Normal Motion') })
  );
  assert(!htmlNormalNone.includes('translate'), 'Normal motion with direction="none" should not translate');

  // Case 2b: Client Mounted, Reduced Motion Preference (prefers-reduced-motion = true)
  setupDOMMocks(true);
  mockUseStateForReveal(true, true); // reduced = true, mounted = true
  
  const htmlReducedUp = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'up', children: React.createElement('div', null, 'Reduced Motion') })
  );
  assert(!htmlReducedUp.includes('translate'), 'Reduced motion should disable translate animations for direction="up"');

  mockUseStateForReveal(true, true);
  const htmlReducedLeft = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'left', children: React.createElement('div', null, 'Reduced Motion') })
  );
  assert(!htmlReducedLeft.includes('translate'), 'Reduced motion should disable translate animations for direction="left"');

  restoreUseState();
  cleanupDOMMocks();

  // --- PART 3: Hydration Mismatch Safety Check ---
  console.log("\n--- Next.js SSR Hydration Safety ---");
  
  // SSR render (simulated server side - isMounted = false)
  restoreUseState();
  cleanupDOMMocks();
  const ssrHTML = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'up', className: 'hydrate-test', children: React.createElement('span', null, 'Hydration Check') })
  );

  // Client initial render with normal motion preference (isMounted = false)
  setupDOMMocks(false);
  mockUseStateForReveal(false, false); // reduced = false, mounted = false
  const clientInitialNormalHTML = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'up', className: 'hydrate-test', children: React.createElement('span', null, 'Hydration Check') })
  );
  assert(ssrHTML === clientInitialNormalHTML, 'Client initial normal render HTML must exactly match SSR HTML');

  // Client initial render with reduced motion preference (isMounted = false)
  setupDOMMocks(true);
  mockUseStateForReveal(true, false); // reduced = true, mounted = false
  const clientInitialReducedHTML = ReactDOMServer.renderToString(
    React.createElement(Reveal, { direction: 'up', className: 'hydrate-test', children: React.createElement('span', null, 'Hydration Check') })
  );
  assert(ssrHTML === clientInitialReducedHTML, 'Client initial reduced render HTML must exactly match SSR HTML to prevent mismatch');

  restoreUseState();
  cleanupDOMMocks(); // Fully clean up window/document for next-intl

  // --- PART 4: i18n & de.json Translation Verification ---
  console.log("\n--- Translation Resolution ---");
  
  // Set up console interception to catch next-intl warnings/errors about missing translation keys
  const originalError = console.error;
  const originalWarn = console.warn;
  let hasI18nWarnings = false;

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    // Ignore ENVIRONMENT_FALLBACK as it is a natural warning due to mocking next/navigation in Node
    if (message.includes('Missing translation') || message.includes('translation key')) {
      hasI18nWarnings = true;
      originalError.apply(console, ["[Intercepted i18n Error]", ...args]);
    } else if (!message.includes('ENVIRONMENT_FALLBACK')) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('Missing translation') || message.includes('translation key')) {
      hasI18nWarnings = true;
      originalWarn.apply(console, ["[Intercepted i18n Warning]", ...args]);
    } else {
      originalWarn.apply(console, args);
    }
  };

  try {
    // Render Header
    const headerHtml = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(Header) })
    );
    
    // Check key translations are present in Header
    assert(headerHtml.includes('RT HOLDING'), 'Header should render brand name "RT HOLDING"');
    assert(headerHtml.includes('Start'), 'Header should render menu "Start"');
    assert(headerHtml.includes('Portal'), 'Header should render action "Portal"');
    
    // Render Footer
    const footerHtml = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(Footer) })
    );
    
    // Check key translations are present in Footer
    assert(footerHtml.includes('RSM SYSTEMBAU'), 'Footer should render brand name "RSM SYSTEMBAU"');
    assert(footerHtml.includes('Generalunternehmer für schlüsselfertige B2B-Bauprojekte'), 'Footer should render description');
    assert(footerHtml.includes('Wetzlar'), 'Footer should render Wetzlar address');
    assert(footerHtml.includes('Bauen mit System.'), 'Footer should render claim');

    assert(!hasI18nWarnings, 'Should render Header and Footer without any missing translation warnings');
  } catch (e: any) {
    console.error("Caught error in i18n components rendering:", e);
    assert(false, `i18n components rendering failed: ${e?.stack || e}`);
  } finally {
    // Restore console methods
    console.error = originalError;
    console.warn = originalWarn;
  }

  // --- PART 5: MediaSlot Placeholder Compliance Check ---
  console.log("\n--- MediaSlot Placeholder and Geometry compliance ---");
  try {
    const mediaHtml = ReactDOMServer.renderToString(
      React.createElement(MediaSlot, { label: '3D-BIM Visualisierung', className: 'test-slot' })
    );
    
    assert(mediaHtml.includes('rounded-[2rem]'), 'MediaSlot should have rounded-[2rem] geometry');
    assert(mediaHtml.includes('bg-gradient-to-br'), 'MediaSlot should use bg-gradient mesh placeholder');
    assert(mediaHtml.includes('[ PLATZHALTER: 3D-BIM Visualisierung ]'), 'MediaSlot should render correct placeholder label');
    assert(mediaHtml.includes('lucide-image') || mediaHtml.includes('svg'), 'MediaSlot should render a Lucide image icon');
  } catch (e: any) {
    assert(false, `MediaSlot verification failed: ${e.message}`);
  }

  console.log("\n========================================================");
  if (testFailed) {
    console.error("❌ VERIFICATION COMPLETED WITH FAILURES");
    console.log("========================================================\n");
    process.exit(1);
  } else {
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY");
    console.log("========================================================\n");
    process.exit(0);
  }
}

run().catch(console.error);
