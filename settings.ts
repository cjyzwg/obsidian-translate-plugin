import MyPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";
export interface TranslatePluginSettings {
	dateFormat: string;
}

export const DEFAULT_SETTINGS: TranslatePluginSettings = {
	dateFormat: "YYYY-MM-DD",
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});


        new Setting(containerEl)
          .setName("Date format")
          .setDesc("Default date format")
          .addText((text) =>
            text
              .setPlaceholder("MMMM dd, yyyy")
              .setValue(this.plugin.settings.dateFormat)
              .onChange(async (value) => {
                this.plugin.settings.dateFormat = value;
                await this.plugin.saveSettings();
              })
          );
	}
}
