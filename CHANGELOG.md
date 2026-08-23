# Changelog

All notable changes to agy-plugin-codex are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and agy-plugin-codex follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.5.0] - 2026-08-23

### Added
- Add npm start as standard release entry point ([`d262531`](https://github.com/Vit129/agy-plugin-codex/commit/d262531d8a4b08ad45a3c20d0a50512e4bcfd611))
- Add --model/--effort passthrough to agy rescue command, fix model-id parsing ([`b9b5b5c`](https://github.com/Vit129/agy-plugin-codex/commit/b9b5b5cf01c172fbec8a66d96d7d81e6f84da55e))

### Documentation
- Note agent-memory is gitignored + centrally backed up (claude-memory-private) ([`6b5f40b`](https://github.com/Vit129/agy-plugin-codex/commit/6b5f40baa1ba21d46bbea441af21fb399b0db0b5))
- Agent-memory-private rename (was claude-memory-private) ([`e4a2f62`](https://github.com/Vit129/agy-plugin-codex/commit/e4a2f62e6f51b612dea064540fcd6020acfae34b))

## [1.4.0] - 2026-07-22

### Added
- Add Claude Code context layer (CLAUDE.md, .ai/, agent-memory/) ([`daccf47`](https://github.com/Vit129/agy-plugin-codex/commit/daccf47060404e6a0b6d7407cc0461d6a471d0dc))
- Hands-off plugin auto-update via SessionStart hook ([`ac74565`](https://github.com/Vit129/agy-plugin-codex/commit/ac7456578f5d136c2f31e0a889863a26712aa0f5))
- Add doctor/models commands, model+add-dir+conversation flags ([`67a1bb4`](https://github.com/Vit129/agy-plugin-codex/commit/67a1bb48d0a975ee18bdfef729dc10c25c3f387a))
- Check for newer git-clone version at session start, confirm before pull ([#2](https://github.com/Vit129/agy-plugin-codex/pull/2)) ([`cba5b78`](https://github.com/Vit129/agy-plugin-codex/commit/cba5b78ef63738ca55f29ff864efad96a41bc2e5))
- Add --model/--effort validation, --dry-run quota preview, agents/changelog commands to agy plugin ([`e513fe3`](https://github.com/Vit129/agy-plugin-codex/commit/e513fe365fb91ec11323f063cedc7c120f3a84d9))

### Documentation
- Add Antigravity keywords and variations for search ([`862775b`](https://github.com/Vit129/agy-plugin-codex/commit/862775b65da745a6088c21db4582d3c63aa1d4c6))
- Add Antigravity search variations to README title and intro ([`bdf2814`](https://github.com/Vit129/agy-plugin-codex/commit/bdf2814b2e842ea546e8336c14ecf7fba8f0e864))
- Add MIT LICENSE, SECURITY.md, and license section in README ([`a80ac06`](https://github.com/Vit129/agy-plugin-codex/commit/a80ac068e275f5bfb3bc18d21c485858e33f1f32))
- Caveman-compress CLAUDE.md to cut input tokens ([`bc5bed1`](https://github.com/Vit129/agy-plugin-codex/commit/bc5bed1c298b226931b26a646dcc22489aa06112))

## [1.1.0] - 2026-05-28

### Added
- Port full feature set from agy-plugin-cc (review, hooks, job tracking, stop gate) ([`2627735`](https://github.com/Vit129/agy-plugin-codex/commit/262773561cd5ddda9764f61ceaef22ae0ebddc6d))

## [1.0.0] - 2026-05-27

