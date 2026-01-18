// 30 Templates de Prompts para Geração de Mockups
// Cada template foca em um aspecto diferente do design

export interface PromptTemplate {
    id: number;
    name: string;
    category: 'estilo' | 'estrutura' | 'cta' | 'social' | 'nicho';
    categoryLabel: string;
    buildPrompt: (data: BriefingData) => string;
}

export interface BriefingData {
    nome?: string;
    empresa?: string;
    nicho?: string;
    objetivo?: string;
    clima?: string;
    cores_preferidas?: string;
    publico_resumo?: string;
    diferencial_curto?: string;
    referencia_visual?: string;
}

const BASE_RULES = `
⚠️ **REGRAS OBRIGATÓRIAS:**
1. TODOS os textos DEVEM estar em PORTUGUÊS BRASILEIRO
2. Botão principal: "Chame no WhatsApp" ou "Fale Conosco"
3. Incluir logo/nome da empresa no topo
4. Design mobile-first
`;

export const promptTemplates: PromptTemplate[] = [
    // ============ CATEGORIA 1: ESTILO VISUAL (1-6) ============
    {
        id: 1,
        name: "Dark Mode Neon",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: DARK MODE NEON**

Criar Landing Page para "${data.empresa || 'a marca'}" com estilo DARK MODE e acentos NEON.

**ESTILO:**
- Fundo escuro (#0B1120 ou preto)
- Acentos em neon verde/ciano (#00FF88 ou #00FFFF)
- Tipografia bold e grande
- Efeitos de glow nos botões e ícones
- Formas geométricas com brilho

**ESTRUTURA:**
- Hero com headline impactante
- Seção benefícios com ícones neon
- Depoimentos em cards escuros
- CTA "Chame no WhatsApp" com glow verde

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 2,
        name: "Light Minimal Clean",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: LIGHT MINIMAL CLEAN**

Criar Landing Page para "${data.empresa || 'a marca'}" com estilo MINIMALISTA e CLEAN.

**ESTILO:**
- Fundo branco ou off-white (#FAFAFA)
- Muito espaço em branco
- Tipografia fina e elegante (Inter, Outfit)
- Tons neutros: preto, cinza, um accent sutil
- Sombras suaves, bordas arredondadas

**ESTRUTURA:**
- Hero clean com poucos elementos
- Cards de benefícios com ícones lineares
- Depoimentos minimalistas
- CTA em verde escuro elegante

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 3,
        name: "Gradient Vibrante",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: GRADIENT VIBRANTE**

Criar Landing Page para "${data.empresa || 'a marca'}" com GRADIENTES COLORIDOS.

**ESTILO:**
- Gradientes vibrantes (rosa→roxo, azul→ciano)
- Formas orgânicas e fluidas
- Tipografia moderna e jovem
- Visual energético e dinâmico
- Cores: magenta, roxo, ciano

**ESTRUTURA:**
- Hero com background gradient
- Elementos flutuantes
- Cards com glassmorphism
- Botão WhatsApp colorido

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 4,
        name: "Corporate Trust",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: CORPORATE TRUST**

Criar Landing Page para "${data.empresa || 'a marca'}" com estilo CORPORATIVO e CONFIÁVEL.

**ESTILO:**
- Cores: azul escuro (#1E3A5F), cinza, branco
- Visual sério e profissional
- Badges de confiança proeminentes
- Fotos de equipe/escritório
- Tipografia tradicional (system fonts)

**ESTRUTURA:**
- Hero com foto profissional
- Seção "Por que nos escolher"
- Logos de parceiros/clientes
- Depoimentos com foto e cargo
- CTA formal "Solicite um Orçamento"

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 5,
        name: "Warm Acolhedor",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: WARM ACOLHEDOR**

Criar Landing Page para "${data.empresa || 'a marca'}" com estilo ACOLHEDOR e HUMANO.

**ESTILO:**
- Cores quentes: bege, terracota, marrom
- Fotos lifestyle com pessoas reais
- Tipografia com personalidade
- Visual caseiro e confortável
- Ilustrações hand-drawn

**ESTRUTURA:**
- Hero com foto calorosa
- Seção "Nossa História"
- Depoimentos com emoção
- Galeria de momentos
- CTA "Vamos Conversar?"

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 6,
        name: "Luxury Gold",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: LUXURY GOLD**

Criar Landing Page para "${data.empresa || 'a marca'}" com estilo LUXUOSO e PREMIUM.

**ESTILO:**
- Cores: preto, dourado (#D4AF37), branco
- Tipografia serif elegante (Playfair Display)
- Espaçamento generoso
- Detalhes em ouro/bronze
- Visual de alto padrão

**ESTRUTURA:**
- Hero sofisticada
- "Experiência Exclusiva"
- Galeria premium
- Depoimentos de clientes VIP
- CTA "Agende sua Experiência"

**CLIENTE:** ${data.nicho || 'Geral'} | Público: ${data.publico_resumo || 'Geral'}
**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },

    // ============ CATEGORIA 2: ESTRUTURA (7-12) ============
    {
        id: 7,
        name: "Hero Full Screen",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: HERO FULL SCREEN**

Criar Landing Page para "${data.empresa || 'a marca'}" com HERO OCUPANDO 100% DA TELA.

**ESTRUTURA PRINCIPAL:**
- Hero ocupa 100vh (tela inteira)
- Headline GIGANTE no centro
- Subheadline curta
- Apenas 1 botão CTA enorme
- Background com foto ou gradient

**DEMAIS SEÇÕES:**
- Scroll revela benefícios
- Prova social compacta
- FAQ colapsável
- Footer com WhatsApp

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 8,
        name: "Split Hero 50/50",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: SPLIT HERO 50/50**

Criar Landing Page para "${data.empresa || 'a marca'}" com HERO DIVIDIDA.

**ESTRUTURA PRINCIPAL:**
- Hero dividida: 50% texto / 50% imagem
- Lado esquerdo: headline + CTA
- Lado direito: foto/produto em destaque
- Alinhamento vertical centralizado

**DEMAIS SEÇÕES:**
- 3 cards de benefícios
- Seção de depoimentos
- Preços/planos (se aplicável)
- CTA final

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 9,
        name: "Video Background",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: VIDEO BACKGROUND**

Criar Landing Page para "${data.empresa || 'a marca'}" com VÍDEO DE FUNDO.

**ESTRUTURA PRINCIPAL:**
- Hero com vídeo em loop de fundo
- Overlay escuro para legibilidade
- Texto branco grande por cima
- Botão play para ver vídeo completo

**DEMAIS SEÇÕES:**
- Transição suave para seção clara
- Benefícios em formato timeline
- Depoimentos em vídeo (thumbnails)
- CTA sticky no mobile

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 10,
        name: "Product Showcase",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: PRODUCT SHOWCASE**

Criar Landing Page para "${data.empresa || 'a marca'}" com PRODUTO EM DESTAQUE.

**ESTRUTURA PRINCIPAL:**
- Produto/serviço ENORME no centro
- Foto 360° ou múltiplos ângulos
- Specs/características ao redor
- Preço em destaque (se aplicável)

**DEMAIS SEÇÕES:**
- Como funciona (3 passos)
- Comparativo antes/depois
- Garantia em destaque
- Botão WhatsApp fixo

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 11,
        name: "Testimonial First",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: TESTIMONIAL FIRST**

Criar Landing Page para "${data.empresa || 'a marca'}" ABRINDO COM DEPOIMENTO.

**ESTRUTURA PRINCIPAL:**
- Hero abre com depoimento impactante
- Citação grande com foto do cliente
- "Veja o que dizem sobre nós"
- Credibilidade imediata

**DEMAIS SEÇÕES:**
- Carrossel de mais depoimentos
- Quem somos (breve)
- Serviços/produtos
- CTA "Seja o próximo case"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 12,
        name: "Numbers Impact",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: NUMBERS IMPACT**

Criar Landing Page para "${data.empresa || 'a marca'}" com NÚMEROS IMPACTANTES.

**ESTRUTURA PRINCIPAL:**
- Hero com contadores animados
- "+500 Clientes Satisfeitos"
- "+10 Anos de Experiência"
- "98% Aprovação"

**DEMAIS SEÇÕES:**
- Gráfico de crescimento
- Timeline de conquistas
- Depoimentos com métricas
- CTA "Faça parte dessa história"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },

    // ============ CATEGORIA 3: CTA/CONVERSÃO (13-18) ============
    {
        id: 13,
        name: "WhatsApp Flutuante",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: WHATSAPP FLUTUANTE**

Criar Landing Page para "${data.empresa || 'a marca'}" com FOCO EM WHATSAPP.

**CTA PRINCIPAL:**
- Botão WhatsApp flutuante no canto
- Animação de pulse/bounce
- Tooltip "Fale agora!"
- Verde WhatsApp (#25D366)

**ESTRUTURA:**
- Vários pontos de CTA na página
- Menções constantes ao WhatsApp
- "Resposta em menos de 1 hora"
- Horário de atendimento visível

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 14,
        name: "CTA Gigante Central",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: CTA GIGANTE CENTRAL**

Criar Landing Page para "${data.empresa || 'a marca'}" com CTA IMPOSSÍVEL DE IGNORAR.

**CTA PRINCIPAL:**
- Botão ENORME no centro da hero
- Ocupa 50% da largura
- Texto grande: "QUERO SABER MAIS"
- Sombra/glow chamativo

**ESTRUTURA:**
- Tudo leva ao botão central
- Setas apontando para CTA
- Texto de urgência acima
- Garantia abaixo do botão

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 15,
        name: "Multiple CTAs",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: MULTIPLE CTAs**

Criar Landing Page para "${data.empresa || 'a marca'}" com CTAs EM TODA SEÇÃO.

**ESTRATÉGIA:**
- Cada seção termina com CTA
- Variações de texto nos botões
- "Saiba Mais" / "Orçamento Grátis" / "Fale Conosco"
- Cores diferentes por seção

**ESTRUTURA:**
- Hero + CTA
- Benefícios + CTA
- Depoimentos + CTA
- FAQ + CTA Final

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 16,
        name: "Urgency Scarcity",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: URGENCY & SCARCITY**

Criar Landing Page para "${data.empresa || 'a marca'}" com GATILHOS DE URGÊNCIA.

**ELEMENTOS:**
- Timer contando regressivo
- "Últimas 5 vagas!"
- "Oferta termina hoje"
- Badge "LIMITADO"
- Cor vermelha para urgência

**ESTRUTURA:**
- Banner de urgência no topo
- Hero com timer
- Preço riscado + promoção
- CTA "GARANTIR MINHA VAGA"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 17,
        name: "Soft CTA Consultivo",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: SOFT CTA CONSULTIVO**

Criar Landing Page para "${data.empresa || 'a marca'}" com ABORDAGEM SUAVE.

**ESTILO:**
- Sem pressão de venda
- "Vamos conversar?"
- "Tire suas dúvidas"
- Cores suaves, azul confiança

**ESTRUTURA:**
- Hero informativa
- Muito conteúdo de valor
- FAQ expandido
- CTA "Agendar Conversa Gratuita"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 18,
        name: "Form Embedded",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: FORM EMBEDDED**

Criar Landing Page para "${data.empresa || 'a marca'}" com FORMULÁRIO NA HERO.

**ESTRUTURA:**
- Hero com formulário à direita
- Campos: Nome, WhatsApp, Email
- Botão "Enviar" destacado
- "Responderemos em 24h"

**DEMAIS SEÇÕES:**
- Por que preencher (benefícios)
- O que acontece depois
- Depoimentos de quem preencheu
- Formulário repetido no final

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },

    // ============ CATEGORIA 4: PROVA SOCIAL (19-24) ============
    {
        id: 19,
        name: "Video Testimonials Grid",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: VIDEO TESTIMONIALS**

Criar Landing Page para "${data.empresa || 'a marca'}" com DEPOIMENTOS EM VÍDEO.

**DESTAQUE:**
- Grid de vídeos de clientes
- Thumbnails com play button
- Citações abaixo de cada vídeo
- "Veja o que nossos clientes dizem"

**ESTRUTURA:**
- Hero com headline de resultado
- Grid 2x3 de vídeos
- CTA entre vídeos
- Mais depoimentos em texto

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 20,
        name: "Before After Results",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: BEFORE/AFTER RESULTS**

Criar Landing Page para "${data.empresa || 'a marca'}" com ANTES E DEPOIS.

**DESTAQUE:**
- Slider de antes/depois
- Fotos lado a lado
- Métricas de transformação
- "Resultados Reais"

**ESTRUTURA:**
- Hero com caso de sucesso
- Galeria de transformações
- Depoimento do cliente transformado
- CTA "Quero minha transformação"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 21,
        name: "Logo Wall Partners",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: LOGO WALL**

Criar Landing Page para "${data.empresa || 'a marca'}" com PAREDE DE LOGOS.

**DESTAQUE:**
- Grid de logos de clientes/parceiros
- "Empresas que confiam em nós"
- Logos em cinza (uniformidade)
- Scroll infinito de logos

**ESTRUTURA:**
- Hero institucional
- Logo wall proeminente
- Cases de sucesso por empresa
- CTA "Junte-se a eles"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 22,
        name: "Stats Counter Animated",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: STATS COUNTER**

Criar Landing Page para "${data.empresa || 'a marca'}" com CONTADORES ANIMADOS.

**DESTAQUE:**
- Números grandes animados
- "+1.500 Clientes Atendidos"
- "+50.000 Procedimentos"
- "99% Satisfação"

**ESTRUTURA:**
- Hero com resultado principal
- Barra de stats animada
- Gráfico de crescimento
- Linha do tempo de conquistas

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 23,
        name: "Instagram Feed Embed",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: INSTAGRAM FEED**

Criar Landing Page para "${data.empresa || 'a marca'}" com FEED DO INSTAGRAM.

**DESTAQUE:**
- Grid estilo Instagram
- Fotos reais do perfil
- Contador de seguidores
- Botão "Siga-nos"

**ESTRUTURA:**
- Hero com @perfil
- Feed integrado
- Stories highlights
- Depoimentos de DMs
- CTA WhatsApp

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },
    {
        id: 24,
        name: "Case Studies Detail",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: CASE STUDIES**

Criar Landing Page para "${data.empresa || 'a marca'}" com CASOS DE SUCESSO.

**DESTAQUE:**
- Mini cases detalhados
- Problema → Solução → Resultado
- Métricas específicas
- Foto do cliente + empresa

**ESTRUTURA:**
- Hero com case principal
- 3 cases em cards
- Botão "Ver todos os cases"
- CTA "Seja nosso próximo case"

**CLIENTE:** ${data.nicho || 'Geral'} | Objetivo: ${data.objetivo || 'Conversão'}
${BASE_RULES}`
    },

    // ============ CATEGORIA 5: NICHO ESPECÍFICO (25-30) ============
    {
        id: 25,
        name: "Beauty Estética",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
💄 **MOCKUP: NICHO BEAUTY/ESTÉTICA**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO ESTÉTICA.

**ESTILO ESPECÍFICO:**
- Cores: rosa, nude, rose gold
- Fotos de antes/depois
- Visual feminino e delicado
- Tipografia elegante

**ELEMENTOS:**
- Galeria de resultados
- Procedimentos oferecidos
- Certificações/especializações
- Agenda online / WhatsApp

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 26,
        name: "Fitness Energia",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
💪 **MOCKUP: NICHO FITNESS**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO FITNESS.

**ESTILO ESPECÍFICO:**
- Cores: vermelho, laranja, preto
- Fotos de pessoas em ação
- Visual energético e motivacional
- Tipografia bold e impactante

**ELEMENTOS:**
- Transformações físicas
- Planos/pacotes de treino
- Depoimentos com fotos
- CTA "Comece sua transformação"

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 27,
        name: "Advocacia Jurídico",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
⚖️ **MOCKUP: NICHO ADVOCACIA**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO JURÍDICO.

**ESTILO ESPECÍFICO:**
- Cores: azul escuro, dourado, branco
- Visual sério e confiável
- Fotos de escritório/advogados
- Tipografia clássica

**ELEMENTOS:**
- Áreas de atuação
- Equipe/advogados
- Casos de sucesso (sem nomes)
- Consulta gratuita

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 28,
        name: "Educação Cursos",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
📚 **MOCKUP: NICHO EDUCAÇÃO**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO EDUCAÇÃO.

**ESTILO ESPECÍFICO:**
- Cores: azul, verde, laranja vibrante
- Ilustrações e ícones amigáveis
- Visual acessível e moderno
- Fotos de alunos/aulas

**ELEMENTOS:**
- Grade curricular
- Depoimentos de alunos
- Certificado/diploma
- CTA "Matricule-se agora"

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 29,
        name: "Moda Fashion",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
👗 **MOCKUP: NICHO MODA**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO MODA/ROUPAS.

**ESTILO ESPECÍFICO:**
- Visual editorial de revista
- Grid de produtos
- Fotos lifestyle
- Tipografia fashion (serif + sans)

**ELEMENTOS:**
- Lookbook/catálogo
- Categorias de produtos
- Novidades/lançamentos
- CTA "Ver Coleção" / "Comprar"

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    },
    {
        id: 30,
        name: "Alimentação Food",
        category: "nicho",
        categoryLabel: "💼 Nicho Específico",
        buildPrompt: (data) => `
🍽️ **MOCKUP: NICHO ALIMENTAÇÃO**

Criar Landing Page para "${data.empresa || 'a marca'}" do NICHO FOOD.

**ESTILO ESPECÍFICO:**
- Cores quentes: vermelho, laranja, amarelo
- Fotos de comida bem produzidas
- Visual apetitoso e acolhedor
- Tipografia divertida

**ELEMENTOS:**
- Menu/cardápio visual
- Fotos dos pratos
- Avaliações/ratings
- CTA "Faça seu Pedido"

**OBJETIVO:** ${data.objetivo || 'Conversão'}
**DIFERENCIAL:** ${data.diferencial_curto || '-'}
${BASE_RULES}`
    }
];

// Função para pegar próximo template (evita repetição)
export function getNextTemplate(usedIds: number[], preferCategory?: string): PromptTemplate {
    let availableTemplates = promptTemplates.filter(t => !usedIds.includes(t.id));

    if (preferCategory && preferCategory !== 'todos') {
        const filtered = availableTemplates.filter(t => t.category === preferCategory);
        if (filtered.length > 0) availableTemplates = filtered;
    }

    if (availableTemplates.length === 0) {
        // Reinicia se usou todos
        availableTemplates = promptTemplates;
    }

    // Pega aleatório dos disponíveis
    const randomIndex = Math.floor(Math.random() * availableTemplates.length);
    return availableTemplates[randomIndex];
}

// Categorias para UI
export const categories = [
    { id: 'todos', label: '🎲 Aleatório' },
    { id: 'estilo', label: '🎨 Estilo Visual' },
    { id: 'estrutura', label: '📐 Estrutura' },
    { id: 'cta', label: '🎯 CTA/Conversão' },
    { id: 'social', label: '⭐ Prova Social' },
    { id: 'nicho', label: '💼 Nicho Específico' }
];
