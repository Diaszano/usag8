import type { ProviderViewState } from "./provider-view";

export function getRecoveryCopy(state: ProviderViewState): { title: string; description: string; action: string | null } {
  switch (state) {
    case "loading":
      return { title: "Verificando provedor", description: "Aguarde enquanto o estado é atualizado.", action: null };
    case "not-installed":
      return { title: "Instalação não confirmada", description: "Confirme se o aplicativo está instalado; esta prévia ainda não faz essa verificação.", action: null };
    case "unauthorized":
      return { title: "Autorização necessária", description: "Revise o acesso no aplicativo oficial do provedor. Não informe credenciais nesta prévia.", action: "Tentar novamente" };
    case "offline":
      return { title: "Provedor sem conexão", description: "Verifique a conexão e tente novamente.", action: "Tentar novamente" };
    case "error":
      return { title: "Falha ao verificar provedor", description: "Não foi possível atualizar o estado deste provedor.", action: "Tentar novamente" };
    case "quota-unavailable":
      return { title: "Cota indisponível", description: "Nenhuma cota confiável está disponível para este provedor.", action: "Atualizar" };
    case "not-connected":
      return { title: "Provedor não conectado", description: "Nenhum acesso foi configurado. Esta prévia não lê credenciais nem dados de uso.", action: null };
    case "available":
      return { title: "Métrica disponível", description: "O valor exibido mantém sua fonte, período e qualidade.", action: null };
  }
}
