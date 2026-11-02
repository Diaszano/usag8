use crate::model::{DashboardSnapshot, ProviderSnapshot};

pub fn unavailable_snapshot() -> DashboardSnapshot {
    DashboardSnapshot {
        mode: "prototype",
        collected_at: None,
        providers: [
            ("claude-code", "Claude Code"),
            ("codex", "Codex"),
            ("antigravity", "Antigravity"),
        ]
        .into_iter()
        .map(|(id, display_name)| ProviderSnapshot {
            id,
            display_name,
            state: "not_connected",
            usage: None,
            error_message: None,
        })
        .collect(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unavailable_providers_never_claim_usage() {
        let snapshot = unavailable_snapshot();
        assert_eq!(snapshot.mode, "prototype");
        assert!(snapshot.collected_at.is_none());
        assert_eq!(snapshot.providers.len(), 3);
        assert!(snapshot.providers.iter().all(|p| p.usage.is_none()));
        assert!(snapshot.providers.iter().all(|p| p.state == "not_connected"));
    }
}
