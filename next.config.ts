import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  experimental: {
    webpackBuildWorker: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    // 301 explícito: o blog saiu de /artigos para /blog, e as LPs estáticas antigas
    // em /<rota>/index.html foram substituídas pelas rotas do App Router.
    const legacyStaticPages = [
      "alongamento-de-divida-rural",
      "defesa-busca-e-apreensao-agricola",
      "defesa-execucao-rural",
      "obrigado-contato",
      "politica-de-cookies",
      "politica-de-privacidade",
      "termos-de-uso",
    ];

    return [
      { source: "/artigos", destination: "/blog", statusCode: 301 },
      { source: "/artigos/:slug*", destination: "/blog/:slug*", statusCode: 301 },
      ...legacyStaticPages.map((page) => ({
        source: `/${page}/index.html`,
        destination: `/${page}`,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;
