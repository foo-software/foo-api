---
sidebar_position: 1
title: Documentation of Foo's Lighthouse Check GitHub Action for its page experience testing services
description: Documentation of Foo's Lighthouse Check GitHub Action for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Intro

<p><a href="https://github.com/marketplace/actions/lighthouse-check" target="_blank">A GitHub Action for running Lighthouse audits automatically in CI workflows</a>. Lighthouse Check Action provides simple configuration and a long list of features for advanced customization including <strong>Slack</strong> notifications, <strong>AWS S3</strong> HTML report uploads, and more!</p>

## Features

This project differes from others with its ease of use for simple cases and numerous features for advanced needs.

- ✨ Lighthouse audit **multiple** URLs or just one.
- 💬 PR comments of audit scores.
- 🎉 Save HTML reports locally.
- 💖 Upload HTML reports as artifacts.
- 🙌 Upload HTML reports to AWS S3.
- 🔥 Fail a workflow when minimum scores aren't met.
- 🛎️ Slack notifications **with Git info** (author, branch, PR, etc).
- 💎 Easily save a record of all your audits via Foo's free service.
- 🤗 Detailed documentation!

## Quick Start

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Lighthouse
      uses: foo-software/lighthouse-check-action@master
      with:
        urls: 'https://www.foo.software,https://www.google.com'
```

## Screenshots

<table>
  <tbody>
    <tr>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-output.png">
            <img alt="Lighthouse Check GitHub action output" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-output.png" />
          </a>
          <figcaption>
            Output
          </figcaption>
        </figure>
      </td>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-artifacts.png">
            <img alt="Lighthouse Check GitHub action save artifacts" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-artifacts.png" />
          </a>
          <figcaption>
            Save HTML Reports as Artifacts
          </figcaption>
        </figure>
      </td>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-lighthouse-report.png">
            <img alt="Lighthouse Check GitHub action HTML report" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-lighthouse-report.png" />
          </a>
          <figcaption>
            HTML Reports
          </figcaption>
        </figure>
      </td>
    </tr>
    <tr>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/lighthouse-check-pr-comment.png">
            <img alt="Lighthouse Check PR comments" src="https://lighthouse-check.s3.amazonaws.com/images/lighthouse-check-pr-comment.png" />
          </a>
          <figcaption>
            PR Comments
          </figcaption>
        </figure>
      </td>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-slack.png">
            <img alt="Lighthouse Check GitHub action Slack notification" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-slack.png" />
          </a>
          <figcaption>
            Slack Notifications
          </figcaption>
        </figure>
      </td>
      <td align="center" width="33.3333333333333%">
        <figure>
          <a href="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-status-action-pr-fail.png">
            <img alt="Lighthouse Check GitHub action fail if scores don't meet minimum requirement on a PR" src="https://lighthouse-check.s3.amazonaws.com/images/github-actions/github-action-lighthouse-check-status-action-pr-fail.png" />
          </a>
          <figcaption>
            Fail Workflow when Minimum Scores Aren't Met
          </figcaption>
        </figure>
      </td>
    </tr>
  </tbody>
</table>
