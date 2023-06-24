import MyPlugin from "../main";
import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import Api from "./api";
import { settingsStore } from './settings';
import { get } from 'svelte/store';
export class TranslateSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: '一键翻译设置'});

    this.showListenPort()
    this.showTest()
        
	}
  private showListenPort(): void {
    const settings = get(settingsStore)
    new Setting(this.containerEl)
        .setName("监听端口")
        .setDesc("打开对应的translate应用程序，填写对应的端口号:")
        .addText((text) =>
          text
            .setPlaceholder("1188")
            .setValue(settings.translatePort)
            .onChange(async (value) => {
              settingsStore.actions.setTranslatePort(value);
            })
        );
  }

  private showTest(): void {
		new Setting(this.containerEl)
        .setName("测试软件")
        .setDesc("测试是否能连接translate应用程序")
        .addButton((button) => {
          return button
            .setButtonText("测试连接")
            .setCta()
            .onClick(async () => {
              const api = new Api()
              const isConnected  = await api.getTestPort();
              isConnected? new Notice("连接成功") : new Notice("连接失败，translate应用程序未启动");              
            });
        });
	}
}