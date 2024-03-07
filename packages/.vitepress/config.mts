import { defineConfig, DefaultTheme } from 'vitepress'
import {getMeta} from '../_utils/create-meta';

const Guide = {
  text: 'Guide',
  items: [
    {
      text: 'Get Started',
      link: '/guide/'
    },
    {
      text: 'Contributing',
      link: '/guide/contributing'
    }
  ]
}

const ignoreFold = ['guide', 'node_modules', '.vitepress', 'type'];

interface SideBarRaw {
  label: string;
  childrenCategory: {[x: string]: SideBarRaw};
  path: string | null;
  items: SideBarItem[]
}

interface SideBarItem {
  text: string, link?: string, items: SideBarItem[]
}

async function getFunctionSideBar(){
  let sidebarRaw:{[x: string]: SideBarRaw} = {
    '': {
      label: '',
      childrenCategory: {},
      path: '',
      items: []
    }
  }
  const metas = await getMeta();
  for (const meta of metas){
    let cur = sidebarRaw[''];
    const {category:categories, name} = meta;
    // for (const category of meta.category){
    for (let i=0;i<categories.length;i++){
      const category = categories[i];
      if (category in cur.childrenCategory){
        cur = cur.childrenCategory[category];
      } else {
        cur.childrenCategory = {
          ...cur.childrenCategory,
          [category]: {
            label: category,
            childrenCategory: {},
            path: [cur.path, category].join('/'),
            items: []
          }
        }
        cur = cur.childrenCategory[category];
      }
    }
    if (!cur.items.map(({text})=>text).includes(name)){
      cur.items.push({
        text: name === 'index' ? meta.moduleName : name,
        link: `${cur.path}/${name === 'index' ? `${meta.moduleName}/` : name}`,
        items: [],
      });
    }
  }
  let cur = sidebarRaw[''].childrenCategory;
  const sidebar: DefaultTheme.Sidebar = [];
  const dfs = (ptr: SideBarRaw) => {
    let cur = ptr;
    for (const [k,v] of Object.entries(ptr.childrenCategory)){
      const i = dfs(v);
      cur.items.push({
        text:i.label,
        // link: `${i.path!}`,
        items: [...i.items],
      });
    }
    return ptr;
  }
  for (const [k,v] of Object.entries(cur)){
    cur[k] = dfs(cur[k]);
    sidebar.push({
      text: cur[k].label,
      link: `${cur[k].path!}`,
      items: cur[k].items
    })
  }
  return sidebar;
}

export default defineConfig({
  title: "Utils plus",
  description: "A type rich utils lib",
  themeConfig: {
    nav: [
      Guide,
    ],

    sidebar: [
      Guide,
      ...await getFunctionSideBar(),
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GaoNeng-wWw/utils-plus' }
    ],
    footer:{
      copyright: 'Copyright © 2024-present GaoNeng-wWw',
      message: 'Released under the MIT License.'
    },
    search: {
      provider: 'local',
    }
  }
})
