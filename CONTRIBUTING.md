# Contributing

Thanks for helping improve this project.

## Setup

1. Use Node.js 18. If you use `nvm`, run:

   ```bash
   nvm use
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Copy `.env.example` to a local env file and fill in your own service values.
   Do not commit real service URLs, space IDs, client secrets, map keys, OSS
   buckets, or demo accounts.

## Development

Run the local dev server:

```bash
npm run serve
```

Run a production build before opening a pull request:

```bash
npm run build
```

## Pull Requests

- Keep changes focused and avoid unrelated formatting churn.
- Include a short summary of user-visible behavior changes.
- Mention any build warnings that already existed before your change.
- Add screenshots for UI changes when practical.
