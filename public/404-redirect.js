(function preserveGitHubPagesRoute() {
  try {
    sessionStorage.setItem('kravok:redirect-path', window.location.pathname + window.location.hash);
  } catch {
    // Continue to the root even when browser storage is unavailable.
  }
  window.location.replace('/');
}());
