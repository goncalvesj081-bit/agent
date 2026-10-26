# Agente

Simulador de carreira de empresário de jogadores · **BNF GAMES**

| | |
|---|---|
| Arquivo | `index.html`, arquivo único, sem build e sem dependência externa |
| Save | `localStorage`, chave `agente:v3` (de ~7 a 40 KB conforme a carreira) |
| Mundo | 304 clubes em 18 ligas, base copiada do `fundo-de-clubes.html` |
| App | instalável (PWA) e funciona offline: `manifest.webmanifest`, `sw.js`, `icons/` |
| Site | GitHub Pages, publicado a cada push na `main` (`.github/workflows/pages.yml`) |

### Instalar no celular

Abra `https://goncalvesj081-bit.github.io/agent/`.

- **Android (Chrome):** toque em **Instalar o app** na tela inicial do jogo, ou use o menu ⋮ → *Instalar app*.
- **iPhone (Safari):** **Compartilhar** → **Adicionar à Tela de Início**.

O save continua no aparelho (`localStorage`). Quando um arquivo novo entrar na lista do
cache, suba a versão `CACHE` em `sw.js`.

## Índice

1. [Visão geral](#1-visão-geral)
2. [Loop de uma temporada](#2-loop-de-uma-temporada)
3. [A agência](#3-a-agência)
4. [Informação](#4-informação)
5. [Mercado e negociação](#5-mercado-e-negociação)
6. [Relação com o cliente](#6-relação-com-o-cliente)
7. [Vida do jogador](#7-vida-do-jogador)
8. [Telas](#8-telas)
9. [Fórmulas](#9-fórmulas)
10. [Backlog](#10-backlog)
11. [Histórico de decisões](#11-histórico-de-decisões)

---

## 1. Visão geral

Você abre um escritório numa mesa de sala de casa, com um cliente ruim e R$ 120 mil, e tenta
virar agência.

O jogo é de **informação e timing**, não de simulação esportiva. Não existem partidas: a
temporada roda num botão e devolve números.

**Fontes de receita**

| Tipo | Origem |
|---|---|
| Recorrente | comissão sobre salário |
| Recorrente | direitos de imagem (sua parte: 20%) |
| Pontual | transferência |
| Pontual | renovação / luvas |

---

## 2. Loop de uma temporada

1. **Janela**: sondar nomes, assinar clientes, definir diretrizes, renovar contratos,
   buscar empréstimo e responder às exceções da janela anterior.
2. **Rodar a temporada** (um toque): os jogadores jogam, evoluem, ganham prêmios e se
   machucam; clubes sobem e descem de divisão; o ciclo de mercado gira.
3. **Relatório anual**: caixa com conta aberta, desempenho de cada cliente, janela de
   transferências resolvida pelas diretrizes e eventos.
4. Volta para a janela.

---

## 3. A agência

### Escritório (a alavanca principal)

| Nível | Sede |
|---|---|
| 1 | mesa em casa |
| 2 | sala alugada |
| 3 | escritório com equipe |
| 4 | agência nacional |
| 5 | agência com filial na Europa |

O nível define:
- quantos clientes cabem;
- quantos nomes chegam por temporada;
- quantas sondagens cabem na janela;
- até que liga vai o seu alcance;
- as duas taxas de comissão.

Mudar de sede é obra: você paga agora e ela fica pronta em 1 ou 2 temporadas.

### Melhorias (também em obra)

| Melhoria | Efeito |
|---|---|
| Rede de olheiros | mais nomes chegam à sua mesa e a sondagem rende mais |
| Departamento jurídico | clubes cedem mais fácil e sua comissão sobe 1,5 ponto por nível |
| Assessoria de imprensa | a fama dos clientes cresce além do que o campo justifica (e aumenta a imagem) |
| Suporte ao atleta | a confiança cai mais devagar e o cliente evolui melhor |

### Marcos e ranking

- **Oito marcos de carreira**, cada um valendo reputação:

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

- **Seis agências rivais** faturam junto e aparecem no ranking, com a distância para a mediana.

---

## 4. Informação

### Leitura em faixa

- O nível e o teto do jogador aparecem como faixa (`45–63`), nunca como número, até a leitura
  chegar a 95%.
- Cada jogador tem um **erro fixo e próprio**. A sondagem encolhe esse erro, então a faixa
  só aperta em volta da verdade e nunca pula.
- Um cliente seu você passa a conhecer sozinho, cerca de 20% por temporada.

---

## 5. Mercado e negociação

### Diretrizes (como a janela se resolve)

Cada cliente tem uma diretriz, que você troca com um toque na linha. Existe também uma
diretriz padrão da agência para quem assina novo.

| Diretriz | O que faz |
|---|---|
| Segurar | recusa tudo |
| Ouvir | as propostas vêm para a sua mesa |
| Buscar saída | fecha sozinho a melhor proposta pelo dinheiro |
| Buscar minutos | fecha a que dá mais espaço no elenco |

**Só quatro casos chegam à sua mesa:**
1. cliente em *Ouvir*;
2. proposta fora da curva (valor 60% acima do que ele vale, ou salário dobrado);
3. clube que barrou a saída;
4. cliente que não quis ir.

### Propostas e transferência

Cada proposta traz salário, valor da transferência, status prometido, duração, sua comissão
e a chance de o clube atual liberar.

| Fechamento | Efeito |
|---|---|
| Normal | comissão cheia |
| Com venda futura | metade da comissão hoje, mais 15% da próxima venda (cobrados automaticamente) |

O cliente tem voz: pode recusar o destino (banco, salário menor ou liga mais fraca). Forçar
custa 12 pontos de confiança.

### Contrato e cláusula

É uma mesa de renovação com quatro eixos ajustáveis. A probabilidade de aceite é recalculada
a cada clique.

| Eixo | Opções |
|---|---|
| Salário | livre |
| Status no elenco | livre |
| Duração | livre |
| Cláusula de rescisão | sem / 4× / 2,5× / 1,5× o valor |

O trade-off da cláusula: uma cláusula baixa derruba a chance de aceite, mas uma proposta que
cobre a cláusula não pode ser barrada pelo clube.

### Empréstimo

- Clubes menores levam o jogador por uma temporada, com status prometido e salário assumido
  por eles.
- A comissão é menor, mas resolve o cliente encalhado.
- Ele volta sozinho na virada.

### Artigo 19 (regra real da FIFA)

- Menor de 18 anos não recebe proposta nem empréstimo de clube de outro país.
- Exceção implementada: entre 16 e 18 anos, transferência dentro da Europa é permitida.

### Ciclo de mercado

É um multiplicador de **0,62 a 1,55** sobre todos os valores, com estado nomeado:

`crise → frio → normal → aquecido → euforia`

Aqui está o timing do jogo: vender em euforia e assinar em crise.

---

## 6. Relação com o cliente

### Confiança

- Escala de 0 a 100, com extrato das últimas oito mudanças (cada uma com motivo e sinal).
- **Abaixo de 35**, ele começa a procurar outra agência.

| Evento | Efeito |
|---|---|
| Transferência com titularidade | +11 |
| Contrato acima do mercado | +9 |
| Prêmio individual | +4 a +9 |
| Conversar e prometer solução | +3 a +9 |
| Temporada inteira jogando | +7 |
| Proposta recusada que ele queria | −5 |
| Temporada no banco | −9 |
| Transferência forçada | −12 |

### Exigências e assédio

- O cliente cobra: quer jogar, quer salário compatível e quer clube maior.
- A partir da **terceira temporada**, agências rivais passam a assediar quem está insatisfeito.
- Segurar o cliente depende de confiança, reputação e suporte ao atleta.

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

## 8. Telas

### Abas principais

| Aba | Conteúdo |
|---|---|
| **Mesa** | estado do mercado, casos que passaram pela diretriz, pendências, botão de rodar a temporada |
| **Clientes** | lista com nível, valor, contrato e confiança; chips de diretriz; ação direta na linha |
| **Nomes** | quem o escritório trouxe; assinar e sondar em um toque; filtros e ordenação |
| **Análise** | painel da agência, principal ativo, melhores investimentos (ROI), valorização desde a assinatura, de onde veio o dinheiro, pipeline, trajetória |
| **Escritório** | sede, estrutura, marcos, ranking, notícias |

### Ficha do jogador

| Aba | Conteúdo |
|---|---|
| **Resumo** | números e pendências |
| **Carreira** | evolução, prêmios, temporadas, conta aberta do valor, leitura |
| **Negociar** | propostas, empréstimo, renovação, conversa, rescisão |

### Custo em toques

| Ação | Toques |
|---|---|
| Sondar | 1 |
| Assinar | 1 |
| Renovar | 2 |
| Avaliar e fechar proposta | 2 |

---

## 9. Fórmulas

```
valor        = 6,5 · (fama/50)^2,6 · fatorIdade · fatorLiga · fatorContrato · ciclo
salárioJusto = 0,5 · ECO[liga] · (fama/55)^2,3 · (0,8 + nível/230)
imagem       = 0,035 · ECO · (fama/55)^2,6 · (1 + assessoria·0,5)    [sua parte: 20%]

minutos      = base(status) · ajuste(nível vs nível do clube) · sorte
evolução     = base(idade) · (0,2 + minutos) · suporte
fama        += (ref da liga + (nota − 6,1)·20 + palco − fama) · peso(minutos, palco)
```

**fatorIdade**

| Idade | ≤18 | ≤21 | ≤25 | ≤28 | ≤31 | 32+ |
|---|---|---|---|---|---|---|
| Fator | 1,55 | 1,72 | 1,35 | 1,0 | 0,6 | 0,3 |

---

## 10. Backlog

Itens pesquisados e ainda não implementados.

| # | Ideia | Resumo | O que acrescenta |
|---|---|---|---|
| 1 | **Licença e teto de comissão (FFAR)** | exame e licença anual; tetos de 3%/5%/10% por jurisdição, com a Inglaterra fora da regra | porta de entrada e arbitragem entre mercados |
| 2 | **Mandato de dois anos** | o contrato de representação expira e precisa ser renovado com o próprio cliente | janela legítima de assédio às rivais |
| 3 | **Dupla representação** | atuar pelo jogador ou pelo clube comprador; fazer os dois paga o dobro | dilema dinheiro × confiança |
| 4 | **Pré-contrato (Bosman)** | deixar o contrato correr até os últimos seis meses | clube não recebe; vira luvas para o jogador e comissão para você |
| 5 | **Mecanismo de solidariedade** | até 5% (6% no Brasil) de cada transferência vai para os clubes formadores | dedução na conta aberta |

---

## 11. Histórico de decisões

| Fase | O que foi | Por que mudou |
|---|---|---|
| Olheiro | departamento de captação comprando garotos; reconstruído três vezes | papel errado: comprar em vez de cuidar |
| Rodada a rodada | temporada simulada em 14 rodadas, com tabela, artilharia e olheiro escalado para jogos | análise de partida não interessa |
| Molde Fundo de Clubes | conta aberta na tela, ativo com perfil de indicadores, alavancas que levam temporadas, temporada que fecha em relatório, rivais agindo sozinhos, ciclo de mercado, benchmark e ranking | base da versão atual |
| Gestão por diretriz | a janela passou a ser resolvida por diretrizes | oito clientes com proposta mostraram que aprovar caso a caso é burocracia, não jogo |
