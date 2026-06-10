/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageProvider } from './context/LanguageContext';
import { MainApp } from './components/MainApp';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

// Read the Convex URL from environment variables, fallback gracefully to the actual deployment.
const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://upbeat-dragon-363.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ConvexProvider>
  );
}

