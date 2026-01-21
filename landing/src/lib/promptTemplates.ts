// 30 Templates de Prompts para Geração de Mockups
// REGRA: Sempre usar dados REAIS do lead, templates variam apenas estilo/estrutura

export interface PromptTemplate {
    id: number;
    name: string;
    category: 'estilo' | 'estrutura' | 'cta' | 'social';
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

// Bloco de dados do lead - SEMPRE incluído em todos os prompts
const buildLeadDataBlock = (data: BriefingData) => `
📋 **DADOS DO CLIENTE (USAR INTEGRALMENTE):**
- **Empresa:** ${data.empresa || 'Não informado'}
- **Nicho:** ${data.nicho || 'Não informado'}
- **Objetivo:** ${data.objetivo || 'Não especificado'}
- **Público-Alvo:** ${data.publico_resumo || 'Não especificado'}
- **Diferencial:** ${data.diferencial_curto || 'Não especificado'}
- **Cores Preferidas:** ${data.cores_preferidas || 'Deixar a critério'}
- **Estilo Desejado:** ${data.clima || 'Não especificado'}
- **Referência Visual:** ${data.referencia_visual || 'Nenhuma'}
`;

const BASE_RULES = `
⚠️ **REGRAS OBRIGATÓRIAS:**
1. TODOS os textos DEVEM estar em PORTUGUÊS BRASILEIRO
2. Nome "${'{EMPRESA}'}" deve aparecer no topo
3. Botão principal: "Chame no WhatsApp" ou "Fale Conosco"
4. Respeitar o NICHO informado pelo cliente
5. Design mobile-first
`;

export const promptTemplates: PromptTemplate[] = [
    // ============ CATEGORIA 1: ESTILO VISUAL (1-8) ============
    {
        id: 1,
        name: "Dark Mode Neon",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: DARK MODE NEON**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Fundo escuro (#0B1120 ou preto)
- Acentos em neon (verde/ciano) OU cores do cliente se informadas
- Tipografia bold e grande
- Efeitos de glow nos botões e ícones

**ESTRUTURA:**
- Hero com headline para o nicho ${data.nicho}
- Benefícios com ícones neon
- Depoimentos em cards escuros
- CTA "Chame no WhatsApp" com glow
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 2,
        name: "Light Minimal Clean",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: LIGHT MINIMAL CLEAN**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Fundo branco ou off-white (#FAFAFA)
- Muito espaço em branco
- Tipografia fina e elegante
- Cores do cliente como accent sutil

**ESTRUTURA:**
- Hero clean com poucos elementos
- Cards de benefícios minimalistas
- Depoimentos elegantes
- CTA verde escuro
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 3,
        name: "Gradient Vibrante",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: GRADIENT VIBRANTE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Gradientes coloridos vibrantes
- Formas orgânicas e fluidas
- Tipografia moderna e jovem
- Visual energético

**ESTRUTURA:**
- Hero com background gradient
- Elementos flutuantes
- Cards com glassmorphism
- Botão WhatsApp colorido
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 4,
        name: "Corporate Confiável",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: CORPORATE CONFIÁVEL**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Cores sóbrias (azul escuro, cinza, branco)
- Visual sério e profissional
- Badges de confiança
- Tipografia tradicional

**ESTRUTURA:**
- Hero com foto profissional
- "Por que nos escolher"
- Logos de parceiros
- Depoimentos com foto
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 5,
        name: "Warm Acolhedor",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: WARM ACOLHEDOR**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Cores quentes (bege, terracota, marrom)
- Fotos lifestyle com pessoas
- Visual caseiro e confortável
- Tipografia com personalidade

**ESTRUTURA:**
- Hero calorosa
- "Nossa História"
- Galeria de momentos
- CTA "Vamos Conversar?"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 6,
        name: "Luxury Premium",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: LUXURY PREMIUM**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Cores: preto, dourado (#D4AF37), branco
- Tipografia serif elegante
- Espaçamento generoso
- Visual de alto padrão

**ESTRUTURA:**
- Hero sofisticada
- "Experiência Exclusiva"
- Galeria premium
- CTA "Agende sua Experiência"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 7,
        name: "Bold Impactante",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: BOLD IMPACTANTE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Tipografia ENORME e bold
- Contraste alto (preto/branco + accent)
- Elementos grandes e ousados
- Animações de impacto

**ESTRUTURA:**
- Hero com texto gigante
- Números em destaque
- Benefícios com ícones grandes
- CTA impossível de ignorar
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 8,
        name: "Pastel Suave",
        category: "estilo",
        categoryLabel: "🎨 Estilo Visual",
        buildPrompt: (data) => `
🎨 **MOCKUP: PASTEL SUAVE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**APLICAR ESTILO:**
- Cores pastel suaves (rosa, azul bebê, lavanda)
- Visual delicado e feminino
- Formas arredondadas
- Ilustrações sutis

**ESTRUTURA:**
- Hero acolhedora
- Benefícios em cards soft
- Depoimentos delicados
- CTA suave
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },

    // ============ CATEGORIA 2: ESTRUTURA (9-16) ============
    {
        id: 9,
        name: "Hero Full Screen",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: HERO FULL SCREEN**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Hero ocupa 100vh (tela inteira)
- Headline GIGANTE no centro relacionada ao nicho
- Apenas 1 botão CTA enorme
- Background com foto ou gradient

**DEMAIS SEÇÕES:**
- Scroll revela benefícios
- Prova social
- FAQ
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 10,
        name: "Split Hero 50/50",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: SPLIT HERO 50/50**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Hero dividida: 50% texto / 50% imagem
- Lado esquerdo: headline + CTA
- Lado direito: foto do nicho ${data.nicho}
- Alinhamento vertical centralizado

**DEMAIS SEÇÕES:**
- 3 cards de benefícios
- Depoimentos
- CTA final
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 11,
        name: "Video Background",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: VIDEO BACKGROUND**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Hero com vídeo em loop de fundo
- Overlay escuro para legibilidade
- Texto branco grande por cima
- Vídeo relacionado ao nicho ${data.nicho}

**DEMAIS SEÇÕES:**
- Transição para seção clara
- Timeline de benefícios
- Depoimentos
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 12,
        name: "Product Showcase",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: PRODUCT SHOWCASE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Produto/serviço ENORME no centro
- Múltiplos ângulos ou detalhes
- Specs/características ao redor
- Preço em destaque (se aplicável)

**DEMAIS SEÇÕES:**
- Como funciona (3 passos)
- Comparativo
- Garantia
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 13,
        name: "Testimonial First",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: TESTIMONIAL FIRST**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Hero ABRE com depoimento impactante
- Citação grande com foto do cliente
- "Veja o que dizem sobre nós"
- Credibilidade imediata

**DEMAIS SEÇÕES:**
- Carrossel de depoimentos
- Quem somos (breve)
- Serviços/produtos
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 14,
        name: "Numbers Impact",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: NUMBERS IMPACT**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Hero com contadores animados grandes
- "+500 Clientes" / "+10 Anos" / "98% Satisfação"
- Números que impressionam

**DEMAIS SEÇÕES:**
- Gráfico de crescimento
- Timeline de conquistas
- Depoimentos com métricas
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 15,
        name: "Scroll Storytelling",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: SCROLL STORYTELLING**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Página conta uma história ao scrollar
- Seções que revelam progressivamente
- "O Problema → A Solução → O Resultado"
- Jornada visual do cliente

**DEMAIS SEÇÕES:**
- Capítulos visuais
- CTA aparece no clímax
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 16,
        name: "Grid Magazine",
        category: "estrutura",
        categoryLabel: "📐 Estrutura",
        buildPrompt: (data) => `
📐 **MOCKUP: GRID MAGAZINE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**ESTRUTURA OBRIGATÓRIA:**
- Layout estilo revista/editorial
- Grid assimétrico interessante
- Fotos grandes e textos curtos
- Visual sofisticado de magazine

**DEMAIS SEÇÕES:**
- Catálogo visual
- "Destaques"
- Footer editorial
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },

    // ============ CATEGORIA 3: CTA/CONVERSÃO (17-24) ============
    {
        id: 17,
        name: "WhatsApp Flutuante",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: WHATSAPP FLUTUANTE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Botão WhatsApp flutuante SEMPRE visível
- Animação de pulse/bounce
- Tooltip "Fale agora!"
- Verde WhatsApp (#25D366)
- "Resposta em menos de 1 hora"

**ESTRUTURA:**
- Vários pontos de CTA na página
- Horário de atendimento visível
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 18,
        name: "CTA Gigante Central",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: CTA GIGANTE CENTRAL**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Botão ENORME no centro da hero
- Ocupa 50% da largura
- Texto grande: "QUERO SABER MAIS"
- Sombra/glow chamativo
- Setas apontando para CTA
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 19,
        name: "Multiple CTAs",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: MULTIPLE CTAs**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- CADA seção termina com CTA
- Variações de texto: "Saiba Mais" / "Orçamento Grátis" / "Fale Conosco"
- Cores diferentes por seção
- Múltiplas oportunidades de conversão
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 20,
        name: "Urgency Scarcity",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: URGENCY & SCARCITY**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Timer contando regressivo
- "Últimas 5 vagas!"
- "Oferta termina hoje"
- Badge "LIMITADO"
- Preço riscado + promoção
- CTA "GARANTIR MINHA VAGA"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 21,
        name: "Soft CTA Consultivo",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: SOFT CTA CONSULTIVO**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Sem pressão de venda
- "Vamos conversar?"
- "Tire suas dúvidas"
- Cores suaves, confiança
- FAQ expandido
- CTA "Agendar Conversa Gratuita"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 22,
        name: "Form Embedded",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: FORM EMBEDDED**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Formulário DIRETO na hero (lado direito)
- Campos: Nome, WhatsApp, Email
- Botão "Enviar" destacado
- "Responderemos em 24h"
- Formulário repetido no final
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 23,
        name: "Sticky Bottom Bar",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: STICKY BOTTOM BAR**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Barra fixa no rodapé da tela
- Sempre visível ao scrollar
- "Fale Conosco" + telefone/WhatsApp
- Contraste alto com a página
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 24,
        name: "Exit Intent Popup",
        category: "cta",
        categoryLabel: "🎯 CTA/Conversão",
        buildPrompt: (data) => `
🎯 **MOCKUP: EXIT INTENT STYLE**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM CTA:**
- Visual que sugere popup de saída
- "Espera! Antes de ir..."
- Oferta especial destacada
- Desconto ou bônus exclusivo
- CTA urgente
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },

    // ============ CATEGORIA 4: PROVA SOCIAL (25-30) ============
    {
        id: 25,
        name: "Video Testimonials Grid",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: VIDEO TESTIMONIALS**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Grid de vídeos de clientes
- Thumbnails com play button
- "Veja o que nossos clientes dizem"
- Citações abaixo de cada vídeo
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 26,
        name: "Before After Results",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: BEFORE/AFTER RESULTS**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Slider de antes/depois
- Fotos lado a lado
- Métricas de transformação
- "Resultados Reais"
- CTA "Quero minha transformação"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 27,
        name: "Logo Wall Partners",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: LOGO WALL**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Grid de logos de clientes/parceiros
- "Empresas que confiam em nós"
- Logos em cinza (uniformidade)
- CTA "Junte-se a eles"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 28,
        name: "Stats Counter Animated",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: STATS COUNTER**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Números grandes animados
- "+1.500 Clientes Atendidos"
- "+50.000 Procedimentos"
- "99% Satisfação"
- Gráfico de crescimento
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 29,
        name: "Instagram Feed Embed",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: INSTAGRAM FEED**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Grid estilo Instagram
- Fotos reais do perfil
- Contador de seguidores
- Botão "Siga-nos"
- Stories highlights
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
    },
    {
        id: 30,
        name: "Case Studies Detail",
        category: "social",
        categoryLabel: "⭐ Prova Social",
        buildPrompt: (data) => `
⭐ **MOCKUP: CASE STUDIES**

Criar Landing Page para "${data.empresa || 'a marca'}" do nicho **${data.nicho || 'geral'}**.

${buildLeadDataBlock(data)}

**FOCO EM PROVA SOCIAL:**
- Mini cases detalhados
- Problema → Solução → Resultado
- Métricas específicas
- Foto do cliente + empresa
- CTA "Seja nosso próximo case"
${BASE_RULES.replace('{EMPRESA}', data.empresa || 'da marca')}`
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
        availableTemplates = promptTemplates;
    }

    const randomIndex = Math.floor(Math.random() * availableTemplates.length);
    return availableTemplates[randomIndex];
}

// Categorias para UI (removido "nicho" - agora todos respeitam o nicho do lead)
export const categories = [
    { id: 'todos', label: '🎲 Aleatório' },
    { id: 'estilo', label: '🎨 Estilo Visual' },
    { id: 'estrutura', label: '📐 Estrutura' },
    { id: 'cta', label: '🎯 CTA/Conversão' },
    { id: 'social', label: '⭐ Prova Social' }
];
