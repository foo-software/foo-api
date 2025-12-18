import shell from './shell';

export const publish = () => {
  shell(
    `npx lerna publish patch --yes --message 'chore: lerna publish (skip ci)'`
  );
};
