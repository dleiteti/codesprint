import Link from 'next/link';
import Image from 'next/image';

export default function Privacidade() {
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
                    Política de Privacidade
                </h1>

                <p className="text-sm text-gray-500 mb-8">
                    Última atualização: 09 de janeiro de 2026
                </p>

                <div className="space-y-8 text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Introdução</h2>
                        <p>
                            A <strong className="text-white">CodeSprint</strong> ("nós", "nosso" ou "empresa") está comprometida
                            em proteger a privacidade dos visitantes do nosso site e clientes. Esta Política de Privacidade
                            explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade
                            com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Dados que Coletamos</h2>
                        <p className="mb-4">Podemos coletar os seguintes tipos de informações:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong className="text-white">Dados de identificação:</strong> nome, e-mail, telefone fornecidos voluntariamente via WhatsApp ou formulários.</li>
                            <li><strong className="text-white">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência (via cookies e ferramentas de análise).</li>
                            <li><strong className="text-white">Dados de projeto:</strong> informações sobre suas necessidades de desenvolvimento, briefings e requisitos técnicos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Finalidade do Tratamento</h2>
                        <p className="mb-4">Utilizamos seus dados para:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Responder suas solicitações de orçamento e contato;</li>
                            <li>Desenvolver e entregar os serviços contratados;</li>
                            <li>Enviar comunicações sobre o andamento do projeto;</li>
                            <li>Melhorar nosso site e serviços através de análises;</li>
                            <li>Cumprir obrigações legais e contratuais.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Compartilhamento de Dados</h2>
                        <p>
                            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
                            Podemos compartilhar dados apenas com:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                            <li>Prestadores de serviços essenciais (hospedagem, processamento de pagamentos);</li>
                            <li>Autoridades competentes, quando exigido por lei;</li>
                            <li>Parceiros técnicos, mediante seu consentimento prévio.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">5. Seus Direitos (LGPD)</h2>
                        <p className="mb-4">Conforme a LGPD, você tem direito a:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Confirmar a existência de tratamento de dados;</li>
                            <li>Acessar seus dados pessoais;</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                            <li>Solicitar a anonimização, bloqueio ou eliminação de dados;</li>
                            <li>Revogar o consentimento a qualquer momento;</li>
                            <li>Solicitar a portabilidade dos dados.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
                        <p>
                            Utilizamos cookies para melhorar sua experiência de navegação e coletar dados analíticos.
                            Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">7. Segurança</h2>
                        <p>
                            Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados contra
                            acesso não autorizado, alteração, divulgação ou destruição.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">8. Contato</h2>
                        <p>
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco
                            através do WhatsApp: <a href="https://wa.me/5511960552522" className="text-[#1B8A4A] hover:underline">(11) 96055-2522</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">9. Alterações</h2>
                        <p>
                            Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente.
                            Alterações significativas serão comunicadas em nosso site.
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
