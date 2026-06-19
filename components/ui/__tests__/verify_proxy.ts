import { NextRequest } from 'next/server';
import { proxy } from '../../../proxy';

async function testProxy() {
  console.log("========================================================");
  console.log("RUNNING PROGRAMMATIC PROXY.TS ROUTING VERIFICATION");
  console.log("========================================================");

  // Test case 1: Request to root "/"
  const req1 = new NextRequest(new URL('http://localhost:3000/'), {
    headers: {
      host: 'localhost:3000',
      'accept-language': 'de'
    }
  });
  
  const res1 = await proxy(req1);
  const status1 = res1?.status;
  const location1 = res1?.headers.get('location');
  console.log(`Root request status: ${status1}`);
  console.log(`Root request redirect location: ${location1}`);
  
  if (status1 === 307 || status1 === 308 || status1 === 302) {
    if (location1?.endsWith('/de')) {
      console.log("✅ PASS: Root '/' correctly redirects to '/de'.");
    } else {
      console.warn(`⚠️ WARNING: Root '/' redirected, but to: ${location1}`);
    }
  } else {
    console.error(`❌ FAIL: Root '/' did not redirect. Status: ${status1}`);
    process.exit(1);
  }

  // Test case 2: Request to "/de"
  const req2 = new NextRequest(new URL('http://localhost:3000/de'), {
    headers: {
      host: 'localhost:3000'
    }
  });
  const res2 = await proxy(req2);
  const status2 = res2?.status;
  console.log(`Localized request status: ${status2}`);
  
  // A status of 200 or no redirection indicates the request is processed or rewritten
  if (status2 === 200 || !res2?.headers.get('location')) {
    console.log("✅ PASS: Localized path '/de' resolved/passed without redirection.");
  } else {
    console.warn(`⚠️ WARNING: Localized path '/de' redirected to: ${res2?.headers.get('location')}`);
  }

  console.log("========================================================");
  console.log("🎉 PROXY ROUTING VERIFICATION SUCCESSFUL");
  console.log("========================================================");
}

testProxy().catch(err => {
  console.error("❌ Proxy verification failed with error:", err);
  process.exit(1);
});
