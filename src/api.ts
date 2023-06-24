import {requestUrl, RequestUrlParam,Notice} from 'obsidian';
import { ManifestJson, TranslateParams }  from './model'
import { settingsStore } from './settings';
import { get } from 'svelte/store';

import Util from './util';

export default class Api {
	
	readonly baseUrl: string = "http://127.0.0.1:"+get(settingsStore).translatePort 

	private getHeaders() {
		return {
			"Content-Type": "application/json",
		};
	}


	async getTestPort(): Promise<boolean>{
		console.log(this.baseUrl);
		try {
			const req: RequestUrlParam = {
				url: `${this.baseUrl}/`,
				method: 'POST',
				headers: this.getHeaders()
			};
			const resp = await requestUrl(req);
			if(resp.json.code!=200){
				new Notice(`报错了‼️ ${resp.json.message}`)
				return false;
			}
		} catch (e) {
			return false;
		}
		return true;
	}

	async getAllPlugins(): Promise<ManifestJson[]>{
		const pluginDirName = (new Util()).getPluginFolder();
		// const pluginDirName = "/Users/cj/Documents/code/goproject/src/leetcode/localization"
		const arr = [];
		const body = {
			"plugin_dir_name":pluginDirName,
			"action":"loadplugins"
			
		};
		let data = [];
		try {
			const req: RequestUrlParam = {
				url: `${this.baseUrl}/file`,
				method: 'POST',
				headers: this.getHeaders(),
				body: JSON.stringify(body)
			};
			const resp = await requestUrl(req);
			console.log(resp.json)
			
			if(resp.json.code!=200){
				new Notice(`报错了‼️ ${resp.json.message}`)
				return [];
			}
			data = resp.json.data
			for (const i in data) { 
				const manifestJson: ManifestJson = {
					id: data[i].id,
					name: data[i].name,
					version: data[i].version,
					description: data[i].description,
					author: data[i].author,
				};
				arr.push(manifestJson); 

			}
		} catch (e) {
			return [];
		}
		return arr;
	}

	async getTranslate(tp: TranslateParams): Promise<boolean>{
		console.log(tp)
		try {
			const req: RequestUrlParam = {
				url: `${this.baseUrl}/file`,
				method: 'POST',
				headers: this.getHeaders(),
				body: JSON.stringify(tp)
			};
			const resp = await requestUrl(req);
			if(resp.json.code!=200){
				new Notice(`报错了‼️ ${resp.json.message}`)
				return false;
			}
		} catch (e) {
			return false;
		}
		return true;
	}

}
