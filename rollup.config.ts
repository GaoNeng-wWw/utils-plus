import {readdirSync, statSync} from 'fs';
import path, { dirname, join } from 'path';
import { RollupOptions, defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';

const root = join(dirname('.'), 'packages');
const moduleNames = readdirSync(root);

const config:RollupOptions[] = [
  {
    input: 'packages/type/src/index.ts',
    output: [
      {
        file: 'packages/type/dist/index.d.mts',
      },
      {
        file: 'packages/type/dist/index.d.cts',
      },
      {
        file: 'packages/type/dist/index.d.ts',
      }
    ],
    plugins: [dts()]
  }
];

for (const m of moduleNames){
  if (m === 'type' || statSync(`packages/${m}`).isFile() || m === '.vitepress' || m === 'guide' || m.startsWith('_')){
    continue;
  }
  config.push({
    input: `packages/${m}/index.ts`,
    output: [
      {
        file: `packages/${m}/dist/index.mjs`,
        format: 'es',
        exports: 'auto',
        name: m
      },
      {
        file: `packages/${m}/dist/index.cjs`,
        format: 'cjs',
        exports: 'auto',
        name: m
      },
      {
        file: `packages/${m}/dist/index.iife.js`,
        format: 'iife',
        exports: 'auto',
        name: m
      }
    ],
    plugins: [
      alias({
        entries: [
          { 
            find: /@utils-plus\/(.*)/,
            replacement: path.resolve('packages/type')
          }
        ]
      }),
      resolve(),
      common(),
      ts(),
    ]
  });
  config.push({
    input: `packages/${m}/index.ts`,
    output: [
      {
        file: `packages/${m}/dist/index.d.mts`,
      },
      {
        file: `packages/${m}/dist/index.d.cts`,
      },
      {
        file: `packages/${m}/dist/index.d.ts`,
      }
    ],
    plugins: [
      alias({
        entries: [
          { 
            find: /@utils-plus\/(.*)/,
            replacement: path.resolve('packages/type')
          }
        ]
      }),
      dts(), resolve(), common(), ts()
    ]
  });
}
config.push({
  input: 'packages/index.ts',
  output:[
    {
      file: './dist/index.js',
      format: 'umd',
      exports: 'named',
      name: 'utilsPlus'
    }
  ],
  plugins: [
    alias({
      entries: [
        { 
          find: /@utils-plus\/(.*)/,
          replacement: path.resolve('packages/type')
        }
      ]
    }),
    resolve(),
    common(),
    ts(),
  ]
});
config.push({
  input: 'packages/index.ts',
  output:{
    file: 'dist/index.d.ts',
  },
  plugins: [
    alias({
      entries: [
        { 
          find: /@utils-plus\/(.*)/,
          replacement: path.resolve('packages/type')
        }
      ]
    }),
    dts()
  ]
});

export default defineConfig(config);