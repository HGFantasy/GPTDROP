# GPTDROP — Suno Songmaker Pro (Public GPT)

Central repo for the **Suno Songmaker Pro** custom GPT: instructions, knowledge base, language packs, templates, and brand assets.

> Maintainer: **@HGFantasy**  
> Latest bundle: **v1.2** (2025-08-08)

## What’s here
```
/instructions/
  Suno_Songmaker_Pro_Tiny_Instructions_v1.5.md

/knowledge/              # 12 merged files (under 20-file cap)
  00_Core_Macros.md
  01_Repair_Kit.md
  02_Starters_and_Examples.md
  03_Examples_Library.md
  04_Lyric_Toolkit.md
  05_Test_Suite_Prompts.md
  06_Language_Packs_7.md
  07_Formats_Templates.md
  08_Mood_to_Imagery_Map.md
  09_Genre_Mix_Targets.md
  10_Prompt_Repair_Examples.md
  11_Originality_Safety_and_Preferences.md

/assets/logos/
  suno_songmaker_pro_logo_icon.svg
  suno_songmaker_pro_logo_horizontal.svg
  suno_songmaker_pro_logo_monochrome_dark.svg
  suno_songmaker_pro_logo_monochrome_light.svg

/integrations/github/
  github_action_openapi.json
  GitHub_Actions_Setup_Guide.md
  CHANGELOG_TEMPLATE.md
  RELEASE_NOTES_TEMPLATE.md

/dist/
  Suno_Songmaker_Pro_Starter_Kit_v1.2_2025-08-08.zip   # release asset
```

## How to use
1. Open **ChatGPT → Create → Configure** and paste `/instructions/Suno_Songmaker_Pro_Tiny_Instructions_v1.5.md` into **Instructions**.
2. Upload all files from `/knowledge` to **Knowledge**.
3. Upload a logo from `/assets/logos`.
4. (Optional) Add the GitHub Action in **Actions** using `/integrations/github/github_action_openapi.json` to enable PRs/releases.

## Releases
We ship kits via GitHub Releases. See `/dist` and the Releases tab for zips and notes.

## Contributing
Open a PR. Branch name convention: `update/suno-{version}-{YYYYMMDD}`.

## License
All files copyright © 2025 Suno Songmaker Pro maintainers. Content intended for example and educational use in public GPTs.
