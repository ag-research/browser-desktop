import { readdirSync } from "fs-extra";
import { log } from "..";
import { PATCHES_DIR } from "../constants";
import Patch from "../controllers/patch";
import manualPatches from "../manual-patches";
import { delay } from "../utils";

const importManual = async () => {
    log.info(
        `Applying ${manualPatches.length} manual patches...`
    );

    console.log();

    await delay(500);

    return new Promise(async (res, rej) => {
        var total = 0;

        var i = 0;

        for await (const {
            name,
            action,
            src
        } of manualPatches) {
            ++i;

            const p = new Patch({
                name,
                action,
                src,
                type: "manual",
                status: [i, manualPatches.length]
            });

            await delay(100);

            await p.apply();
        }

        log.success(
            `Successfully imported ${manualPatches.length} manual patches!`
        );
        console.log();

        await delay(1000);

        res(total);
    });
};

const importPatchFiles = async () => {
    const patches = readdirSync(PATCHES_DIR);

    log.info(`Applying ${patches.length} patch files...`);

    console.log();

    await delay(500);

    var i = 0;

    for await (const patch of patches) {
        ++i;

        const p = new Patch({
            name: patch,
            type: "file",
            status: [i, patches.length]
        });

        await delay(100);

        await p.apply();
    }

    log.success(
        `Successfully imported ${patches.length} patch files!`
    );
};

export const importPatches = async () => {
    await importManual();
    await importPatchFiles();
};
