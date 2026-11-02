use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardSnapshot {
    pub providers: Vec<ProviderSnapshot>,
    pub collected_at: Option<String>,
    pub mode: &'static str,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProviderSnapshot {
    pub id: &'static str,
    pub display_name: &'static str,
    pub state: &'static str,
    pub usage: Option<UsageMetric>,
    pub error_message: Option<String>,
}

// This type is intentionally unused in the prototype. It becomes relevant
// only after a permitted, trustworthy provider integration is designed.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct UsageMetric {
    pub amount: f64,
    pub unit: &'static str,
    pub period: String,
    pub quality: &'static str,
    pub source: String,
    pub updated_at: String,
}
