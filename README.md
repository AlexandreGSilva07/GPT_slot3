# LP10B — deterministic landing-page generator

Prototype hosted on GitHub Pages.

## What it demonstrates

- 10 questionnaire steps
- exactly 10 options per step
- nominal space of **10,000,000,000** answer paths
- DAG-like dependency overrides: most steps reuse a base option set, while specific niche/goal combinations swap only selected downstream sets
- fully deterministic LP composition from the selected path + version seed
- no LLM and no backend
- live visual preview
- inline text editing
- shared variables (for example, changing **NOMEDAEMPRESA** updates every bound occurrence)
- image/logo upload directly in the preview
- button text + hyperlink editing
- desktop/tablet/mobile preview widths
- regenerate another deterministic composition while keeping the same questionnaire answers
- export a clean standalone HTML file

Everything runs client-side in a single static `index.html`.
