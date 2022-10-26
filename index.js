const vscode = require("vscode");

const SETTINGS_PREFIX = "javascript.inlayHints";
const ALL_SETTINGS = {
	"enumMemberValues.enabled": true,
	"functionLikeReturnTypes.enabled": true,
	"parameterNames.enabled": "all",
	"parameterTypes.enabled": true,
	"propertyDeclarationTypes.enabled": true,
	"variableTypes.enabled": true,
};
const SETTING_KEYS = Object.keys(ALL_SETTINGS);

module.exports = {
	activate(context) {
		const commandOff = vscode.commands.registerCommand(
			"extension.toggleJsInlayhintsOff",
			() => {
				const settings = vscode.workspace.getConfiguration(SETTINGS_PREFIX);

				for (const settingKey of SETTING_KEYS) {
					settings.update(settingKey, undefined, true);
				}
			},
		);

		const commandOn = vscode.commands.registerCommand(
			"extension.toggleJsInlayhintsOn",
			() => {
				const settings = vscode.workspace.getConfiguration(SETTINGS_PREFIX);

				for (const settingKey of SETTING_KEYS) {
					settings.update(settingKey, ALL_SETTINGS[settingKey], true);
				}
			},
		);

		context.subscriptions.push(commandOff, commandOn);
	},
};
