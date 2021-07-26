import {
    appendFileSync,
    ensureSymlink, readFileSync,
    readlinkSync
} from "fs-extra";
import { resolve } from "path";
import rimraf from "rimraf";
import { ENGINE_DIR, SRC_DIR } from "../constants";

const getChunked = (location: string) => {
    return location.replace(/\\/g, "/").split("/");
};

export const copyManual = (
    name: string,
    noIgnore?: boolean
) => {
    try {
        if (!readlinkSync(resolve(ENGINE_DIR, ...getChunked(name)))) {
            rimraf.sync(resolve(ENGINE_DIR, ...getChunked(name)));
        }

        ensureSymlink(
            resolve(SRC_DIR, ...getChunked(name)),
            resolve(ENGINE_DIR, ...getChunked(name))
        );

        if (!noIgnore) {
            const gitignore = readFileSync(
                resolve(ENGINE_DIR, ".gitignore"),
                "utf-8"
            );

            if (
                !gitignore.includes(
                    getChunked(name).join("/")
                )
            )
                appendFileSync(
                    resolve(ENGINE_DIR, ".gitignore"),
                    `\n${getChunked(name).join("/")}`
                );
        }

        return;
    } catch (e) {
        return e;
    }
};
