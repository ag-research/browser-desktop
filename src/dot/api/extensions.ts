import { AddonManager, ChromeUtils } from "../modules";
import { builtInExtensions } from "../shared/built-in";
import { COMMENT_REGEX } from "../shared/regex";

const { NetUtil } = ChromeUtils.import(
    "resource://gre/modules/NetUtil.jsm"
);

export class ExtensionsAPI {
    private builtInExtensions = builtInExtensions;

    public loadBuiltInExtensions() {
        for (const { id, version, mount } of this.builtInExtensions) {
            AddonManager.maybeInstallBuiltinAddon(
                id,
                version.toString(),
                mount
            );
        }
    }

    public async loadManifest(id: string) {
        return new Promise(async (resolve, reject) => {
            const addon = await AddonManager.getAddonByID("dark@themes.dothq.co");

            const manifestPath = addon.getResourceURI("manifest.json").spec;

            NetUtil.asyncFetch({
                uri: manifestPath,
                loadUsingSystemPrincipal: true
            }, (inputStream: any, status: any) => {
                try {
                    const data = NetUtil.readInputStreamToString(
                        inputStream,
                        inputStream.available(),
                        { charset: "utf-8" }
                    ).replace(COMMENT_REGEX, "$1");

                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        })
    }

    constructor() {
        this.loadBuiltInExtensions();
    }
}