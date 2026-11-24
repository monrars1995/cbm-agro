'use client'

import { FileText } from 'lucide-react'
import LegalDocumentLayout from '@/components/cbm/LegalDocumentLayout'

export default function TermosContent() {
  return (
    <LegalDocumentLayout
      icon={FileText}
      title="Termos de Uso"
      intro="O conteúdo deste site orienta o produtor rural sobre direitos e alternativas jurídicas. Não substitui consulta personalizada nem cria vínculo advocatício automático."
      ctaTitle="Quer uma análise do seu caso?"
      ctaDescription="Solicite contato pelo site. A equipe retorna para orientar os próximos passos, com sigilo profissional."
      ctaLabel="Solicitar contato"
    >
          <p>
            Estes Termos de Uso regem o acesso e uso do site e dos serviços
            oferecidos pela{' '}
            <strong>Carlos Benjamim Morais Sociedade Individual de Advocacia</strong>{' '}
            (CBM Agro), inscrita no CNPJ sob o nº 47.878.182/0001-61, com sede na
            Edifício Trade Center, Av. Getúlio Vargas, 3233, Salas 401 e 402 - Santa Mônica,
            Feira de Santana - BA, 44077-420. Ao acessar nosso site, você concorda em cumprir estes
            termos.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">1. Natureza Informativa</h2>
          <p>
            O conteúdo disponibilizado neste site possui caráter estritamente
            informativo, com o objetivo de disseminar conhecimento sobre os
            direitos do produtor rural.{' '}
            <strong>
              Nenhum conteúdo publicado aqui substitui a consulta jurídica
              personalizada.
            </strong>
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">2. Não Formação de Vínculo</h2>
          <p>
            O envio de mensagens através de formulários, e-mails ou WhatsApp não
            estabelece automaticamente relação cliente-advogado. O vínculo
            profissional só é formado mediante a assinatura de contrato específico
            de prestação de serviços jurídicos.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo deste site (textos, artigos, design, logotipos) é de
            propriedade exclusiva da CBM Agro e Gestão de Passivos. A reprodução,
            distribuição ou modificação do conteúdo sem autorização expressa é
            proibida, exceto para uso pessoal e não comercial, desde que citada a
            fonte.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">4. Limitação de Responsabilidade</h2>
          <p>
            A CBM Agro envida esforços para manter as informações atualizadas, mas
            não garante que o conteúdo reflita as decisões judiciais ou legislações
            mais recentes no momento exato do seu acesso, dada a dinâmica do
            direito. Não nos responsabilizamos por ações tomadas baseadas
            exclusivamente nos textos aqui publicados sem consulta prévia.
          </p>

          <h2 className="text-2xl font-bold text-teal mt-10 mb-4">5. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento. A continuação do uso do site após as alterações constitui
            aceitação dos novos termos.
          </p>
    </LegalDocumentLayout>
  )
}
