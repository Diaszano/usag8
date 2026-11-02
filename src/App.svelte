<script lang="ts">
  import { onMount } from "svelte";
  import { readDashboard } from "./lib/dashboard";
  import { formatUsage, qualityLabel, providerStateLabel } from "./lib/format";
  import { getProviderViewState } from "./lib/provider-view";
  import { getRecoveryCopy } from "./lib/recovery-copy";
  import type { DashboardSnapshot, ProviderSnapshot } from "./lib/types";

  type View = "dashboard" | "details" | "settings";
  type Theme = "system" | "dark" | "light";
  let view = $state<View>("dashboard");
  let theme = $state<Theme>("system");
  let resolvedTheme = $state<"dark" | "light">("dark");
  let snapshot = $state<DashboardSnapshot | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let selectedId = $state("claude-code");
  let selectedProvider = $derived(snapshot?.providers.find(p => p.id === selectedId) ?? null);
  let recoveryCopy = $derived(selectedProvider ? getRecoveryCopy(getProviderViewState(selectedProvider)) : null);

  async function refresh() {
    loading = true;
    error = null;
    try { snapshot = await readDashboard(); }
    catch { snapshot = null; error = "Não foi possível obter o estado local do aplicativo."; }
    finally { loading = false; }
  }

  function openProvider(provider: ProviderSnapshot) { selectedId = provider.id; view = "details"; }

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      resolvedTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
    };
    const listener = () => syncTheme();
    media.addEventListener("change", listener);
    syncTheme();
    void refresh();
    return () => media.removeEventListener("change", listener);
  });

  $effect(() => {
    if (typeof window === "undefined") return;
    const mode = theme;
    resolvedTheme = mode === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : mode;
  });
</script>

<svelte:head><title>usag8 · Visão geral</title></svelte:head>
<div class="app-shell" data-theme={resolvedTheme}>
  <aside class="sidebar" aria-label="Navegação principal">
    <div class="brand"><span class="brand-mark" aria-hidden="true">8</span><strong>usag8</strong></div>
    <p class="nav-label">ESPAÇO DE TRABALHO</p>
    <nav class="nav-items" aria-label="Páginas">
      <button class:active={view === "dashboard"} aria-current={view === "dashboard" ? "page" : undefined} onclick={() => view = "dashboard"}><span aria-hidden="true">◫</span><span class="nav-text">Visão geral</span></button>
      <button class:active={view === "details"} aria-current={view === "details" ? "page" : undefined} onclick={() => view = "details"}><span aria-hidden="true">◈</span><span class="nav-text">Assistentes</span></button>
      <button class:active={view === "settings"} aria-current={view === "settings" ? "page" : undefined} onclick={() => view = "settings"}><span aria-hidden="true">⚙</span><span class="nav-text">Configurações</span></button>
    </nav>
    <div class="privacy"><span class="status-dot" aria-hidden="true"></span><strong>Privacidade local</strong><p>Nenhum dado de credenciais é acessado nesta prévia.</p></div>
  </aside>

  <div class="workspace">
    <header class="topbar"><span>usag8 / {view === "dashboard" ? "Visão geral" : view === "details" ? "Assistentes" : "Configurações"}</span><span class="mode-tag">{resolvedTheme === "dark" ? "Dark" : "Light"}</span></header>
    <main id="main-content">
      <div class="page-heading"><p class="eyebrow">{view === "dashboard" ? "VISÃO GERAL" : view === "details" ? "DETALHES" : "PREFERÊNCIAS"}</p><h1>{view === "dashboard" ? "Seu uso de IA, em perspectiva." : view === "details" ? (selectedProvider?.displayName ?? "Assistentes") : "Configurações"}</h1><p class="secondary">{view === "dashboard" ? "Informações por ferramenta, sem combinar limites incompatíveis." : view === "details" ? "Origem, período e confiabilidade das informações." : "Preferências do aplicativo durante o protótipo."}</p></div>
      <div class="demo-notice">PROTÓTIPO · SEM COLETA</div>

      {#if error}<div class="error-banner" role="alert">{error}<button onclick={refresh}>Tentar novamente</button></div>{/if}
      {#if loading}
        <section class="panel centered" aria-live="polite"><h2>Verificando o estado local…</h2><p class="secondary">Nenhuma métrica é exibida antes de ser validada.</p></section>
      {:else if !snapshot}
        <section class="panel centered"><h2>Nenhum dado disponível</h2><p class="secondary">A comunicação com o backend ainda não foi estabelecida.</p><button class="primary" onclick={refresh}>Recarregar</button></section>
      {:else if view === "dashboard"}
        <section class="summary-grid" aria-label="Resumo">
          <div class="panel summary"><p class="eyebrow">PROVEDORES CONFIGURADOS NO EXEMPLO</p><strong>{snapshot.providers.length.toString().padStart(2,"0")}</strong><p class="secondary">Nenhuma instalação foi verificada.</p></div>
          <div class="panel summary"><p class="eyebrow">LIMITES</p><strong>—</strong><p class="secondary">Sem fonte suficiente.</p></div>
          <div class="panel summary"><p class="eyebrow">ÚLTIMA COLETA</p><strong>—</strong><p class="secondary">Não realizada.</p></div>
        </section>
        <section class="panel providers" aria-labelledby="providers-title"><div class="section-head"><div><h2 id="providers-title">Assistentes</h2><p class="secondary">Clique para ver o estado individual</p></div><button class="secondary-button" onclick={refresh}>Atualizar</button></div>
          {#each snapshot.providers as provider (provider.id)}
            <button class="provider-row" onclick={() => openProvider(provider)} aria-label={`Abrir detalhes de ${provider.displayName}`}>
              <span class="provider-logo" aria-hidden="true">{provider.displayName.slice(0,1)}</span>
              <span class="provider-name"><strong>{provider.displayName}</strong><small>{providerStateLabel(provider.state)}</small></span>
              <span class="metric"><strong>{formatUsage(provider.usage)}</strong><small>{qualityLabel(provider.usage)}</small></span>
            </button>
          {/each}
          <p class="footnote">Nenhum percentual é inferido sem fonte, período e horário de coleta.</p>
        </section>
      {:else if view === "details"}
        {#if selectedProvider}
          <section class="details-grid">
            <div class="panel"><h2>{selectedProvider.displayName}</h2><p class="secondary">{providerStateLabel(selectedProvider.state)}</p><div role="status"><h2>{recoveryCopy?.title}</h2><p class="secondary">{recoveryCopy?.description}</p>{#if recoveryCopy?.action}<button class="secondary-button" onclick={refresh} disabled={loading}>{recoveryCopy.action}</button>{/if}</div><div class="empty-state"><strong>{formatUsage(selectedProvider.usage)}</strong><span>{qualityLabel(selectedProvider.usage)}</span></div><p class="secondary">{selectedProvider.usage?.period ?? "Período: indisponível"}</p><button class="secondary-button" onclick={() => view = "dashboard"}>Voltar ao dashboard</button></div>
            <div class="panel"><h2>Origem e atualização</h2><p>Fonte: {selectedProvider.usage?.source ?? "não conectada"}</p><p>Atualização: {selectedProvider.usage?.updatedAt ?? "— sem coleta"}</p><p class="footnote">Indisponível não significa 0%.</p></div>
          </section>
        {:else}<p class="secondary">Nenhum provedor selecionado.</p>{/if}
      {:else}
        <section class="panel settings"><h2>Aparência</h2><label for="theme">Tema do aplicativo</label><select id="theme" value={theme} onchange={(event) => theme = event.currentTarget.value as Theme}><option value="system">Sistema</option><option value="light">Light</option><option value="dark">Dark</option></select><p class="footnote">A preferência ainda não é salva. Bandeja, overlay e atalhos globais não foram implementados.</p></section>
      {/if}
    </main>
  </div>
</div>
