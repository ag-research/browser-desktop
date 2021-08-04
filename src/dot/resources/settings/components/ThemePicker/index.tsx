import React from "react";
import { dot } from "../../../../api";
import { AddonManager } from "../../../../modules";
import { ThemePickerStorePromo } from "../ThemePickerStorePromo";

export const ThemePicker = () => {
    const [themes, setThemes] = React.useState([]);
    const [selected, setSelected] = React.useState("");

    React.useEffect(() => {
        setSelected(dot.theme.currentThemeId as any);

        AddonManager.getAddonsByTypes(["theme"])
            .then((addons: any) => {
                setThemes(addons);
            });
    }, [])

    return (
        <div className={"settings-themepicker"}>
            {themes.map((theme: any) => (
                <a
                    key={theme.id}
                    className={"settings-themepicker-item"}
                    data-selected={selected == theme.id}
                    onClick={() => {
                        theme.enable()
                        setSelected(theme.id);
                    }}
                >
                    <i
                        className={"settings-themepicker-item-image"}
                        style={{
                            backgroundImage: `url(${theme.iconURL})`
                        }}
                    ></i>

                    <label className={"settings-themepicker-item-label"}>
                        {theme.name}
                    </label>
                </a>
            ))}

            <a className={"settings-themepicker-item"}>
                <i className={"settings-themepicker-item-image add-theme"}></i>

                <label className={"settings-themepicker-item-label"}>
                    New theme
                </label>
            </a>

            <ThemePickerStorePromo />
        </div>
    )
}