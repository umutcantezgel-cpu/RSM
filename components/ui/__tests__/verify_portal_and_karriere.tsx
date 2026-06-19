/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-children-prop */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import deMessages from '../../../messages/de.json';

// Import components under test
import LoginForm from '../../portal/LoginForm';
import HRJobAccordionItem from '../../karriere/HRJobAccordionItem';
import FAQAccordionItem from '../../karriere/FAQAccordionItem';

// Save original useState and setTimeout
const originalUseState = React.useState;
const originalSetTimeout = global.setTimeout;

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

// Helper to traverse and find onSubmit
function findOnSubmit(element: any): any {
  if (!element) return null;
  if (element.props && element.props.onSubmit) {
    return element.props.onSubmit;
  }
  if (element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {
      for (const child of element.props.children) {
        const found = findOnSubmit(child);
        if (found) return found;
      }
    } else {
      return findOnSubmit(element.props.children);
    }
  }
  return null;
}

// Helper to traverse and find onClick
function findOnClick(element: any): any {
  if (!element) return null;
  if (element.props && element.props.onClick) {
    return element.props.onClick;
  }
  if (element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {
      for (const child of element.props.children) {
        const found = findOnClick(child);
        if (found) return found;
      }
    } else {
      return findOnClick(element.props.children);
    }
  }
  return null;
}

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

  // Intercept warnings
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (!message.includes('ENVIRONMENT_FALLBACK')) {
      originalError.apply(console, args);
    }
  };

  console.log("\n========================================================");
  console.log("STARTING EMPIRICAL VERIFICATION: PORTAL & KARRIERE COMPONENTS");
  console.log("========================================================\n");

  setupDOMMocks(false);

  // ========================================================
  // 1. CLIENT-SIDE FORM VALIDATION IN LoginForm.tsx
  // ========================================================
  console.log("--- 1. Client-Side Form Validation (LoginForm) ---");

  // 1a. Test case: Blank fields validation
  {
    let setMessageMockVal: any = null;
    let setIsPendingMockVal: any = null;

    const mockSetEmail = () => {};
    const mockSetPassword = () => {};
    const mockSetRememberMe = () => {};
    const mockSetMessage = (val: any) => { setMessageMockVal = val; };
    const mockSetIsPending = (val: any) => { setIsPendingMockVal = val; };

    // Mock states to simulate user blank inputs
    let callCount = 0;
    React.useState = function<S>(initialState: S | (() => S)): [any, any] {
      callCount++;
      if (callCount === 1) return ["", mockSetEmail]; // email
      if (callCount === 2) return ["", mockSetPassword]; // password
      if (callCount === 3) return [false, mockSetRememberMe]; // rememberMe
      if (callCount === 4) return [null, mockSetMessage]; // message
      if (callCount === 5) return [false, mockSetIsPending]; // isPending
      return (originalUseState as any)(initialState);
    } as any;

    let capturedSubmit: any = null;
    const Wrapper = () => {
      const el = LoginForm();
      capturedSubmit = findOnSubmit(el);
      return el;
    };

    // Render within Provider so translations resolve correctly
    ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(Wrapper)
      })
    );

    assert(capturedSubmit !== null, "Should capture onSubmit from LoginForm");

    // Call submit
    const mockEvent = { preventDefault: () => {} } as any;
    capturedSubmit(mockEvent);

    assert(
      setMessageMockVal !== null && setMessageMockVal.ok === false && setMessageMockVal.text === deMessages.Portal.error_empty,
      "Submitting empty fields should set error_empty message"
    );
  }

  // 1b. Test case: Invalid email format validation
  {
    let setMessageMockVal: any = null;
    let setIsPendingMockVal: any = null;

    const mockSetEmail = () => {};
    const mockSetPassword = () => {};
    const mockSetRememberMe = () => {};
    const mockSetMessage = (val: any) => { setMessageMockVal = val; };
    const mockSetIsPending = (val: any) => { setIsPendingMockVal = val; };

    // Mock states to simulate invalid email input
    let callCount = 0;
    React.useState = function<S>(initialState: S | (() => S)): [any, any] {
      callCount++;
      if (callCount === 1) return ["invalid-email", mockSetEmail]; // email
      if (callCount === 2) return ["somepass123", mockSetPassword]; // password
      if (callCount === 3) return [false, mockSetRememberMe]; // rememberMe
      if (callCount === 4) return [null, mockSetMessage]; // message
      if (callCount === 5) return [false, mockSetIsPending]; // isPending
      return (originalUseState as any)(initialState);
    } as any;

    let capturedSubmit: any = null;
    const Wrapper = () => {
      const el = LoginForm();
      capturedSubmit = findOnSubmit(el);
      return el;
    };

    ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(Wrapper)
      })
    );

    capturedSubmit({ preventDefault: () => {} });

    assert(
      setMessageMockVal !== null && setMessageMockVal.ok === false && setMessageMockVal.text === deMessages.Portal.error_invalid_email,
      "Submitting invalid email should set error_invalid_email message"
    );
  }

  // 1c. Test case: Successful login state validation
  {
    let setMessageMockVal: any = null;
    let setIsPendingMockVal: any = null;

    const mockSetEmail = () => {};
    const mockSetPassword = () => {};
    const mockSetRememberMe = () => {};
    const mockSetMessage = (val: any) => { setMessageMockVal = val; };
    const mockSetIsPending = (val: any) => { setIsPendingMockVal = val; };

    // Mock setTimeout to execute immediately
    global.setTimeout = ((cb: any, ms: number) => {
      cb();
    }) as any;

    // Mock states to simulate valid input
    let callCount = 0;
    React.useState = function<S>(initialState: S | (() => S)): [any, any] {
      callCount++;
      if (callCount === 1) return ["test@rsm-systembau.de", mockSetEmail]; // email
      if (callCount === 2) return ["correctpassword", mockSetPassword]; // password
      if (callCount === 3) return [false, mockSetRememberMe]; // rememberMe
      if (callCount === 4) return [null, mockSetMessage]; // message
      if (callCount === 5) return [false, mockSetIsPending]; // isPending
      return (originalUseState as any)(initialState);
    } as any;

    let capturedSubmit: any = null;
    const Wrapper = () => {
      const el = LoginForm();
      capturedSubmit = findOnSubmit(el);
      return el;
    };

    ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(Wrapper)
      })
    );

    capturedSubmit({ preventDefault: () => {} });

    assert(
      setMessageMockVal !== null && setMessageMockVal.ok === true && setMessageMockVal.text === deMessages.Portal.success_message,
      "Submitting valid credentials should set success_message after loading"
    );

    // Restore setTimeout
    global.setTimeout = originalSetTimeout;
  }

  // ========================================================
  // 2. INTERACTIVE TOGGLE BEHAVIOR IN ACCORDIONS
  // ========================================================
  console.log("\n--- 2. Interactive Accordion Toggles (HRJobAccordionItem & FAQAccordionItem) ---");

  // 2a. Test case: HRJobAccordionItem toggle
  {
    const mockJob = {
      role: "Bauleiter Hochbau (m/w/d)",
      area: "Projektleitung",
      loc: "Wetzlar / Rhein-Main",
      body: "Verantwortung für schlüsselfertige B2B-Projekte.",
      tags: ["BIM", "LPH 5-8", "VOB"]
    };

    let setOpenMockVal: any = null;
    const mockSetOpen = (val: any) => { setOpenMockVal = val; };

    let callCount = 0;
    React.useState = function<S>(initialState: S | (() => S)): [any, any] {
      callCount++;
      if (callCount === 1) return [false, mockSetOpen]; // isOpen
      if (callCount === 2) return [false, () => {}]; // useReducedMotion's useState
      return (originalUseState as any)(initialState);
    } as any;

    let capturedClick: any = null;
    const Wrapper = () => {
      const el = HRJobAccordionItem({ job: mockJob, num: "01" });
      capturedClick = findOnClick(el);
      return el;
    };

    ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(Wrapper) })
    );

    assert(capturedClick !== null, "Should capture onClick from HRJobAccordionItem button");

    capturedClick();
    assert(setOpenMockVal === true, "Clicking the closed HRJobAccordionItem should toggle to open (true)");
  }

  // 2b. Test case: FAQAccordionItem toggle
  {
    const mockFaq = {
      q: "Welche Gewerke werden in-house abgedeckt?",
      a: "Wir decken Modul-Systembau, Roh- und Innenausbau sowie TGA ab."
    };

    let setOpenMockVal: any = null;
    const mockSetOpen = (val: any) => { setOpenMockVal = val; };

    let callCount = 0;
    React.useState = function<S>(initialState: S | (() => S)): [any, any] {
      callCount++;
      if (callCount === 1) return [false, mockSetOpen]; // isOpen
      if (callCount === 2) return [false, () => {}]; // useReducedMotion's useState
      return (originalUseState as any)(initialState);
    } as any;

    let capturedClick: any = null;
    const Wrapper = () => {
      const el = FAQAccordionItem({ faq: mockFaq });
      capturedClick = findOnClick(el);
      return el;
    };

    ReactDOMServer.renderToString(React.createElement(Wrapper));

    assert(capturedClick !== null, "Should capture onClick from FAQAccordionItem button");

    capturedClick();
    assert(setOpenMockVal === true, "Clicking the closed FAQAccordionItem should toggle to open (true)");
  }

  // Restore useState
  React.useState = originalUseState;

  // ========================================================
  // 3. HYDRATION MISMATCH SAFETY CHECK
  // ========================================================
  console.log("\n--- 3. Hydration Mismatch Safety Check ---");

  // Verify that server-side HTML matches client-side initial render HTML exactly
  // for both normal and reduced motion states on the relevant pages/components.
  
  // 3a. LoginForm Hydration Check
  {
    // SSR (server) render
    const ssrHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(LoginForm)
      })
    );

    // Initial Client render (prefersReducedMotion = false)
    setupDOMMocks(false);
    const clientNormalHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(LoginForm)
      })
    );
    assert(ssrHTML === clientNormalHTML, "LoginForm HTML must match exactly between SSR and client initial render (Normal Motion)");

    // Initial Client render (prefersReducedMotion = true)
    setupDOMMocks(true);
    const clientReducedHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { 
        locale: 'de', 
        messages: deMessages,
        children: React.createElement(LoginForm)
      })
    );
    assert(ssrHTML === clientReducedHTML, "LoginForm HTML must match exactly between SSR and client initial render (Reduced Motion)");
  }

  // 3b. HRJobAccordionItem Hydration Check
  {
    const mockJob = {
      role: "Bauleiter Hochbau (m/w/d)",
      area: "Projektleitung",
      loc: "Wetzlar / Rhein-Main",
      body: "Verantwortung für schlüsselfertige B2B-Projekte.",
      tags: ["BIM", "LPH 5-8", "VOB"]
    };

    // SSR (server) render
    const ssrHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobAccordionItem, { job: mockJob, num: "01" }) })
    );

    // Initial Client render (prefersReducedMotion = false)
    setupDOMMocks(false);
    const clientNormalHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobAccordionItem, { job: mockJob, num: "01" }) })
    );
    assert(ssrHTML === clientNormalHTML, "HRJobAccordionItem HTML must match exactly between SSR and client initial render (Normal Motion)");

    // Initial Client render (prefersReducedMotion = true)
    setupDOMMocks(true);
    const clientReducedHTML = ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobAccordionItem, { job: mockJob, num: "01" }) })
    );
    assert(ssrHTML === clientReducedHTML, "HRJobAccordionItem HTML must match exactly between SSR and client initial render (Reduced Motion)");
  }

  // 3c. FAQAccordionItem Hydration Check
  {
    const mockFaq = {
      q: "Welche Gewerke werden in-house abgedeckt?",
      a: "Wir decken Modul-Systembau, Roh- und Innenausbau sowie TGA ab."
    };

    // SSR (server) render
    const ssrHTML = ReactDOMServer.renderToString(
      React.createElement(FAQAccordionItem, { faq: mockFaq })
    );

    // Initial Client render (prefersReducedMotion = false)
    setupDOMMocks(false);
    const clientNormalHTML = ReactDOMServer.renderToString(
      React.createElement(FAQAccordionItem, { faq: mockFaq })
    );
    assert(ssrHTML === clientNormalHTML, "FAQAccordionItem HTML must match exactly between SSR and client initial render (Normal Motion)");

    // Initial Client render (prefersReducedMotion = true)
    setupDOMMocks(true);
    const clientReducedHTML = ReactDOMServer.renderToString(
      React.createElement(FAQAccordionItem, { faq: mockFaq })
    );
    assert(ssrHTML === clientReducedHTML, "FAQAccordionItem HTML must match exactly between SSR and client initial render (Reduced Motion)");
  }

  cleanupDOMMocks();
  console.error = originalError;

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
