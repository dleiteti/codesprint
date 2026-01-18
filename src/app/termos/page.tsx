import Link from 'next/link';
import Image from 'next/image';

export default function Termos() {
    return (
        <main className="min-h-screen bg-[#0B1120] text-gray-300">
            {/* Header */}
            <header className="px-6 py-6 border-b border-gray-800">
                <nav className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Image src="/logo.png" alt="CodeSprint" width={200} height={50} className="h-12 w-auto" />
                    </Link>
                    <Link href="/" className="text-sm text-[#1B8A4A] hover:underline">
                        ← Voltar ao início
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Termos de Uso
                </h1>

                <p className="text-sm text-gray-500 mb-8">
                    Última atualização: 09 de janeiro de 2026
                </p>

                <div className="space-y-8 text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar o site da <strong className="text-white">CodeSprint</strong> (codesprint.com.br),
                            você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer
                            parte destes termos, não deve utilizar nosso site ou serviços.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Descrição dos Serviços</h2>
                        <p className="mb-4">A CodeSprint oferece serviços de desenvolvimento de software, incluindo:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Criação de landing pages e sites institucionais;</li>
                            <li>Desenvolvimento de aplicativos web e mobile;</li>
                            <li>Automação de processos com inteligência artificial;</li>
                            <li>Sistemas personalizados sob demanda;</li>
                            <li>Manutenção e suporte técnico.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Orçamentos e Contratação</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Todos os orçamentos são gratuitos e sem compromisso;</li>
                            <li>Os valores apresentados são válidos por 7 (sete) dias, salvo indicação contrária;</li>
                            <li>A contratação formal ocorre mediante proposta comercial e aceite por escrito;</li>
                            <li>Prazos de entrega são definidos no contrato individual de cada projeto.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Propriedade Intelectual</h2>
                        <p>
                            Todo o conteúdo deste site, incluindo textos, imagens, logos, design e código-fonte, é de propriedade
                            exclusiva da CodeSprint ou licenciado para uso. É proibida a reprodução, distribuição ou uso comercial
                            sem autorização prévia por escrito.
                        </p>
                        <p className="mt-4">
                            Os projetos desenvolvidos para clientes terão a propriedade intelectual transferida mediante
                            pagamento integral dos valores contratados, conforme estipulado em contrato específico.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">5. Responsabilidades do Cliente</h2>
                        <p className="mb-4">O cliente se compromete a:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Fornecer informações verdadeiras e atualizadas;</li>
                            <li>Disponibilizar materiais necessários (textos, imagens, logos) em tempo hábil;</li>
                            <li>Realizar feedbacks e aprovações dentro dos prazos acordados;</li>
                            <li>Efetuar os pagamentos nas datas acordadas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">6. Limitação de Responsabilidade</h2>
                        <p>
                            A CodeSprint não se responsabiliza por:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                            <li>Danos indiretos, incidentais ou consequenciais;</li>
                            <li>Perda de dados causada por falhas de terceiros (hospedagem, domínio);</li>
                            <li>Resultados de negócio esperados pelo cliente;</li>
                            <li>Interrupções de serviço fora de nosso controle.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">7. Garantia e Suporte</h2>
                        <p>
                            Oferecemos garantia de 30 (trinta) dias para correção de bugs e ajustes técnicos após a entrega final
                            do projeto. Alterações de escopo, novas funcionalidades ou mudanças substanciais são consideradas
                            novos serviços e serão orçadas separadamente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">8. Política de Cancelamento</h2>
                        <p>
                            Em caso de cancelamento pelo cliente após o início do projeto, os valores referentes ao trabalho
                            já executado serão devidos. A CodeSprint reserva-se o direito de cancelar contratos em caso de
                            inadimplência superior a 15 (quinze) dias.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">9. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações serão
                            publicadas nesta página com a data de atualização. O uso continuado do site após alterações
                            constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">10. Legislação Aplicável</h2>
                        <p>
                            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                            será resolvida no foro da Comarca do Rio de Janeiro, RJ, com renúncia expressa a qualquer outro.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">11. Contato</h2>
                        <p>
                            Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do
                            WhatsApp: <a href="https://wa.me/5511960552522" className="text-[#1B8A4A] hover:underline">(11) 96055-2522</a>
                        </p>
                    </section>
                </div>
            </article>

            {/* Footer */}
            <footer className="border-t border-gray-800 px-6 py-8">
                <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
                    <p>© 2026 CodeSprint. Todos os direitos reservados.</p>
                    <div className="mt-4 space-x-4">
                        <Link href="/privacidade" className="text-[#1B8A4A] hover:underline">Política de Privacidade</Link>
                        <Link href="/termos" className="text-[#1B8A4A] hover:underline">Termos de Uso</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
