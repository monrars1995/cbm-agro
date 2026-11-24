'use client'

import Link from 'next/link'
import { Cookie } from 'lucide-react'
import LegalDocumentLayout from '@/components/cbm/LegalDocumentLayout'

export default function CookiesContent() {
  return (
    <LegalDocumentLayout
      icon={Cookie}
      title="Política de Cookies"
      intro="Usamos cookies para medir desempenho do site e entender quais páginas ajudam produtores rurais a encontrar orientação jurídica. Você pode gerenciá-los no navegador."
      ctaTitle="Dúvidas sobre privacidade ou cookies?"
      ctaDescription="Fale com nossa equipe pelos canais oficiais. Seus dados de contato não são compartilhados com instituições financeiras."
      ctaLabel="Falar com a CBM"
    >
          <p>
            Esta Política de Cookies explica como a{' '}
            <strong>Carlos Benjamim Morais Sociedade Individual de Advocacia</strong>{' '}
            (CBM Agro) utiliza cookies e tecnologias semelhantes em nosso site.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto que um site, ao ser visitado,
            armazena no seu computador ou dispositivo móvel através do navegador
            (browser). Eles permitem que o site memorize suas ações e preferências
            durante um determinado período de tempo, facilitando a navegação.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">2. Como utilizamos os Cookies?</h2>
          <p>Utilizamos cookies para as seguintes finalidades:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>Cookies Estritamente Necessários:</strong> Essenciais para o
              funcionamento básico do site e não podem ser desativados em nossos
              sistemas.
            </li>
            <li>
              <strong>Cookies de Desempenho e Análise:</strong> Permitem-nos contar
              visitas e fontes de tráfego, para que possamos medir e melhorar o
              desempenho do nosso site (ex: Google Analytics).
            </li>
            <li>
              <strong>Cookies de Marketing (Rastreamento):</strong> Utilizados
              para rastrear conversões de campanhas publicitárias, como
              preenchimento de formulários e cliques no WhatsApp, ajudando-nos a
              medir a eficácia de nossos anúncios (ex: Google Ads, Meta Pixel).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">3. Controle de Cookies</h2>
          <p>
            Você pode controlar e gerenciar cookies através das configurações do
            seu navegador. Lembramos que a remoção ou bloqueio de cookies pode
            impactar sua experiência como usuário e partes de nosso site podem
            deixar de ser totalmente acessíveis.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">4. Cookies de Terceiros</h2>
          <p>
            Podemos utilizar serviços de terceiros, como plataformas de analytics
            e publicidade (Google Analytics, Google Ads, Meta), que podem definir
            seus próprios cookies quando você interage com nosso site. Não temos
            controle sobre esses cookies de terceiros.
          </p>

          <p className="mt-8">
            Para saber como tratamos dados pessoais coletados via formulários, consulte
            nossa{' '}
            <Link href="/politica-de-privacidade" className="text-gold hover:text-gold-dark font-medium">
              Política de Privacidade
            </Link>
            .
          </p>
    </LegalDocumentLayout>
  )
}
