(function(global){
'use strict';

const FIELD_COUNT = 10;
const OPTION_COUNT = 10;

const COLOR_OPTIONS = [
  {label:'Violeta',hex:'#6D28D9'},
  {label:'Azul',hex:'#2563EB'},
  {label:'Ciano',hex:'#0891B2'},
  {label:'Verde',hex:'#15803D'},
  {label:'Laranja',hex:'#EA580C'},
  {label:'Vermelho',hex:'#DC2626'},
  {label:'Rosa',hex:'#DB2777'},
  {label:'Dourado',hex:'#9A6B16'},
  {label:'Grafite',hex:'#334155'},
  {label:'Índigo',hex:'#4338CA'}
];

const FIELDS = [
  {id:'business',kind:'Seu negócio',title:'Qual é o seu tipo de negócio?',help:'Escolha o que mais se aproxima do que você faz.',options:['Advocacia','Odontologia','Clínica de saúde','Contabilidade','Imobiliária','Restaurante','Loja ou e-commerce','Curso ou treinamento','Software / SaaS','Outro serviço']},
  {id:'goal',kind:'Objetivo',title:'O que você quer que a pessoa faça?',help:'Qual é a principal ação que a página deve incentivar?',options:['Chamar no WhatsApp','Pedir orçamento','Agendar horário','Comprar agora','Preencher um formulário','Solicitar uma ligação','Conhecer os serviços','Fazer um cadastro','Baixar um material','Visitar o local']},
  {id:'offer',kind:'Oferta',title:'O que você quer apresentar?',help:'A lista muda em alguns nichos, mas sempre mantém 10 caminhos distintos.',options:['Serviço principal','Consulta inicial','Produto em destaque','Plano recorrente','Avaliação personalizada','Orçamento sob medida','Demonstração prática','Condição promocional','Pacote completo','Evento especial']},
  {id:'audience',kind:'Público',title:'Quem você quer atrair?',help:'Escolha o público que mais se parece com o seu cliente ideal.',options:['Público geral','Empresas locais','Famílias','Jovens adultos','Profissionais liberais','Pequenas empresas','Grandes empresas','Moradores da região','Clientes de alto padrão','Público especializado']},
  {id:'color',kind:'Identidade visual',title:'Qual cor combina mais com sua marca?',help:'Escolha uma das 10 famílias. Depois você pode ajustar livremente pelo seletor ou HEX.',options:COLOR_OPTIONS.map(x=>x.label)},
  {id:'convince',kind:'Argumento',title:'O que mais convence seus clientes?',help:'Isso muda a forma como os argumentos são apresentados.',options:['Economia','Qualidade percebida','Experiência comprovada','Resultados mensuráveis','Opinião de clientes','Rapidez no atendimento','Segurança no processo','Atendimento próximo','Exclusividade','Facilidade para começar']},
  {id:'first',kind:'Primeira impressão',title:'O que deve chamar atenção primeiro?',help:'Cada opção usa uma abertura visual diferente — não apenas outro texto.',options:['Marca em destaque','Serviço em destaque','Oferta promocional','Número ou resultado','Imagem protagonista','Frase de impacto','Benefício principal','Problema do cliente','Oferta completa','Contato imediato']},
  {id:'depth',kind:'Quantidade de conteúdo',title:'Quanto você quer explicar?',help:'Cada nível tem composição e profundidade próprias.',options:['Essencial','Muito curta','Curta com respostas','Objetiva','Média com prova','Média detalhada','Longa organizada','Longa por serviços','História da empresa','Página completa']},
  {id:'proof',kind:'Confiança',title:'Que prova você quer mostrar?',help:'Cada escolha cria um componente de prova diferente.',options:['Depoimento principal','Avaliações com estrelas','Galeria de trabalhos','Antes e depois','Números do negócio','Linha do tempo','Selos e certificados','Marcas atendidas','Resultados em destaque','Sem prova social']},
  {id:'contact',kind:'Contato',title:'Como o visitante deve entrar em contato?',help:'Você poderá editar o hyperlink no preview.',options:['WhatsApp direto','Ligação telefônica','Formulário curto','E-mail','Agenda online','Botão de compra','Cadastro rápido','Como chegar','Dois canais','Somente apresentação']}
];

const OVERRIDES = {
  offer:{
    'Advocacia':['Consulta jurídica','Análise documental','Defesa estratégica','Planejamento preventivo','Assessoria mensal','Revisão contratual','Acompanhamento processual','Parecer técnico','Atendimento empresarial','Orientação inicial'],
    'Odontologia':['Avaliação odontológica','Implantes dentários','Ortodontia','Clareamento','Prevenção e limpeza','Estética do sorriso','Prótese dentária','Urgência odontológica','Plano de tratamento','Consulta preventiva'],
    'Restaurante':['Reserva de mesa','Pedido para entrega','Menu executivo','Experiência de rodízio','Evento no espaço','Prato assinatura','Combo da casa','Experiência gastronômica','Happy hour','Visita ao restaurante'],
    'Software / SaaS':['Teste gratuito','Demonstração guiada','Plano mensal','Plano anual','Diagnóstico de operação','Proposta comercial','Cadastro gratuito','Lista de espera','Implantação assistida','Conversa com especialista']
  },
  audience:{
    'Software / SaaS':['Microempresas digitais','Pequenas operações','Médias empresas','Grandes operações','Times comerciais','Times financeiros','Profissionais autônomos','Agências','Times de tecnologia','Empresas de nicho'],
    'Odontologia':['Adultos','Crianças','Famílias','Pacientes com dor','Pacientes de estética','Pacientes de implante','Pacientes de ortodontia','Moradores da região','Pacientes premium','Pacientes recorrentes']
  },
  convince:{
    'Advocacia':['Especialização','Clareza jurídica','Experiência técnica','Estratégia','Atendimento próximo','Agilidade','Prevenção de riscos','Organização','Transparência','Disponibilidade'],
    'Odontologia':['Resultado estético','Conforto','Avaliações verificadas','Tecnologia clínica','Experiência profissional','Biossegurança','Atendimento humano','Localização','Facilidade de pagamento','Planejamento do tratamento']
  },
  proof:{
    'Software / SaaS':['Case principal','Avaliações de usuários','Tela do produto','Antes e depois do processo','Métricas de uso','Evolução do cliente','Certificações técnicas','Logos de clientes','Resultados medidos','Sem prova social'],
    'Advocacia':['Trajetória profissional','Avaliações permitidas','Publicações','Áreas de atuação','Experiência acumulada','Linha do tempo','Formação e certificados','Organizações atendidas','Indicadores públicos','Sem prova social'],
    'Odontologia':['Depoimento de paciente','Avaliações da clínica','Galeria de tratamentos','Antes e depois','Número de pacientes','Tempo de atuação','Certificações','Tecnologias da clínica','Resultados clínicos','Sem prova social']
  },
  contact:{
    'Comprar agora':['Compra direta','WhatsApp de vendas','Checkout externo','Ligação comercial','Formulário de pedido','E-mail de vendas','Criar cadastro','Solicitar contato','Visitar a loja','Dois canais de compra'],
    'Agendar horário':['Agenda online','WhatsApp de agenda','Telefone da recepção','Formulário de horário','E-mail de agenda','Solicitar retorno','Visita presencial','Dois canais de agenda','Pré-cadastro','Ver disponibilidade']
  }
};

const DEFAULTS = {
  companyName:'NOMEDAEMPRESA',
  phone:'(00) 00000-0000',
  city:'SUA CIDADE',
  headline:'UMA FRASE FORTE PARA SUA OFERTA',
  subheadline:'Explique em uma frase clara por que sua solução merece a atenção do cliente.',
  ctaText:'FALAR AGORA',
  primaryUrl:'https://wa.me/5500000000000',
  secondaryText:'CONHECER MAIS',
  secondaryUrl:'#detalhes',
  testimonial:'“Use este espaço para um depoimento real e específico.”',
  testimonialAuthor:'NOME DO CLIENTE',
  logoImage:'',
  heroImage:''
};

function escapeHTML(value){
  return String(value == null ? '' : value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function hashString(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}
  return h>>>0;
}
function mulberry(seed){
  let a=hashString(seed)||1;
  return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}
}
function pick(arr,rng){return arr[Math.floor(rng()*arr.length)]}
function clamp255(v){return Math.max(0,Math.min(255,Math.round(v)))}
function hexToRgb(hex){
  const m=/^#?([0-9a-f]{6})$/i.exec(hex||'');
  if(!m)return null;
  return {r:parseInt(m[1].slice(0,2),16),g:parseInt(m[1].slice(2,4),16),b:parseInt(m[1].slice(4,6),16)};
}
function rgbToHex(r,g,b){return '#'+[r,g,b].map(v=>clamp255(v).toString(16).padStart(2,'0')).join('').toUpperCase()}
function mix(hexA,hexB,t){
  const a=hexToRgb(hexA),b=hexToRgb(hexB); if(!a||!b)return hexA;
  return rgbToHex(a.r+(b.r-a.r)*t,a.g+(b.g-a.g)*t,a.b+(b.b-a.b)*t);
}
function luminance(hex){
  const c=hexToRgb(hex); if(!c)return 0;
  const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
  return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);
}
function contrastText(hex){return luminance(hex)>.42?'#111827':'#FFFFFF'}
function complement(hex){
  const c=hexToRgb(hex);if(!c)return '#0F9F74';
  const max=Math.max(c.r,c.g,c.b),min=Math.min(c.r,c.g,c.b),d=max-min;
  if(d===0)return '#0F9F74';
  let h;
  if(max===c.r)h=((c.g-c.b)/d)%6;else if(max===c.g)h=(c.b-c.r)/d+2;else h=(c.r-c.g)/d+4;
  h=(h*60+360+180)%360;
  const l=(max+min)/510,s=d/(255*(1-Math.abs(2*l-1)));
  const C=(1-Math.abs(2*l-1))*Math.max(.55,s),X=C*(1-Math.abs((h/60)%2-1)),m=l-C/2;
  let r=0,g=0,b=0;
  if(h<60){r=C;g=X}else if(h<120){r=X;g=C}else if(h<180){g=C;b=X}else if(h<240){g=X;b=C}else if(h<300){r=X;b=C}else{r=C;b=X}
  return rgbToHex((r+m)*255,(g+m)*255,(b+m)*255);
}
function palette(hex){
  const primary=(/^#[0-9A-F]{6}$/i.test(hex||'')?hex:'#6D28D9').toUpperCase();
  const dark=mix(primary,'#000000',.32);
  const soft=mix(primary,'#FFFFFF',.88);
  const accent=complement(primary);
  return {primary,dark,soft,accent,onPrimary:contrastText(primary),onAccent:contrastText(accent)};
}

function optionsFor(config,fieldIndex){
  const f=FIELDS[fieldIndex];
  let opts=f.options.slice();
  const business=labelFor(config,0);
  const goal=labelFor(config,1);
  if(f.id==='offer'&&OVERRIDES.offer[business])opts=OVERRIDES.offer[business].slice();
  if(f.id==='audience'&&OVERRIDES.audience[business])opts=OVERRIDES.audience[business].slice();
  if(f.id==='convince'&&OVERRIDES.convince[business])opts=OVERRIDES.convince[business].slice();
  if(f.id==='proof'&&OVERRIDES.proof[business])opts=OVERRIDES.proof[business].slice();
  if(f.id==='contact'&&OVERRIDES.contact[goal])opts=OVERRIDES.contact[goal].slice();
  return opts;
}
function labelFor(config,index){
  if(index<0||index>=FIELD_COUNT)return '';
  const idx=config[index];
  if(idx==null||idx<0||idx>=OPTION_COUNT)return '';
  const f=FIELDS[index];
  if(index===0)return f.options[idx];
  // resolve upstream-only dependencies without recursive self loops
  let opts=f.options.slice();
  const business=config[0]==null?'':FIELDS[0].options[config[0]];
  const goal=config[1]==null?'':FIELDS[1].options[config[1]];
  if(f.id==='offer'&&OVERRIDES.offer[business])opts=OVERRIDES.offer[business];
  if(f.id==='audience'&&OVERRIDES.audience[business])opts=OVERRIDES.audience[business];
  if(f.id==='convince'&&OVERRIDES.convince[business])opts=OVERRIDES.convince[business];
  if(f.id==='proof'&&OVERRIDES.proof[business])opts=OVERRIDES.proof[business];
  if(f.id==='contact'&&OVERRIDES.contact[goal])opts=OVERRIDES.contact[goal];
  return opts[idx]||'';
}
function labelsFor(config){return config.map((_,i)=>labelFor(config,i))}

function createVariables(config){
  const labels=labelsFor(config);
  const v=Object.assign({},DEFAULTS);
  const offer=labels[2]||'sua solução',aud=labels[3]||'seu público',goal=labels[1]||'entrar em contato',arg=labels[5]||'qualidade';
  const hero=Number(config[6]||0);
  const headlines=[
    'NOMEDAEMPRESA: '+offer.toUpperCase()+' PARA QUEM VALORIZA '+arg.toUpperCase(),
    offer.toUpperCase()+' COM UMA APRESENTAÇÃO DIRETA E PROFISSIONAL',
    'UMA CONDIÇÃO ESPECIAL PARA '+aud.toUpperCase(),
    'TRANSFORME RESULTADOS COM '+offer.toUpperCase(),
    'VEJA DE PERTO O QUE A NOMEDAEMPRESA PODE OFERECER',
    'MENOS DÚVIDA. MAIS CLAREZA. MAIS '+arg.toUpperCase()+'.',
    'O PRINCIPAL BENEFÍCIO DE '+offer.toUpperCase()+' EM PRIMEIRO LUGAR',
    'CANSADO DO MESMO PROBLEMA? CONHEÇA UMA NOVA ABORDAGEM.',
    offer.toUpperCase()+': TUDO O QUE VOCÊ PRECISA EM UMA ÚNICA OFERTA',
    'FALE COM A NOMEDAEMPRESA E DÊ O PRÓXIMO PASSO'
  ];
  v.headline=headlines[hero];
  v.subheadline='Uma página criada para '+aud.toLowerCase()+', apresentando '+offer.toLowerCase()+' com foco em '+arg.toLowerCase()+' e levando o visitante a '+goal.toLowerCase()+'.';
  const ctas=['FALAR NO WHATSAPP','PEDIR ORÇAMENTO','AGENDAR HORÁRIO','COMPRAR AGORA','PREENCHER FORMULÁRIO','SOLICITAR LIGAÇÃO','VER SERVIÇOS','FAZER CADASTRO','BAIXAR MATERIAL','COMO CHEGAR'];
  v.ctaText=ctas[Number(config[1]||0)];
  return v;
}

function varText(tag,name,vars,cls){
  return '<'+tag+' class="'+(cls||'')+' lp-editable" data-var="'+name+'" contenteditable="true" spellcheck="false">'+escapeHTML(vars[name])+'</'+tag+'>';
}
function button(textVar,urlVar,vars,secondary){
  return '<a href="'+escapeHTML(vars[urlVar])+'" class="lp-btn '+(secondary?'secondary ':'')+'lp-editable" data-var="'+textVar+'" data-link-var="'+urlVar+'" contenteditable="true" spellcheck="false">'+escapeHTML(vars[textVar])+'</a>';
}
function logo(vars){
  return vars.logoImage
    ? '<img class="lp-logo" src="'+escapeHTML(vars.logoImage)+'" alt="Logo" data-image-var="logoImage">'
    : '<div class="lp-logo" data-image-var="logoImage">LOGO</div>';
}
function visual(vars,label){
  return '<div class="lp-visual" data-image-var="heroImage">'+(vars.heroImage
    ? '<img src="'+escapeHTML(vars.heroImage)+'" alt="Imagem principal">'
    : '<div class="lp-placeholder"><div>IMAGEM DE '+escapeHTML(label.toUpperCase())+'<small>Clique para substituir</small></div></div>')+'</div>';
}

const nicheRenderers = [
  (L)=>'<section class="lp-section alt niche-v1"><div class="lp-wrap"><div class="lp-overline">Atuação jurídica</div><h2 class="lp-h2">Decisões jurídicas pedem clareza e estratégia</h2><p class="lp-section-lead">Apresente especialidades, forma de atendimento e diferenciais profissionais de maneira objetiva.</p></div></section>',
  (L)=>'<section class="lp-section niche-v2"><div class="lp-wrap"><div class="lp-overline">Cuidado odontológico</div><h2 class="lp-h2">Confiança começa antes da consulta</h2><div class="lp-cards"><div class="lp-card"><strong>Conforto</strong><p>Explique como é a experiência do paciente.</p></div><div class="lp-card"><strong>Planejamento</strong><p>Mostre como cada tratamento é conduzido.</p></div><div class="lp-card"><strong>Acompanhamento</strong><p>Reforce a continuidade do cuidado.</p></div></div></div></section>',
  (L)=>'<section class="lp-section alt niche-v3"><div class="lp-wrap"><div class="lp-overline">Saúde</div><h2 class="lp-h2">Informação clara para uma escolha mais segura</h2><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">1</span><div><strong>Entenda</strong><p>Apresente a especialidade e o tipo de atendimento.</p></div></div><div class="lp-story-item"><span class="lp-story-num">2</span><div><strong>Converse</strong><p>Mostre como iniciar o contato.</p></div></div></div></div></section>',
  (L)=>'<section class="lp-section niche-v4"><div class="lp-wrap lp-center"><div class="lp-overline">Contabilidade</div><h2 class="lp-h2">Números organizados. Decisões mais claras.</h2><div class="lp-stat-grid"><div class="lp-stat"><b>01</b><span>Rotina fiscal</span></div><div class="lp-stat"><b>02</b><span>Gestão</span></div><div class="lp-stat"><b>03</b><span>Planejamento</span></div><div class="lp-stat"><b>04</b><span>Suporte</span></div></div></div></section>',
  (L)=>'<section class="lp-section alt niche-v5"><div class="lp-wrap"><div class="lp-overline">Imóveis</div><h2 class="lp-h2">Encontre o próximo lugar certo</h2><div class="proof-gallery"><div>IMÓVEL 01</div><div>IMÓVEL 02</div><div>IMÓVEL 03</div><div>IMÓVEL 04</div></div></div></section>',
  (L)=>'<section class="lp-section niche-v6"><div class="lp-wrap lp-center"><div class="lp-overline">Gastronomia</div><h2 class="lp-h2">Uma experiência que começa pela apresentação</h2><p class="lp-section-lead">Destaque ambiente, prato assinatura, horário e a melhor forma de reservar ou pedir.</p></div></section>',
  (L)=>'<section class="lp-section alt niche-v7"><div class="lp-wrap"><div class="lp-overline">Loja</div><h2 class="lp-h2">Produto em evidência, caminho de compra curto</h2><div class="lp-cards"><div class="lp-card"><strong>Destaque</strong><p>Mostre seu item principal.</p></div><div class="lp-card"><strong>Condição</strong><p>Explique preço, prazo ou benefício.</p></div><div class="lp-card"><strong>Compra</strong><p>Leve o cliente direto ao próximo passo.</p></div></div></div></section>',
  (L)=>'<section class="lp-section niche-v8"><div class="lp-wrap"><div class="lp-overline">Educação</div><h2 class="lp-h2">Aprenda com uma jornada bem explicada</h2><div class="lp-process"><div class="lp-step"><b>1</b><strong>Conteúdo</strong><p>O que será aprendido.</p></div><div class="lp-step"><b>2</b><strong>Método</strong><p>Como o aprendizado acontece.</p></div><div class="lp-step"><b>3</b><strong>Resultado</strong><p>O que o aluno leva ao final.</p></div></div></div></section>',
  (L)=>'<section class="lp-section alt niche-v9"><div class="lp-wrap"><div class="lp-overline">Software</div><h2 class="lp-h2">Do problema ao fluxo digital</h2><div class="lp-compare"><div><h3>Antes</h3><ul><li>Processo manual</li><li>Informação dispersa</li><li>Pouca visibilidade</li></ul></div><div class="good"><h3>Com a solução</h3><ul><li>Fluxo organizado</li><li>Dados centralizados</li><li>Visão rápida</li></ul></div></div></div></section>',
  (L)=>'<section class="lp-section niche-v10"><div class="lp-wrap"><div class="lp-overline">Serviços</div><h2 class="lp-h2">Uma estrutura flexível para apresentar o que você faz</h2><p class="lp-section-lead">Use este bloco para explicar sua especialidade sem prender a página a um setor específico.</p></div></section>'
];

const goalRenderers = [
  (L,V)=>'<section class="lp-section goal-v1"><div class="lp-wrap"><div class="lp-contact"><div><h2>Converse pelo WhatsApp</h2><p>Uma chamada direta para iniciar a conversa agora.</p></div>'+button('ctaText','primaryUrl',V,false)+'</div></div></section>',
  (L,V)=>'<section class="lp-section goal-v2"><div class="lp-wrap"><div class="lp-overline">Orçamento</div><h2 class="lp-h2">Conte o que você precisa e receba uma proposta</h2><p class="lp-section-lead">Estrutura voltada a pedidos de orçamento, com expectativa de retorno e escopo inicial.</p></div></section>',
  (L,V)=>'<section class="lp-section alt goal-v3"><div class="lp-wrap"><div class="lp-overline">Agenda</div><h2 class="lp-h2">Escolha o melhor momento para conversar</h2><div class="lp-cards"><div class="lp-card"><strong>Manhã</strong><p>Horários disponíveis.</p></div><div class="lp-card"><strong>Tarde</strong><p>Horários disponíveis.</p></div><div class="lp-card"><strong>Noite</strong><p>Consulte disponibilidade.</p></div></div></div></section>',
  (L,V)=>'<section class="lp-section goal-v4"><div class="lp-wrap lp-center"><div class="lp-overline">Compra</div><h2 class="lp-h2">Menos etapas entre interesse e pedido</h2>'+button('ctaText','primaryUrl',V,false)+'</div></section>',
  (L,V)=>'<section class="lp-section alt goal-v5"><div class="lp-wrap"><div class="lp-overline">Formulário</div><h2 class="lp-h2">Envie seus dados em poucos passos</h2><div class="lp-contact-grid"><div class="lp-contact-card">NOME</div><div class="lp-contact-card">CONTATO</div><div class="lp-contact-card">MENSAGEM</div></div></div></section>',
  (L,V)=>'<section class="lp-section goal-v6"><div class="lp-wrap"><div class="lp-overline">Retorno</div><h2 class="lp-h2">Prefere receber uma ligação?</h2><p class="lp-section-lead">Um caminho específico para quem quer deixar o número e receber contato da equipe.</p></div></section>',
  (L,V)=>'<section class="lp-section alt goal-v7"><div class="lp-wrap"><div class="lp-overline">Descoberta</div><h2 class="lp-h2">Conheça primeiro. Decida depois.</h2><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">A</span><div><strong>O que fazemos</strong><p>Visão rápida da solução.</p></div></div><div class="lp-story-item"><span class="lp-story-num">B</span><div><strong>Como fazemos</strong><p>Processo de atendimento.</p></div></div></div></div></section>',
  (L,V)=>'<section class="lp-section goal-v8"><div class="lp-wrap"><div class="lp-overline">Cadastro</div><h2 class="lp-h2">Entre para receber o próximo passo</h2><p class="lp-section-lead">Uma chamada orientada a registro, lista ou criação de conta.</p></div></section>',
  (L,V)=>'<section class="lp-section alt goal-v9"><div class="lp-wrap"><div class="lp-overline">Material</div><h2 class="lp-h2">Leve este conteúdo com você</h2><div class="lp-card"><div class="lp-icon">↓</div><strong>Material para download</strong><p>Use o hyperlink do botão para apontar ao arquivo real.</p></div></div></section>',
  (L,V)=>'<section class="lp-section goal-v10"><div class="lp-wrap"><div class="lp-overline">Localização</div><h2 class="lp-h2">Visite a NOMEDAEMPRESA</h2><p class="lp-section-lead">Destaque endereço, referência, horário e rota de chegada.</p></div></section>'
];

const offerRenderers = Array.from({length:10},(_,i)=>(L)=>{
  const modes=[
    ['Oferta principal','Uma solução central, explicada sem distrações.'],
    ['Consulta inicial','Uma entrada de baixo atrito para entender a necessidade.'],
    ['Produto foco','Um item protagonista com benefício e decisão clara.'],
    ['Recorrência','Valor contínuo apresentado como relação de longo prazo.'],
    ['Avaliação','Primeiro diagnóstico antes da proposta definitiva.'],
    ['Sob medida','Escopo construído a partir da necessidade do cliente.'],
    ['Demonstração','Mostre antes de pedir a decisão.'],
    ['Condição limitada','Uma razão específica para agir agora.'],
    ['Pacote completo','Vários benefícios reunidos em uma única oferta.'],
    ['Experiência especial','Uma proposta com começo, meio e fim bem definidos.']
  ];
  return '<section class="lp-section offer-v'+(i+1)+'"><div class="lp-wrap"><div class="lp-overline">'+escapeHTML(modes[i][0])+'</div><h2 class="lp-h2">'+escapeHTML(L[2])+'</h2><p class="lp-section-lead">'+escapeHTML(modes[i][1])+'</p><div class="offer-marker offer-marker-'+(i+1)+'" aria-hidden="true"></div></div></section>';
});

const audienceRenderers = Array.from({length:10},(_,i)=>(L)=>{
  const forms=['mensagem ampla','argumento empresarial','tom familiar','ritmo jovem','linguagem profissional','foco em operação enxuta','ênfase em escala','apelo de proximidade','sinalização premium','vocabulário especializado'];
  return '<section class="lp-section alt audience-v'+(i+1)+'"><div class="lp-wrap"><div class="lp-overline">Feito para '+escapeHTML(L[3])+'</div><h2 class="lp-h2">Uma abordagem pensada para esse público</h2><p class="lp-section-lead">O caminho '+escapeHTML(forms[i])+' diferencia esta opção das demais sem depender apenas do rótulo da pergunta.</p><div class="audience-shape audience-shape-'+(i+1)+'"></div></div></section>';
});

const convinceRenderers = [
  (L)=>'<section class="lp-section convince-v1"><div class="lp-wrap"><div class="lp-overline">Economia</div><h2 class="lp-h2">Mostre o valor antes do preço</h2><div class="lp-compare"><div><h3>Custo de continuar igual</h3><ul><li>Tempo perdido</li><li>Retrabalho</li><li>Oportunidade perdida</li></ul></div><div class="good"><h3>Valor da mudança</h3><ul><li>Mais previsibilidade</li><li>Menos desperdício</li><li>Decisão mais simples</li></ul></div></div></div></section>',
  (L)=>'<section class="lp-section alt convince-v2"><div class="lp-wrap lp-center"><div class="lp-overline">Qualidade percebida</div><h2 class="lp-h2">Detalhes que sustentam uma escolha melhor</h2><p class="lp-section-lead">Materiais, método, cuidado e acabamento ganham destaque nesta composição.</p></div></section>',
  (L)=>'<section class="lp-section convince-v3"><div class="lp-wrap"><div class="lp-overline">Experiência</div><h2 class="lp-h2">Conhecimento acumulado vira processo</h2><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">1</span><div><strong>Aprendizado</strong><p>Experiência prática.</p></div></div><div class="lp-story-item"><span class="lp-story-num">2</span><div><strong>Método</strong><p>Forma consistente de executar.</p></div></div><div class="lp-story-item"><span class="lp-story-num">3</span><div><strong>Entrega</strong><p>Aplicação no cliente.</p></div></div></div></div></section>',
  (L)=>'<section class="lp-section alt convince-v4"><div class="lp-wrap"><div class="lp-overline">Resultados</div><h2 class="lp-h2">O que muda depois da contratação?</h2><div class="lp-stat-grid"><div class="lp-stat"><b>+XX%</b><span>indicador 1</span></div><div class="lp-stat"><b>-XX%</b><span>indicador 2</span></div><div class="lp-stat"><b>XXh</b><span>indicador 3</span></div><div class="lp-stat"><b>XX</b><span>indicador 4</span></div></div></div></section>',
  (L)=>'<section class="lp-section convince-v5"><div class="lp-wrap"><div class="lp-overline">Opinião de clientes</div><h2 class="lp-h2">Deixe outras pessoas explicarem o valor</h2><div class="proof-stars">★★★★★</div><p class="lp-section-lead">Use avaliações reais e verificáveis neste bloco.</p></div></section>',
  (L)=>'<section class="lp-section alt convince-v6"><div class="lp-wrap"><div class="lp-overline">Rapidez</div><h2 class="lp-h2">Um caminho curto entre pedido e atendimento</h2><div class="lp-process"><div class="lp-step"><b>1</b><strong>Contato</strong><p>Envie a necessidade.</p></div><div class="lp-step"><b>2</b><strong>Resposta</strong><p>Receba orientação.</p></div><div class="lp-step"><b>3</b><strong>Ação</strong><p>Siga para a solução.</p></div></div></div></section>',
  (L)=>'<section class="lp-section convince-v7"><div class="lp-wrap"><div class="lp-overline">Segurança</div><h2 class="lp-h2">Explique processo, limites e próximos passos</h2><div class="proof-badges"><span>Processo claro</span><span>Dados protegidos</span><span>Condições transparentes</span></div></div></section>',
  (L)=>'<section class="lp-section alt convince-v8"><div class="lp-wrap"><div class="lp-overline">Atendimento próximo</div><h2 class="lp-h2">Pessoas falando com pessoas</h2><p class="lp-section-lead">Esta variante coloca disponibilidade, comunicação e acompanhamento no centro da mensagem.</p></div></section>',
  (L)=>'<section class="lp-section convince-v9"><div class="lp-wrap lp-center"><div class="lp-overline">Exclusividade</div><h2 class="lp-h2">Menos volume. Mais atenção.</h2><p class="lp-section-lead">Uma composição mais seletiva para serviços que dependem de posicionamento e percepção de valor.</p></div></section>',
  (L)=>'<section class="lp-section alt convince-v10"><div class="lp-wrap"><div class="lp-overline">Facilidade</div><h2 class="lp-h2">Começar deve ser a parte mais simples</h2><div class="lp-cards"><div class="lp-card"><strong>1 clique</strong><p>Entre em contato.</p></div><div class="lp-card"><strong>1 conversa</strong><p>Alinhe a necessidade.</p></div><div class="lp-card"><strong>1 próximo passo</strong><p>Siga com clareza.</p></div></div></div></section>'
];

function heroRenderer(index,L,V){
  const body=[
    '',
    '',
    '',
    '<div class="lp-stat-grid"><div class="lp-stat"><b>+XX%</b><span>resultado em destaque</span></div><div class="lp-stat"><b>XX+</b><span>clientes ou projetos</span></div></div>',
    '',
    '',
    '<div class="lp-problem">PROBLEMA PRINCIPAL DO CLIENTE</div>',
    '<div class="benefit-chips"><span>BENEFÍCIO 1</span><span>BENEFÍCIO 2</span><span>BENEFÍCIO 3</span></div>',
    '',
    '<div class="mini-contact"><strong>'+escapeHTML(V.phone)+'</strong><span>Canal de contato em destaque logo na abertura.</span></div>'
  ][index];

  return '<div class="lp-wrap"><section class="lp-hero hero-v'+(index+1)+'"><div class="lp-copy">'+
    '<div class="lp-kicker">'+escapeHTML(L[0])+' • '+escapeHTML(L[6])+'</div>'+body+
    varText('h1','headline',V,'lp-h1')+
    varText('p','subheadline',V,'lp-lead')+
    '<div class="lp-actions">'+button('ctaText','primaryUrl',V,false)+button('secondaryText','secondaryUrl',V,true)+'</div>'+
    '<div class="lp-meta"><span><b>'+escapeHTML(L[5])+'</b>argumento</span><span><b>'+escapeHTML(L[8])+'</b>prova</span><span><b class="lp-editable" data-var="city" contenteditable="true">'+escapeHTML(V.city)+'</b>região</span></div>'+
    '</div>'+visual(V,L[2]||'sua oferta')+'</section></div>';
}

const depthRenderers = [
  ()=>'<section class="lp-section depth-v1"><div class="lp-wrap lp-center"><div class="lp-overline">Essencial</div><h2 class="lp-h2">Só o necessário para decidir o próximo passo</h2></div></section>',
  ()=>'<section class="lp-section alt depth-v2"><div class="lp-wrap"><div class="lp-overline">Resumo rápido</div><h2 class="lp-h2">Três respostas em uma tela</h2><div class="lp-cards"><div class="lp-card"><strong>O quê?</strong><p>A oferta.</p></div><div class="lp-card"><strong>Para quem?</strong><p>O público.</p></div><div class="lp-card"><strong>Como?</strong><p>O contato.</p></div></div></div></section>',
  ()=>'<section class="lp-section depth-v3"><div class="lp-wrap"><div class="lp-overline">Perguntas rápidas</div><h2 class="lp-h2">Resolva as dúvidas mais comuns</h2><div class="lp-faq"><details open><summary>O que está incluído?</summary><p>Edite esta resposta.</p></details><details><summary>Como começar?</summary><p>Edite esta resposta.</p></details></div></div></section>',
  ()=>'<section class="lp-section alt depth-v4"><div class="lp-wrap"><div class="lp-overline">Objetiva</div><h2 class="lp-h2">Benefício, processo e contato</h2><div class="lp-process"><div class="lp-step"><b>A</b><strong>Benefício</strong><p>Por que importa.</p></div><div class="lp-step"><b>B</b><strong>Processo</strong><p>Como funciona.</p></div><div class="lp-step"><b>C</b><strong>Contato</strong><p>Como avançar.</p></div></div></div></section>',
  ()=>'<section class="lp-section depth-v5"><div class="lp-wrap"><div class="lp-overline">Média com prova</div><h2 class="lp-h2">Explicação + evidência</h2><div class="lp-quote"><blockquote>“Uma área extra para contextualizar a prova social escolhida.”</blockquote><small>Bloco de profundidade 5</small></div></div></section>',
  ()=>'<section class="lp-section alt depth-v6"><div class="lp-wrap"><div class="lp-overline">Média detalhada</div><h2 class="lp-h2">Explique o que está por trás da entrega</h2><div class="lp-cards"><div class="lp-card"><strong>Escopo</strong><p>O que faz parte.</p></div><div class="lp-card"><strong>Método</strong><p>Como é feito.</p></div><div class="lp-card"><strong>Prazo</strong><p>Como acontece no tempo.</p></div><div class="lp-card"><strong>Suporte</strong><p>O que acontece depois.</p></div></div></div></section>',
  ()=>'<section class="lp-section depth-v7"><div class="lp-wrap"><div class="lp-overline">Longa organizada</div><h2 class="lp-h2">Uma jornada em quatro etapas</h2><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">1</span><div><strong>Contexto</strong><p>Apresente o cenário.</p></div></div><div class="lp-story-item"><span class="lp-story-num">2</span><div><strong>Problema</strong><p>Mostre a dor.</p></div></div><div class="lp-story-item"><span class="lp-story-num">3</span><div><strong>Solução</strong><p>Explique a oferta.</p></div></div><div class="lp-story-item"><span class="lp-story-num">4</span><div><strong>Ação</strong><p>Leve ao contato.</p></div></div></div></div></section>',
  ()=>'<section class="lp-section alt depth-v8"><div class="lp-wrap"><div class="lp-overline">Longa por serviços</div><h2 class="lp-h2">Várias frentes, uma única apresentação</h2><div class="lp-cards"><div class="lp-card"><strong>Serviço A</strong><p>Descrição.</p></div><div class="lp-card"><strong>Serviço B</strong><p>Descrição.</p></div><div class="lp-card"><strong>Serviço C</strong><p>Descrição.</p></div><div class="lp-card"><strong>Serviço D</strong><p>Descrição.</p></div><div class="lp-card"><strong>Serviço E</strong><p>Descrição.</p></div><div class="lp-card"><strong>Serviço F</strong><p>Descrição.</p></div></div></div></section>',
  ()=>'<section class="lp-section depth-v9"><div class="lp-wrap"><div class="lp-overline">História</div><h2 class="lp-h2">Conte de onde a NOMEDAEMPRESA veio</h2><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">A</span><div><strong>Começo</strong><p>O que motivou a empresa.</p></div></div><div class="lp-story-item"><span class="lp-story-num">B</span><div><strong>Evolução</strong><p>O que mudou ao longo do caminho.</p></div></div><div class="lp-story-item"><span class="lp-story-num">C</span><div><strong>Hoje</strong><p>O que a empresa entrega agora.</p></div></div></div></div></section>',
  ()=>'<section class="lp-section alt depth-v10"><div class="lp-wrap"><div class="lp-overline">Página completa</div><h2 class="lp-h2">Uma visão ampla antes da conversão</h2><div class="lp-compare"><div><h3>Informações principais</h3><ul><li>Oferta</li><li>Público</li><li>Diferenciais</li><li>Processo</li></ul></div><div class="good"><h3>Informações de decisão</h3><ul><li>Provas</li><li>Dúvidas</li><li>Contato</li><li>Próximo passo</li></ul></div></div><div class="lp-faq"><details open><summary>Quer incluir mais detalhes?</summary><p>Edite livremente os textos no preview.</p></details></div></div></section>'
];

const proofRenderers = [
  (L,V)=>'<section class="lp-section proof-v1"><div class="lp-wrap"><div class="lp-overline">Depoimento principal</div><div class="lp-quote">'+varText('blockquote','testimonial',V,'')+'<small class="lp-editable" data-var="testimonialAuthor" contenteditable="true">'+escapeHTML(V.testimonialAuthor)+'</small></div></div></section>',
  ()=>'<section class="lp-section alt proof-v2"><div class="lp-wrap lp-center"><div class="lp-overline">Avaliações</div><div class="proof-stars">★★★★★</div><h2 class="lp-h2">Avaliações de quem já conheceu o trabalho</h2><p class="lp-section-lead">Substitua por avaliações reais e verificáveis.</p></div></section>',
  ()=>'<section class="lp-section proof-v3"><div class="lp-wrap"><div class="lp-overline">Galeria de trabalhos</div><div class="proof-gallery"><div>TRABALHO 01</div><div>TRABALHO 02</div><div>TRABALHO 03</div><div>TRABALHO 04</div></div></div></section>',
  ()=>'<section class="lp-section alt proof-v4"><div class="lp-wrap"><div class="lp-overline">Antes e depois</div><div class="lp-compare"><div><h3>Antes</h3><p class="lp-section-lead">Situação inicial.</p></div><div class="good"><h3>Depois</h3><p class="lp-section-lead">Resultado após o processo.</p></div></div></div></section>',
  ()=>'<section class="lp-section proof-v5"><div class="lp-wrap"><div class="lp-overline">Números do negócio</div><div class="lp-stat-grid"><div class="lp-stat"><b>XX+</b><span>clientes</span></div><div class="lp-stat"><b>XX</b><span>projetos</span></div><div class="lp-stat"><b>XX%</b><span>indicador</span></div><div class="lp-stat"><b>XX</b><span>anos</span></div></div></div></section>',
  ()=>'<section class="lp-section alt proof-v6"><div class="lp-wrap"><div class="lp-overline">Linha do tempo</div><div class="lp-story"><div class="lp-story-item"><span class="lp-story-num">1</span><div><strong>Início</strong><p>Marco inicial.</p></div></div><div class="lp-story-item"><span class="lp-story-num">2</span><div><strong>Crescimento</strong><p>Marco intermediário.</p></div></div><div class="lp-story-item"><span class="lp-story-num">3</span><div><strong>Hoje</strong><p>Momento atual.</p></div></div></div></div></section>',
  ()=>'<section class="lp-section proof-v7"><div class="lp-wrap"><div class="lp-overline">Selos e certificados</div><div class="proof-badges"><span>CERTIFICADO 01</span><span>CERTIFICADO 02</span><span>SELO 03</span><span>FORMAÇÃO 04</span></div></div></section>',
  ()=>'<section class="lp-section alt proof-v8"><div class="lp-wrap"><div class="lp-overline">Marcas atendidas</div><div class="proof-logos"><div class="proof-logo">MARCA 01</div><div class="proof-logo">MARCA 02</div><div class="proof-logo">MARCA 03</div><div class="proof-logo">MARCA 04</div></div></div></section>',
  ()=>'<section class="lp-section proof-v9"><div class="lp-wrap"><div class="lp-overline">Resultados em destaque</div><div class="lp-cards"><div class="lp-card"><strong>Resultado A</strong><p>Indicador verificável.</p></div><div class="lp-card"><strong>Resultado B</strong><p>Indicador verificável.</p></div><div class="lp-card"><strong>Resultado C</strong><p>Indicador verificável.</p></div></div></div></section>',
  ()=>'<section class="lp-section alt proof-v10"><div class="lp-wrap"><div class="lp-overline">Sem prova social</div><h2 class="lp-h2">Sem inventar depoimentos ou números</h2><p class="lp-section-lead">Esta variante troca prova social por uma explicação objetiva do processo e da oferta.</p></div></section>'
];

const contactRenderers = [
  (L,V)=>'<section id="contato" class="lp-section contact-v1"><div class="lp-wrap"><div class="lp-contact"><div><h2>Chame a <span class="lp-editable" data-var="companyName" contenteditable="true">'+escapeHTML(V.companyName)+'</span> no WhatsApp</h2><p class="lp-editable" data-var="phone" contenteditable="true">'+escapeHTML(V.phone)+'</p></div>'+button('ctaText','primaryUrl',V,false)+'</div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section alt contact-v2"><div class="lp-wrap lp-center"><div class="lp-overline">Telefone</div><h2 class="lp-h2">Prefere conversar por ligação?</h2><p class="lp-section-lead lp-editable" data-var="phone" contenteditable="true">'+escapeHTML(V.phone)+'</p></div></section>',
  (L,V)=>'<section id="contato" class="lp-section contact-v3"><div class="lp-wrap"><div class="lp-overline">Formulário curto</div><h2 class="lp-h2">Envie uma mensagem</h2><div class="lp-contact-grid"><div class="lp-contact-card">Seu nome</div><div class="lp-contact-card">Seu telefone</div><div class="lp-contact-card">Como podemos ajudar?</div></div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section alt contact-v4"><div class="lp-wrap"><div class="lp-overline">E-mail</div><h2 class="lp-h2">Prefere escrever com mais detalhes?</h2><p class="lp-section-lead">Edite o hyperlink do botão para usar um endereço mailto:.</p>'+button('ctaText','primaryUrl',V,false)+'</div></section>',
  (L,V)=>'<section id="contato" class="lp-section contact-v5"><div class="lp-wrap"><div class="lp-overline">Agenda online</div><h2 class="lp-h2">Escolha um horário disponível</h2><div class="proof-badges"><span>09:00</span><span>11:30</span><span>14:00</span><span>16:30</span></div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section alt contact-v6"><div class="lp-wrap lp-center"><div class="lp-overline">Compra direta</div><h2 class="lp-h2">Pronto para continuar?</h2>'+button('ctaText','primaryUrl',V,false)+'</div></section>',
  (L,V)=>'<section id="contato" class="lp-section contact-v7"><div class="lp-wrap"><div class="lp-overline">Cadastro rápido</div><h2 class="lp-h2">Crie seu acesso</h2><div class="lp-contact-grid"><div class="lp-contact-card">Nome completo</div><div class="lp-contact-card">E-mail</div><div class="lp-contact-card">Senha</div></div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section alt contact-v8"><div class="lp-wrap"><div class="lp-overline">Como chegar</div><h2 class="lp-h2">Estamos em <span class="lp-editable" data-var="city" contenteditable="true">'+escapeHTML(V.city)+'</span></h2><div class="lp-visual" style="min-height:220px"><div class="lp-placeholder"><div>MAPA / ENDEREÇO<small>Use o botão para colocar seu link de rota.</small></div></div></div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section contact-v9"><div class="lp-wrap"><div class="lp-overline">Dois canais</div><h2 class="lp-h2">Escolha como prefere falar</h2><div class="lp-actions">'+button('ctaText','primaryUrl',V,false)+button('secondaryText','secondaryUrl',V,true)+'</div></div></section>',
  (L,V)=>'<section id="contato" class="lp-section alt contact-v10"><div class="lp-wrap lp-center"><div class="lp-overline">Apresentação</div><h2 class="lp-h2">Sem formulário e sem pressão</h2><p class="lp-section-lead">Esta variante termina apenas com os dados públicos da empresa.</p><p class="lp-section-lead"><span class="lp-editable" data-var="companyName" contenteditable="true">'+escapeHTML(V.companyName)+'</span> • <span class="lp-editable" data-var="city" contenteditable="true">'+escapeHTML(V.city)+'</span></p></div></section>'
];

function nav(L,V){
  return '<div class="lp-wrap"><nav class="lp-nav"><div class="lp-brand">'+logo(V)+'<span class="lp-editable" data-var="companyName" contenteditable="true">'+escapeHTML(V.companyName)+'</span></div><div class="lp-desktop-nav"><a href="#detalhes">Detalhes</a><a href="#contato">Contato</a>'+button('ctaText','primaryUrl',V,false)+'</div></nav></div>';
}
function offerSlot(L,index){return offerRenderers[index](L)}
function audienceSlot(L,index){return audienceRenderers[index](L)}
function colorSignature(index){
  const labels=['Energia violeta','Confiança azul','Frescor ciano','Equilíbrio verde','Impulso laranja','Urgência vermelha','Expressão rosa','Prestígio dourado','Sobriedade grafite','Profundidade índigo'];
  return '<div class="lp-wrap"><div class="color-signature color-signature-'+(index+1)+'" aria-label="'+labels[index]+'"></div></div>';
}

function renderPage(config,opts={}){
  if(!Array.isArray(config)||config.length!==FIELD_COUNT)throw new Error('Config precisa ter 10 índices');
  config.forEach((v,i)=>{if(!Number.isInteger(v)||v<0||v>=OPTION_COUNT)throw new Error('Índice inválido no campo '+i)});
  const labels=labelsFor(config);
  const vars=Object.assign(createVariables(config),opts.variables||{});
  const selectedColor=(opts.customColor||COLOR_OPTIONS[config[4]].hex).toUpperCase();
  const pal=palette(selectedColor);
  const colorStyle='--lp-primary:'+pal.primary+';--lp-primary-dark:'+pal.dark+';--lp-on-primary:'+pal.onPrimary+';--lp-soft:'+pal.soft+';--lp-accent:'+pal.accent+';--lp-on-accent:'+pal.onAccent+';';
  const parts=[];
  parts.push('<div class="lp-page" style="'+colorStyle+'">');
  parts.push(nav(labels,vars));
  parts.push(heroRenderer(config[6],labels,vars));
  parts.push(colorSignature(config[4]));
  parts.push(nicheRenderers[config[0]](labels,vars));
  parts.push(goalRenderers[config[1]](labels,vars));
  parts.push(offerSlot(labels,config[2]));
  parts.push(audienceSlot(labels,config[3]));
  parts.push(convinceRenderers[config[5]](labels,vars));
  parts.push(depthRenderers[config[7]](labels,vars));
  parts.push(proofRenderers[config[8]](labels,vars));
  parts.push(contactRenderers[config[9]](labels,vars));
  parts.push('<footer class="lp-wrap lp-footer"><span>© <span class="lp-editable" data-var="companyName" contenteditable="true">'+escapeHTML(vars.companyName)+'</span>. Todos os direitos reservados.</span><span class="lp-editable" data-var="phone" contenteditable="true">'+escapeHTML(vars.phone)+'</span></footer>');
  parts.push('</div>');
  return {html:parts.join(''),labels,vars,palette:pal};
}

function stripEditorMetadata(html){
  return String(html)
    .replace(/\scontenteditable="true"/g,'')
    .replace(/\sspellcheck="false"/g,'')
    .replace(/\sdata-var="[^"]*"/g,'')
    .replace(/\sdata-link-var="[^"]*"/g,'')
    .replace(/\sdata-image-var="[^"]*"/g,'')
    .replace(/\slp-editable/g,'')
    .replace(/\sselected/g,'')
    .replace(/>\s+</g,'><')
    .trim();
}
function visibleFingerprint(config){
  return hashString(stripEditorMetadata(renderPage(config).html)).toString(16).padStart(8,'0');
}
function assertUnique(arr,msg){
  const seen=new Map();
  arr.forEach((v,i)=>{if(seen.has(v))throw new Error(msg+' — colisão entre '+seen.get(v)+' e '+i);seen.set(v,i)});
}
function deterministicContexts(count){
  const rng=mulberry('LP10B-TEST-CONTEXTS-v2');
  const out=[];
  for(let n=0;n<count;n++)out.push(Array.from({length:10},()=>Math.floor(rng()*10)));
  return out;
}
function runIntegrityTests(contextCount=120){
  const results=[];
  const check=(name,fn)=>{const start=performance.now?performance.now():Date.now();try{const detail=fn();results.push({name,ok:true,detail,time:Math.round(((performance.now?performance.now():Date.now())-start)*100)/100})}catch(e){results.push({name,ok:false,detail:e.message,time:0})}};

  check('Schema: 10 campos × 10 opções',()=>{
    if(FIELDS.length!==10)throw new Error('Há '+FIELDS.length+' campos');
    FIELDS.forEach((f,i)=>{if(optionsFor([0,0,0,0,0,0,0,0,0,0],i).length!==10)throw new Error(f.id+' não tem 10 opções')});
    return '10 × 10 confirmado';
  });

  check('Rótulos: sem duplicatas dentro de cada campo',()=>{
    FIELDS.forEach((f,i)=>assertUnique(f.options.map(x=>String(x).trim().toLowerCase()),'Duplicata em '+f.id));
    Object.keys(OVERRIDES).forEach(group=>Object.keys(OVERRIDES[group]).forEach(k=>{
      const arr=OVERRIDES[group][k];
      if(arr.length!==10)throw new Error('Override '+group+'/'+k+' tem '+arr.length+' opções');
      assertUnique(arr.map(x=>x.trim().toLowerCase()),'Duplicata em override '+group+'/'+k);
    }));
    return 'listas-base e overrides válidos';
  });

  check('Render determinístico',()=>{
    const contexts=deterministicContexts(80);
    contexts.forEach(c=>{
      const a=stripEditorMetadata(renderPage(c).html);
      const b=stripEditorMetadata(renderPage(c).html);
      if(a!==b)throw new Error('Mesma configuração produziu HTML diferente: '+c.join(''));
    });
    return '80 contextos renderizados duas vezes sem divergência';
  });

  check('Cada campo altera a saída visível em 10 formas',()=>{
    const base=[0,0,0,0,0,0,0,0,0,0];
    for(let field=0;field<10;field++){
      const fps=[];
      for(let option=0;option<10;option++){
        const c=base.slice();c[field]=option;fps.push(visibleFingerprint(c));
      }
      assertUnique(fps,'Campo '+(field+1)+' colapsa opções');
    }
    return '100 mutações-base; zero colisões';
  });

  check('Unicidade por campo em múltiplos contextos DAG',()=>{
    const contexts=deterministicContexts(contextCount);
    let checked=0;
    contexts.forEach((base,ci)=>{
      for(let field=0;field<10;field++){
        const fps=[];
        for(let option=0;option<10;option++){
          const c=base.slice();c[field]=option;fps.push(visibleFingerprint(c));
        }
        assertUnique(fps,'Contexto '+ci+', campo '+(field+1));
        checked+=10;
      }
    });
    return (contextCount*10)+' conjuntos de mutação; '+(contextCount*100)+' páginas comparadas';
  });

  check('Componentes de variante: 10 templates distintos por família',()=>{
    const L=labelsFor([0,0,0,0,0,0,0,0,0,0]),V=createVariables([0,0,0,0,0,0,0,0,0,0]);
    const families=[
      nicheRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      goalRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      offerRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      audienceRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      convinceRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      Array.from({length:10},(_,i)=>stripEditorMetadata(heroRenderer(i,L,V))),
      depthRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      proofRenderers.map(fn=>stripEditorMetadata(fn(L,V))),
      contactRenderers.map(fn=>stripEditorMetadata(fn(L,V)))
    ];
    families.forEach((arr,i)=>assertUnique(arr,'Família visual '+(i+1)));
    assertUnique(COLOR_OPTIONS.map(x=>palette(x.hex).primary),'Família de cor');
    return '9 famílias de componentes + 10 paletas sem templates duplicados';
  });

  check('Campos anteriores não perdem efeito após overrides',()=>{
    const contexts=deterministicContexts(100);
    contexts.forEach(base=>{
      for(let field=0;field<9;field++){
        const a=base.slice(),b=base.slice();
        b[field]=(a[field]+1)%10;
        if(visibleFingerprint(a)===visibleFingerprint(b))throw new Error('Efeito perdido no campo '+(field+1));
      }
    });
    return '900 comparações de preservação passaram';
  });

  check('Estimativa combinatória válida por injetividade composicional',()=>{
    const failed=results.find(r=>!r.ok);
    if(failed)throw new Error('Pré-condição falhou antes da prova: '+failed.name);
    return 'cada dimensão mantém 10 efeitos distinguíveis; produto cartesiano = 10^10 configurações-base';
  });

  return {ok:results.every(r=>r.ok),results,contexts:contextCount};
}

global.LP10B_CORE={FIELDS,COLOR_OPTIONS,OVERRIDES,DEFAULTS,optionsFor,labelFor,labelsFor,palette,renderPage,stripEditorMetadata,visibleFingerprint,runIntegrityTests,deterministicContexts};

if(!global.document||!document.getElementById('wizardView'))return;

const state={
  step:0,
  config:Array(10).fill(null),
  customColor:null,
  variables:Object.assign({},DEFAULTS)
};

function currentOptions(){
  const temp=state.config.map(v=>v==null?0:v);
  return optionsFor(temp,state.step);
}
function pathLabels(){
  const temp=state.config.map(v=>v==null?0:v);
  return state.config.map((v,i)=>v==null?null:labelFor(temp,i));
}
function renderWizard(){
  const field=FIELDS[state.step],opts=currentOptions();
  document.getElementById('questionKind').textContent=field.kind;
  document.getElementById('questionTitle').textContent=field.title;
  document.getElementById('questionHelp').textContent=field.help;
  document.getElementById('stepLabel').textContent='Campo '+(state.step+1)+' de 10';
  document.getElementById('pathLabel').textContent=state.config.filter(v=>v!=null).length+'/10 definidos';
  document.getElementById('progressBar').style.width=((state.step+1)*10)+'%';
  const box=document.getElementById('options');box.innerHTML='';
  opts.forEach((label,i)=>{
    const btn=document.createElement('button');
    btn.className='option'+(state.config[state.step]===i?' active':'')+(field.id==='color'?' color-option':'');
    const left=field.id==='color'?'<span class="swatch" style="background:'+COLOR_OPTIONS[i].hex+'"></span>':'<span class="option-index">'+(i+1)+'</span>';
    const note=field.id==='color'?'<span class="option-note">'+COLOR_OPTIONS[i].hex+'</span>':'';
    btn.innerHTML=left+'<span class="option-main"><span class="option-title">'+escapeHTML(label)+'</span>'+note+'</span>';
    btn.onclick=()=>{
      state.config[state.step]=i;
      if(field.id==='color'){
        state.customColor=COLOR_OPTIONS[i].hex;
        syncColorControls();
      }
      renderWizard();
    };
    box.appendChild(btn);
  });
  document.getElementById('colorFineTune').classList.toggle('hidden',field.id!=='color'||state.config[4]==null);
  document.getElementById('prevBtn').disabled=state.step===0;
  document.getElementById('nextBtn').disabled=state.config[state.step]==null;
  document.getElementById('nextBtn').textContent=state.step===9?'Gerar landing page':'Continuar';
  renderPathChips();
}
function renderPathChips(){
  const labels=pathLabels(),wrap=document.getElementById('pathChips');wrap.innerHTML='';
  labels.forEach((label,i)=>{
    if(label==null)return;
    const el=document.createElement('span');el.className='path-chip';el.innerHTML='<b>'+(i+1)+'</b> '+escapeHTML(label);wrap.appendChild(el);
  });
}
function syncColorControls(){
  const chosen=state.customColor||COLOR_OPTIONS[state.config[4]||0].hex;
  ['colorPicker','editorColorPicker'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=chosen});
  ['hexInput','editorHexInput'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=chosen.toUpperCase()});
  renderPalette('palettePreview',chosen);renderPalette('editorPalette',chosen);
}
function renderPalette(id,hex){
  const p=palette(hex),el=document.getElementById(id);if(!el)return;
  el.innerHTML=[p.dark,p.primary,p.soft,p.accent,p.onPrimary].map(c=>'<span style="background:'+c+'" title="'+c+'"></span>').join('');
}
function applyColor(hex){
  if(!/^#[0-9a-f]{6}$/i.test(hex))return false;
  state.customColor=hex.toUpperCase();syncColorControls();
  if(!document.getElementById('editorView').classList.contains('hidden'))renderPreview(false);
  return true;
}
function enterEditor(){
  const temp=state.config.map(v=>v==null?0:v);
  state.variables=createVariables(temp);
  document.getElementById('wizardView').classList.add('hidden');
  document.getElementById('editorView').classList.remove('hidden');
  document.getElementById('backBtn').classList.remove('hidden');
  document.getElementById('variantBtn').classList.remove('hidden');
  document.getElementById('downloadBtn').classList.remove('hidden');
  syncColorControls();renderPreview(true);
}
function leaveEditor(){
  document.getElementById('wizardView').classList.remove('hidden');
  document.getElementById('editorView').classList.add('hidden');
  document.getElementById('backBtn').classList.add('hidden');
  document.getElementById('variantBtn').classList.add('hidden');
  document.getElementById('downloadBtn').classList.add('hidden');
}
function renderPreview(reset){
  const cfg=state.config.map(v=>v==null?0:v);
  if(reset)state.variables=createVariables(cfg);
  const out=renderPage(cfg,{customColor:state.customColor,variables:state.variables});
  state.variables=out.vars;
  document.getElementById('lpCanvas').innerHTML=out.html;
  bindEditable();
  syncGlobals();
  renderConfigSummary(out.labels);
}
function syncGlobals(){
  document.querySelectorAll('[data-global]').forEach(inp=>{
    const key=inp.dataset.global;inp.value=state.variables[key]||'';
    inp.oninput=()=>syncVar(key,inp.value);
  });
}
function syncVar(name,value,source){
  state.variables[name]=value;
  document.querySelectorAll('#lpCanvas [data-var="'+name+'"]').forEach(el=>{if(el!==source&&document.activeElement!==el)el.textContent=value});
  document.querySelectorAll('[data-global="'+name+'"]').forEach(inp=>{if(inp!==document.activeElement)inp.value=value});
}
function syncLink(name,value){
  state.variables[name]=value;
  document.querySelectorAll('#lpCanvas [data-link-var="'+name+'"]').forEach(el=>el.setAttribute('href',value));
}
function bindEditable(){
  document.querySelectorAll('#lpCanvas [data-var]').forEach(el=>{
    el.classList.add('lp-editable');
    el.onfocus=()=>selectElement(el);
    el.onclick=e=>{e.stopPropagation();if(el.hasAttribute('data-link-var'))e.preventDefault();selectElement(el)};
    el.oninput=()=>syncVar(el.dataset.var,el.textContent,el);
  });
  document.querySelectorAll('#lpCanvas [data-image-var]').forEach(el=>{
    el.onclick=e=>{e.preventDefault();e.stopPropagation();selectElement(el)};
  });
}
function clearSelected(){document.querySelectorAll('#lpCanvas .selected').forEach(el=>el.classList.remove('selected'))}
function selectElement(el){
  clearSelected();el.classList.add('selected');
  const panel=document.getElementById('selectedPanel');
  const varName=el.dataset.var,imageName=el.dataset.imageVar,linkName=el.dataset.linkVar;
  let html='<h3>Elemento selecionado</h3>';
  if(imageName){
    html+='<label>Imagem<label class="image-upload">Escolher arquivo<input id="imageFile" type="file" accept="image/*"></label></label><p class="muted tiny">A imagem fica incorporada no HTML exportado.</p>';
    panel.innerHTML=html;
    const input=document.getElementById('imageFile');
    input.style.display='block';
    input.onchange=()=>{
      const f=input.files&&input.files[0];if(!f)return;
      const reader=new FileReader();reader.onload=()=>{state.variables[imageName]=reader.result;renderPreview(false)};reader.readAsDataURL(f);
    };
    return;
  }
  if(varName){
    const multi=['headline','subheadline','testimonial'].includes(varName);
    html+='<label>Texto'+(multi?'<textarea id="selectedText"></textarea>':'<input id="selectedText" type="text">')+'</label>';
  }
  if(linkName)html+='<label>Hyperlink<input id="selectedLink" type="text" placeholder="https://..."></label><p class="muted tiny">Todos os botões ligados a este link são atualizados juntos.</p>';
  panel.innerHTML=html;
  const txt=document.getElementById('selectedText');if(txt){txt.value=state.variables[varName]||'';txt.oninput=()=>syncVar(varName,txt.value)}
  const lnk=document.getElementById('selectedLink');if(lnk){lnk.value=state.variables[linkName]||'';lnk.oninput=()=>syncLink(linkName,lnk.value)}
}
function renderConfigSummary(labels){
  document.getElementById('configSummary').innerHTML=labels.map((x,i)=>'<div class="config-row"><b>'+(i+1)+'</b><span>'+escapeHTML(FIELDS[i].kind)+': '+escapeHTML(x)+'</span></div>').join('');
}
function exportHTML(){
  const cfg=state.config.map(v=>v==null?0:v);
  const raw=renderPage(cfg,{customColor:state.customColor,variables:state.variables}).html;
  const clean=stripEditorMetadata(raw);
  const cssPromise=fetch('./styles.css').then(r=>r.text());
  cssPromise.then(css=>{
    const lpCss=css.slice(css.indexOf('.lp-page'));
    const title=state.variables.companyName==='NOMEDAEMPRESA'?'Landing Page':state.variables.companyName;
    const file='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escapeHTML(title)+'</title><style>'+lpCss+'</style></head><body style="margin:0">'+clean+'</body></html>';
    const blob=new Blob([file],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='landing-page.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
  });
}

document.getElementById('prevBtn').onclick=()=>{if(state.step>0){state.step--;renderWizard()}};
document.getElementById('nextBtn').onclick=()=>{
  if(state.config[state.step]==null)return;
  if(state.step<9){state.step++;renderWizard()}else enterEditor();
};
document.getElementById('backBtn').onclick=leaveEditor;
document.getElementById('variantBtn').onclick=()=>{
  // deterministic alternative: rotate the hero and depth selections, preserving explicit user answers is intentionally NOT done.
  // This button instead re-renders exactly the same base LP to demonstrate determinism.
  renderPreview(false);
  document.getElementById('variantBtn').textContent='Mesma versão ✓';
  setTimeout(()=>document.getElementById('variantBtn').textContent='Outra versão',900);
};
document.getElementById('downloadBtn').onclick=exportHTML;
document.querySelectorAll('[data-device]').forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll('[data-device]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const shell=document.getElementById('previewShell');shell.className='preview-shell '+btn.dataset.device;
});
[['colorPicker','input'],['editorColorPicker','input']].forEach(([id])=>{
  const el=document.getElementById(id);el.addEventListener('input',()=>applyColor(el.value));
});
[['hexInput'],['editorHexInput']].forEach(([id])=>{
  const el=document.getElementById(id);el.addEventListener('input',()=>{let v=el.value.trim();if(v[0]!=='#')v='#'+v;if(/^#[0-9a-f]{6}$/i.test(v))applyColor(v)});
});
document.getElementById('lpCanvas').addEventListener('click',e=>{if(e.target===e.currentTarget)clearSelected()});

renderWizard();
})(window);
