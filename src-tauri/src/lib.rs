mod model;
mod providers;

#[tauri::command]
fn get_dashboard_snapshot() -> model::DashboardSnapshot {
    providers::unavailable_snapshot()
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_dashboard_snapshot])
        .run(tauri::generate_context!())
        .expect("failed to run Usag8");
}
