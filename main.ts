import { PluginModal } from './src/pluginmodal';
import { settingsStore } from './src/settings';
import { TranslateSettingTab } from './src/settingTab';
import { Editor, MarkdownView, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!



export default class MyPlugin extends Plugin {
	

	async onload() {
		settingsStore.initialise(this);

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('languages', 'Translate Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new PluginModal(this.app).open();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.createEl("span", { text: "💊" });

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				// new SampleModal(this.app).open();
				new PluginModal(this.app).open();
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TranslateSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

}


