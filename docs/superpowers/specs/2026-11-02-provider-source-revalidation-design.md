# Plan 07 — Revalidação das fontes dos provedores (especificação)

**Status:** Pesquisa concluída — 2026-11-02. Resultado: **NO-GO — sem integração**; esta especificação não autoriza coletar dados de provedores.

## Contexto confirmado no repositório

- Os planos 01–06 estão concluídos dentro de seus gates. Tauri 2 foi aceito no Linux Mint Cinnamon/X11; Wayland e superfícies nativas adicionais não foram validados.
- O comando Rust `get_dashboard_snapshot`, em `src-tauri/src/lib.rs`, chama `providers::unavailable_snapshot()`, em `src-tauri/src/providers.rs`. Ele retorna três provedores (`claude-code`, `codex`, `antigravity`) com `not_connected`, `usage: None` e sem coleta.
- `docs/decisions/ADR-0002-first-provider-source.md` registra **NO-GO** para as alternativas examinadas. A documentação de pesquisa está em `docs/research/provider-source-matrix.md` e `docs/research/source-checklist.md`.
- O aplicativo e o DEB continuam internos para fins de distribuição; a situação comercial da marca `usag8` não foi liberada.

## Objetivo

Revalidar **fontes oficiais e públicas** para Claude Code, OpenAI Codex, Antigravity, OpenCode e Cursor. Identificar, no máximo, uma fonte candidata de métricas confiável, documentada, estável, permitida para um aplicativo desktop de potencial uso comercial e com privilégio mínimo. Produzir decisão justificada de **GO condicionado à aprovação do usuário** ou **NO-GO**.

## Escopo permitido

- Consultar documentação, termos de uso, changelogs e esquemas **públicos e oficiais**, anotando URLs, versão quando disponível e data/hora UTC de consulta.
- Examinar os significados de uso por sessão, tokens, custo, consumo de janela, limite da assinatura, saldo disponível e renovação **separadamente**. Cada métrica deve ter unidade, período, escopo, origem e frescor identificados.
- Revisar permissões de uso por aplicativos de terceiros, incluindo uso comercial, estabilidade do método, autenticação, privilégios, cadência permitida e exposição de metadados sensíveis.
- Para Claude Code, avaliar **apenas conceitualmente** um possível repasse opt-in dos campos necessários da status line, com lista de campos permitidos, redaction de metadados e consentimento expresso. Nenhum script ou receiver deve ser criado agora.
- Documentar riscos e condições concretas que reabririam fontes rejeitadas.
- Atualizar o estado documental dos planos anteriores, sem modificar suas evidências históricas.

## Fora de escopo e proibições

- **Sem código de coletor**, HTTP client, parser de credenciais, comandos de CLI, subprocessos, polling, SQLite, telemetria, acesso a arquivos locais de assistentes ou alterações de permissões Tauri.
- Não executar `claude`, `codex`, `agy`, `opencode` ou `cursor` durante esta pesquisa. Não acessar contas, tokens, cookies, arquivos de sessão, transcrições, logs privados ou endpoints não documentados.
- Não transformar contagens de tokens/custos de execução em percentuais de cotas de assinatura.
- Não iniciar integração automaticamente após um resultado favorável. É obrigatória aprovação explícita do usuário para **fonte, campos e fronteira de acesso**, seguida de outro plano de implementação específico.
- Nenhuma afirmação de compatibilidade com Wayland, GNOME, KDE ou lançamento público deve ser acrescentada.

## Contrato da evidência

Para cada provedor e caminho estudado registrar:

| Campo | Conteúdo necessário |
| --- | --- |
| Identidade | Nome do provedor, caminho de acesso e URL oficial |
| Data e versão | `checked_at_utc` e versão/revisão; `unknown` se ausente |
| Dados expostos | Campos oficiais documentados, unidade, período, renovação e escopo de conta/modelo |
| Semântica | Uso por sessão vs. limite, custo vs. saldo; `confirmed`/`estimated`/`unavailable` |
| Estabilidade | API/interface suportada em produção ou experimental, compromissos de compatibilidade |
| Legalidade | Permissão explícita para acesso de terceiros e potencial uso comercial |
| Segurança | Autenticação, acesso somente de leitura, dados extras visíveis, menor privilégio |
| Operação | Dependência de sessão, rede, tempo de resposta e cadência/rate limit, quando documentados |
| Diagnóstico | Evidência específica, fonte, eventuais contradições e perguntas em aberto |
| Decisão | `PASS`, `FAIL` ou `UNKNOWN` por gate e recomendação final |

**Regra de classificação:** dados oficialmente descritos são *confirmados quanto à documentação*, não dados de um usuário já coletados. Fonte não documentada, acesso proibido ou requisito desconhecido **não** recebe `PASS`.

## Gate GO/NO-GO

É permitido recomendar **“GO para desenho específico, pendente de aprovação”** somente quando todos os pontos abaixo forem demonstrados para **uma única fonte e métricas exatas**:

1. Interface oficial e machine-readable documentada, ou handoff opt-in explicitamente permitido, com esquema suficiente.
2. Permissão aplicável a uso por terceiros, inclusive potencialmente comercial, sem contradição com os termos.
3. Escopo read-only e privilégio mínimo; sem extrair tokens, credenciais, transcrições ou dados de outros membros.
4. Unidade, janela, escopo, resets e origem dos números suficientemente especificados.
5. Comportamento viável para offline, fonte ausente, sem autorização, resposta inválida e falhas isoladas.
6. Estratégia plausível para testes com fixtures sanitizadas e I/O limitado no plano futuro.

Qualquer `FAIL` ou `UNKNOWN` em requisito obrigatório mantém o caminho em **NO-GO**. Um GO de pesquisa não altera `ADR-0002` para integração aprovada até a revisão da decisão e o consentimento do usuário.

## Entregáveis

- Atualizar `docs/research/provider-source-matrix.md` e `docs/research/source-checklist.md`, mantendo histórico de decisões e acrescentando comprovações datadas.
- Anexar reconsideração datada ao `docs/decisions/ADR-0002-first-provider-source.md`, com decisão, fontes rejeitadas e próximos gatilhos de reanálise.
- Corrigir divergências de status em `AGENTS.md`, `README.md`, `docs/superpowers/README.md` e `docs/superpowers/ROADMAP.md`, sem reescrever QA ou conclusão dos planos 01–06.
- Nenhuma mudança em `src/`, `src-tauri/`, `package.json`, `src-tauri/capabilities/` ou configurações de rede/autorização.
- Exibir explicitamente: **“GO para revisão — aprovação do usuário necessária”** ou **“NO-GO — sem integração”**.

## Referências para revalidar durante a execução

- `docs/decisions/ADR-0002-first-provider-source.md`
- `docs/research/provider-source-matrix.md`
- `docs/research/source-checklist.md`
- Claude Code: https://code.claude.com/docs/en/statusline
- Codex: https://developers.openai.com/codex/app-server/ (confirmar URL e políticas atuais)
- Antigravity: https://antigravity.google/terms
- OpenCode: https://dev.opencode.ai/v2/docs/api (confirmar URL e estabilidade atual)
- Cursor: https://docs.cursor.com/en/account/teams/admin-api
