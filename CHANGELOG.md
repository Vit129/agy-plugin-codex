# Changelog

All notable changes to agy-plugin-codex are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and agy-plugin-codex follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.5.2] - 2026-11-22

### Documentation
- Add ARCHITECTURE.md per universal architecture rule ([`0985ec9`](https://github.com/Vit129/agy-plugin-codex/commit/0985ec9c0eb4e7e91b6df51d8679f6f7e45b7f7a))
- Adopt AGENTS.md as canonical instruction file ([`08e769d`](https://github.com/Vit129/agy-plugin-codex/commit/08e769dc7a65a5ec13c7b6f7f41e579c846040a1))
- Update agent-memory location to central agent-memory-private ([`aef6ae5`](https://github.com/Vit129/agy-plugin-codex/commit/aef6ae52fb670526ca6e3c2cba35785519922eda))
- Relicense to Apache-2.0 and credit codex-plugin-cc ([`c3667ad`](https://github.com/Vit129/agy-plugin-codex/commit/c3667adeb009e0e07b93ff163116e91dcad75b89))
- Credit Claude as co-developer and contributor ([`ce48007`](https://github.com/Vit129/agy-plugin-codex/commit/ce48007cf145565db88f8ecd641031e01cbb52c6))
- Update heading to Installation & Usage ([`2d4e1b8`](https://github.com/Vit129/agy-plugin-codex/commit/2d4e1b8554bde32d17907a9a25b8bd482142d54a))
- Install from GitHub through the Codex marketplace ([`39c39ac`](https://github.com/Vit129/agy-plugin-codex/commit/39c39ac1cfeb27837338f7145b7ffe4c7314bfc1))
- Unofficial notice, changelog in CHANGELOG.md only ([`c8e7880`](https://github.com/Vit129/agy-plugin-codex/commit/c8e78801c808fdbadfac029e2a4bbe82e9a5ea36))
- Expand commands reference and cross-link to agy-plugin-cc ([`7b04508`](https://github.com/Vit129/agy-plugin-codex/commit/7b045084d7da4e9b7a6628745975f04a4199a7a7))
- Update copyright notice with co-authors ([`140a0c8`](https://github.com/Vit129/agy-plugin-codex/commit/140a0c8e765828ad6c900b0fc07568df72ec9733))
- Add docs/ index per project structure standard ([#15](https://github.com/Vit129/agy-plugin-codex/pull/15)) ([`22dcf19`](https://github.com/Vit129/agy-plugin-codex/commit/22dcf1991adcc68201a57a278d9962303cb7e0df))
- Point agent memory path to unified-memory-vault ([#19](https://github.com/Vit129/agy-plugin-codex/pull/19)) ([`4609791`](https://github.com/Vit129/agy-plugin-codex/commit/4609791dd05f554ba475f0cc124bea084ecbb33a))

### Fixed
- Run delegated agy outside sandbox ([#16](https://github.com/Vit129/agy-plugin-codex/pull/16)) ([`efbc287`](https://github.com/Vit129/agy-plugin-codex/commit/efbc287378ac945e444e6fe3562b3ca7788ab8e9))

## [1.5.1] - 2026-09-15

### Fixed
- Add research/audit exception to scope-narrowly rule ([`d7eb436`](https://github.com/Vit129/agy-plugin-codex/commit/d7eb436936eb0f5ada4e33933240e597462d2580))

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

