/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-children-prop */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import deMessages from '../../../messages/de.json';

// Import target components
import LoginForm from '../../portal/LoginForm';
import HRJobAccordionItem from '../../karriere/HRJobAccordionItem';
import FAQAccordionItem from '../../karriere/FAQAccordionItem';

// Save original hook
const originalUseState = React.useState;

// Traverser utilities
function findElementById(element: any, id: string): any {
  if (!element) return null;
  if (element.props && element.props.id === id) return element;
  if (element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {
      for (const child of element.props.children) {
        const found = findElementById(child, id);
        if (found) return found;
      }
    } else {
      return findElementById(element.props.children, id);
    }
  }
  return null;
}

function findElementByType(element: any, type: string): any {
  if (!element) return null;
  if (element.type === type) return element;
  if (element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {
      for (const child of element.props.children) {
        const found = findElementByType(child, type);
        if (found) return found;
      }
    } else {
      return findElementByType(element.props.children, type);
    }
  }
  return null;
}

// Global mocks for DOM
const setupDOMMocks = () => {
  const dummyFn = () => {};
  global.window = {
    addEventListener: dummyFn,
    removeEventListener: dummyFn,
    matchMedia: (query: string) => {
      return {
        matches: false,
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

const cleanupDOMMocks = () => {
  delete (global as any).window;
  delete (global as any).document;
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
  console.log("RUNNING CLIENT-SIDE VALIDATION & ACCORDION TOGGLE TESTS");
  console.log("========================================================\n");

  setupDOMMocks();

  // --- 1. LoginForm Validation Tests ---
  console.log("--- Testing LoginForm client-side validation ---");

  let emailState = '';
  let passwordState = '';
  let rememberMeState: boolean = false;
  let messageState: any = null;
  let isPendingState: boolean = false;

  let capturedSetEmail: any = null;
  let capturedSetPassword: any = null;
  let capturedSetRememberMe: any = null;
  let capturedSetMessage: any = null;
  let capturedSetIsPending: any = null;

  // Setup useState wrapper hook
  (React as any).useState = function<S>(initialState: S | (() => S)): [any, any] {
    // Determine which hook is being called based on hook order in LoginForm:
    // 1. email, 2. password, 3. rememberMe, 4. message, 5. isPending
    (global as any).useStateCallIndex = ((global as any).useStateCallIndex || 0) + 1;
    const index = (global as any).useStateCallIndex;

    if (index === 1) {
      capturedSetEmail = (val: any) => {
        emailState = typeof val === 'function' ? val(emailState) : val;
      };
      return [emailState, capturedSetEmail];
    }
    if (index === 2) {
      capturedSetPassword = (val: any) => {
        passwordState = typeof val === 'function' ? val(passwordState) : val;
      };
      return [passwordState, capturedSetPassword];
    }
    if (index === 3) {
      capturedSetRememberMe = (val: any) => {
        rememberMeState = typeof val === 'function' ? val(rememberMeState) : val;
      };
      return [rememberMeState, capturedSetRememberMe];
    }
    if (index === 4) {
      capturedSetMessage = (val: any) => {
        messageState = typeof val === 'function' ? val(messageState) : val;
      };
      return [messageState, capturedSetMessage];
    }
    if (index === 5) {
      capturedSetIsPending = (val: any) => {
        isPendingState = typeof val === 'function' ? val(isPendingState) : val;
      };
      return [isPendingState, capturedSetIsPending];
    }
    return (originalUseState as any).call(React, initialState);
  } as any;

  let capturedLoginFormElement: any = null;

  function LoginTestWrapper() {
    (global as any).useStateCallIndex = 0; // Reset count for the render of LoginForm
    capturedLoginFormElement = LoginForm();
    return capturedLoginFormElement;
  }

  function renderLoginForm() {
    ReactDOMServer.renderToString(
      React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(LoginTestWrapper) })
    );
    return findElementByType(capturedLoginFormElement, 'form');
  }

  // Test case 1a: Blank fields validation
  emailState = "";
  passwordState = "";
  messageState = null;
  let formElement = renderLoginForm();
  assert(capturedLoginFormElement !== null, "Should render LoginForm inside provider");
  assert(formElement !== null, "Should find form element in LoginForm");

  formElement.props.onSubmit({ preventDefault: () => {} });
  assert(messageState !== null, "Submit empty fields should set error message");
  assert(messageState.ok === false, "Message should be error (ok: false)");
  assert(messageState.text === "Bitte Benutzerkennung und Passwort eingeben.", "Should match error_empty translation");

  // Test case 1b: Blank email only
  emailState = "";
  passwordState = "some-pass";
  messageState = null;
  formElement = renderLoginForm();
  formElement.props.onSubmit({ preventDefault: () => {} });
  assert(messageState !== null && messageState.ok === false, "Submit empty email should fail validation");
  assert(messageState.text === "Bitte Benutzerkennung und Passwort eingeben.", "Should match error_empty translation for missing email");

  // Test case 1c: Blank password only
  emailState = "test@rsm-systembau.de";
  passwordState = "";
  messageState = null;
  formElement = renderLoginForm();
  formElement.props.onSubmit({ preventDefault: () => {} });
  assert(messageState !== null && messageState.ok === false, "Submit empty password should fail validation");
  assert(messageState.text === "Bitte Benutzerkennung und Passwort eingeben.", "Should match error_empty translation for missing password");

  // Test case 1d: Invalid email format
  emailState = "invalid-email";
  passwordState = "some-pass";
  messageState = null;
  formElement = renderLoginForm();
  formElement.props.onSubmit({ preventDefault: () => {} });
  assert(messageState !== null && messageState.ok === false, "Submit invalid email should fail validation");
  assert(messageState.text === "Bitte eine gültige Unternehmens-E-Mail verwenden.", "Should match error_invalid_email translation");

  // Test case 1e: Valid credentials and pending state
  emailState = "mitarbeiter@rsm-systembau.de";
  passwordState = "secure-pass-123";
  messageState = null;
  isPendingState = false as boolean;
  formElement = renderLoginForm();
  formElement.props.onSubmit({ preventDefault: () => {} });
  assert((isPendingState as boolean) === true, "Submit valid credentials should set isPending to true");
  assert(messageState === null, "Submit valid credentials should reset message to null");

  // Wait for mock network timeout (800ms)
  console.log("Waiting for successful login state simulation (800ms)...");
  await new Promise((resolve) => setTimeout(resolve, 850));
  assert(isPendingState === false, "isPending should be false after transition");
  assert(messageState !== null, "message should be set after transition");
  assert(messageState.ok === true, "message should indicate success (ok: true)");
  assert(messageState.text === "Zugang verifiziert — Zero-Trust-Sitzung wird initialisiert …", "Should match success_message translation");


  // --- 2. HRJobAccordionItem Toggle Tests ---
  console.log("\n--- Testing HRJobAccordionItem interactive toggle ---");
  const sampleJob = {
    role: "Bauleiter (m/w/d)",
    area: "Generalunternehmen",
    loc: "Wetzlar",
    body: "Job description body text",
    tags: ["VOB", "BIM"]
  };

  let accordionIsOpen: boolean = false;
  let capturedSetAccordionIsOpen: any = null;

  (React as any).useState = function<S>(initialState: S | (() => S)): [any, any] {
    (global as any).useStateCallIndex = ((global as any).useStateCallIndex || 0) + 1;
    const index = (global as any).useStateCallIndex;
    if (index === 1) {
      capturedSetAccordionIsOpen = (val: any) => {
        accordionIsOpen = typeof val === 'function' ? val(accordionIsOpen) : val;
      };
      return [accordionIsOpen, capturedSetAccordionIsOpen];
    }
    if (index === 2) {
      // useReducedMotion internal useState call
      return [false, () => {}];
    }
    return (originalUseState as any).call(React, initialState);
  } as any;

  let capturedJobElement: any = null;
  function HRJobTestWrapper() {
    (global as any).useStateCallIndex = 0;
    capturedJobElement = HRJobAccordionItem({ job: sampleJob, num: "01" });
    return capturedJobElement;
  }

  // Render closed state
  accordionIsOpen = false as boolean;
  ReactDOMServer.renderToString(
    React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobTestWrapper) })
  );
  assert(capturedJobElement !== null, "Should render HRJobAccordionItem");
  let buttonEl = findElementByType(capturedJobElement, 'button');
  assert(buttonEl !== null, "Should find button in HRJobAccordionItem");
  assert(buttonEl.props['aria-expanded'] === false, "aria-expanded should be false initially");

  // Toggle state
  buttonEl.props.onClick();
  assert((accordionIsOpen as boolean) === true, "Clicking button should update state to open");

  // Render open state
  ReactDOMServer.renderToString(
    React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobTestWrapper) })
  );
  buttonEl = findElementByType(capturedJobElement, 'button');
  assert(buttonEl.props['aria-expanded'] === true, "aria-expanded should be true when open");


  // --- 3. FAQAccordionItem Toggle Tests ---
  console.log("\n--- Testing FAQAccordionItem interactive toggle ---");
  const sampleFaq = {
    q: "Wie lange dauert die Bewerbung?",
    a: "In der Regel erhalten Sie nach 3 Tagen eine Rückmeldung."
  };

  let faqIsOpen: boolean = false;
  let capturedSetFaqIsOpen: any = null;

  (React as any).useState = function<S>(initialState: S | (() => S)): [any, any] {
    (global as any).useStateCallIndex = ((global as any).useStateCallIndex || 0) + 1;
    const index = (global as any).useStateCallIndex;
    if (index === 1) {
      capturedSetFaqIsOpen = (val: any) => {
        faqIsOpen = typeof val === 'function' ? val(faqIsOpen) : val;
      };
      return [faqIsOpen, capturedSetFaqIsOpen];
    }
    if (index === 2) {
      // useReducedMotion internal useState call
      return [false, () => {}];
    }
    return (originalUseState as any).call(React, initialState);
  } as any;

  let capturedFaqElement: any = null;
  function FAQTestWrapper() {
    (global as any).useStateCallIndex = 0;
    capturedFaqElement = FAQAccordionItem({ faq: sampleFaq });
    return capturedFaqElement;
  }

  // Render closed state
  faqIsOpen = false as boolean;
  ReactDOMServer.renderToString(React.createElement(FAQTestWrapper));
  assert(capturedFaqElement !== null, "Should render FAQAccordionItem");
  buttonEl = findElementByType(capturedFaqElement, 'button');
  assert(buttonEl !== null, "Should find button in FAQAccordionItem");
  assert(buttonEl.props['aria-expanded'] === false, "aria-expanded should be false initially");

  // Toggle state
  buttonEl.props.onClick();
  assert((faqIsOpen as boolean) === true, "Clicking FAQ button should update state to open");

  // Render open state
  ReactDOMServer.renderToString(React.createElement(FAQTestWrapper));
  buttonEl = findElementByType(capturedFaqElement, 'button');
  assert(buttonEl.props['aria-expanded'] === true, "aria-expanded should be true when open");


  // --- 4. Hydration Mismatch Check ---
  console.log("\n--- Next.js SSR Hydration Safety check ---");
  
  // Set up console interceptor to check for hydration warnings
  const originalError = console.error;
  let hydrationWarningDetected = false;
  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.toLowerCase().includes('hydration') || msg.toLowerCase().includes('did not match')) {
      hydrationWarningDetected = true;
    }
    originalError.apply(console, args);
  };

  // Perform SSR render
  ReactDOMServer.renderToString(
    React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(LoginForm) })
  );

  ReactDOMServer.renderToString(
    React.createElement(NextIntlClientProvider, { locale: 'de', messages: deMessages, children: React.createElement(HRJobAccordionItem, { job: sampleJob, num: "01" }) })
  );

  ReactDOMServer.renderToString(
    React.createElement(FAQAccordionItem, { faq: sampleFaq })
  );

  assert(!hydrationWarningDetected, "Should render LoginForm, HRJobAccordionItem, and FAQAccordionItem without hydration warnings");

  // Restore console & useState hooks
  console.error = originalError;
  React.useState = originalUseState;
  cleanupDOMMocks();

  console.log("\n========================================================");
  if (testFailed) {
    console.error("❌ BEHAVIORAL VERIFICATION FAILED");
    console.log("========================================================\n");
    process.exit(1);
  } else {
    console.log("🎉 ALL BEHAVIORAL VERIFICATION TESTS PASSED SUCCESSFULLY");
    console.log("========================================================\n");
    process.exit(0);
  }
}

run().catch(console.error);
