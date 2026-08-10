# Public claim verification — 2026-08-10

This is the publish-day record for the limited proof shown on the KRAVOK website. It contains aggregate results only. No organization names, user names, call excerpts, or customer data are included.

## Organizations running live calls

- Result: **4 organizations / 9 evidenced calls** in the preceding seven days.
- Query run: 2026-08-10 in America/Phoenix.
- Environment: KRAVOK production database, read-only aggregate query.
- Inclusion rule: non-practice calls with at least one non-empty prospect transcript segment.
- Exclusions: Forge practice drills and calls without prospect transcript evidence.
- Cross-checks: 5 organizations / 16 evidenced calls over 30 days; 6 organizations / 67 evidenced calls over all recorded history.

The public claim is intentionally narrower than the available historical aggregate: “4 organizations used KRAVOK on live calls this week.”

## Access policy suite

- Result: **340 of 340 access-policy assertions passed**.
- Scope: clean-database pgTAP policy and role checks.
- Exact CI job: <https://github.com/The-Ops-King/KRAVOK/actions/runs/31220917565/job/93005143912>
- Rechecked for this publication: 2026-08-10.

This is evidence of the automated policy suite. It is not presented as an independent penetration test or an absolute security guarantee.

## macOS release trust chain

- Release: **v0.6.4**.
- Artifact: `Kravok-mac-universal.dmg`.
- SHA-256: `e7c245a3fbe00f7c7e7680b7d8e0fde198874b22f64e0620786cb5212667c5e0`.
- Exact release job: <https://github.com/The-Ops-King/KRAVOK/actions/runs/31435411864/job/93608409342>
- Release page: <https://github.com/The-Ops-King/kravok-lander/releases/tag/v0.6.4>
- Rechecked for this publication: 2026-08-10.

The job record shows the build, signing, notarization, stapling, and release-asset upload steps completed successfully. The publication gate independently downloads and hashes the exact pinned artifact before deployment.
