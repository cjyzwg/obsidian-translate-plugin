import { App, Modal, Notice, Setting } from "obsidian";
import Api from "./api";
import Util from "./util";
import { TranslateParams } from "./model";
import { settingsStore } from './settings';
import { get } from 'svelte/store';

export class PluginModal extends Modal {
  result: string;

  constructor(app: App) {
    super(app);
  }

  async onOpen() {
    const settings = get(settingsStore)
    const api = new Api();
    const allPlugins = await api.getAllPlugins();
    console.log(allPlugins)
    const { contentEl } = this;
    const pluginDirName = (new Util()).getPluginFolder();
    // const pluginDirName = "/Users/cj/Documents/code/goproject/src/leetcode/localization"
    const tp: TranslateParams ={
      plugin_dir_name: pluginDirName,
      action: "",
      all: false,
      plugin_ids: [],
      api_key:settings.apiKey,
      api_secret:settings.apiSecret,
    }
    contentEl.createEl("h1", { text: "所有插件列表" });

    new Setting(contentEl)
    .addButton((btn) =>
    btn
      .setButtonText("一键翻译")
      .setCta()
      .onClick(() => {
        tp.all = true
        tp.action = "translate"
        tp.plugin_ids = []
        api.getTranslate(tp).then((ok)=>{
          ok?new Notice("一键翻译成功"):new Notice("一键翻译失败")
        })
        
      }))
    .addButton((btn) =>
      btn
        .setButtonText("一键还原")
        .setWarning()
        .onClick(() => {
          tp.all = true
          tp.action = "restore"
          tp.plugin_ids = []
          api.getTranslate(tp).then((ok)=>{
            ok?new Notice("一键还原成功"):new Notice("一键还原失败")
          })
          
        }));
  

    if(allPlugins.length>0){
      new Notice("展示插件列表");
    }else{
      new Notice("插件列表为空");
    }

    for (let i = 0; i < allPlugins.length; i++) {
      const p = allPlugins[i];
      const block = new Setting(contentEl).setName(p.name);
      block.descEl.createDiv({text:"版本号:"+p.version})
      block.descEl.createDiv({text:"作者:"+p.author})
      block.descEl.createDiv({text:"描述: "+p.description})
      block.addButton((btn) =>
      btn
        .setButtonText("翻译")
        .setCta()
        .onClick(() => {
          tp.all = false
          tp.action = "translate"
          tp.plugin_ids = [p.id]
          api.getTranslate(tp).then((ok)=>{
            ok?new Notice("翻译成功"):new Notice("翻译失败")
          })
        }))
      .addButton((btn) =>
        btn
          .setButtonText("还原")
          .setWarning()
          .onClick(() => {
            tp.all = false
            tp.action = "restore"
            tp.plugin_ids = [p.id]
            api.getTranslate(tp).then((ok)=>{
              ok?new Notice("还原成功"):new Notice("还原失败")
            })
          }));
    }


    
 
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

