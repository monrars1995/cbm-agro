'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import LegalDocumentLayout from '@/components/cbm/LegalDocumentLayout'

export default function PrivacidadeContent() {
  return (
    <LegalDocumentLayout
      icon={Shield}
      title="Política de Privacidade"
      intro="Seus dados não são repassados ao banco. Tratamos as informações do formulário com sigilo profissional, exclusivamente para analisar sua situação jurídica e retornar o contato solicitado."
      ctaTitle="Precisa falar sobre seus dados ou iniciar uma análise?"
      ctaDescription="Use o formulário de contato ou WhatsApp. Atendemos com sigilo, sem repassar informações ao banco."
      ctaLabel="Ir para contato"
    >
          <p>
            A <strong>Carlos Benjamim Morais Sociedade Individual de Advocacia</strong>{' '}
            (CBM Agro), inscrita no CNPJ sob o nº 47.878.182/0001-61, com sede na
            Edifício Trade Center, Av. Getúlio Vargas, 3233, Salas 401 e 402 - Santa Mônica,
            Feira de Santana - BA, 44077-420, valoriza a privacidade de seus clientes e parceiros e está
            comprometida em proteger os dados pessoais tratados em nossas
            atividades, em conformidade com a Lei Geral de Proteção de Dados (Lei
            nº 13.709/2018 - LGPD).
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">1. Coleta de Dados</h2>
          <p>
            Coletamos as informações estritamente necessárias para prestação de
            nossos serviços jurídicos (análise de viabilidade de defesa,
            alongamento de dívida, etc.) ou para contato comercial. Isso inclui:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Nome completo;</li>
            <li>Telefone / WhatsApp;</li>
            <li>Estado da federação de sua propriedade;</li>
            <li>Faixa estimada de endividamento (quando preenchido voluntariamente);</li>
            <li>Dados de navegação via cookies (conforme Política de Cookies).</li>
          </ul>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">2. Finalidade do Tratamento</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Entrar em contato para realizar a análise prévia de sua situação jurídica;</li>
            <li>Prestar os serviços advocatícios solicitados;</li>
            <li>
              Envio de comunicações informativas sobre direitos do produtor rural
              (podendo ser cancelado a qualquer tempo).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">3. Sigilo Profissional</h2>
          <p>
            Como escritório de advocacia, todas as informações recebidas antes e
            durante a contratação são protegidas pelo mais estrito{' '}
            <strong>sigilo profissional</strong>, garantido pelo Estatuto da OAB,
            não sendo compartilhadas com terceiros (especialmente instituições
            financeiras).
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">4. Retenção de Dados</h2>
          <p>
            Seus dados serão retidos apenas pelo tempo necessário para cumprir as
            finalidades para as quais foram coletados, ou para cumprimento de
            obrigações legais, regulatórias ou para o exercício regular de direitos
            em processo judicial.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">5. Seus Direitos</h2>
          <p>
            Você pode, a qualquer momento, solicitar a confirmação, acesso,
            correção, anonimização, bloqueio ou eliminação dos seus dados pessoais
            fornecidos através deste site. Para exercer seus direitos, entre em
            contato através dos nossos canais oficiais de comunicação.
          </p>
    </LegalDocumentLayout>
  )
}
