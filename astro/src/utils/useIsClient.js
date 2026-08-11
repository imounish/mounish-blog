// T3: ported unchanged from src/utils/useIsClient.js (Gatsby app). Used by
// ThemeToggle so the island renders nothing during the server-render pass
// (no `window`/`localStorage`) and only shows the real sun/moon icon once
// mounted in the browser — avoids a flash of the wrong icon on hydration.
import { useState, useEffect } from 'react';

function useIsClient() {
  const [isClient, setClient] = useState(false);
  const key = isClient ? 'client' : 'server';

  useEffect(() => {
    setClient(true);
  }, []);

  return { isClient, key };
}

export default useIsClient;
