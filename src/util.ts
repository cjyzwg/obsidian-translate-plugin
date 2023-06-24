import path from "path";
import { Readable } from "stream";
import { FileSystemAdapter  } from 'obsidian';

export default class Util {
  public getOS() {
    const { appVersion } = navigator;
    if (appVersion.indexOf("Win") !== -1) {
      return "Windows";
    } else if (appVersion.indexOf("Mac") !== -1) {
      return "MacOS";
    } else if (appVersion.indexOf("X11") !== -1) {
      return "Linux";
    } else {
      return "Unknown OS";
    }
  }
  public async streamToString(stream: Readable) {
    const chunks = [];
  
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
  
    return Buffer.concat(chunks).toString("utf-8");
  }
  
  public getUrlAsset(url: string) {
    return (url = url.substr(1 + url.lastIndexOf("/")).split("?")[0]).split(
      "#"
    )[0];
  }
  
  
  
  public getLastImage(list: string[]) {
    const reversedList = list.reverse();
    let lastImage;
    reversedList.forEach(item => {
      if (item && item.startsWith("http")) {
        lastImage = item;
        return item;
      }
    });
    return lastImage;
  }
  
  public getVaultBasePath(): string {
    return (app.vault.adapter as FileSystemAdapter).getBasePath();
  }
  
  public getCurrentFile(): string | null {
      const fileData = app.workspace.getActiveFile();
      if (!fileData) return null;
      const adapter = app.vault.adapter;
      if (adapter instanceof FileSystemAdapter)
          return adapter.getFullPath(fileData.path);
      return null;
  }
  
  public getPluginFolder(): string {
    const valut_path = this.getVaultBasePath();
    return path.join(valut_path, '.obsidian', 'plugins');
  }
  
  public getHostName() {
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    const platform = window.navigator.platform;
    console.log(platform)
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    let os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'mac';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'windows';
    } else if (/Android/.test(userAgent)) {
      os = 'android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'linux';
    }else {
      os = 'ios';
    }
  
    return os;
  }
  
}









