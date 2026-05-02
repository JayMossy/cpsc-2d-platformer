let godModeEnabled = false;

export function isGodModeEnabled(): boolean {
  return godModeEnabled;
}

export function toggleGodMode(): boolean {
  godModeEnabled = !godModeEnabled;
  return godModeEnabled;
}
