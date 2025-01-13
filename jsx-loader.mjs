import { readFile } from 'fs/promises';
import { transformSync } from '@babel/core';

export async function load(url, context, defaultLoad) {
  if (url.endsWith('.jsx')) {
    const source = await readFile(new URL(url));
    const { code } = transformSync(source, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    });
    return { format: 'module', source: code };
  }

  return defaultLoad(url, context, defaultLoad);
}
