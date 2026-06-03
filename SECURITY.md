# Security Policy

## Reporting Security Issues

Please report suspected security issues privately to the repository maintainer.
Do not open a public issue that includes secrets, tokens, private service URLs,
or exploit details.

## Secret Handling

This repository should not contain real production credentials. Keep the
following values in local environment files only:

- uniCloud service URLs
- uniCloud space IDs and client secrets
- AMap keys and secrets
- OSS bucket names and temporary credentials
- Demo accounts and passwords

Use `.env.example` as the public template and rotate any credential that was
accidentally committed to Git history.

## Supported Version

Security fixes are applied to the `main` branch.
