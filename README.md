# Agente

Simulador de carreira de empresário de jogadores · **BNF GAMES**

| | |
|---|---|
| Arquivo | `index.html`, arquivo único, sem build e sem dependência externa |
| Save | `localStorage`, chave `agente:v3` (de ~7 KB no começo a ~130 KB numa carreira de 80 temporadas) |
| Recordes | `agente:rec` (maior faturamento) e `agente:melhor` (melhor venda da agência) |
| Mundo | 304 clubes em 18 ligas, base copiada do `fundo-de-clubes.html` |
| App | instalável (PWA) e funciona offline: `manifest.webmanifest`, `sw.js`, `icons/` |
| Site | https://goncalvesj081-bit.github.io/agent/, publicado a cada push na `main` (`.github/workflows/pages.yml`) |

### Instalar no celular

Abra https://goncalvesj081-bit.github.io/agent/.

- **Android (Chrome):** toque em **Instalar o app** na tela inicial do jogo, ou use o menu ⋮ → *Instalar app*.
- **iPhone (Safari):** **Compartilhar** → **Adicionar à Tela de Início**.

O save fica no aparelho. Com internet, o app sempre busca a versão nova do jogo; sem internet,
abre a última que baixou. Se uma atualização não aparecer, feche e abra o app de novo.

## Índice

1. [Visão geral](#1-visão-geral)
2. [Loop de uma temporada](#2-loop-de-uma-temporada)
3. [A agência](#3-a-agência)
4. [Informação](#4-informação)
5. [Mercado e negociação](#5-mercado-e-negociação)
6. [Relação com o cliente](#6-relação-com-o-cliente)
7. [Vida do jogador](#7-vida-do-jogador)
8. [Metas, acontecimentos e Copa do Mundo](#8-metas-acontecimentos-e-copa-do-mundo)
9. [Fim de carreira](#9-fim-de-carreira)
10. [Telas](#10-telas)
11. [Fórmulas](#11-fórmulas)
12. [Desenvolvimento](#12-desenvolvimento)
13. [Backlog](#13-backlog)
14. [Histórico de decisões](#14-histórico-de-decisões)
15. [Histórico de versões](#15-histórico-de-versões)

---

## 1. Visão geral

Você abre um escritório numa mesa de sala de casa, com um cliente ruim e R$ 180 mil, e tenta
virar a maior agência do mercado.

O jogo é de **informação e timing**, não de simulação esportiva. Não existem partidas: a
temporada roda num botão e devolve números.

**Fontes de receita**

| Tipo | Origem |
|---|---|
| Recorrente | comissão sobre salário |
| Recorrente | direitos de imagem (sua parte: 20%) |
| Pontual | transferência (com opção de percentual da próxima venda) |
| Pontual | renovação e luvas |
| Pontual | empréstimo |
| Pontual | metas da temporada |
| Pontual | patrocínios (acontecimento) |
| Pontual | pré-contrato (comissão sobre as luvas) |
| Pontual | direitos econômicos (fatia da venda) |

---

## 2. Loop de uma temporada

1. **Janela**
   - responder aos acontecimentos (cartas com escolha);
   - correr atrás das metas da temporada;
   - sondar nomes e assinar clientes, antes que uma rival leve os garotos disputados;
   - definir diretrizes e escolher os craques;
   - renovar contratos, buscar empréstimo, resolver as pendências dos craques.

   A equipe já resolveu a rotina dos outros clientes assim que a janela abriu.
2. **Rodar a temporada** (um toque): a temporada se revela cliente a cliente. Os jogadores
   jogam, evoluem, ganham prêmios e se machucam; clubes sobem e descem de divisão; o ciclo de
   mercado gira; rivais crescem e levam os garotos que você deixou passar.
3. **Relatório anual**: faturamento, variação do caixa, posição no ranking, conta aberta do
   caixa, desempenho de cada cliente, metas cumpridas, janela de transferências, o que a equipe
   fez e o que aconteceu.
4. Volta para a janela.

---

## 3. A agência

### Escritório (a alavanca principal)

| Nível | Sede | Clientes | Craques com você | Custo da obra | Custo por temporada |
|---|---|---|---|---|---|
| 1 | mesa na sala de casa | 4 | todos (sem equipe) | — | R$ 28 mil |
| 2 | sala alugada no centro | 8 | 4 | R$ 900 mil · 1 temp. | R$ 220 mil |
| 3 | escritório com equipe | 14 | 6 | R$ 6 mi · 1 temp. | R$ 900 mil |
| 4 | agência nacional | 22 | 9 | R$ 24 mi · 2 temp. | R$ 3,4 mi |
| 5 | agência com filial na Europa | 32 | 12 | R$ 90 mi · 2 temp. | R$ 11 mi |

O nível também define quantos nomes chegam por temporada, quantas sondagens cabem na janela,
até que liga vai o seu alcance e as duas taxas de comissão (salário e transferência). Mudar de
sede é obra: você paga agora e ela fica pronta depois.

### Dificuldade

Escolhida ao abrir o escritório; aparece na sede.

| Dificuldade | Caixa inicial | Rivais |
|---|---|---|
| Tranquilo | R$ 300 mil | crescem 3 pontos mais devagar, perseguem 20% menos, quase não pressionam a líder |
| Normal | R$ 180 mil | como descrito nesta página |
| Difícil | R$ 120 mil | crescem um pouco mais rápido, perseguem 15% mais, pressionam mais a líder |

### Equipe e craques

A partir da sala alugada a agência tem equipe, e você passa a cuidar pessoalmente só dos
**craques** (★). Você marca quem é craque na estrela, na lista de clientes ou na ficha; as vagas
que sobrarem ficam com os mais valiosos.

Os outros clientes ficam com a equipe, que age assim que a janela abre:

| Situação | O que a equipe faz |
|---|---|
| Contrato vencendo, ou cliente pedindo salário | renova a preço de mercado (duas tentativas, chance um pouco menor que a sua) |
| Cliente querendo jogar | busca empréstimo onde ele seja titular ou rode o elenco (não empresta quem tem proposta grande esperando você) |
| Assédio de rival | tenta segurar uma vez |
| Cliente com exigência | conversa com ele, sem fazer promessa |
| Propostas, com a diretriz *Equipe* | fecha só o que for bom para ele: mais minutos ou salário 15% maior |

Para você só sobe proposta fora da curva cuja comissão seja grande para o tamanho da agência.
Tudo o que a equipe fez aparece na Mesa e no relatório. O departamento jurídico melhora as
renovações da equipe; o suporte ao atleta melhora a chance de segurar.

### Melhorias (também em obra)

Três níveis cada.

| Melhoria | Efeito |
|---|---|
| Rede de olheiros | mais nomes chegam à sua mesa e a sondagem rende mais |
| Departamento jurídico | clubes cedem mais fácil e sua comissão sobe 1,5 ponto por nível |
| Assessoria de imprensa | a fama dos clientes cresce além do que o campo justifica (e aumenta a imagem) |
| Suporte ao atleta | a confiança cai mais devagar e o cliente evolui melhor |

### Academia própria

A partir do escritório com equipe, na aba Estrutura. Forma garotos de 15 a 17 anos, com teto alto
e já bem conhecidos (70% de leitura), que entram na aba Nomes marcados como "da sua academia" e
são muito mais fáceis de assinar (+35% de chance). Rivais não disputam esses garotos.

| Nível | Obra | Custo por temporada | Garotos por temporada |
|---|---|---|---|
| 1 | R$ 8 mi · 2 temp. | R$ 400 mil | 1 |
| 2 | R$ 25 mi · 2 temp. | R$ 1,2 mi | 2 |
| 3 | R$ 70 mi · 2 temp. | R$ 3,5 mi | 3 |

### Marcos

Nove marcos de carreira, cada um valendo reputação:

| Marco | Condição |
|---|---|
| Primeiro cliente na elite | cliente numa liga de reputação 30 ou mais |
| Primeiro cliente na Europa | colocar um cliente num clube europeu |
| Primeiro prêmio individual | um cliente levar prêmio de temporada |
| Primeira transferência grande | fechar uma transferência acima de R$ 20 mi |
| Cinco clientes ao mesmo tempo | ter cinco na carteira de uma vez |
| Escritório com equipe | chegar ao terceiro nível de sede |
| Uma carreira inteira ao lado | ter um cliente que se aposentou com você |
| Cem milhões faturados | somar R$ 100 mi de receita acumulada |
| Cliente na Copa do Mundo | ter um cliente convocado para a seleção |

### Rivais e ranking

- **Seis agências rivais** disputam o ranking de faturamento acumulado. Você começa em último;
  virar a maior agência é o objetivo de longo prazo.
- **As rivais reagem a você.** Cada uma tem dois caminhos e fatura o maior deles:
  - crescimento próprio, de 20% a 25% por temporada, que acompanha o ciclo de mercado;
  - perseguição: mira uma fração do seu faturamento na temporada (de 48% a 112%, conforme a
    força da rival) e fecha 60% da distância por temporada. Se você para de crescer, elas
    encostam.
- **A líder vira alvo.** Enquanto você está em 1º, as rivais perseguem 15% a mais, assediam seus
  clientes 50% mais e brigam mais pelos garotos (marcam mais e levam 75% em vez de 60%).
- Elas ficam mais fortes quando levam um cliente seu (por assédio) ou um garoto que você deixou
  passar.
- Medido com bots em 30 carreiras: quem joga como o bot básico termina em 4º; quem fatura 40%
  a mais lidera com pouca folga e disputa o 1º até o fim; quem fatura 80% a mais lidera com
  folga.
- As vendas das rivais têm preço de mercado, pela liga de destino: mediana de R$ 30 mi na elite
  europeia (teto perto do recorde mundial), R$ 8 mi no resto da Europa, R$ 3 mi na Série A e
  ligas sul-americanas fortes, R$ 800 mil nas menores.
- A Mesa mostra sua posição e quanto falta para passar a próxima. A Análise mostra a corrida
  em gráfico.
- **Rivais com cara:** a cada temporada as rivais fecham negócios (vendas, assinaturas,
  filiais na Europa) que aparecem nas notícias, no relatório ("Mercado das rivais") e no
  Ranking, com o faturamento de cada uma na temporada, a última manchete e o maior negócio.

---

## 4. Informação

### Leitura em faixa

- O nível e o teto do jogador aparecem como faixa (`45–63`), nunca como número, até a leitura
  chegar a 95%.
- Cada jogador tem um **desvio fixo e próprio**, que é uma fração (até 85%) da meia-largura da
  faixa. Por isso a faixa **sempre contém o valor real**, e cada sondagem só a aperta em volta
  dele, sem pular. Exemplo com nível real 46: `28–61 → 33–57 → 37–54 → 41–50 → 45–47`.
- Entre temporadas a faixa pode se mover, porque o jogador evolui e a leitura de quem não é seu
  envelhece (fica mais larga).
- Um cliente seu você passa a conhecer sozinho, cerca de 20% por temporada.
- Todo jogador gerado tem nome único na carteira e no radar.

### Disputa pelos garotos

Na aba Nomes, alguns garotos sem agente e com bom teto aparecem com
"*[rival]* está de olho: assine nesta janela ou ela leva". Se você não assinar, há 60% de
chance de a rival levar quando a temporada rodar.

---

## 5. Mercado e negociação

### Diretrizes (como a janela se resolve)

Cada cliente tem uma diretriz, num seletor de uma linha. Existe também uma diretriz padrão da
agência, que vale para quem assina com você.

| Diretriz | Rótulo | O que faz |
|---|---|---|
| Segurar | Segurar | recusa tudo |
| Ouvir | Ouvir (craque) · Equipe (os outros) | as propostas vêm para a sua mesa, ou para a equipe |
| Buscar saída | Vender | fecha sozinho a melhor proposta pelo dinheiro |
| Buscar minutos | Minutos | fecha a que dá mais espaço no elenco |

**Chegam à sua mesa:**
1. craque em *Ouvir*;
2. proposta fora da curva (valor 60% acima do que ele vale, ou salário dobrado); para clientes
   da equipe, só se a comissão for grande para o tamanho da agência;
3. craque que o clube barrou;
4. craque que não quis ir.

### Propostas e transferência

Cada proposta traz salário, valor da transferência, status prometido, duração, sua comissão
e a chance de o clube atual liberar. O botão diz para qual clube ele vai.

| Fechamento | Efeito |
|---|---|
| Normal | comissão cheia |
| Com venda futura | metade da comissão hoje, mais 15% da próxima venda (cobrados automaticamente) |

O cliente tem voz: pode recusar o destino (banco, salário menor ou liga mais fraca). Aí você
escolhe entre **Forçar** (custa 12 de confiança) e **Desistir**. Quando o clube barra uma
proposta, ela sai da lista.

### Contrato e cláusula

Mesa de renovação com quatro linhas ajustáveis (− e +), barra de chance de aceite recalculada a
cada toque e contador de tentativas. O clube aceita até **três propostas por janela**; depois
encerra a conversa até a próxima.

| Eixo | Opções |
|---|---|
| Salário | de 50% a 250% do mercado (mostra a diferença); pedir acima de 10% do mercado derruba a chance rápido |
| Status no elenco | fora dos planos → reserva → rodando o elenco → titular absoluto |
| Duração | 1 a 5 temporadas |
| Cláusula de rescisão | sem / 4× / 2,5× / 1,5× o valor |

O trade-off da cláusula: uma cláusula baixa derruba a chance de aceite, mas uma proposta que
cobre a cláusula não pode ser barrada pelo clube.

### Pré-contrato (Bosman)

- Disponível no **último ano** de contrato ou com o contrato **vencido**, na aba Negociar.
- Clubes interessados oferecem levar o jogador **de graça**: o clube atual não recebe nada, o
  dinheiro vira luvas para o jogador e a sua comissão sai delas (30% das luvas mais um ano de
  comissão de salário). Na média rende o mesmo que uma venda, mas o clube não pode barrar.
- No último ano ele joga a temporada no clube atual e muda na virada; o clube costuma encostar
  quem vai embora (50% de cair um nível no elenco). Com o contrato vencido, muda na hora.
- Pré-contrato não paga direitos econômicos: a sua fatia vira zero.
- Contrato **vencido** que ninguém resolver na janela (renovação ou pré-contrato): quando a
  temporada roda, ele assina com o clube que aparecer, por salário menor e sem comissão, e perde
  8 de confiança. A equipe tenta pré-contrato quando não consegue renovar.
- Contrato vencido não recebe proposta de compra (vira pré-contrato) e não pode ser emprestado.

### Direitos econômicos

- Na aba Negociar, compre 10% dos direitos de um cliente ao clube dele, até 30%. Preço: 10,5%
  do valor de mercado por fatia.
- Na próxima venda, você recebe a fatia do valor da transferência.
- Pré-contrato, saída livre e aposentadoria não pagam nada. Se ele sair da agência (rescisão ou
  assédio), a fatia é revendida por 80% do valor.
- A carteira de direitos aparece na Análise e entra no valor da agência.

### Empréstimo

- Só empresta quem tem contrato em vigor e não assinou pré-contrato.
- Clubes menores levam o jogador por **uma temporada**, com status prometido e salário assumido
  por eles. A comissão é menor, mas resolve o cliente encalhado.
- Emprestar cancela as propostas de compra que estavam na mesa.
- Enquanto está emprestado, ele não recebe propostas de compra e **não renova contrato**: a ficha
  mostra para onde e quando ele volta, e a renovação é com o clube dono, na volta.
- Ele volta sozinho na virada, com o status que o clube dono acha justo.

### Artigo 19 (regra real da FIFA)

- Menor de 18 anos não recebe proposta nem empréstimo de clube de outro país.
- Exceção implementada: entre 16 e 18 anos, transferência dentro da Europa é permitida.

### Ciclo de mercado

É um multiplicador de **0,62 a 1,55** sobre todos os valores, com estado nomeado:

`crise → frio → normal → aquecido → euforia`

A Mesa mostra um termômetro com a fase atual, a tendência (esquentando, esfriando, estável) e a
dica: vender no aquecido e na euforia, assinar no frio e na crise.

---

## 6. Relação com o cliente

### Confiança

- Escala de 0 a 100, com extrato das últimas oito mudanças (cada uma com motivo e sinal).
- Um rosto de humor, pela confiança, aparece na lista de clientes e na Mesa.
- **Abaixo de 45**, ele pode trocar de agência na virada: o risco cresce quanto menor a confiança,
  e sobe com exigência em aberto (+12 pontos) e assédio de rival (+22 pontos). O suporte ao atleta
  reduz.
- A Mesa mostra o card **Risco de perder clientes**, com a chance de cada um trocar de agência
  (e o motivo) e a chance de se aposentar na virada.
- Quem sai aparece com destaque: na revelação da temporada, num card vermelho **Saíram da sua
  agência** no topo do relatório e da Mesa (motivo, rival, valor, quanto rendeu e quanto deixa
  de render por ano), e no destaque do relatório (clientes −N).

| Evento | Efeito |
|---|---|
| Transferência com titularidade | +11 |
| Contrato acima do mercado | +9 |
| Prêmio individual | +4 a +9 |
| Conversar (uma vez por janela) | +3 a +9 |
| Temporada inteira jogando | +7 |
| Proposta recusada que ele queria | −5 |
| Promessa não cumprida | −8 |
| Temporada no banco | −9 |
| Transferência forçada | −12 |

Os acontecimentos também mexem na confiança (seção 8).

### Exigências, promessa e assédio

- O cliente cobra: quer jogar, quer salário compatível e quer clube maior.
- Conversar com quem tem exigência vale como **promessa**: se a exigência continuar de pé quando
  a temporada rodar, ele perde 8 de confiança.
- A partir da **terceira temporada**, agências rivais passam a assediar quem está insatisfeito.
  Segurar depende de confiança, reputação e suporte ao atleta, e dá para tentar **uma vez por
  janela**.
- Encerrar a relação manda o cliente para uma rival e custa um pouco de reputação.

---

## 7. Vida do jogador

### Prêmios

Craque do campeonato, seleção da temporada, artilheiro da liga, revelação e quem foi melhor em
campo mais vezes. Os prêmios dão salto de fama (e portanto de preço), confiança e reputação.

### Lesão grave

Chance de ~2% por temporada, que sobe com a idade. Derruba jogos, nível e fama de uma vez.

### Aposentadoria e indicação

- A partir dos 33 anos o cliente pode se aposentar, com o balanço do que rendeu em toda a
  relação.
- Em quase metade dos casos ele indica um garoto, que entra na sua mesa já bem conhecido.

---

## 8. Metas, acontecimentos e Copa do Mundo

### Metas da temporada

Cada janela traz três metas curtas, na escala da agência:

| Meta | Exemplo |
|---|---|
| Transferência | feche uma transferência acima de R$ X (70% do seu cliente mais valioso) |
| Assinaturas | assine 1 ou 2 clientes novos |
| Caixa | termine a temporada com R$ X em caixa |
| Faturamento | fature R$ X nesta temporada |
| Elite | tenha N clientes na Série A ou em liga mais forte |
| Europa | tenha N clientes jogando na Europa (a partir do escritório com equipe) |
| Renovações | renove N contratos |
| Confiança | termine sem nenhum cliente abaixo de 55 de confiança |
| Prêmio | um cliente seu leva um prêmio individual |

Cada meta paga dinheiro (entra como receita) e 1 ou 2 de reputação. Cumprir as três dá um bônus.
A Mesa mostra o progresso; caixa, faturamento e confiança só contam no fim da temporada.

### Acontecimentos

Até dois por janela, a partir da segunda temporada, como cartas com escolha. Cada opção mostra
o efeito antes de você escolher.

| Acontecimento | Escolhas |
|---|---|
| Cliente flagrado numa festa | defender em público (reputação −1,5, confiança +7) · bronca em particular (confiança −2, 40% de a história crescer) · deixar quieto (confiança −5) |
| Marca quer o cliente como garoto-propaganda | fechar pelo valor (fama +2) · pedir quase o dobro (55% de fechar) · recusar |
| Pai do cliente pede adiantamento | adiantar (caixa, confiança +9) · negar (confiança −6) |
| Clube quer renovar agora, 10% acima do mercado e 4 anos | aceitar · esperar |
| Programa de TV quer entrevistar você | ir (70% reputação +1,5, 30% −1) · recusar |
| Treinador de base tem um garoto especial | pagar e receber um garoto de 15 a 17 anos bem conhecido · dispensar |

- Rodar a temporada sem responder aplica a **última opção**.
- Se a situação mudou desde que a carta chegou (o jogador foi emprestado, saiu da agência), a
  carta perde a validade.

---

### Copa do Mundo

- A cada 4 temporadas (4, 8, 12...), no fim da temporada. A Mesa mostra, no ano da Copa, a chance
  de convocação de cada cliente; nos outros anos, o termômetro avisa quando é a próxima. A ficha
  mostra a chance de cada um.
- A seleção convoca quem tem nível, fama e minutos (titular ou rodando o elenco), com bônus para
  quem joga em liga forte.
- Convocado: fama de +2 a +24 conforme as notas, +6 de confiança, reputação para a agência. O
  Brasil é campeão em ~22% das Copas (+5 de fama para os convocados, prêmio de campeão do mundo).
  O melhor em campo pode virar **craque da Copa** (+10 de fama, +2 de reputação).
- Quem tinha chance boa (40% ou mais) e ficou fora perde 4 de confiança.
- Depois da Copa o mercado esquenta (+0,06 no ciclo). O relatório traz um card da Copa.

## 9. Fim de carreira

Não há prazo: a agência dura o quanto você quiser. A partir da temporada 10, a aba Escritório
oferece **vender a agência**, que encerra a carreira com o valor dela e um título:

| Valor da agência | Título |
|---|---|
| até R$ 5 mi | Agente de bairro |
| a partir de R$ 5 mi | Agência regional |
| a partir de R$ 30 mi | Agência nacional |
| a partir de R$ 150 mi | Potência internacional |
| a partir de R$ 500 mi | Lenda do mercado |

O valor e o título atuais aparecem sempre na sede. O valor inclui 80% da carteira de direitos
econômicos e metade do investimento na academia. A melhor venda fica gravada e aparece na tela
inicial, junto com o recorde de faturamento.

O jogo também acaba se o escritório quebrar (caixa abaixo de −R$ 200 mil) ou se ficar sem
clientes e sem caixa para ir atrás de outro.

---

## 10. Telas

### Abas principais

| Aba | Conteúdo |
|---|---|
| **Mesa** | quem saiu na última virada, primeiros passos (três primeiras temporadas), acontecimentos, risco de perder clientes, Copa do Mundo (no ano da Copa), metas da temporada, propostas que passaram pela diretriz, pendências dos craques, termômetro do mercado, corrida das agências, o que a equipe fez, botão de rodar a temporada |
| **Clientes** | craques com você e clientes com a equipe, em seções; estrela para marcar craque; nível, valor, contrato, confiança com rosto de humor; seletor de diretriz; ação direta na linha; quem já foi seu |
| **Nomes** | quem o escritório trouxe; aviso de rival de olho; garotos da sua academia; assinar e sondar em um toque; filtros e ordenação |
| **Análise** | gráfico de caixa e receita, gráfico da corrida das agências, painel da agência, principal ativo, melhores investimentos (ROI), valorização desde a assinatura, de onde veio o dinheiro, pipeline, trajetória |
| **Escritório** | sede (dificuldade, valor da agência e venda), estrutura (melhorias e academia), marcos, ranking (com as rivais), notícias, backup |

A barra de baixo tem ícones desenhados (SVG) e mostra o número de pendências na Mesa.

### Ficha do jogador

| Aba | Conteúdo |
|---|---|
| **Resumo** | números, quem cuida (você ou a equipe), chance de convocação, direitos, pré-contrato, origem na academia, diretriz, confiança, pendências |
| **Carreira** | gráfico de nível (com o teto tracejado), gráfico de valor de mercado, prêmios, temporadas, conta aberta do valor, leitura |
| **Negociar** | assédio, propostas, empréstimo, pré-contrato, direitos econômicos, mesa de renovação, conversa, rescisão, extrato de confiança |

### Rodar a temporada

O botão revela a temporada cliente a cliente: jogos, gols e nota sobem, prêmio ganha borda
dourada e lesão, borda vermelha. Dá para pular direto ao relatório. Com "reduzir movimento"
ligado no aparelho, vai direto ao relatório.

O relatório abre com três destaques (faturamento, variação do caixa, movimento no ranking) e
traz caixa, clientes, metas, janela de transferências, equipe e acontecimentos. Pode ser reaberto
em Escritório → Notícias.

### Backup

Escritório → Backup: **baixar arquivo** (`.json`), **copiar código** (para colar em notas ou
e-mail) ou **importar** (arquivo ou código). A tela inicial também tem "Importar uma carreira
salva". Importar substitui a carreira do aparelho, depois de confirmar.

### Custo em toques

| Ação | Toques |
|---|---|
| Sondar | 1 |
| Assinar | 1 |
| Trocar diretriz ou marcar craque | 1 |
| Responder acontecimento | 1 |
| Renovar | 2 ou mais |
| Avaliar e fechar proposta | 2 |

---

## 11. Fórmulas

```
valor         = 6,5 · (fama/50)^2,6 · fatorIdade · fatorLiga · fatorContrato · ciclo
salárioJusto  = 0,5 · ECO[liga] · (fama/55)^2,3 · (0,8 + nível/230)
imagem        = 0,035 · ECO · (fama/55)^2,6 · (1 + assessoria·0,5)    [sua parte: 20%]

minutos       = base(status) · ajuste(nível vs nível do clube) · sorte
evolução      = base(idade) · (0,2 + minutos) · suporte
fama         += (ref da liga + (nota − 6,1)·20 + palco − fama) · peso(minutos, palco)

renda         = comissão anual sobre salários + sua parte da imagem
valorAgência  = caixa + 6 · renda + 0,08 · carteira + 0,05 · reputação + 0,8 · direitos + 4 · nívelAcademia
pré-contrato  = luvas (10% a 21% do valor cheio) · 0,3 + salário · comissão
convocação    = (nível − 68)/14 · (0,4 + fama/100) · (1 se joga, 0,45 se não) · (1,1 se liga forte, 0,85 se não)
meta          = paga 18% a 30% da renda (arredondado) e 1–2 de reputação; bônus de 25% da renda pelas três
rivalBase     = base · (1,205 a 1,255 + ruído) · variação do ciclo, por temporada
rivalTrack   += (seuFaturamentoDaTemporada · força · dificuldade · (pressão se você lidera) − rivalTrack) · 0,6
rivalAno      = max(rivalBase, rivalTrack)
               (o crescimento próprio desacelera perto de R$ 600 mi por temporada)          força = 0,5 · 0,65 · 0,8 · 0,95 · 1,12 · 1,3
qualiEquipe   = 0,78 + 0,05 · jurídico    (multiplica a chance de renovação da equipe)
```

**fatorIdade**

| Idade | ≤18 | ≤21 | ≤25 | ≤28 | ≤31 | 32+ |
|---|---|---|---|---|---|---|
| Fator | 1,55 | 1,72 | 1,35 | 1,0 | 0,6 | 0,3 |

---

## 12. Desenvolvimento

- Tudo está em `index.html`: estilo, dados do mundo, regras e telas. Não há build.
- Para testar localmente: `python3 -m http.server` na pasta e abrir `http://localhost:8000/`
  (o service worker não roda abrindo o arquivo direto).
- A cada mudança publicada, suba a versão `CACHE` em `sw.js` para o app instalado trocar o cache.
- Saves antigos continuam valendo: o carregamento completa os campos novos (rivais, metas,
  acontecimentos) quando faltam.
- Saves e backups antigos sem dificuldade entram como Normal.
- Carreiras afetadas pelo bug antigo do salário na renovação são consertadas ao carregar: salário
  absurdo volta para o mercado, e caixa, faturamento e rivais voltam à última temporada sã do
  histórico. Uma janela avisa o que foi corrigido.
- As mudanças desta rodada foram validadas com bots no navegador (Playwright): um que joga
  carreiras inteiras para medir o equilíbrio, um que clica em botões aleatórios e um que audita
  o estado do jogo a cada temporada em carreiras de 80 temporadas. Os bots não estão no
  repositório.

---

## 13. Backlog

Itens pesquisados e ainda não implementados. O pré-contrato (Bosman), que estava aqui, foi
implementado (seção 5).

| # | Ideia | Resumo | O que acrescenta |
|---|---|---|---|
| 1 | **Licença e teto de comissão (FFAR)** | exame e licença anual; tetos de 3%/5%/10% por jurisdição, com a Inglaterra fora da regra | porta de entrada e arbitragem entre mercados |
| 2 | **Mandato de dois anos** | o contrato de representação expira e precisa ser renovado com o próprio cliente | janela legítima de assédio às rivais |
| 3 | **Dupla representação** | atuar pelo jogador ou pelo clube comprador; fazer os dois paga o dobro | dilema dinheiro × confiança |
| 4 | **Mecanismo de solidariedade** | até 5% (6% no Brasil) de cada transferência vai para os clubes formadores | dedução na conta aberta |

---

## 14. Histórico de decisões

| Fase | O que foi | Por que mudou |
|---|---|---|
| Olheiro | departamento de captação comprando garotos; reconstruído três vezes | papel errado: comprar em vez de cuidar |
| Rodada a rodada | temporada simulada em 14 rodadas, com tabela, artilharia e olheiro escalado para jogos | análise de partida não interessa |
| Molde Fundo de Clubes | conta aberta na tela, ativo com perfil de indicadores, alavancas que levam temporadas, temporada que fecha em relatório, rivais agindo sozinhos, ciclo de mercado, benchmark e ranking | base da versão atual |
| Gestão por diretriz | a janela passou a ser resolvida por diretrizes | oito clientes com proposta mostraram que aprovar caso a caso é burocracia, não jogo |
| Rivais que crescem | rivais com crescimento composto, ligadas ao ciclo, que se fortalecem com o que tiram de você | um bot simples terminava em 1º quase sempre; o ranking não era disputa |
| Rivais que reagem | rivais perseguem o seu faturamento e pressionam mais quem lidera | jogando bem, abria R$ 50 mi sobre a 2ª agência em 15 temporadas: fácil demais |
| Limites por janela | conversar, segurar e renovar passaram a ter limite por janela | dava para repetir o clique até dar certo |
| Equipe e craques | a partir da sala alugada a equipe cuida da rotina; você só dos craques | com muitos clientes, tomar todas as decisões ficava chato e o jogador parava de jogar |
| Metas e acontecimentos | três metas curtas e até duas cartas de escolha por janela | cada temporada precisava de um motivo próprio e de variedade |
| Fim sem prazo | carreira sem limite de temporadas, encerrada pela venda da agência | uma agência dura mais que a carreira de uma pessoa |
| Copa e pré-contrato | Copa a cada 4 temporadas; contrato vencido passou a ter consequência | o jogo é de timing: segurar até a Copa e deixar o contrato correr são decisões de timing |
| Onde gastar | academia própria e direitos econômicos | depois da sede máxima o caixa acumulava sem uso |

---

## 15. Histórico de versões

Datas de 2026.

| Data | Versão | O que mudou |
|---|---|---|
| 26/10 | Documentação | README organizado por tema, com índice e tabelas |
| 26/10 | App | instalável (PWA), offline, ícone, botão de instalar, publicação no GitHub Pages |
| 27/10 | Equilíbrio e layout | rivais crescendo; limites por janela; empréstimo de uma temporada; ícones SVG; primeiros passos; termômetro do mercado; corrida das agências; diretriz em seletor de uma linha; mesa de renovação compacta; destaques no relatório |
| 27/10 | Equipe e craques | equipe para os clientes fora dos craques; diretriz padrão aplicada a quem assina; nomes únicos |
| 27/10 | Correção | botão Desistir na Mesa não funcionava |
| 27/10 | Metas e acontecimentos | metas da temporada; acontecimentos; disputa pelos garotos; venda da agência; temporada com suspense; gráficos; rosto de humor |
| 27/10 | Correções | empréstimo cancela propostas e não renova com o clube do empréstimo (em todas as telas); botão de transferência com o destino certo; pendência fantasma; aviso apontando a proposta errada; erro ao tocar proposta que sumiu |
| 27/10 | Auditoria | acontecimento que perde a validade; equipe não empresta quem tem proposta grande; encerrar relação limpa as propostas |
| 27/10 | Correção | faixa de nível e teto: em ~1 de cada 5 jogadores ela não continha o valor real e "pulava" a cada sondagem; agora sempre contém e só aperta |
| 27/10 | Dificuldade | rivais perseguem o seu faturamento; a líder vira alvo (mais assédio, mais disputa por garotos, rivais investindo) |
| 27/10 | Copa, pré-contrato e mais | Copa do Mundo; pré-contrato (Bosman) e fim de contrato com consequência; academia; direitos econômicos; dificuldade; rivais com manchetes; backup da carreira |
| 27/10 | Visual | confirmações e campos de texto em janela própria do jogo, no lugar das caixas do navegador |
| 27/10 | Saídas | risco de perder clientes na Mesa; quem saiu aparece na revelação, no topo do relatório e da Mesa |
| 27/10 | Correção | salário na renovação sem limite (chegava a valores absurdos) e chance de aceite que quase não caía com pedido alto |
| 27/10 | Valores | dinheiro em bilhões (bi) e trilhões (tri) em carreiras longas; sem "R$ 1000 mil" nos arredondamentos |
| 27/10 | Conserto | saves afetados pelo bug do salário são corrigidos ao carregar; crescimento próprio das rivais com teto, para carreiras muito longas |
| 28/10 | Rivais | vendas das rivais com preço de mercado (não mais de R$ 1 bi a 2 bi qualquer jogador); perseguição mais branda, para dar para alcançar e passar a líder |
