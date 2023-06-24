
import { writable } from 'svelte/store';
import MyPlugin from "../main";
interface TranslatePluginSettings {
	translatePort: string;
}

const DEFAULT_SETTINGS: TranslatePluginSettings = {
	translatePort: "1188",
}

const createSettingsStore = () => {
	const store = writable(DEFAULT_SETTINGS as TranslatePluginSettings);

	let _plugin!: MyPlugin;

	const initialise = async (plugin: MyPlugin): Promise<void> => {
		const data = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData());
		const settings: TranslatePluginSettings = { ...data };
		store.set(settings);
		_plugin = plugin;
	};

	store.subscribe(async (settings) => {
		if (_plugin) {
			const data = {
				...settings
			};
			await _plugin.saveData(data);
		}
	});

	

	const setTranslatePort = (translatePort: string) => {
		store.update((state) => {
			state.translatePort = translatePort;	
			return state;
		});
	};
	


	return {
		subscribe: store.subscribe,
		initialise,
		actions: {
			setTranslatePort
		}
	};
};

export const settingsStore = createSettingsStore();


