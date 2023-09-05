
import { writable } from 'svelte/store';
import MyPlugin from "../main";
interface TranslatePluginSettings {
	translatePort: string;
	apiKey: string;
	apiSecret: string;
}

const DEFAULT_SETTINGS: TranslatePluginSettings = {
	translatePort: "1188",
	apiKey:"",
	apiSecret:"",
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
	
	const setApiKey = (apiKey: string) => {
		store.update((state) => {
			state.apiKey = apiKey;	
			return state;
		});
	};

	const setApiSecret = (apiSecret: string) => {
		store.update((state) => {
			state.apiSecret = apiSecret;	
			return state;
		});
	};

	return {
		subscribe: store.subscribe,
		initialise,
		actions: {
			setTranslatePort,
			setApiKey,
			setApiSecret
		}
	};
};

export const settingsStore = createSettingsStore();


