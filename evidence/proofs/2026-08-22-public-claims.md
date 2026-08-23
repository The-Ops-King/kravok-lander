# Public claim verification — 2026-08-22

This is the release-verification record for the limited proof shown on the KRAVOK website. It contains aggregate results and public CI/release metadata only. No organization names, user names, identifiers, or call content are included.

## Organizations running live calls

- Result: **1 organization / 3 evidenced live calls** in the preceding seven days.
- Query run: 2026-08-22 at 19:40 America/Phoenix.
- Window start: 2026-08-16T02:40:30Z.
- Environment: KRAVOK production database, read-only aggregate query.
- Inclusion rule: non-practice calls started in the window with at least one non-empty prospect transcript segment recorded in the window.
- Exclusions: Forge practice drills and calls without prospect transcript evidence.
- Privacy boundary: the verification read only call IDs and organization IDs needed for the aggregate. It did not retrieve transcript text.

The public claim is written as a dated verification window, not as a permanently current “this week” claim.

## Access policy suite

- Result: **461 of 461 pgTAP assertions passed across 30 files**.
- Release source: KRAVOK v0.7.4 commit `ba16e3ae7bce60e86a2cf8f1d6bcf42a79e46572`.
- Exact successful CI job: <https://github.com/The-Ops-King/KRAVOK/actions/runs/32320176499/job/96280698842>
- CI run: 2026-08-20.

This is evidence of the automated policy suite at the v0.7.4 release commit. It is not presented as an independent penetration test or an absolute security guarantee.

## macOS release trust chain

- Release: **v0.7.4**.
- Download artifact: `Kravok-mac-universal.dmg`.
- SHA-256: `73c84861715c96438c4907efec87b6504d20ba4e452a6bd9bba0f40a1c6f6dcf`.
- Updater artifact: `Kravok_universal.app.tar.gz`.
- Updater SHA-256: `bfc727965f42e7df57cbe4340028ff5db5e47cf90135da5d72e8c3a1849488f5`.
- Exact release job: <https://github.com/The-Ops-King/KRAVOK/actions/runs/32320173341/job/96280686841>
- Release page: <https://github.com/The-Ops-King/kravok-lander/releases/tag/v0.7.4>
- Release run: 2026-08-20.
- Static recheck: 2026-08-22; the updater archive hash matched GitHub’s asset digest, its bundle metadata reports v0.7.4 and macOS 13+, and its executable is a two-architecture Mach-O containing x86_64 and arm64 slices.

The release job built the universal target, signed the app, received an Apple notary status of `Accepted`, signed the DMG, submitted the DMG to Apple, received `Accepted`, stapled it, validated the staple, and published updater signatures for both Darwin architectures.

Physical microphone, ScreenCaptureKit/TCC, and updater behavior still require a real Mac. CI and Windows-hosted static inspection cannot prove those runtime paths.
