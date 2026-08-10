(function restoreGitHubPagesRoute() {
  try {
    var redirect = sessionStorage.getItem('kravok:redirect-path');
    sessionStorage.removeItem('kravok:redirect-path');

    if (redirect && redirect !== window.location.href) {
      var target = new URL(redirect, window.location.origin);
      if (target.origin === window.location.origin) {
        window.history.replaceState(null, '', target.href);
      }
    }
  } catch {
    // The application can still start at the root when storage is unavailable.
  }
}());
