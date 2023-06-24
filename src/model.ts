export type ManifestJson = {
    id: string;
    name: string;
    version: string;
    description: string;
    author: string;
}
export type TranslateParams =
{
    plugin_dir_name:    string;
    action: string;
    all:   boolean;
    plugin_ids: string[];
}