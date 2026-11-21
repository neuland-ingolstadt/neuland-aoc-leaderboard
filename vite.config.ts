import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  frame-src 'self';
  media-src 'self';
  object-src 'none';
  child-src 'none';
  base-uri 'self';
  form-action 'self';
  worker-src 'self' blob:;
`;

const securityHeaders = {
  "Content-Security-Policy": ContentSecurityPolicy.replace(/\n/g, ""),
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart(),
    nitro({
      preset: "node-server",
      routeRules: { "/**": { headers: securityHeaders } },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
