import gray from 'gray-matter';
import path, { join, sep } from 'path';
import Git from 'simple-git';
import fg from 'fast-glob';
import { readFileSync } from 'fs';

interface Meta {
  category: string[];
  lastUpdate: number;
  name: string;
  dir: string;
  moduleName: string;
}

export async function getMeta(){
  const root = join(__dirname, '..');
  const docs = fg.sync('**/*.md', {
    cwd: root,
    ignore: [
      '_*',
      'dist',
      '**/node_modules',
      'type',
      'guide'
    ],
  }).sort();
  const git = Git(root);
  const metas:Meta[] = [];
  for (const doc of docs){
    const absolutePath = join(root, doc);
    const meta:Meta = {
      category: [],
      lastUpdate: 0,
      name: '',
      dir: '',
      moduleName: ''
    };
    const fileName = path.parse(absolutePath).name;
    const tsPath = join(path.parse(absolutePath).dir, 'index.ts');
    const foldArray = path.parse(absolutePath).dir.split(sep);
    const moduleName=foldArray.at(-1);
    const {data} = gray(
      readFileSync(absolutePath),
    );
    if (!data.category){
      console.warn('Not find categories');
      continue;
    }
    const categories:string[] = typeof data.category === 'string' 
      ? data.category.includes('.')
        ? data.category.split('.')
        : [data.category]
      : data.category;
    meta.name = fileName;
    meta.category=categories;
    meta.lastUpdate = +await git.raw(['log', '-1', '--format=%at', tsPath]) * 1000;
    meta.dir = path.parse(absolutePath).dir;
    meta.moduleName = moduleName ?? '';
    metas.push(meta);
  }
  return metas;
}