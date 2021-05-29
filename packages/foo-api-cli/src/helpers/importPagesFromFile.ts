import fs from 'fs';
import path from 'path';

export default async ({ filePath }: { filePath: string }) => {
  const fullFilePath = path.resolve(filePath);
  const content = fs.readFileSync(fullFilePath, { encoding: 'utf8' });
  console.log('content', content);
};
