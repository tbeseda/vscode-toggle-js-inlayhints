const vscode = require("vscode");

const GLOBAL = true;
const JS_PREFIX = "javascript.inlayHints";
const TS_PREFIX = "typescript.inlayHints";
const ENABLED_SETTINGS = {
	"enumMemberValues.enabled": true,
	"functionLikeReturnTypes.enabled": true,
	"parameterNames.enabled": "all",
	"parameterTypes.enabled": true,
	"propertyDeclarationTypes.enabled": true,
	"variableTypes.enabled": true,
};
const SETTING_KEYS = Object.keys(ENABLED_SETTINGS);

module.exports = {
	activate(context) {
		const toggleCommand = vscode.commands.registerCommand(
			"extension.toggleInlayhints",
			() => {
				const jsSettings = vscode.workspace.getConfiguration(JS_PREFIX);
				const tsSettings = vscode.workspace.getConfiguration(TS_PREFIX);

				const hasEnabled = SETTING_KEYS.some((settingKey) => {
					return (
						jsSettings.get(settingKey) !==
							jsSettings.inspect(settingKey)?.defaultValue ||
						tsSettings.get(settingKey) !==
							tsSettings.inspect(settingKey)?.defaultValue
					);
				});

				if (hasEnabled) {
					for (const settingKey of SETTING_KEYS) {
						jsSettings.update(settingKey, undefined, GLOBAL);
						tsSettings.update(settingKey, undefined, GLOBAL);
					}
				} else {
					for (const settingKey of SETTING_KEYS) {
						jsSettings.update(settingKey, ENABLED_SETTINGS[settingKey], GLOBAL);
						tsSettings.update(settingKey, ENABLED_SETTINGS[settingKey], GLOBAL);
					}
				}

				vscode.window.setStatusBarMessage(
					[
						`$(eye${hasEnabled ? "-closed" : ""})`,
						`Inlay hints ${hasEnabled ? "off" : "on"}`,
					].join(" "),
					3000,
				);
			},
		);

		context.subscriptions.push(toggleCommand);
	},
};
