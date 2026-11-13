# Sefir design labs — local run

From repo root after `yarn install --ignore-engines`:

```bash
# Evolution (dark neural) → http://localhost:3010
yarn dev

# Reinvention (Signal Desk) → http://localhost:5174
cd sefir-design-lab/reinvention && npm install && npm run dev
```

Or from `sefir-design-lab/`:
```bash
npm run install:all
npm run dev:evolution      # :3010
npm run dev:reinvention   # :5174
```
