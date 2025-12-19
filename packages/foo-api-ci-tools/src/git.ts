import shell from './shell';

const { PERSONAL_ACCESS_TOKEN: TOKEN } = process.env;

const GIT_URL = `https://foo-software-bot:${TOKEN}@github.com/foo-software/foo-api`;

export const config = () => {
  shell('git config --global user.email notifications@foo.software');
  shell('git config --global user.name Foo Bot');
};

export const checkout = (branch = 'master') => {
  shell(`git remote set-url origin ${GIT_URL}`);
  // Ensure we are exactly at the remote head (no shallow/merge weirdness in CI)
  shell(`git fetch --tags --prune origin ${branch}`);
  shell(`git checkout ${branch}`);
  shell(`git reset --hard origin/${branch}`);
};

export const add = () => {
  shell('git add .');
};

export const commit = (message: string) => {
  shell(`git commit -am '${message} (skip ci)'`);
};

export const push = () => {
  shell('git push');
};
