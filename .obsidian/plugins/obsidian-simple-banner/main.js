/** 
 * Simple Banner v0.5.9
 * @author Sandro Ducceschi
 * @url https://eatcodeplay.dev
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SimpleBanner
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/settings/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  desktop: {
    bannerEnabled: true,
    height: 240,
    viewOffset: 0,
    noteOffset: -32,
    bannerRadius: [8, 8, 8, 8],
    bannerPadding: 8,
    bannerFade: true,
    iconEnabled: false,
    iconSize: 96,
    iconRadius: 8,
    iconBackground: true,
    iconBorder: 2,
    iconAlignment: ["flex-start", "flex-end"],
    iconOffset: [0, -24],
    datetimeEnabled: false,
    datetimeOnPropOnly: false,
    datetimeAlignment: ["flex-end", "flex-start"],
    datetimeOffset: [0, 0],
    datetimeTimeFormat: "HH:mm",
    datetimeDateFormat: "dddd, MMMM Do YYYY",
    interop: {}
  },
  tablet: {
    bannerEnabled: true,
    height: 190,
    viewOffset: 0,
    noteOffset: -32,
    bannerRadius: [8, 8, 8, 8],
    bannerPadding: 8,
    bannerFade: true,
    iconEnabled: false,
    iconSize: 96,
    iconRadius: 8,
    iconBackground: true,
    iconBorder: 2,
    iconAlignment: ["flex-start", "flex-end"],
    iconOffset: [0, -24],
    datetimeEnabled: false,
    datetimeOnPropOnly: false,
    datetimeAlignment: ["flex-end", "flex-start"],
    datetimeOffset: [0, 0],
    datetimeTimeFormat: "HH:mm",
    datetimeDateFormat: "dddd, MMMM Do YYYY",
    interop: {}
  },
  phone: {
    bannerEnabled: true,
    height: 160,
    viewOffset: 0,
    noteOffset: -32,
    bannerRadius: [8, 8, 8, 8],
    bannerPadding: 8,
    bannerFade: true,
    iconEnabled: false,
    iconSize: 56,
    iconRadius: 8,
    iconBackground: true,
    iconBorder: 2,
    iconAlignment: ["flex-start", "flex-end"],
    iconOffset: [0, -24],
    datetimeEnabled: false,
    datetimeOnPropOnly: false,
    datetimeAlignment: ["flex-end", "flex-start"],
    datetimeOffset: [0, 0],
    datetimeTimeFormat: "HH:mm",
    datetimeDateFormat: "dddd, MMMM Do YYYY",
    interop: {}
  },
  properties: {
    autohide: true,
    image: "banner",
    icon: "icon",
    datetime: "datetime"
  }
};
var ICON_RESET = "rotate-ccw";
var TEXT_RESET = "Restore default";
var Settings = class _Settings extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  static get currentDevice() {
    if (import_obsidian.Platform.isPhone) {
      return "phone" /* Phone */;
    }
    if (import_obsidian.Platform.isTablet) {
      return "tablet" /* Tablet */;
    }
    return "desktop" /* Desktop */;
  }
  static prepare(data) {
    const isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
    const merged = { ...DEFAULT_SETTINGS };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const dataValue = data[key];
        if (isObject(dataValue) && merged.hasOwnProperty(key) && isObject(merged[key])) {
          merged[key] = { ...merged[key], ...dataValue };
        } else {
          merged[key] = dataValue;
        }
      }
    }
    return merged;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const currentDevice = _Settings.currentDevice;
    const settings = this.plugin.settings[currentDevice];
    this.createBannerSettings();
    if (settings.bannerEnabled) {
      this.createFrontmatterSettings();
      this.createIconSettings();
      this.createDatetimeSettings();
    }
  }
  createBannerSettings() {
    const currentDevice = _Settings.currentDevice;
    const settings = this.plugin.settings[currentDevice];
    const defaultSettings = DEFAULT_SETTINGS[currentDevice];
    this.addToggle({
      title: "Show simple banner",
      description: `Enable or disable Simple Banner on your ${currentDevice} device.`,
      refreshOnUpdate: true
    }, settings, "bannerEnabled");
    if (settings.bannerEnabled) {
      this.addNumber({
        title: "Height",
        description: `Height of the Banner on your ${currentDevice} device (in pixels).`,
        placeholder: "Enter a number",
        resetValue: defaultSettings.height
      }, settings, "height");
      this.addNumber({
        title: "Padding",
        description: "Padding of the banner from the edges of the note in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.bannerPadding
      }, settings, "bannerPadding");
      this.addNumber({
        title: "Note offset",
        description: "Move the position of the notes content in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.noteOffset
      }, settings, "noteOffset");
      this.addNumber({
        title: "View offset",
        description: "Move the position of the view content in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.viewOffset
      }, settings, "viewOffset");
      this.addNumber({
        title: "Border radius",
        description: "Size of the border radius in pixels.",
        placeholder: "8",
        isValueArray: true,
        length: 4,
        resetValue: defaultSettings.bannerRadius,
        classes: ["sbs-grid-radius"]
      }, settings, "bannerRadius");
      this.addToggle({
        title: "Fade",
        description: "Fade the image out towards the content.",
        classes: ["sbs-spacer"]
      }, settings, "bannerFade");
    }
  }
  createFrontmatterSettings() {
    const plugin = this.plugin;
    const settings = plugin.settings;
    this.addHeading("Frontmatter", ["sbs-heading"]);
    this.addToggle({
      title: "Autohide frontmatter/properties",
      description: "Enable or disables the frontmatter/properties autohide feature."
    }, settings.properties, "autohide");
    this.addText({
      title: "Banner property",
      description: "Name of the banner property this plugin will look for in the frontmatter.",
      placeholder: "Default: banner",
      resetValue: DEFAULT_SETTINGS.properties.image
    }, settings.properties, "image");
    this.addText({
      title: "Icon property",
      description: "Name of the icon property this plugin will look for in the frontmatter.",
      placeholder: "Default: icon",
      resetValue: DEFAULT_SETTINGS.properties.icon
    }, settings.properties, "icon");
    this.addText({
      title: "Datetime property",
      description: "Name of the datetime property this plugin will look for in the frontmatter.",
      placeholder: "Default: datetime",
      resetValue: DEFAULT_SETTINGS.properties.datetime,
      classes: ["sbs-spacer"]
    }, settings.properties, "datetime");
  }
  createIconSettings() {
    const currentDevice = _Settings.currentDevice;
    const settings = this.plugin.settings[currentDevice];
    const defaultSettings = DEFAULT_SETTINGS[currentDevice];
    this.addHeading(`Icon`, ["sbs-heading"]);
    this.addToggle({
      title: "Show icon",
      description: "Enable or disable the icon.",
      refreshOnUpdate: true
    }, settings, "iconEnabled");
    if (settings.iconEnabled) {
      this.addNumber({
        title: "Icon size",
        description: "Size of the icon in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.iconSize
      }, settings, "iconSize");
      this.addToggle({
        title: "Icon background",
        description: "Enable or disable the icon background."
      }, settings, "iconBackground");
      this.addNumber({
        title: "Border size",
        description: "Size of the border in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.iconBorder
      }, settings, "iconBorder");
      this.addNumber({
        title: "Border radius",
        description: "Size of the border radius in pixels.",
        placeholder: "Enter a number",
        resetValue: defaultSettings.iconRadius
      }, settings, "iconRadius");
      this.addDropdown({
        title: "Icon alignment - horizontal",
        description: "Horizontal alignment of the icon.",
        choices: [
          { label: "Left", value: "flex-start" },
          { label: "Middle", value: "center" },
          { label: "Right", value: "flex-end" }
        ],
        resetValue: defaultSettings.iconAlignment[0]
      }, settings, "iconAlignment", 0);
      this.addDropdown({
        title: "Icon alignment - vertical",
        description: "Vertical alignment of the icon.",
        choices: [
          { label: "Top", value: "flex-start" },
          { label: "Middle", value: "center" },
          { label: "Bottom", value: "flex-end" }
        ],
        resetValue: defaultSettings.iconAlignment[1]
      }, settings, "iconAlignment", 1);
      this.addNumber({
        title: "Icon offset",
        description: "Offset the X and Y position of the icon in pixels",
        placeholder: "0",
        isValueArray: true,
        length: 2,
        resetValue: defaultSettings.iconOffset,
        classes: ["sbs-grid-xy", "sbs-spacer"]
      }, settings, "iconOffset");
    }
  }
  createDatetimeSettings() {
    const currentDevice = _Settings.currentDevice;
    const settings = this.plugin.settings[currentDevice];
    const defaultSettings = DEFAULT_SETTINGS[currentDevice];
    this.addHeading(`Datetime`, ["sbs-heading"]);
    this.addToggle({
      title: "Show datetime",
      description: "Enable or disable the display of a datetime.",
      refreshOnUpdate: true
    }, settings, "datetimeEnabled");
    if (settings.datetimeEnabled) {
      this.addToggle({
        title: "Only with property",
        description: "Show datetime only when a property is set in the note"
      }, settings, "datetimeOnPropOnly");
      this.addText({
        title: "Time formatting",
        description: (0, import_obsidian.sanitizeHTMLToDom)('Define how time should be displayed. Leave empty to disable.<br/>Obsidian uses moment.js for formatting. <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank">Learn more</a>'),
        placeholder: "Default: HH:mm:ss",
        allowEmpty: true,
        resetValue: defaultSettings.datetimeTimeFormat
      }, settings, "datetimeTimeFormat");
      this.addText({
        title: "Date formatting",
        description: (0, import_obsidian.sanitizeHTMLToDom)('Define how the date should be displayed. Leave empty to disable.<br/>Obsidian uses moment.js for formatting. <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank">Learn more</a>'),
        placeholder: "Default: dddd, MMMM Do YYYY",
        allowEmpty: true,
        resetValue: defaultSettings.datetimeDateFormat
      }, settings, "datetimeDateFormat");
      this.addDropdown({
        title: "Datetime alignment - horizontal",
        description: "Horizontal alignment of the datetime.",
        choices: [
          { label: "Left", value: "flex-start" },
          { label: "Middle", value: "center" },
          { label: "Right", value: "flex-end" }
        ],
        allowEmpty: true,
        resetValue: defaultSettings.datetimeAlignment[0]
      }, settings, "datetimeAlignment", 0);
      this.addDropdown({
        title: "Datetime alignment - vertical",
        description: "Vertical alignment of the datetime.",
        choices: [
          { label: "Top", value: "flex-start" },
          { label: "Middle", value: "center" },
          { label: "Bottom", value: "flex-end" }
        ],
        resetValue: defaultSettings.datetimeAlignment[1]
      }, settings, "datetimeAlignment", 1);
      this.addNumber({
        title: "Datetime offset",
        description: "Offset the X and Y position of the datetime in pixels",
        placeholder: "0",
        isValueArray: true,
        length: 2,
        resetValue: defaultSettings.datetimeOffset,
        classes: ["sbs-grid-xy", "sbs-spacer"]
      }, settings, "datetimeOffset");
    }
  }
  /*
  	createInteropSettings() {
  		const currentDevice = Settings.currentDevice;
  		const settings = this.plugin.settings[currentDevice];
  		const defaultSettings = DEFAULT_SETTINGS[currentDevice];
  
  		this.addHeading(`Plugin interoperability`, ['sbs-heading']);
  	}
  	*/
  //----------------------------------
  // Helper Methods
  //----------------------------------
  addHeading(text, classes) {
    const instance3 = new import_obsidian.Setting(this.containerEl).setHeading().setName(text);
    this.setClasses(instance3, classes);
  }
  addToggle(options, obj, prop) {
    const instance3 = new import_obsidian.Setting(this.containerEl);
    if (options.title) {
      instance3.setName(options.title);
    }
    if (options.description) {
      instance3.setDesc(options.description);
    }
    this.setClasses(instance3, options.classes);
    instance3.addToggle(
      (component) => component.setValue(obj[prop]).onChange(async (value) => {
        obj[prop] = value;
        await this.plugin.saveSettings();
        if (options.refreshOnUpdate) {
          this.display();
        }
      })
    );
  }
  addDropdown(options, obj, prop, index) {
    const isResettable = options.resetValue !== void 0;
    const resetValue = options.resetValue;
    const instance3 = new import_obsidian.Setting(this.containerEl);
    const hasIndex = index !== void 0;
    if (options.title) {
      instance3.setName(options.title);
    }
    if (options.description) {
      instance3.setDesc(options.description);
    }
    this.setClasses(instance3, options.classes);
    if (isResettable) {
      instance3.addExtraButton(
        (button) => button.setIcon(ICON_RESET).setTooltip(TEXT_RESET).onClick(async () => {
          if (hasIndex) {
            obj[prop][index] = resetValue;
          } else {
            obj[prop] = resetValue;
          }
          await this.plugin.saveSettings();
          this.display();
        })
      );
    }
    instance3.addDropdown((dropdown) => {
      const choices = (options == null ? void 0 : options.choices) || [];
      choices.forEach((choice) => {
        dropdown.addOption(choice.value, choice.label);
      });
      if (hasIndex) {
        dropdown.setValue(obj[prop][index]);
      } else {
        dropdown.setValue(obj[prop]);
      }
      dropdown.onChange(async (v) => {
        if (hasIndex) {
          obj[prop][index] = v;
        } else {
          obj[prop] = v;
        }
        await this.plugin.saveSettings();
      });
      return dropdown;
    });
  }
  addText(options, obj, prop) {
    const isResettable = options.resetValue !== void 0;
    const resetValue = options.resetValue;
    const instance3 = new import_obsidian.Setting(this.containerEl);
    if (options.title) {
      instance3.setName(options.title);
    }
    if (options.description) {
      instance3.setDesc(options.description);
    }
    this.setClasses(instance3, options.classes);
    if (isResettable) {
      instance3.addExtraButton(
        (button) => button.setIcon(ICON_RESET).setTooltip(TEXT_RESET).onClick(async () => {
          obj[prop] = resetValue;
          await this.plugin.saveSettings();
          this.display();
        })
      );
    }
    instance3.addText((text) => {
      if (options.placeholder) {
        text.setPlaceholder(options.placeholder);
      }
      text.setValue(obj[prop].toString()).onChange(async (value) => {
        if (options.allowEmpty) {
          obj[prop] = value;
        } else {
          obj[prop] = value !== "" ? value : resetValue || "";
        }
        await this.plugin.saveSettings();
        if (options.refreshOnUpdate) {
          this.display();
        }
      });
      return text;
    });
  }
  addNumber(options, obj, prop) {
    const asFloat = options.float;
    const isResettable = options.resetValue !== void 0;
    const resetValue = options.resetValue;
    const instance3 = new import_obsidian.Setting(this.containerEl);
    if (options.title) {
      instance3.setName(options.title);
    }
    if (options.description) {
      instance3.setDesc(options.description);
    }
    this.setClasses(instance3, options.classes);
    if (isResettable) {
      instance3.addExtraButton(
        (button) => button.setIcon(ICON_RESET).setTooltip(TEXT_RESET).onClick(async () => {
          obj[prop] = options.isValueArray ? [...resetValue] : resetValue;
          await this.plugin.saveSettings();
          this.display();
        })
      );
    }
    if (options.isValueArray && options.length !== void 0) {
      const hasPlaceholders = options.placeholders !== void 0;
      for (let i = 0; i < options.length; i++) {
        instance3.addText((text) => {
          if (hasPlaceholders && (options == null ? void 0 : options.placeholders)) {
            text.setPlaceholder(options.placeholders[i] || "");
          } else if (options.placeholder) {
            text.setPlaceholder(options.placeholder);
          }
          text.setValue(obj[prop][i].toString()).onChange(async (value) => {
            let num = asFloat ? parseFloat(value) : parseInt(value, 10);
            if (isNaN(num) && isResettable) {
              num = resetValue[i] || 0;
            }
            obj[prop][i] = num;
            await this.plugin.saveSettings();
            if (options.refreshOnUpdate) {
              this.display();
            }
          });
          return text;
        });
      }
    } else {
      instance3.addText((text) => {
        if (options.placeholder) {
          text.setPlaceholder(options.placeholder);
        }
        text.setValue(obj[prop].toString()).onChange(async (value) => {
          let num = asFloat ? parseFloat(value) : parseInt(value, 10);
          if (isNaN(num) && isResettable) {
            num = resetValue;
          }
          obj[prop] = num;
          await this.plugin.saveSettings();
          if (options.refreshOnUpdate) {
            this.display();
          }
        });
        return text;
      });
    }
  }
  setClasses(instance3, classes) {
    if (classes) {
      classes.forEach((c) => instance3.setClass(c));
    }
  }
};

// src/settings/migrator.ts
var SettingsMigrator = class {
  static async migrate(data, plugin) {
    const DESKTOP = "desktop" /* Desktop */;
    const TABLET = "tablet" /* Tablet */;
    const PHONE = "phone" /* Phone */;
    const migrationMap = {
      desktopHeight: { target: "desktop.height" },
      tabletHeight: { target: "tablet.height" },
      mobileHeight: { target: "phone.height" },
      offset: { target: "noteOffset", devices: [DESKTOP, TABLET, PHONE] },
      fade: { target: "bannerFade", devices: [DESKTOP, TABLET, PHONE] },
      radius: { target: "bannerRadius", devices: [DESKTOP, TABLET, PHONE] },
      padding: { target: "bannerPadding", devices: [DESKTOP, TABLET, PHONE] },
      propertyName: { target: "properties.image" }
    };
    let neededMigration = false;
    const newData = { ...data };
    for (const oldKey in migrationMap) {
      if (newData.hasOwnProperty(oldKey) && newData[oldKey] !== void 0) {
        neededMigration = true;
        const migration = migrationMap[oldKey];
        if (migration.devices) {
          migration.devices.forEach((device) => {
            const path = device + "." + migration.target;
            this.setValueByPath(newData, path, newData[oldKey]);
          });
        } else {
          this.setValueByPath(newData, migration.target, newData[oldKey]);
        }
        delete newData[oldKey];
      }
    }
    if (neededMigration) {
      await plugin.saveData(newData);
    }
    return newData;
  }
  static setValueByPath(obj, path, value) {
    const parts = path.split(".");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }
};

// src/data/store.ts
var storage = {};
var Store = class {
  static get(id) {
    return storage[id] || null;
  }
  static set(id, data) {
    storage[id] = data;
  }
  static delete(id = null) {
    if (id) {
      delete storage[id];
    }
  }
  static exists(id) {
    return storage[id] !== void 0;
  }
  static getAll() {
    return storage;
  }
  static getIds() {
    return Object.keys(storage);
  }
};

// src/utils/domutils.ts
var instance;
var DomUtils = class {
  static init(plugin) {
    instance = plugin;
  }
  static calculateFontsize(textContent, iconSize) {
    const temp = document.createElement("span");
    temp.setAttribute("style", "position: absolute; visibility: hidden; white-space: nowrap;");
    temp.style.padding = "0";
    temp.style.margin = "0";
    temp.style.left = "-9999px";
    temp.textContent = textContent.toUpperCase();
    document.body.appendChild(temp);
    const size = iconSize;
    const checkWidth = size - 16;
    let fontSize = size;
    temp.style.fontSize = fontSize + "px";
    while (temp.offsetWidth > checkWidth && fontSize > 1) {
      fontSize -= 1;
      temp.style.fontSize = fontSize + "px";
    }
    document.body.removeChild(temp);
    return `${fontSize}px`;
  }
  static setCSSVariables(variables, target = document.body) {
    const style = target.style;
    Object.keys(variables).forEach((k) => {
      style.setProperty(`--sb-${k}`, variables[k]);
    });
  }
};

// src/utils/parse.ts
var import_obsidian2 = require("obsidian");
var instance2;
var RegExpression = {
  Wikilink: /^!?\[\[([^\]]+?)(\|([^\]]+?))?\]\]$/,
  Markdown: /^!?\[([^\]]*)\]\(([^)]+?)\)$/,
  MarkdownBare: /^!?<([^>]+)>$/,
  Weblink: /^https?:\/\//i
};
var Parse = class {
  static init(plugin) {
    instance2 = plugin;
  }
  static async link(str, view, settingProperty) {
    let url = null;
    let displayText = null;
    let external;
    let obsidianUrl = false;
    let options = { x: 0, y: 0, repeatable: false };
    const wikilinkMatch = str.match(RegExpression.Wikilink);
    if (wikilinkMatch) {
      url = wikilinkMatch[1].trim();
      displayText = wikilinkMatch[3] ? wikilinkMatch[3].trim() : null;
    }
    const markdownMatch = str.match(RegExpression.Markdown);
    const markdownBareMatch = str.match(RegExpression.MarkdownBare);
    if (markdownMatch) {
      displayText = markdownMatch[1].trim();
      url = markdownMatch[2].trim();
    } else if (markdownBareMatch) {
      url = markdownBareMatch[1].trim();
      displayText = null;
    }
    if (!url) {
      url = str;
      displayText = null;
    }
    external = RegExpression.Weblink.test(url);
    if (this.isObsidianUrl(url)) {
      const str2 = url.replace("obsidian://open", "");
      const params = new URLSearchParams(str2);
      let file = params.get("file");
      if (file) {
        url = file;
        obsidianUrl = true;
        external = false;
        displayText = null;
      }
    }
    if (url.startsWith("file:")) {
      url = url.replace(/^file:\/{1,}/, import_obsidian2.Platform.resourcePathPrefix);
      external = true;
    }
    const hashIndex = url.indexOf("#");
    if ((external || obsidianUrl) && hashIndex !== -1) {
      options = this.imageProperties(url.substring(hashIndex + 1));
      url = url.replace(/#.*/, "").trim();
    }
    if (displayText) {
      options = this.imageProperties(displayText);
    }
    if (!external) {
      const vault = instance2.app.vault;
      let file = null;
      if (view && view.file && (url.includes("../") || url.includes("./") || !url.startsWith("/") && url.includes("/"))) {
        const currentFilePath = view.file.path;
        const resolvedPath = instance2.app.metadataCache.getFirstLinkpathDest(url, currentFilePath);
        if (resolvedPath) {
          file = resolvedPath;
        }
      }
      if (!file) {
        const files = vault.getFiles().filter((f) => f.path === url || f.name === url);
        file = files.find((f) => f.path === url) || null;
        if (!file) {
          file = files.find((f) => f.name === url) || null;
        }
      }
      if (file) {
        url = vault.getResourcePath(file);
      }
      if (obsidianUrl && file && view) {
        const activeFile = instance2.app.workspace.getActiveFile();
        if (activeFile) {
          instance2.app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
            const propName = settingProperty || instance2.settingProperties.image;
            frontmatter[propName] = `[[${file == null ? void 0 : file.path}]]`;
          });
        }
      }
    }
    let type = null;
    try {
      const urlObj = new URL(url);
      if (urlObj) {
        const extension = urlObj.pathname.split(".").pop();
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp"];
        const videoExtensions = ["mp4", "webm", "ogg", "ogv", "mov", "avi", "wmv", "mpg", "mpeg", "3gp"];
        if (extension && imageExtensions.includes(extension)) {
          type = "image" /* Image */;
        } else if (extension && videoExtensions.includes(extension)) {
          type = "video" /* Video */;
        }
      }
      if (!type) {
        const response = await (0, import_obsidian2.requestUrl)({ url, method: "HEAD" });
        const contentType = (response == null ? void 0 : response.headers["content-type"]) || null;
        if (contentType) {
          if (contentType.includes("image" /* Image */)) {
            type = "image" /* Image */;
          } else if (contentType.includes("video" /* Video */)) {
            type = "video" /* Video */;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    return {
      url: `"${url.trim().replace(/(["\\])/g, "\\$1")}"`,
      external,
      type,
      ...options
    };
  }
  static imageProperties(str) {
    let repeatable;
    let x = 0;
    let y = 0;
    const values = str.toLowerCase();
    repeatable = values.includes("repeat");
    const sizes = str.split(/x|,/);
    const numbers = sizes.filter((v) => !isNaN(parseInt(v.trim(), 10)));
    if (numbers.length === 2) {
      x = parseInt(numbers[0].trim(), 10);
      y = parseInt(numbers[1].trim(), 10);
    } else if (numbers.length === 1) {
      y = parseInt(numbers[0].trim(), 10);
    }
    return { x, y, repeatable };
  }
  static async icon(icon, view) {
    const str = icon || "";
    const out = { value: null, type: "text" /* Text */ };
    if (RegExpression.Wikilink.test(str)) {
      out.type = "link" /* Link */;
    } else if (RegExpression.Markdown.test(str) || RegExpression.MarkdownBare.test(str)) {
      out.type = "link" /* Link */;
    } else if (RegExpression.Weblink.test(icon)) {
      out.type = "link" /* Link */;
    } else if (this.isObsidianUrl(icon)) {
      out.type = "link" /* Link */;
    }
    if (out.type === "link" /* Link */) {
      const data = await this.link(str, view, instance2.settingProperties.icon);
      out.value = data.url;
    } else {
      out.value = str;
    }
    return out;
  }
  static async isImagePropertiesUpdate(oldstr, newstr, view) {
    if (!oldstr || !newstr) {
      return false;
    }
    const oldopt = await this.link(oldstr, view);
    const newopt = await this.link(newstr, view);
    return oldopt.url === newopt.url;
  }
  static isObsidianUrl(url) {
    return url.startsWith("obsidian://open");
  }
};

// src/feature/base.ts
var FeatureBase = class {
  constructor(plugin, settings) {
    this.plugin = plugin;
    this.settings = settings;
  }
};

// src/feature/banner.ts
var MAIN_SELECTOR = `.${"simple-banner" /* Main */}`;
var Banner = class extends FeatureBase {
  //----------------------------------
  // Variables
  //----------------------------------
  //----------------------------------
  // Constructor
  //----------------------------------
  constructor(plugin, settings) {
    super(plugin, settings);
  }
  //----------------------------------
  // Lifecycle
  //----------------------------------
  destroy() {
  }
  //----------------------------------
  // Methods
  //----------------------------------
  update(data, imgOptions, containers) {
    const { isImageChange, isImagePropsUpdate } = data;
    const banners = [];
    containers.forEach((container) => {
      var _a;
      let element = container.querySelector(MAIN_SELECTOR) || document.createElement("div");
      element.classList.add("simple-banner" /* Main */);
      banners.push(element);
      if (isImageChange || isImagePropsUpdate) {
        if (isImageChange) {
          element.classList.remove("static" /* Static */);
          (_a = element.firstChild) == null ? void 0 : _a.remove();
        }
        const vars = {
          "img-x": `${imgOptions.x}px`,
          "img-y": `${imgOptions.y}px`,
          "size": imgOptions.repeatable ? "auto" /* Auto */ : "revert-layer" /* RevertLayer */,
          "repeat": imgOptions.repeatable ? "repeat" /* Repeat */ : "revert-layer" /* RevertLayer */,
          "url": "none"
        };
        if (imgOptions.type === "video" /* Video */) {
          const video = document.createElement("video");
          video.controls = false;
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.src = imgOptions.url;
          element.appendChild(video);
          vars.url = "none";
        } else {
          vars.url = `url(${imgOptions.url})`;
        }
        DomUtils.setCSSVariables(vars, container);
      }
    });
    return banners;
  }
  inject(banners, containers) {
    containers.forEach((container, index) => {
      const banner = banners[index];
      container.prepend(banner);
      banner.onanimationend = () => {
        const instances = document.querySelectorAll(MAIN_SELECTOR);
        instances.forEach((i) => i.classList.add("static" /* Static */));
      };
    });
  }
  replace(banners) {
    banners.forEach((banner) => {
      banner.classList.add("static" /* Static */);
    });
  }
};

// src/feature/icon.ts
var import_obsidian3 = require("obsidian");
var Icon = class extends FeatureBase {
  //----------------------------------
  // Variables
  //----------------------------------
  //----------------------------------
  // Constructor
  //----------------------------------
  constructor(plugin, settings) {
    super(plugin, settings);
  }
  //----------------------------------
  // Lifecycle
  //----------------------------------
  destroy() {
  }
  //----------------------------------
  // Methods
  //----------------------------------
  async update(data, banners) {
    const { iconEnabled, iconSize } = this.settings;
    let calculatedFontSize = null;
    for (let i = 0, n = banners.length; i < n; i += 1) {
      const banner = banners[i];
      const { icon, view } = data;
      let container = banner.querySelector(`.${"icon" /* Icon */}`) || null;
      const hasContainer = container !== null;
      if (hasContainer) {
        container == null ? void 0 : container.classList.add("static" /* Static */);
      }
      if (iconEnabled && icon) {
        if (!hasContainer) {
          container = document.createElement("div");
          container.classList.add("icon" /* Icon */);
          if (import_obsidian3.Platform.isWin) {
            container.classList.add("is-windows" /* IsWindows */);
          }
          const div = document.createElement("div");
          container.appendChild(div);
          banner.prepend(container);
        }
        const iconElement = container == null ? void 0 : container.querySelector("div");
        let { value, type } = await Parse.icon(icon, view);
        value = (value == null ? void 0 : value.replace(/([#.:[\\]"])/g, "\\$1")) || "";
        iconElement.dataset.type = type;
        const vars = {};
        vars["icon-value"] = type === "link" /* Link */ ? `url(${value})` : `"${value}"`;
        if (type === "text" /* Text */) {
          calculatedFontSize = calculatedFontSize ? calculatedFontSize : DomUtils.calculateFontsize(value, iconSize);
          vars["icon-fontsize"] = calculatedFontSize;
        }
        DomUtils.setCSSVariables(vars, iconElement);
      } else if (hasContainer) {
        data.icon = null;
        container == null ? void 0 : container.remove();
      }
    }
  }
};

// src/feature/datetime.ts
var import_obsidian4 = require("obsidian");
var CONTAINER_SELECTOR = `.${"simple-banner" /* Main */} > div.${"date-time" /* Datetime */}`;
var Datetime = class extends FeatureBase {
  //----------------------------------
  // Constructor
  //----------------------------------
  constructor(plugin, settings) {
    super(plugin, settings);
    this.processTime();
  }
  //----------------------------------
  // Lifecycle
  //----------------------------------
  destroy() {
    window.clearInterval(this.intervalId);
  }
  //----------------------------------
  // Methods
  //----------------------------------
  update(data, banners) {
    const { datetimeEnabled, datetimeOnPropOnly } = this.settings;
    const { datetime } = data;
    if (datetimeEnabled) {
      banners.forEach((banner) => {
        let container = banner.querySelector(`.${"date-time" /* Datetime */}`) || null;
        const hasContainer = container !== null;
        if (hasContainer) {
          container == null ? void 0 : container.classList.add("static" /* Static */);
        }
        if (datetimeEnabled && !datetimeOnPropOnly || datetimeEnabled && datetimeOnPropOnly && datetime) {
          if (!hasContainer) {
            container = document.createElement("div");
            container.classList.add("date-time" /* Datetime */);
            const div = document.createElement("time");
            container.appendChild(div);
            banner.prepend(container);
          }
          const dtElement = container == null ? void 0 : container.querySelector("time");
          dtElement.classList.remove("static" /* Static */);
          if (datetime) {
            dtElement.classList.add("static" /* Static */);
            this.updateTime([dtElement], datetime, true);
          } else if (!datetimeOnPropOnly) {
            this.updateTime([dtElement]);
          }
        } else if (hasContainer) {
          container == null ? void 0 : container.remove();
        }
      });
    } else {
      const datetimes = document.querySelectorAll(CONTAINER_SELECTOR);
      datetimes.forEach((dt) => {
        dt.remove();
      });
    }
  }
  check() {
    const currentInterval = this.intervalId;
    const { datetimeEnabled, datetimeOnPropOnly } = this.settings;
    if (datetimeEnabled && !datetimeOnPropOnly) {
      const numTimes = document.querySelectorAll(CONTAINER_SELECTOR).length;
      if (numTimes === 0 && currentInterval !== void 0) {
        window.clearInterval(this.intervalId);
        this.intervalId = void 0;
      } else if (numTimes > 0 && currentInterval === void 0) {
        this.intervalId = window.setInterval(() => this.processTime(), 1e3);
      }
    }
  }
  //----------------------------------
  // Private Methods
  //----------------------------------
  processTime() {
    const { datetimeEnabled, datetimeOnPropOnly, datetimeTimeFormat, datetimeDateFormat } = this.settings;
    const showTime = datetimeTimeFormat !== "";
    const showDate = datetimeDateFormat !== "";
    if (datetimeEnabled && !datetimeOnPropOnly) {
      const now = (0, import_obsidian4.moment)();
      this.time = showTime ? now.format(datetimeTimeFormat) : "";
      this.date = showDate ? now.format(datetimeDateFormat) : "";
      this.iso = now.toISOString();
      this.updateTime();
    }
  }
  updateTime(elements, datetime, forceUpdate) {
    const { datetimeEnabled, datetimeTimeFormat, datetimeDateFormat } = this.settings;
    const showTime = datetimeTimeFormat !== "";
    const showDate = datetimeDateFormat !== "";
    if (datetimeEnabled) {
      let { time, date, iso } = this;
      if (datetime) {
        const dt = (0, import_obsidian4.moment)(datetime);
        time = showTime ? dt.format(datetimeTimeFormat) : "";
        date = showDate ? dt.format(datetimeDateFormat) : "";
        const hasTimeInfo = datetime.includes("T");
        if (!hasTimeInfo) {
          time = "";
        }
        iso = dt.toISOString();
      }
      const els = elements || document.querySelectorAll(`${CONTAINER_SELECTOR} > time`);
      if (els.length > 0) {
        els.forEach((el) => {
          var _a;
          const create = ((_a = el.children) == null ? void 0 : _a.length) === 0;
          if (create) {
            el.createEl("span", { text: time });
            el.createEl("span", { text: date });
          } else {
            if (!el.classList.contains("static" /* Static */) || forceUpdate) {
              const spans = el.querySelectorAll("span");
              const values = [time, date];
              spans.forEach((span, index) => {
                span.textContent = values[index] || "";
              });
            }
          }
          el.setAttribute("datetime", iso || "");
        });
      }
    }
  }
};

// src/feature/interop.ts
var PluginInterOp = class extends FeatureBase {
  //----------------------------------
  // Variables
  //----------------------------------
  //----------------------------------
  // Constructor
  //----------------------------------
  constructor(plugin, settings) {
    super(plugin, settings);
  }
  //----------------------------------
  // Lifecycle
  //----------------------------------
  destroy() {
  }
  //----------------------------------
  // Methods
  //----------------------------------
  update(data, banners) {
  }
  check() {
  }
  //----------------------------------
  // Private Methods
  //----------------------------------
};

// src/main.ts
var SimpleBanner = class extends import_obsidian5.Plugin {
  //---------------------------------------------------
  //
  //  Plugin Lifecycle
  //
  //---------------------------------------------------
  async onload() {
    const app = this.app;
    const workspace = app.workspace;
    Parse.init(this);
    DomUtils.init(this);
    await this.loadSettings();
    this.addSettingTab(new Settings(app, this));
    this.featBanner = new Banner(this, this.deviceSettings);
    this.featIcon = new Icon(this, this.deviceSettings);
    this.featDatetime = new Datetime(this, this.deviceSettings);
    this.featPluginInterop = new PluginInterOp(this, this.deviceSettings);
    workspace.onLayoutReady(() => {
      this.registerEvent(workspace.on("window-open", this.handleWindowOpen.bind(this)));
      this.registerEvent(workspace.on("layout-change", this.handleLayoutChange.bind(this)));
      this.registerEvent(workspace.on("file-open", this.handleFileOpen.bind(this)));
      this.registerEvent(app.metadataCache.on("changed", this.handleMetaChange.bind(this)));
      this.applySettings();
    });
  }
  onunload() {
    const { featBanner, featIcon, featDatetime, featPluginInterop } = this;
    featBanner.destroy();
    featIcon.destroy();
    featDatetime.destroy();
    featPluginInterop.destroy();
  }
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  processAll() {
    this.app.workspace.iterateRootLeaves((leaf) => {
      const view = leaf.view;
      if (view) {
        if (this.deviceSettings.bannerEnabled) {
          const file = (view == null ? void 0 : view.file) || null;
          this.process(file, view);
        } else {
          this.remove();
        }
      }
    });
  }
  async process(file, view) {
    const data = await this.compute(file, view);
    if (!data) {
      return;
    }
    if (!data.image) {
      this.remove(data);
      return;
    }
    if (!data.icon) {
      data.needsUpdate = true;
    }
    if (this.deviceSettings.bannerEnabled) {
      this.render(data);
    }
  }
  async compute(file, targetView) {
    const view = targetView || this.getActiveView();
    if (file && view instanceof import_obsidian5.MarkdownView) {
      const defaultData = this.createDefaultBannerData();
      const olddata = Store.get(view == null ? void 0 : view.leaf.id) || defaultData;
      const newdata = this.createDefaultBannerData(view, olddata.viewMode);
      const cachedMetadata = this.app.metadataCache.getFileCache(file);
      const frontmatter = cachedMetadata == null ? void 0 : cachedMetadata.frontmatter;
      if (frontmatter) {
        const settingProps = this.settingProperties;
        const imageProp = settingProps.image;
        const iconProp = settingProps.icon;
        const datetimeProp = settingProps.datetime;
        if (frontmatter[imageProp]) {
          newdata.image = frontmatter[imageProp];
          newdata.filepath = file.path;
          if (olddata.filepath !== newdata.filepath) {
            newdata.needsUpdate = true;
            newdata.isImageChange = true;
          } else if (olddata.image !== newdata.image) {
            newdata.needsUpdate = true;
            newdata.isImageChange = true;
            if (await Parse.isImagePropertiesUpdate(olddata.image, newdata.image, view)) {
              newdata.isImagePropsUpdate = true;
              newdata.isImageChange = false;
            }
          }
        }
        if (this.deviceSettings.iconEnabled) {
          if (frontmatter[iconProp]) {
            newdata.icon = frontmatter[iconProp];
            newdata.filepath = file.path;
            if (olddata.icon !== newdata.icon) {
              newdata.needsUpdate = true;
            }
          } else if (olddata.icon) {
            newdata.icon = null;
            newdata.needsUpdate = true;
          }
        }
        if (this.deviceSettings.datetimeEnabled) {
          if (frontmatter[datetimeProp]) {
            newdata.datetime = frontmatter[datetimeProp];
            newdata.filepath = file.path;
            if (olddata.datetime !== newdata.datetime) {
              newdata.needsUpdate = true;
            }
          } else if (olddata.datetime) {
            newdata.datetime = null;
            newdata.needsUpdate = true;
          }
        }
      }
      return newdata;
    }
    return null;
  }
  async render(data) {
    const { image, viewMode, lastViewMode, view, needsUpdate, isImageChange } = data;
    const container = view == null ? void 0 : view.containerEl;
    if (container && (lastViewMode !== viewMode || needsUpdate)) {
      const containers = container.querySelectorAll(".cm-scroller, .markdown-reading-view > .markdown-preview-view");
      const imageOptions = await Parse.link(image || "", view);
      const {
        featBanner,
        featIcon,
        featDatetime,
        featPluginInterop
      } = this;
      const banners = featBanner.update(data, imageOptions, containers);
      featIcon.update(data, banners);
      featDatetime.update(data, banners);
      featPluginInterop.update(data, banners);
      if (!isImageChange) {
        featBanner.replace(banners);
      } else {
        featBanner.inject(banners, containers);
      }
      featDatetime.check();
      data.lastViewMode = viewMode;
      container.dataset.sb = "";
      Store.set(view == null ? void 0 : view.leaf.id, data);
    }
  }
  remove(data) {
    const view = (data == null ? void 0 : data.view) || this.getActiveView();
    if (view instanceof import_obsidian5.MarkdownView) {
      const container = view == null ? void 0 : view.containerEl;
      if (container) {
        const targets = container.querySelectorAll(`.${"simple-banner" /* Main */}`);
        targets.forEach((t) => {
          t.remove();
        });
        this.updateMetaDOM(true);
        Store.delete(view == null ? void 0 : view.leaf.id);
        delete container.dataset.sb;
      }
    }
  }
  //----------------------------------
  // Settings Methods
  //----------------------------------
  async loadSettings() {
    const data = await this.loadData();
    const mergedData = Settings.prepare(data);
    this.settings = await SettingsMigrator.migrate(mergedData, this);
    this.deviceSettings = this.settings[Settings.currentDevice];
    this.settingProperties = this.settings.properties;
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.applySettings();
  }
  applySettings() {
    const settings = this.deviceSettings;
    const height = settings.height;
    const noteOffset = settings.noteOffset;
    const viewOffset = settings.viewOffset;
    const radius = settings.bannerRadius;
    const padding = settings.bannerPadding;
    const fade = settings.bannerFade;
    const vars = {};
    vars["height"] = `${height}px`;
    vars["note-offset"] = `${noteOffset}px`;
    vars["view-offset"] = `${viewOffset}px`;
    vars["radius"] = `${radius[0]}px ${radius[1]}px ${radius[2]}px ${radius[3]}px`;
    vars["padding"] = `${padding}px`;
    vars["mask"] = fade ? "revert-layer" /* RevertLayer */ : "initial" /* Initial */;
    vars["mask-webkit"] = fade ? "revert-layer" /* RevertLayer */ : "initial" /* Initial */;
    if (settings.iconEnabled) {
      const iconSize = settings.iconSize;
      const iconRadius = settings.iconRadius;
      const iconBackground = settings.iconBackground;
      const iconBorder = settings.iconBorder;
      const iconAlignment = settings.iconAlignment;
      const iconOffset = settings.iconOffset;
      vars["icon-size-w"] = `${iconSize}px`;
      vars["icon-size-h"] = `${iconSize}px`;
      vars["icon-radius"] = `${iconRadius}px`;
      vars["icon-align-h"] = iconAlignment[0];
      vars["icon-align-v"] = iconAlignment[1];
      vars["icon-offset-x"] = `${iconOffset[0]}px`;
      vars["icon-offset-y"] = `${iconOffset[1]}px`;
      vars["icon-border"] = `${iconBorder}px`;
      vars["icon-background"] = iconBackground ? "revert-layer" /* RevertLayer */ : "transparent" /* Transparent */;
    }
    if (settings.datetimeEnabled) {
      const dtAlignment = settings.datetimeAlignment;
      const dtOffset = settings.datetimeOffset;
      vars["dt-align-h"] = dtAlignment[0];
      vars["dt-align-v"] = dtAlignment[1];
      vars["dt-offset-x"] = `${dtOffset[0]}px`;
      vars["dt-offset-y"] = `${dtOffset[1]}px`;
    }
    DomUtils.setCSSVariables(vars);
    if (this.settings.properties.autohide) {
      document.body.classList.add("sb-autohide" /* Autohide */);
    } else {
      document.body.classList.remove("sb-autohide" /* Autohide */);
    }
    this.processAll();
  }
  //----------------------------------
  // Event Handlers
  //----------------------------------
  handleWindowOpen() {
    const val = setInterval(() => {
      const view = this.getActiveView();
      if (view) {
        clearInterval(val);
        this.handleLayoutChange();
      }
    }, 100);
  }
  handleLayoutChange() {
    const view = this.getActiveView();
    if (view) {
      this.updateMetaDOM();
      if (!Store.exists(view == null ? void 0 : view.leaf.id)) {
        this.process(view.file, view);
      }
    } else {
      Store.delete(this.getMostRecentLeafId());
    }
    this.featDatetime.check();
  }
  handleFileOpen(file) {
    const view = this.getActiveView();
    if (view instanceof import_obsidian5.MarkdownView) {
      this.process(file, view);
      this.updateMetaDOM();
    }
  }
  handleMetaChange(file) {
    this.app.workspace.iterateRootLeaves((leaf) => {
      const view = leaf.view;
      if (view.file === file) {
        this.process(file, view);
      }
    });
  }
  //----------------------------------
  // Helper Methods
  //----------------------------------
  updateMetaDOM(reset = false) {
    if (this.settings.properties.autohide) {
      const inlines = document.querySelectorAll(".workspace-leaf-content[data-sb] .inline-title");
      const metas = document.querySelectorAll(".workspace-leaf-content[data-sb] .metadata-container");
      if (inlines.length > 0 && metas.length > 0) {
        inlines.forEach((inline, idx) => {
          const el = metas[idx];
          if (el) {
            if (reset) {
              inline.after(metas[idx]);
            } else {
              inline.before(metas[idx]);
            }
          }
        });
      }
    }
  }
  getActiveView() {
    return this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView) || null;
  }
  getMostRecentLeafId() {
    const leaf = this.app.workspace.getMostRecentLeaf();
    return leaf.id;
  }
  createDefaultBannerData(view, lastViewMode) {
    let viewMode = null;
    if (view) {
      viewMode = (view.getMode() || null) === "preview" /* Reading */ ? "preview" /* Reading */ : "source" /* Source */;
    }
    return {
      filepath: null,
      image: null,
      icon: null,
      datetime: null,
      viewMode,
      lastViewMode: lastViewMode || null,
      isImagePropsUpdate: false,
      isImageChange: false,
      needsUpdate: false,
      view
    };
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiLCAiLi4vc3JjL3NldHRpbmdzL3NldHRpbmdzLnRzIiwgIi4uL3NyYy9zZXR0aW5ncy9taWdyYXRvci50cyIsICIuLi9zcmMvZGF0YS9zdG9yZS50cyIsICIuLi9zcmMvdXRpbHMvZG9tdXRpbHMudHMiLCAiLi4vc3JjL3V0aWxzL3BhcnNlLnRzIiwgIi4uL3NyYy9mZWF0dXJlL2Jhc2UudHMiLCAiLi4vc3JjL2ZlYXR1cmUvYmFubmVyLnRzIiwgIi4uL3NyYy9mZWF0dXJlL2ljb24udHMiLCAiLi4vc3JjL2ZlYXR1cmUvZGF0ZXRpbWUudHMiLCAiLi4vc3JjL2ZlYXR1cmUvaW50ZXJvcC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTWFya2Rvd25WaWV3LCBQbHVnaW4sIFRGaWxlLCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgQmFubmVyRGF0YSwgRGV2aWNlU2V0dGluZ3MsIFByb3BlcnR5U2V0dGluZ3MsIFNpbXBsZUJhbm5lclNldHRpbmdzIH0gZnJvbSAnLi90eXBlcy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENTU0NsYXNzZXMsIENTU1ZhbHVlLCBWaWV3TW9kZSB9IGZyb20gJy4vdHlwZXMvZW51bXMnO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3Mvc2V0dGluZ3MnO1xuaW1wb3J0IFNldHRpbmdzTWlncmF0b3IgZnJvbSAnLi9zZXR0aW5ncy9taWdyYXRvcic7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9kYXRhL3N0b3JlJztcbmltcG9ydCBEb21VdGlscyBmcm9tICcuL3V0aWxzL2RvbXV0aWxzJztcbmltcG9ydCBQYXJzZSBmcm9tICcuL3V0aWxzL3BhcnNlJztcbmltcG9ydCBCYW5uZXIgZnJvbSAnLi9mZWF0dXJlL2Jhbm5lcic7XG5pbXBvcnQgSWNvbiBmcm9tICcuL2ZlYXR1cmUvaWNvbic7XG5pbXBvcnQgRGF0ZXRpbWUgZnJvbSAnLi9mZWF0dXJlL2RhdGV0aW1lJztcbmltcG9ydCBQbHVnaW5JbnRlck9wIGZyb20gJy4vZmVhdHVyZS9pbnRlcm9wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlQmFubmVyIGV4dGVuZHMgUGx1Z2luIHtcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly9cblx0Ly8gIFZhcmlhYmxlc1xuXHQvL1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRwdWJsaWMgc2V0dGluZ3M6IFNpbXBsZUJhbm5lclNldHRpbmdzO1xuXHRwdWJsaWMgc2V0dGluZ1Byb3BlcnRpZXM6IFByb3BlcnR5U2V0dGluZ3M7XG5cdHByb3RlY3RlZCBkZXZpY2VTZXR0aW5nczogRGV2aWNlU2V0dGluZ3M7XG5cdHByb3RlY3RlZCBmZWF0QmFubmVyOiBCYW5uZXI7XG5cdHByb3RlY3RlZCBmZWF0SWNvbjogSWNvbjtcblx0cHJvdGVjdGVkIGZlYXREYXRldGltZTogRGF0ZXRpbWU7XG5cdHByb3RlY3RlZCBmZWF0UGx1Z2luSW50ZXJvcDogUGx1Z2luSW50ZXJPcDtcblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvL1xuXHQvLyAgUGx1Z2luIExpZmVjeWNsZVxuXHQvL1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0Y29uc3QgYXBwID0gdGhpcy5hcHA7XG5cdFx0Y29uc3Qgd29ya3NwYWNlID0gYXBwLndvcmtzcGFjZTtcblxuXHRcdFBhcnNlLmluaXQodGhpcyk7XG5cdFx0RG9tVXRpbHMuaW5pdCh0aGlzKTtcblxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5ncyhhcHAsIHRoaXMpKTtcblxuXHRcdHRoaXMuZmVhdEJhbm5lciA9IG5ldyBCYW5uZXIodGhpcywgdGhpcy5kZXZpY2VTZXR0aW5ncyk7XG5cdFx0dGhpcy5mZWF0SWNvbiA9IG5ldyBJY29uKHRoaXMsIHRoaXMuZGV2aWNlU2V0dGluZ3MpO1xuXHRcdHRoaXMuZmVhdERhdGV0aW1lID0gbmV3IERhdGV0aW1lKHRoaXMsIHRoaXMuZGV2aWNlU2V0dGluZ3MpO1xuXHRcdHRoaXMuZmVhdFBsdWdpbkludGVyb3AgPSBuZXcgUGx1Z2luSW50ZXJPcCh0aGlzLCB0aGlzLmRldmljZVNldHRpbmdzKTtcblxuXHRcdHdvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcblx0XHRcdHRoaXMucmVnaXN0ZXJFdmVudCh3b3Jrc3BhY2Uub24oJ3dpbmRvdy1vcGVuJywgdGhpcy5oYW5kbGVXaW5kb3dPcGVuLmJpbmQodGhpcykpKTtcblx0XHRcdHRoaXMucmVnaXN0ZXJFdmVudCh3b3Jrc3BhY2Uub24oJ2xheW91dC1jaGFuZ2UnLCB0aGlzLmhhbmRsZUxheW91dENoYW5nZS5iaW5kKHRoaXMpKSk7XG5cdFx0XHR0aGlzLnJlZ2lzdGVyRXZlbnQod29ya3NwYWNlLm9uKCdmaWxlLW9wZW4nLCB0aGlzLmhhbmRsZUZpbGVPcGVuLmJpbmQodGhpcykpKTtcblx0XHRcdHRoaXMucmVnaXN0ZXJFdmVudChhcHAubWV0YWRhdGFDYWNoZS5vbignY2hhbmdlZCcsIHRoaXMuaGFuZGxlTWV0YUNoYW5nZS5iaW5kKHRoaXMpKSk7XG5cdFx0XHR0aGlzLmFwcGx5U2V0dGluZ3MoKTtcblx0XHR9KTtcblx0fVxuXG5cdG9udW5sb2FkKCkge1xuXHRcdGNvbnN0IHsgZmVhdEJhbm5lciwgZmVhdEljb24sIGZlYXREYXRldGltZSwgZmVhdFBsdWdpbkludGVyb3AgfSA9IHRoaXM7XG5cdFx0ZmVhdEJhbm5lci5kZXN0cm95KCk7XG5cdFx0ZmVhdEljb24uZGVzdHJveSgpO1xuXHRcdGZlYXREYXRldGltZS5kZXN0cm95KCk7XG5cdFx0ZmVhdFBsdWdpbkludGVyb3AuZGVzdHJveSgpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly9cblx0Ly8gIE1ldGhvZHNcblx0Ly9cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cHJvY2Vzc0FsbCgpIHtcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZVJvb3RMZWF2ZXMoKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHtcblx0XHRcdGNvbnN0IHZpZXcgPSBsZWFmLnZpZXcgYXMgTWFya2Rvd25WaWV3O1xuXHRcdFx0aWYgKHZpZXcpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGV2aWNlU2V0dGluZ3MuYmFubmVyRW5hYmxlZCkge1xuXHRcdFx0XHRcdGNvbnN0IGZpbGUgPSB2aWV3Py5maWxlIHx8IG51bGw7XG5cdFx0XHRcdFx0dGhpcy5wcm9jZXNzKGZpbGUsIHZpZXcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIHByb2Nlc3MoZmlsZT86IFRGaWxlIHwgbnVsbCwgdmlldz86IE1hcmtkb3duVmlldykge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmNvbXB1dGUoZmlsZSwgdmlldyk7XG5cdFx0aWYgKCFkYXRhKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghZGF0YS5pbWFnZSkge1xuXHRcdFx0dGhpcy5yZW1vdmUoZGF0YSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghZGF0YS5pY29uKSB7XG5cdFx0XHRkYXRhLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZGV2aWNlU2V0dGluZ3MuYmFubmVyRW5hYmxlZCkge1xuXHRcdFx0dGhpcy5yZW5kZXIoZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgY29tcHV0ZShmaWxlPzogVEZpbGUgfCBudWxsLCB0YXJnZXRWaWV3PzogTWFya2Rvd25WaWV3KTogUHJvbWlzZTxCYW5uZXJEYXRhIHwgbnVsbD4ge1xuXHRcdGNvbnN0IHZpZXcgPSB0YXJnZXRWaWV3IHx8IHRoaXMuZ2V0QWN0aXZlVmlldygpO1xuXHRcdGlmIChmaWxlICYmIHZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpIHtcblx0XHRcdGNvbnN0IGRlZmF1bHREYXRhID0gdGhpcy5jcmVhdGVEZWZhdWx0QmFubmVyRGF0YSgpO1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Y29uc3Qgb2xkZGF0YTogQmFubmVyRGF0YSB8IG51bGwgPSBTdG9yZS5nZXQodmlldz8ubGVhZi5pZCkgfHwgZGVmYXVsdERhdGE7XG5cdFx0XHRjb25zdCBuZXdkYXRhID0gdGhpcy5jcmVhdGVEZWZhdWx0QmFubmVyRGF0YSh2aWV3LCBvbGRkYXRhLnZpZXdNb2RlKTtcblx0XHRcdGNvbnN0IGNhY2hlZE1ldGFkYXRhID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk7XG5cdFx0XHRjb25zdCBmcm9udG1hdHRlciA9IGNhY2hlZE1ldGFkYXRhPy5mcm9udG1hdHRlcjtcblxuXHRcdFx0aWYgKGZyb250bWF0dGVyKSB7XG5cdFx0XHRcdGNvbnN0IHNldHRpbmdQcm9wcyA9IHRoaXMuc2V0dGluZ1Byb3BlcnRpZXM7XG5cdFx0XHRcdGNvbnN0IGltYWdlUHJvcCA9IHNldHRpbmdQcm9wcy5pbWFnZTtcblx0XHRcdFx0Y29uc3QgaWNvblByb3AgPSBzZXR0aW5nUHJvcHMuaWNvbjtcblx0XHRcdFx0Y29uc3QgZGF0ZXRpbWVQcm9wID0gc2V0dGluZ1Byb3BzLmRhdGV0aW1lO1xuXG5cdFx0XHRcdC8vIHBhcnNlIGZvciBpbWFnZSBwcm9wZXJ0eVxuXHRcdFx0XHRpZiAoZnJvbnRtYXR0ZXJbaW1hZ2VQcm9wXSkge1xuXHRcdFx0XHRcdG5ld2RhdGEuaW1hZ2UgPSBmcm9udG1hdHRlcltpbWFnZVByb3BdO1xuXHRcdFx0XHRcdG5ld2RhdGEuZmlsZXBhdGggPSBmaWxlLnBhdGg7XG5cdFx0XHRcdFx0aWYgKG9sZGRhdGEuZmlsZXBhdGggIT09IG5ld2RhdGEuZmlsZXBhdGgpIHtcblx0XHRcdFx0XHRcdG5ld2RhdGEubmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0bmV3ZGF0YS5pc0ltYWdlQ2hhbmdlID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9sZGRhdGEuaW1hZ2UgIT09IG5ld2RhdGEuaW1hZ2UpIHtcblx0XHRcdFx0XHRcdG5ld2RhdGEubmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0bmV3ZGF0YS5pc0ltYWdlQ2hhbmdlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmIChhd2FpdCBQYXJzZS5pc0ltYWdlUHJvcGVydGllc1VwZGF0ZShvbGRkYXRhLmltYWdlLCBuZXdkYXRhLmltYWdlLCB2aWV3KSkge1xuXHRcdFx0XHRcdFx0XHRuZXdkYXRhLmlzSW1hZ2VQcm9wc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdG5ld2RhdGEuaXNJbWFnZUNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHBhcnNlIGZvciBpY29uIHByb3BlcnR5IGlmIGVuYWJsZWRcblx0XHRcdFx0aWYgKHRoaXMuZGV2aWNlU2V0dGluZ3MuaWNvbkVuYWJsZWQpIHtcblx0XHRcdFx0XHRpZiAoZnJvbnRtYXR0ZXJbaWNvblByb3BdKSB7XG5cdFx0XHRcdFx0XHRuZXdkYXRhLmljb24gPSBmcm9udG1hdHRlcltpY29uUHJvcF07XG5cdFx0XHRcdFx0XHRuZXdkYXRhLmZpbGVwYXRoID0gZmlsZS5wYXRoO1xuXHRcdFx0XHRcdFx0aWYgKG9sZGRhdGEuaWNvbiAhPT0gbmV3ZGF0YS5pY29uKSB7XG5cdFx0XHRcdFx0XHRcdG5ld2RhdGEubmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob2xkZGF0YS5pY29uKSB7XG5cdFx0XHRcdFx0XHRuZXdkYXRhLmljb24gPSBudWxsO1xuXHRcdFx0XHRcdFx0bmV3ZGF0YS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gcGFyc2UgZm9yIGRhdGV0aW1lIHByb3BlcnR5IGlmIGVuYWJsZWRcblx0XHRcdFx0aWYgKHRoaXMuZGV2aWNlU2V0dGluZ3MuZGF0ZXRpbWVFbmFibGVkKSB7XG5cdFx0XHRcdFx0aWYgKGZyb250bWF0dGVyW2RhdGV0aW1lUHJvcF0pIHtcblx0XHRcdFx0XHRcdG5ld2RhdGEuZGF0ZXRpbWUgPSBmcm9udG1hdHRlcltkYXRldGltZVByb3BdO1xuXHRcdFx0XHRcdFx0bmV3ZGF0YS5maWxlcGF0aCA9IGZpbGUucGF0aDtcblx0XHRcdFx0XHRcdGlmIChvbGRkYXRhLmRhdGV0aW1lICE9PSBuZXdkYXRhLmRhdGV0aW1lKSB7XG5cdFx0XHRcdFx0XHRcdG5ld2RhdGEubmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob2xkZGF0YS5kYXRldGltZSkge1xuXHRcdFx0XHRcdFx0bmV3ZGF0YS5kYXRldGltZSA9IG51bGw7XG5cdFx0XHRcdFx0XHRuZXdkYXRhLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdkYXRhO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFzeW5jIHJlbmRlcihkYXRhOiBCYW5uZXJEYXRhKSB7XG5cdFx0Y29uc3QgeyBpbWFnZSwgdmlld01vZGUsIGxhc3RWaWV3TW9kZSwgdmlldywgbmVlZHNVcGRhdGUsIGlzSW1hZ2VDaGFuZ2UgfSA9IGRhdGE7XG5cdFx0Y29uc3QgY29udGFpbmVyID0gdmlldz8uY29udGFpbmVyRWw7XG5cdFx0aWYgKGNvbnRhaW5lciAmJiAobGFzdFZpZXdNb2RlICE9PSB2aWV3TW9kZSB8fCBuZWVkc1VwZGF0ZSkpIHtcblx0XHRcdGNvbnN0IGNvbnRhaW5lcnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNtLXNjcm9sbGVyLCAubWFya2Rvd24tcmVhZGluZy12aWV3ID4gLm1hcmtkb3duLXByZXZpZXctdmlldycpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXHRcdFx0Y29uc3QgaW1hZ2VPcHRpb25zID0gYXdhaXQgUGFyc2UubGluayhpbWFnZSB8fCAnJywgdmlldyk7XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdGZlYXRCYW5uZXIsXG5cdFx0XHRcdGZlYXRJY29uLFxuXHRcdFx0XHRmZWF0RGF0ZXRpbWUsXG5cdFx0XHRcdGZlYXRQbHVnaW5JbnRlcm9wLFxuXHRcdFx0fSA9IHRoaXM7XG5cblx0XHRcdGNvbnN0IGJhbm5lcnMgPSBmZWF0QmFubmVyLnVwZGF0ZShkYXRhLCBpbWFnZU9wdGlvbnMsIGNvbnRhaW5lcnMpO1xuXHRcdFx0ZmVhdEljb24udXBkYXRlKGRhdGEsIGJhbm5lcnMpO1xuXHRcdFx0ZmVhdERhdGV0aW1lLnVwZGF0ZShkYXRhLCBiYW5uZXJzKTtcblx0XHRcdGZlYXRQbHVnaW5JbnRlcm9wLnVwZGF0ZShkYXRhLCBiYW5uZXJzKTtcblxuXHRcdFx0aWYgKCFpc0ltYWdlQ2hhbmdlKSB7XG5cdFx0XHRcdGZlYXRCYW5uZXIucmVwbGFjZShiYW5uZXJzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZlYXRCYW5uZXIuaW5qZWN0KGJhbm5lcnMsIGNvbnRhaW5lcnMpO1xuXHRcdFx0fVxuXG5cdFx0XHRmZWF0RGF0ZXRpbWUuY2hlY2soKTtcblxuXHRcdFx0ZGF0YS5sYXN0Vmlld01vZGUgPSB2aWV3TW9kZTtcblx0XHRcdGNvbnRhaW5lci5kYXRhc2V0LnNiID0gJyc7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRTdG9yZS5zZXQodmlldz8ubGVhZi5pZCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlKGRhdGE/OiBCYW5uZXJEYXRhKSB7XG5cdFx0Y29uc3QgdmlldyA9IGRhdGE/LnZpZXcgfHwgdGhpcy5nZXRBY3RpdmVWaWV3KCk7XG5cdFx0aWYgKHZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpIHtcblx0XHRcdGNvbnN0IGNvbnRhaW5lciA9IHZpZXc/LmNvbnRhaW5lckVsO1xuXHRcdFx0aWYgKGNvbnRhaW5lcikge1xuXHRcdFx0XHRjb25zdCB0YXJnZXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0NTU0NsYXNzZXMuTWFpbn1gKTtcblx0XHRcdFx0dGFyZ2V0cy5mb3JFYWNoKCh0KSA9PiB7XG5cdFx0XHRcdFx0dC5yZW1vdmUoKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLnVwZGF0ZU1ldGFET00odHJ1ZSk7XG5cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRTdG9yZS5kZWxldGUodmlldz8ubGVhZi5pZCk7XG5cdFx0XHRcdGRlbGV0ZSBjb250YWluZXIuZGF0YXNldC5zYjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gU2V0dGluZ3MgTWV0aG9kc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XG5cdFx0Y29uc3QgbWVyZ2VkRGF0YSA9IFNldHRpbmdzLnByZXBhcmUoZGF0YSk7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IGF3YWl0IFNldHRpbmdzTWlncmF0b3IubWlncmF0ZShtZXJnZWREYXRhLCB0aGlzKTtcblx0XHR0aGlzLmRldmljZVNldHRpbmdzID0gdGhpcy5zZXR0aW5nc1tTZXR0aW5ncy5jdXJyZW50RGV2aWNlXTtcblx0XHR0aGlzLnNldHRpbmdQcm9wZXJ0aWVzID0gdGhpcy5zZXR0aW5ncy5wcm9wZXJ0aWVzO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdFx0dGhpcy5hcHBseVNldHRpbmdzKCk7XG5cdH1cblxuXHRhcHBseVNldHRpbmdzKCkge1xuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5kZXZpY2VTZXR0aW5ncztcblx0XHRjb25zdCBoZWlnaHQgPSBzZXR0aW5ncy5oZWlnaHQ7XG5cdFx0Y29uc3Qgbm90ZU9mZnNldCA9IHNldHRpbmdzLm5vdGVPZmZzZXQ7XG5cdFx0Y29uc3Qgdmlld09mZnNldCA9IHNldHRpbmdzLnZpZXdPZmZzZXQ7XG5cdFx0Y29uc3QgcmFkaXVzID0gc2V0dGluZ3MuYmFubmVyUmFkaXVzO1xuXHRcdGNvbnN0IHBhZGRpbmcgPSBzZXR0aW5ncy5iYW5uZXJQYWRkaW5nO1xuXHRcdGNvbnN0IGZhZGUgPSBzZXR0aW5ncy5iYW5uZXJGYWRlO1xuXHRcdGNvbnN0IHZhcnMgPSB7fSBhcyBhbnk7XG5cblx0XHR2YXJzWydoZWlnaHQnXSA9IGAke2hlaWdodH1weGA7XG5cdFx0dmFyc1snbm90ZS1vZmZzZXQnXSA9IGAke25vdGVPZmZzZXR9cHhgO1xuXHRcdHZhcnNbJ3ZpZXctb2Zmc2V0J10gPSBgJHt2aWV3T2Zmc2V0fXB4YDtcblx0XHR2YXJzWydyYWRpdXMnXSA9IGAke3JhZGl1c1swXX1weCAke3JhZGl1c1sxXX1weCAke3JhZGl1c1syXX1weCAke3JhZGl1c1szXX1weGA7XG5cdFx0dmFyc1sncGFkZGluZyddID0gYCR7cGFkZGluZ31weGA7XG5cdFx0dmFyc1snbWFzayddID0gKGZhZGUpID8gQ1NTVmFsdWUuUmV2ZXJ0TGF5ZXIgOiBDU1NWYWx1ZS5Jbml0aWFsO1xuXHRcdHZhcnNbJ21hc2std2Via2l0J10gPSAoZmFkZSkgPyBDU1NWYWx1ZS5SZXZlcnRMYXllciA6IENTU1ZhbHVlLkluaXRpYWw7XG5cblx0XHRpZiAoc2V0dGluZ3MuaWNvbkVuYWJsZWQpIHtcblx0XHRcdGNvbnN0IGljb25TaXplID0gc2V0dGluZ3MuaWNvblNpemU7XG5cdFx0XHRjb25zdCBpY29uUmFkaXVzID0gc2V0dGluZ3MuaWNvblJhZGl1cztcblx0XHRcdGNvbnN0IGljb25CYWNrZ3JvdW5kID0gc2V0dGluZ3MuaWNvbkJhY2tncm91bmQ7XG5cdFx0XHRjb25zdCBpY29uQm9yZGVyID0gc2V0dGluZ3MuaWNvbkJvcmRlcjtcblx0XHRcdGNvbnN0IGljb25BbGlnbm1lbnQgPSBzZXR0aW5ncy5pY29uQWxpZ25tZW50O1xuXHRcdFx0Y29uc3QgaWNvbk9mZnNldCA9IHNldHRpbmdzLmljb25PZmZzZXQ7XG5cblx0XHRcdHZhcnNbJ2ljb24tc2l6ZS13J10gPSBgJHtpY29uU2l6ZX1weGA7XG5cdFx0XHR2YXJzWydpY29uLXNpemUtaCddID0gYCR7aWNvblNpemV9cHhgO1xuXHRcdFx0dmFyc1snaWNvbi1yYWRpdXMnXSA9IGAke2ljb25SYWRpdXN9cHhgO1xuXHRcdFx0dmFyc1snaWNvbi1hbGlnbi1oJ10gPSBpY29uQWxpZ25tZW50WzBdO1xuXHRcdFx0dmFyc1snaWNvbi1hbGlnbi12J10gPSBpY29uQWxpZ25tZW50WzFdO1xuXHRcdFx0dmFyc1snaWNvbi1vZmZzZXQteCddID0gYCR7aWNvbk9mZnNldFswXX1weGA7XG5cdFx0XHR2YXJzWydpY29uLW9mZnNldC15J10gPSBgJHtpY29uT2Zmc2V0WzFdfXB4YDtcblx0XHRcdHZhcnNbJ2ljb24tYm9yZGVyJ10gPSBgJHtpY29uQm9yZGVyfXB4YDtcblx0XHRcdHZhcnNbJ2ljb24tYmFja2dyb3VuZCddID0gaWNvbkJhY2tncm91bmQgPyBDU1NWYWx1ZS5SZXZlcnRMYXllciA6IENTU1ZhbHVlLlRyYW5zcGFyZW50O1xuXHRcdH1cblxuXHRcdGlmIChzZXR0aW5ncy5kYXRldGltZUVuYWJsZWQpIHtcblx0XHRcdGNvbnN0IGR0QWxpZ25tZW50ID0gc2V0dGluZ3MuZGF0ZXRpbWVBbGlnbm1lbnQ7XG5cdFx0XHRjb25zdCBkdE9mZnNldCA9IHNldHRpbmdzLmRhdGV0aW1lT2Zmc2V0O1xuXHRcdFx0dmFyc1snZHQtYWxpZ24taCddID0gZHRBbGlnbm1lbnRbMF07XG5cdFx0XHR2YXJzWydkdC1hbGlnbi12J10gPSBkdEFsaWdubWVudFsxXTtcblx0XHRcdHZhcnNbJ2R0LW9mZnNldC14J10gPSBgJHtkdE9mZnNldFswXX1weGA7XG5cdFx0XHR2YXJzWydkdC1vZmZzZXQteSddID0gYCR7ZHRPZmZzZXRbMV19cHhgO1xuXHRcdH1cblxuXHRcdERvbVV0aWxzLnNldENTU1ZhcmlhYmxlcyh2YXJzKTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLnByb3BlcnRpZXMuYXV0b2hpZGUpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChDU1NDbGFzc2VzLkF1dG9oaWRlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKENTU0NsYXNzZXMuQXV0b2hpZGUpO1xuXHRcdH1cblxuXHRcdHRoaXMucHJvY2Vzc0FsbCgpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEV2ZW50IEhhbmRsZXJzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRoYW5kbGVXaW5kb3dPcGVuKCkge1xuXHRcdGNvbnN0IHZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGNvbnN0IHZpZXcgPSB0aGlzLmdldEFjdGl2ZVZpZXcoKTtcblx0XHRcdGlmICh2aWV3KSB7XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodmFsKTtcblx0XHRcdFx0dGhpcy5oYW5kbGVMYXlvdXRDaGFuZ2UoKTtcblx0XHRcdH1cblx0XHR9LCAxMDApO1xuXHR9XG5cblx0aGFuZGxlTGF5b3V0Q2hhbmdlKCkge1xuXHRcdGNvbnN0IHZpZXcgPSB0aGlzLmdldEFjdGl2ZVZpZXcoKTtcblx0XHRpZiAodmlldykge1xuXHRcdFx0dGhpcy51cGRhdGVNZXRhRE9NKClcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGlmICghU3RvcmUuZXhpc3RzKHZpZXc/LmxlYWYuaWQpKSB7XG5cdFx0XHRcdHRoaXMucHJvY2Vzcyh2aWV3LmZpbGUsIHZpZXcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRTdG9yZS5kZWxldGUodGhpcy5nZXRNb3N0UmVjZW50TGVhZklkKCkpO1xuXHRcdH1cblx0XHR0aGlzLmZlYXREYXRldGltZS5jaGVjaygpO1xuXHR9XG5cblx0aGFuZGxlRmlsZU9wZW4oZmlsZTogVEZpbGUpIHtcblx0XHRjb25zdCB2aWV3ID0gdGhpcy5nZXRBY3RpdmVWaWV3KCk7XG5cdFx0aWYgKHZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpIHtcblx0XHRcdHRoaXMucHJvY2VzcyhmaWxlLCB2aWV3KTtcblx0XHRcdHRoaXMudXBkYXRlTWV0YURPTSgpO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZU1ldGFDaGFuZ2UoZmlsZTogVEZpbGUpIHtcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZVJvb3RMZWF2ZXMoKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHtcblx0XHRcdGNvbnN0IHZpZXcgPSBsZWFmLnZpZXcgYXMgTWFya2Rvd25WaWV3O1xuXHRcdFx0aWYgKHZpZXcuZmlsZSA9PT0gZmlsZSkge1xuXHRcdFx0XHR0aGlzLnByb2Nlc3MoZmlsZSwgdmlldyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gSGVscGVyIE1ldGhvZHNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHVwZGF0ZU1ldGFET00ocmVzZXQgPSBmYWxzZSkge1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLnByb3BlcnRpZXMuYXV0b2hpZGUpIHtcblx0XHRcdGNvbnN0IGlubGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29ya3NwYWNlLWxlYWYtY29udGVudFtkYXRhLXNiXSAuaW5saW5lLXRpdGxlJyk7XG5cdFx0XHRjb25zdCBtZXRhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3Jrc3BhY2UtbGVhZi1jb250ZW50W2RhdGEtc2JdIC5tZXRhZGF0YS1jb250YWluZXInKTtcblx0XHRcdGlmIChpbmxpbmVzLmxlbmd0aCA+IDAgJiYgbWV0YXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRpbmxpbmVzLmZvckVhY2goKGlubGluZSwgaWR4KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgZWwgPSBtZXRhc1tpZHhdO1xuXHRcdFx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRcdFx0aWYgKHJlc2V0KSB7XG5cdFx0XHRcdFx0XHRcdGlubGluZS5hZnRlcihtZXRhc1tpZHhdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlubGluZS5iZWZvcmUobWV0YXNbaWR4XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldEFjdGl2ZVZpZXcoKTogTWFya2Rvd25WaWV3IHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldykgfHwgbnVsbDtcblx0fVxuXG5cdGdldE1vc3RSZWNlbnRMZWFmSWQoKTogc3RyaW5nIHwgbnVsbCB7XG5cdFx0Y29uc3QgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRNb3N0UmVjZW50TGVhZigpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gbGVhZi5pZDtcblx0fVxuXG5cdGNyZWF0ZURlZmF1bHRCYW5uZXJEYXRhKHZpZXc/OiBNYXJrZG93blZpZXcgfCBudWxsLCBsYXN0Vmlld01vZGU/OiBWaWV3TW9kZSB8IG51bGwpOiBCYW5uZXJEYXRhIHtcblx0XHRsZXQgdmlld01vZGUgPSBudWxsO1xuXHRcdGlmICh2aWV3KSB7XG5cdFx0XHR2aWV3TW9kZSA9ICgodmlldy5nZXRNb2RlKCkgfHwgbnVsbCkgPT09IFZpZXdNb2RlLlJlYWRpbmcpID8gVmlld01vZGUuUmVhZGluZyA6IFZpZXdNb2RlLlNvdXJjZTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVwYXRoOiBudWxsLFxuXHRcdFx0aW1hZ2U6IG51bGwsXG5cdFx0XHRpY29uOiBudWxsLFxuXHRcdFx0ZGF0ZXRpbWU6IG51bGwsXG5cdFx0XHR2aWV3TW9kZSxcblx0XHRcdGxhc3RWaWV3TW9kZTogbGFzdFZpZXdNb2RlIHx8IG51bGwsXG5cdFx0XHRpc0ltYWdlUHJvcHNVcGRhdGU6IGZhbHNlLFxuXHRcdFx0aXNJbWFnZUNoYW5nZTogZmFsc2UsXG5cdFx0XHRuZWVkc1VwZGF0ZTogZmFsc2UsXG5cdFx0XHR2aWV3LFxuXHRcdH1cblx0fVxufVxuIiwgImltcG9ydCB7IEFwcCwgUGxhdGZvcm0sIFBsdWdpblNldHRpbmdUYWIsIHNhbml0aXplSFRNTFRvRG9tLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IFNpbXBsZUJhbm5lciBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IERldmljZVR5cGUgfSBmcm9tICcuLi90eXBlcy9lbnVtcyc7XG5pbXBvcnQgeyBTZXR0aW5nQ29tcE9wdGlvbnMsIFNpbXBsZUJhbm5lclNldHRpbmdzIH0gZnJvbSAnLi4vdHlwZXMvaW50ZXJmYWNlcyc7XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFNpbXBsZUJhbm5lclNldHRpbmdzID0ge1xuXHRkZXNrdG9wOiB7XG5cdFx0YmFubmVyRW5hYmxlZDogdHJ1ZSxcblx0XHRoZWlnaHQ6IDI0MCxcblx0XHR2aWV3T2Zmc2V0OiAwLFxuXHRcdG5vdGVPZmZzZXQ6IC0zMixcblx0XHRiYW5uZXJSYWRpdXM6IFs4LCA4LCA4LCA4XSxcblx0XHRiYW5uZXJQYWRkaW5nOiA4LFxuXHRcdGJhbm5lckZhZGU6IHRydWUsXG5cblx0XHRpY29uRW5hYmxlZDogZmFsc2UsXG5cdFx0aWNvblNpemU6IDk2LFxuXHRcdGljb25SYWRpdXM6IDgsXG5cdFx0aWNvbkJhY2tncm91bmQ6IHRydWUsXG5cdFx0aWNvbkJvcmRlcjogMixcblx0XHRpY29uQWxpZ25tZW50OiBbJ2ZsZXgtc3RhcnQnLCAnZmxleC1lbmQnXSxcblx0XHRpY29uT2Zmc2V0OiBbMCwgLTI0XSxcblxuXHRcdGRhdGV0aW1lRW5hYmxlZDogZmFsc2UsXG5cdFx0ZGF0ZXRpbWVPblByb3BPbmx5OiBmYWxzZSxcblx0XHRkYXRldGltZUFsaWdubWVudDogWydmbGV4LWVuZCcsICdmbGV4LXN0YXJ0J10sXG5cdFx0ZGF0ZXRpbWVPZmZzZXQ6IFswLCAwXSxcblx0XHRkYXRldGltZVRpbWVGb3JtYXQ6ICdISDptbScsXG5cdFx0ZGF0ZXRpbWVEYXRlRm9ybWF0OiAnZGRkZCwgTU1NTSBEbyBZWVlZJyxcblxuXHRcdGludGVyb3A6IHtcblx0XHR9LFxuXHR9LFxuXG5cdHRhYmxldDoge1xuXHRcdGJhbm5lckVuYWJsZWQ6IHRydWUsXG5cdFx0aGVpZ2h0OiAxOTAsXG5cdFx0dmlld09mZnNldDogMCxcblx0XHRub3RlT2Zmc2V0OiAtMzIsXG5cdFx0YmFubmVyUmFkaXVzOiBbOCwgOCwgOCwgOF0sXG5cdFx0YmFubmVyUGFkZGluZzogOCxcblx0XHRiYW5uZXJGYWRlOiB0cnVlLFxuXG5cdFx0aWNvbkVuYWJsZWQ6IGZhbHNlLFxuXHRcdGljb25TaXplOiA5Nixcblx0XHRpY29uUmFkaXVzOiA4LFxuXHRcdGljb25CYWNrZ3JvdW5kOiB0cnVlLFxuXHRcdGljb25Cb3JkZXI6IDIsXG5cdFx0aWNvbkFsaWdubWVudDogWydmbGV4LXN0YXJ0JywgJ2ZsZXgtZW5kJ10sXG5cdFx0aWNvbk9mZnNldDogWzAsIC0yNF0sXG5cblx0XHRkYXRldGltZUVuYWJsZWQ6IGZhbHNlLFxuXHRcdGRhdGV0aW1lT25Qcm9wT25seTogZmFsc2UsXG5cdFx0ZGF0ZXRpbWVBbGlnbm1lbnQ6IFsnZmxleC1lbmQnLCAnZmxleC1zdGFydCddLFxuXHRcdGRhdGV0aW1lT2Zmc2V0OiBbMCwgMF0sXG5cdFx0ZGF0ZXRpbWVUaW1lRm9ybWF0OiAnSEg6bW0nLFxuXHRcdGRhdGV0aW1lRGF0ZUZvcm1hdDogJ2RkZGQsIE1NTU0gRG8gWVlZWScsXG5cblx0XHRpbnRlcm9wOiB7XG5cdFx0fSxcblx0fSxcblxuXHRwaG9uZToge1xuXHRcdGJhbm5lckVuYWJsZWQ6IHRydWUsXG5cdFx0aGVpZ2h0OiAxNjAsXG5cdFx0dmlld09mZnNldDogMCxcblx0XHRub3RlT2Zmc2V0OiAtMzIsXG5cdFx0YmFubmVyUmFkaXVzOiBbOCwgOCwgOCwgOF0sXG5cdFx0YmFubmVyUGFkZGluZzogOCxcblx0XHRiYW5uZXJGYWRlOiB0cnVlLFxuXG5cdFx0aWNvbkVuYWJsZWQ6IGZhbHNlLFxuXHRcdGljb25TaXplOiA1Nixcblx0XHRpY29uUmFkaXVzOiA4LFxuXHRcdGljb25CYWNrZ3JvdW5kOiB0cnVlLFxuXHRcdGljb25Cb3JkZXI6IDIsXG5cdFx0aWNvbkFsaWdubWVudDogWydmbGV4LXN0YXJ0JywgJ2ZsZXgtZW5kJ10sXG5cdFx0aWNvbk9mZnNldDogWzAsIC0yNF0sXG5cblx0XHRkYXRldGltZUVuYWJsZWQ6IGZhbHNlLFxuXHRcdGRhdGV0aW1lT25Qcm9wT25seTogZmFsc2UsXG5cdFx0ZGF0ZXRpbWVBbGlnbm1lbnQ6IFsnZmxleC1lbmQnLCAnZmxleC1zdGFydCddLFxuXHRcdGRhdGV0aW1lT2Zmc2V0OiBbMCwgMF0sXG5cdFx0ZGF0ZXRpbWVUaW1lRm9ybWF0OiAnSEg6bW0nLFxuXHRcdGRhdGV0aW1lRGF0ZUZvcm1hdDogJ2RkZGQsIE1NTU0gRG8gWVlZWScsXG5cblx0XHRpbnRlcm9wOiB7XG5cdFx0fSxcblx0fSxcblxuXHRwcm9wZXJ0aWVzOiB7XG5cdFx0YXV0b2hpZGU6IHRydWUsXG5cdFx0aW1hZ2U6ICdiYW5uZXInLFxuXHRcdGljb246ICdpY29uJyxcblx0XHRkYXRldGltZTogJ2RhdGV0aW1lJyxcblx0fSxcbn1cbmNvbnN0IElDT05fUkVTRVQgPSAncm90YXRlLWNjdyc7XG5jb25zdCBURVhUX1JFU0VUID0gJ1Jlc3RvcmUgZGVmYXVsdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc2V0dGluZ3MgdGFiIGZvciBjb25maWd1cmluZyB0aGUgU2ltcGxlQmFubmVyIHBsdWdpbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogU2ltcGxlQmFubmVyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFNpbXBsZUJhbm5lcikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudERldmljZSgpOiBEZXZpY2VUeXBlIHtcblx0XHRpZiAoUGxhdGZvcm0uaXNQaG9uZSkge1xuXHRcdFx0cmV0dXJuIERldmljZVR5cGUuUGhvbmU7XG5cdFx0fVxuXHRcdGlmIChQbGF0Zm9ybS5pc1RhYmxldCkge1xuXHRcdFx0cmV0dXJuIERldmljZVR5cGUuVGFibGV0O1xuXHRcdH1cblx0XHRyZXR1cm4gRGV2aWNlVHlwZS5EZXNrdG9wO1xuXHR9XG5cblx0c3RhdGljIHByZXBhcmUoZGF0YTogYW55KTogU2ltcGxlQmFubmVyU2V0dGluZ3Mge1xuXHRcdGNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KSA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqKTtcblx0XHRjb25zdCBtZXJnZWQ6IFNpbXBsZUJhbm5lclNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTIH07XG5cblx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGFWYWx1ZSA9IGRhdGFba2V5XTtcblx0XHRcdFx0aWYgKGlzT2JqZWN0KGRhdGFWYWx1ZSkgJiYgbWVyZ2VkLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QobWVyZ2VkW2tleV0pKSB7XG5cdFx0XHRcdFx0bWVyZ2VkW2tleV0gPSB7IC4uLm1lcmdlZFtrZXldLCAuLi5kYXRhVmFsdWUgfTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZXJnZWRba2V5XSA9IGRhdGFWYWx1ZSBhcyBhbnk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1lcmdlZDtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Y29uc3QgY3VycmVudERldmljZSA9IFNldHRpbmdzLmN1cnJlbnREZXZpY2U7XG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnBsdWdpbi5zZXR0aW5nc1tjdXJyZW50RGV2aWNlXTtcblxuXHRcdHRoaXMuY3JlYXRlQmFubmVyU2V0dGluZ3MoKTtcblx0XHRpZiAoc2V0dGluZ3MuYmFubmVyRW5hYmxlZCkge1xuXHRcdFx0dGhpcy5jcmVhdGVGcm9udG1hdHRlclNldHRpbmdzKCk7XG5cdFx0XHR0aGlzLmNyZWF0ZUljb25TZXR0aW5ncygpO1xuXHRcdFx0dGhpcy5jcmVhdGVEYXRldGltZVNldHRpbmdzKCk7XG5cdFx0XHQvLyB0aGlzLmNyZWF0ZUludGVyb3BTZXR0aW5ncygpO1xuXHRcdH1cblx0fVxuXG5cdGNyZWF0ZUJhbm5lclNldHRpbmdzKCkge1xuXHRcdGNvbnN0IGN1cnJlbnREZXZpY2UgPSBTZXR0aW5ncy5jdXJyZW50RGV2aWNlO1xuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3NbY3VycmVudERldmljZV07XG5cdFx0Y29uc3QgZGVmYXVsdFNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HU1tjdXJyZW50RGV2aWNlXTtcblxuXHRcdHRoaXMuYWRkVG9nZ2xlKHtcblx0XHRcdHRpdGxlOiAnU2hvdyBzaW1wbGUgYmFubmVyJyxcblx0XHRcdGRlc2NyaXB0aW9uOiBgRW5hYmxlIG9yIGRpc2FibGUgU2ltcGxlIEJhbm5lciBvbiB5b3VyICR7Y3VycmVudERldmljZX0gZGV2aWNlLmAsXG5cdFx0XHRyZWZyZXNoT25VcGRhdGU6IHRydWUsXG5cdFx0fSwgc2V0dGluZ3MsICdiYW5uZXJFbmFibGVkJyk7XG5cblx0XHRpZiAoc2V0dGluZ3MuYmFubmVyRW5hYmxlZCkge1xuXHRcdFx0dGhpcy5hZGROdW1iZXIoe1xuXHRcdFx0XHR0aXRsZTogJ0hlaWdodCcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBgSGVpZ2h0IG9mIHRoZSBCYW5uZXIgb24geW91ciAke2N1cnJlbnREZXZpY2V9IGRldmljZSAoaW4gcGl4ZWxzKS5gLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0VudGVyIGEgbnVtYmVyJyxcblx0XHRcdFx0cmVzZXRWYWx1ZTogZGVmYXVsdFNldHRpbmdzLmhlaWdodCxcblx0XHRcdH0sIHNldHRpbmdzLCAnaGVpZ2h0Jyk7XG5cblx0XHRcdHRoaXMuYWRkTnVtYmVyKHtcblx0XHRcdFx0dGl0bGU6ICdQYWRkaW5nJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdQYWRkaW5nIG9mIHRoZSBiYW5uZXIgZnJvbSB0aGUgZWRnZXMgb2YgdGhlIG5vdGUgaW4gcGl4ZWxzLicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnRW50ZXIgYSBudW1iZXInLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuYmFubmVyUGFkZGluZyxcblx0XHRcdH0sIHNldHRpbmdzLCAnYmFubmVyUGFkZGluZycpO1xuXG5cdFx0XHR0aGlzLmFkZE51bWJlcih7XG5cdFx0XHRcdHRpdGxlOiAnTm90ZSBvZmZzZXQnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ01vdmUgdGhlIHBvc2l0aW9uIG9mIHRoZSBub3RlcyBjb250ZW50IGluIHBpeGVscy4nLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0VudGVyIGEgbnVtYmVyJyxcblx0XHRcdFx0cmVzZXRWYWx1ZTogZGVmYXVsdFNldHRpbmdzLm5vdGVPZmZzZXQsXG5cdFx0XHR9LCBzZXR0aW5ncywgJ25vdGVPZmZzZXQnKTtcblxuXHRcdFx0dGhpcy5hZGROdW1iZXIoe1xuXHRcdFx0XHR0aXRsZTogJ1ZpZXcgb2Zmc2V0Jyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdNb3ZlIHRoZSBwb3NpdGlvbiBvZiB0aGUgdmlldyBjb250ZW50IGluIHBpeGVscy4nLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0VudGVyIGEgbnVtYmVyJyxcblx0XHRcdFx0cmVzZXRWYWx1ZTogZGVmYXVsdFNldHRpbmdzLnZpZXdPZmZzZXQsXG5cdFx0XHR9LCBzZXR0aW5ncywgJ3ZpZXdPZmZzZXQnKTtcblxuXG5cdFx0XHR0aGlzLmFkZE51bWJlcih7XG5cdFx0XHRcdHRpdGxlOiAnQm9yZGVyIHJhZGl1cycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnU2l6ZSBvZiB0aGUgYm9yZGVyIHJhZGl1cyBpbiBwaXhlbHMuJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICc4Jyxcblx0XHRcdFx0aXNWYWx1ZUFycmF5OiB0cnVlLFxuXHRcdFx0XHRsZW5ndGg6IDQsXG5cdFx0XHRcdHJlc2V0VmFsdWU6IGRlZmF1bHRTZXR0aW5ncy5iYW5uZXJSYWRpdXMsXG5cdFx0XHRcdGNsYXNzZXM6IFsnc2JzLWdyaWQtcmFkaXVzJ10sXG5cdFx0XHR9LCBzZXR0aW5ncywgJ2Jhbm5lclJhZGl1cycpO1xuXG5cdFx0XHR0aGlzLmFkZFRvZ2dsZSh7XG5cdFx0XHRcdHRpdGxlOiAnRmFkZScsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnRmFkZSB0aGUgaW1hZ2Ugb3V0IHRvd2FyZHMgdGhlIGNvbnRlbnQuJyxcblx0XHRcdFx0Y2xhc3NlczogWydzYnMtc3BhY2VyJ10sXG5cdFx0XHR9LCBzZXR0aW5ncywgJ2Jhbm5lckZhZGUnKTtcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVGcm9udG1hdHRlclNldHRpbmdzKCkge1xuXHRcdGNvbnN0IHBsdWdpbiA9IHRoaXMucGx1Z2luO1xuXHRcdGNvbnN0IHNldHRpbmdzID0gcGx1Z2luLnNldHRpbmdzO1xuXG5cdFx0dGhpcy5hZGRIZWFkaW5nKCdGcm9udG1hdHRlcicsIFsnc2JzLWhlYWRpbmcnXSk7XG5cdFx0dGhpcy5hZGRUb2dnbGUoe1xuXHRcdFx0dGl0bGU6ICdBdXRvaGlkZSBmcm9udG1hdHRlci9wcm9wZXJ0aWVzJyxcblx0XHRcdGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGVzIHRoZSBmcm9udG1hdHRlci9wcm9wZXJ0aWVzIGF1dG9oaWRlIGZlYXR1cmUuJyxcblx0XHR9LCBzZXR0aW5ncy5wcm9wZXJ0aWVzLCAnYXV0b2hpZGUnKTtcblxuXHRcdHRoaXMuYWRkVGV4dCh7XG5cdFx0XHR0aXRsZTogJ0Jhbm5lciBwcm9wZXJ0eScsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ05hbWUgb2YgdGhlIGJhbm5lciBwcm9wZXJ0eSB0aGlzIHBsdWdpbiB3aWxsIGxvb2sgZm9yIGluIHRoZSBmcm9udG1hdHRlci4nLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdEZWZhdWx0OiBiYW5uZXInLFxuXHRcdFx0cmVzZXRWYWx1ZTogREVGQVVMVF9TRVRUSU5HUy5wcm9wZXJ0aWVzLmltYWdlLFxuXHRcdH0sIHNldHRpbmdzLnByb3BlcnRpZXMsICdpbWFnZScpO1xuXG5cdFx0dGhpcy5hZGRUZXh0KHtcblx0XHRcdHRpdGxlOiAnSWNvbiBwcm9wZXJ0eScsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ05hbWUgb2YgdGhlIGljb24gcHJvcGVydHkgdGhpcyBwbHVnaW4gd2lsbCBsb29rIGZvciBpbiB0aGUgZnJvbnRtYXR0ZXIuJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAnRGVmYXVsdDogaWNvbicsXG5cdFx0XHRyZXNldFZhbHVlOiBERUZBVUxUX1NFVFRJTkdTLnByb3BlcnRpZXMuaWNvbixcblx0XHR9LCBzZXR0aW5ncy5wcm9wZXJ0aWVzLCAnaWNvbicpO1xuXG5cdFx0dGhpcy5hZGRUZXh0KHtcblx0XHRcdHRpdGxlOiAnRGF0ZXRpbWUgcHJvcGVydHknLFxuXHRcdFx0ZGVzY3JpcHRpb246ICdOYW1lIG9mIHRoZSBkYXRldGltZSBwcm9wZXJ0eSB0aGlzIHBsdWdpbiB3aWxsIGxvb2sgZm9yIGluIHRoZSBmcm9udG1hdHRlci4nLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdEZWZhdWx0OiBkYXRldGltZScsXG5cdFx0XHRyZXNldFZhbHVlOiBERUZBVUxUX1NFVFRJTkdTLnByb3BlcnRpZXMuZGF0ZXRpbWUsXG5cdFx0XHRjbGFzc2VzOiBbJ3Nicy1zcGFjZXInXSxcblx0XHR9LCBzZXR0aW5ncy5wcm9wZXJ0aWVzLCAnZGF0ZXRpbWUnKTtcblx0fVxuXG5cdGNyZWF0ZUljb25TZXR0aW5ncygpIHtcblx0XHRjb25zdCBjdXJyZW50RGV2aWNlID0gU2V0dGluZ3MuY3VycmVudERldmljZTtcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMucGx1Z2luLnNldHRpbmdzW2N1cnJlbnREZXZpY2VdO1xuXHRcdGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1NbY3VycmVudERldmljZV07XG5cblx0XHR0aGlzLmFkZEhlYWRpbmcoYEljb25gLCBbJ3Nicy1oZWFkaW5nJ10pO1xuXHRcdHRoaXMuYWRkVG9nZ2xlKHtcblx0XHRcdHRpdGxlOiAnU2hvdyBpY29uJyxcblx0XHRcdGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIGljb24uJyxcblx0XHRcdHJlZnJlc2hPblVwZGF0ZTogdHJ1ZSxcblx0XHR9LCBzZXR0aW5ncywgJ2ljb25FbmFibGVkJyk7XG5cblx0XHRpZiAoc2V0dGluZ3MuaWNvbkVuYWJsZWQpIHtcblx0XHRcdHRoaXMuYWRkTnVtYmVyKHtcblx0XHRcdFx0dGl0bGU6ICdJY29uIHNpemUnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1NpemUgb2YgdGhlIGljb24gaW4gcGl4ZWxzLicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnRW50ZXIgYSBudW1iZXInLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuaWNvblNpemUsXG5cdFx0XHR9LCBzZXR0aW5ncywgJ2ljb25TaXplJyk7XG5cblx0XHRcdHRoaXMuYWRkVG9nZ2xlKHtcblx0XHRcdFx0dGl0bGU6ICdJY29uIGJhY2tncm91bmQnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBpY29uIGJhY2tncm91bmQuJyxcblx0XHRcdH0sIHNldHRpbmdzLCAnaWNvbkJhY2tncm91bmQnKTtcblxuXHRcdFx0dGhpcy5hZGROdW1iZXIoe1xuXHRcdFx0XHR0aXRsZTogJ0JvcmRlciBzaXplJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdTaXplIG9mIHRoZSBib3JkZXIgaW4gcGl4ZWxzLicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnRW50ZXIgYSBudW1iZXInLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuaWNvbkJvcmRlcixcblx0XHRcdH0sIHNldHRpbmdzLCAnaWNvbkJvcmRlcicpO1xuXG5cdFx0XHR0aGlzLmFkZE51bWJlcih7XG5cdFx0XHRcdHRpdGxlOiAnQm9yZGVyIHJhZGl1cycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnU2l6ZSBvZiB0aGUgYm9yZGVyIHJhZGl1cyBpbiBwaXhlbHMuJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdFbnRlciBhIG51bWJlcicsXG5cdFx0XHRcdHJlc2V0VmFsdWU6IGRlZmF1bHRTZXR0aW5ncy5pY29uUmFkaXVzLFxuXHRcdFx0fSwgc2V0dGluZ3MsICdpY29uUmFkaXVzJyk7XG5cblx0XHRcdHRoaXMuYWRkRHJvcGRvd24oe1xuXHRcdFx0XHR0aXRsZTogJ0ljb24gYWxpZ25tZW50IC0gaG9yaXpvbnRhbCcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnSG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIGljb24uJyxcblx0XHRcdFx0Y2hvaWNlczogW1xuXHRcdFx0XHRcdHsgbGFiZWw6ICdMZWZ0JywgdmFsdWU6ICdmbGV4LXN0YXJ0JyB9LFxuXHRcdFx0XHRcdHsgbGFiZWw6ICdNaWRkbGUnLCB2YWx1ZTogJ2NlbnRlcicgfSxcblx0XHRcdFx0XHR7IGxhYmVsOiAnUmlnaHQnLCB2YWx1ZTogJ2ZsZXgtZW5kJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuaWNvbkFsaWdubWVudFswXSxcblx0XHRcdH0sIHNldHRpbmdzLCAnaWNvbkFsaWdubWVudCcsIDApO1xuXG5cdFx0XHR0aGlzLmFkZERyb3Bkb3duKHtcblx0XHRcdFx0dGl0bGU6ICdJY29uIGFsaWdubWVudCAtIHZlcnRpY2FsJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdWZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIGljb24uJyxcblx0XHRcdFx0Y2hvaWNlczogW1xuXHRcdFx0XHRcdHsgbGFiZWw6ICdUb3AnLCB2YWx1ZTogJ2ZsZXgtc3RhcnQnIH0sXG5cdFx0XHRcdFx0eyBsYWJlbDogJ01pZGRsZScsIHZhbHVlOiAnY2VudGVyJyB9LFxuXHRcdFx0XHRcdHsgbGFiZWw6ICdCb3R0b20nLCB2YWx1ZTogJ2ZsZXgtZW5kJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuaWNvbkFsaWdubWVudFsxXSxcblx0XHRcdH0sIHNldHRpbmdzLCAnaWNvbkFsaWdubWVudCcsIDEpO1xuXG5cdFx0XHR0aGlzLmFkZE51bWJlcih7XG5cdFx0XHRcdHRpdGxlOiAnSWNvbiBvZmZzZXQnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ09mZnNldCB0aGUgWCBhbmQgWSBwb3NpdGlvbiBvZiB0aGUgaWNvbiBpbiBwaXhlbHMnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJzAnLFxuXHRcdFx0XHRpc1ZhbHVlQXJyYXk6IHRydWUsXG5cdFx0XHRcdGxlbmd0aDogMixcblx0XHRcdFx0cmVzZXRWYWx1ZTogZGVmYXVsdFNldHRpbmdzLmljb25PZmZzZXQsXG5cdFx0XHRcdGNsYXNzZXM6IFsnc2JzLWdyaWQteHknLCAnc2JzLXNwYWNlciddLFxuXHRcdFx0fSwgc2V0dGluZ3MsICdpY29uT2Zmc2V0Jyk7XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlRGF0ZXRpbWVTZXR0aW5ncygpIHtcblx0XHRjb25zdCBjdXJyZW50RGV2aWNlID0gU2V0dGluZ3MuY3VycmVudERldmljZTtcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMucGx1Z2luLnNldHRpbmdzW2N1cnJlbnREZXZpY2VdO1xuXHRcdGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1NbY3VycmVudERldmljZV07XG5cblx0XHR0aGlzLmFkZEhlYWRpbmcoYERhdGV0aW1lYCwgWydzYnMtaGVhZGluZyddKTtcblx0XHR0aGlzLmFkZFRvZ2dsZSh7XG5cdFx0XHR0aXRsZTogJ1Nob3cgZGF0ZXRpbWUnLFxuXHRcdFx0ZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgZGlzcGxheSBvZiBhIGRhdGV0aW1lLicsXG5cdFx0XHRyZWZyZXNoT25VcGRhdGU6IHRydWUsXG5cdFx0fSwgc2V0dGluZ3MsICdkYXRldGltZUVuYWJsZWQnKTtcblxuXHRcdGlmIChzZXR0aW5ncy5kYXRldGltZUVuYWJsZWQpIHtcblx0XHRcdHRoaXMuYWRkVG9nZ2xlKHtcblx0XHRcdFx0dGl0bGU6ICdPbmx5IHdpdGggcHJvcGVydHknLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1Nob3cgZGF0ZXRpbWUgb25seSB3aGVuIGEgcHJvcGVydHkgaXMgc2V0IGluIHRoZSBub3RlJyxcblx0XHRcdH0sIHNldHRpbmdzLCAnZGF0ZXRpbWVPblByb3BPbmx5Jyk7XG5cblx0XHRcdHRoaXMuYWRkVGV4dCh7XG5cdFx0XHRcdHRpdGxlOiAnVGltZSBmb3JtYXR0aW5nJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHNhbml0aXplSFRNTFRvRG9tKCdEZWZpbmUgaG93IHRpbWUgc2hvdWxkIGJlIGRpc3BsYXllZC4gTGVhdmUgZW1wdHkgdG8gZGlzYWJsZS48YnIvPk9ic2lkaWFuIHVzZXMgbW9tZW50LmpzIGZvciBmb3JtYXR0aW5nLiA8YSBocmVmPVwiaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1wiIHRhcmdldD1cIl9ibGFua1wiPkxlYXJuIG1vcmU8L2E+JyksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnRGVmYXVsdDogSEg6bW06c3MnLFxuXHRcdFx0XHRhbGxvd0VtcHR5OiB0cnVlLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuZGF0ZXRpbWVUaW1lRm9ybWF0LFxuXHRcdFx0fSwgc2V0dGluZ3MsICdkYXRldGltZVRpbWVGb3JtYXQnKTtcblxuXHRcdFx0dGhpcy5hZGRUZXh0KHtcblx0XHRcdFx0dGl0bGU6ICdEYXRlIGZvcm1hdHRpbmcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogc2FuaXRpemVIVE1MVG9Eb20oJ0RlZmluZSBob3cgdGhlIGRhdGUgc2hvdWxkIGJlIGRpc3BsYXllZC4gTGVhdmUgZW1wdHkgdG8gZGlzYWJsZS48YnIvPk9ic2lkaWFuIHVzZXMgbW9tZW50LmpzIGZvciBmb3JtYXR0aW5nLiA8YSBocmVmPVwiaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1wiIHRhcmdldD1cIl9ibGFua1wiPkxlYXJuIG1vcmU8L2E+JyksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnRGVmYXVsdDogZGRkZCwgTU1NTSBEbyBZWVlZJyxcblx0XHRcdFx0YWxsb3dFbXB0eTogdHJ1ZSxcblx0XHRcdFx0cmVzZXRWYWx1ZTogZGVmYXVsdFNldHRpbmdzLmRhdGV0aW1lRGF0ZUZvcm1hdCxcblx0XHRcdH0sIHNldHRpbmdzLCAnZGF0ZXRpbWVEYXRlRm9ybWF0Jyk7XG5cblx0XHRcdHRoaXMuYWRkRHJvcGRvd24oe1xuXHRcdFx0XHR0aXRsZTogJ0RhdGV0aW1lIGFsaWdubWVudCAtIGhvcml6b250YWwnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ0hvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSBkYXRldGltZS4nLFxuXHRcdFx0XHRjaG9pY2VzOiBbXG5cdFx0XHRcdFx0eyBsYWJlbDogJ0xlZnQnLCB2YWx1ZTogJ2ZsZXgtc3RhcnQnIH0sXG5cdFx0XHRcdFx0eyBsYWJlbDogJ01pZGRsZScsIHZhbHVlOiAnY2VudGVyJyB9LFxuXHRcdFx0XHRcdHsgbGFiZWw6ICdSaWdodCcsIHZhbHVlOiAnZmxleC1lbmQnIH0sXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGFsbG93RW1wdHk6IHRydWUsXG5cdFx0XHRcdHJlc2V0VmFsdWU6IGRlZmF1bHRTZXR0aW5ncy5kYXRldGltZUFsaWdubWVudFswXSxcblx0XHRcdH0sIHNldHRpbmdzLCAnZGF0ZXRpbWVBbGlnbm1lbnQnLCAwKTtcblxuXHRcdFx0dGhpcy5hZGREcm9wZG93bih7XG5cdFx0XHRcdHRpdGxlOiAnRGF0ZXRpbWUgYWxpZ25tZW50IC0gdmVydGljYWwnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1ZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGUgZGF0ZXRpbWUuJyxcblx0XHRcdFx0Y2hvaWNlczogW1xuXHRcdFx0XHRcdHsgbGFiZWw6ICdUb3AnLCB2YWx1ZTogJ2ZsZXgtc3RhcnQnIH0sXG5cdFx0XHRcdFx0eyBsYWJlbDogJ01pZGRsZScsIHZhbHVlOiAnY2VudGVyJyB9LFxuXHRcdFx0XHRcdHsgbGFiZWw6ICdCb3R0b20nLCB2YWx1ZTogJ2ZsZXgtZW5kJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRyZXNldFZhbHVlOiBkZWZhdWx0U2V0dGluZ3MuZGF0ZXRpbWVBbGlnbm1lbnRbMV0sXG5cdFx0XHR9LCBzZXR0aW5ncywgJ2RhdGV0aW1lQWxpZ25tZW50JywgMSk7XG5cblx0XHRcdHRoaXMuYWRkTnVtYmVyKHtcblx0XHRcdFx0dGl0bGU6ICdEYXRldGltZSBvZmZzZXQnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ09mZnNldCB0aGUgWCBhbmQgWSBwb3NpdGlvbiBvZiB0aGUgZGF0ZXRpbWUgaW4gcGl4ZWxzJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICcwJyxcblx0XHRcdFx0aXNWYWx1ZUFycmF5OiB0cnVlLFxuXHRcdFx0XHRsZW5ndGg6IDIsXG5cdFx0XHRcdHJlc2V0VmFsdWU6IGRlZmF1bHRTZXR0aW5ncy5kYXRldGltZU9mZnNldCxcblx0XHRcdFx0Y2xhc3NlczogWydzYnMtZ3JpZC14eScsICdzYnMtc3BhY2VyJ10sXG5cdFx0XHR9LCBzZXR0aW5ncywgJ2RhdGV0aW1lT2Zmc2V0Jyk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0Y3JlYXRlSW50ZXJvcFNldHRpbmdzKCkge1xuXHRcdGNvbnN0IGN1cnJlbnREZXZpY2UgPSBTZXR0aW5ncy5jdXJyZW50RGV2aWNlO1xuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3NbY3VycmVudERldmljZV07XG5cdFx0Y29uc3QgZGVmYXVsdFNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HU1tjdXJyZW50RGV2aWNlXTtcblxuXHRcdHRoaXMuYWRkSGVhZGluZyhgUGx1Z2luIGludGVyb3BlcmFiaWxpdHlgLCBbJ3Nicy1oZWFkaW5nJ10pO1xuXHR9XG5cdCovXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEhlbHBlciBNZXRob2RzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRhZGRIZWFkaW5nKHRleHQ6IHN0cmluZywgY2xhc3Nlcz86IHN0cmluZ1tdKSB7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKS5zZXRIZWFkaW5nKCkuc2V0TmFtZSh0ZXh0KTtcblx0XHR0aGlzLnNldENsYXNzZXMoaW5zdGFuY2UsIGNsYXNzZXMpO1xuXHR9XG5cblx0YWRkVG9nZ2xlKG9wdGlvbnM6IFNldHRpbmdDb21wT3B0aW9ucywgb2JqOiBhbnksIHByb3A6IHN0cmluZykge1xuXHRcdGNvbnN0IGluc3RhbmNlID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbCk7XG5cdFx0aWYgKG9wdGlvbnMudGl0bGUpIHtcblx0XHRcdGluc3RhbmNlLnNldE5hbWUob3B0aW9ucy50aXRsZSk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRpbnN0YW5jZS5zZXREZXNjKG9wdGlvbnMuZGVzY3JpcHRpb24pO1xuXHRcdH1cblxuXHRcdHRoaXMuc2V0Q2xhc3NlcyhpbnN0YW5jZSwgb3B0aW9ucy5jbGFzc2VzKTtcblxuXHRcdGluc3RhbmNlLmFkZFRvZ2dsZShjb21wb25lbnQgPT4gY29tcG9uZW50XG5cdFx0XHQuc2V0VmFsdWUob2JqW3Byb3BdKVxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWx1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdGlmIChvcHRpb25zLnJlZnJlc2hPblVwZGF0ZSkge1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblxuXHRhZGREcm9wZG93bihvcHRpb25zOiBTZXR0aW5nQ29tcE9wdGlvbnMsIG9iajogYW55LCBwcm9wOiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKSB7XG5cdFx0Y29uc3QgaXNSZXNldHRhYmxlID0gb3B0aW9ucy5yZXNldFZhbHVlICE9PSB1bmRlZmluZWQ7XG5cdFx0Y29uc3QgcmVzZXRWYWx1ZSA9IG9wdGlvbnMucmVzZXRWYWx1ZTtcblx0XHRjb25zdCBpbnN0YW5jZSA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpO1xuXHRcdGNvbnN0IGhhc0luZGV4ID0gaW5kZXggIT09IHVuZGVmaW5lZDtcblxuXHRcdGlmIChvcHRpb25zLnRpdGxlKSB7XG5cdFx0XHRpbnN0YW5jZS5zZXROYW1lKG9wdGlvbnMudGl0bGUpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5kZXNjcmlwdGlvbikge1xuXHRcdFx0aW5zdGFuY2Uuc2V0RGVzYyhvcHRpb25zLmRlc2NyaXB0aW9uKTtcblx0XHR9XG5cblx0XHR0aGlzLnNldENsYXNzZXMoaW5zdGFuY2UsIG9wdGlvbnMuY2xhc3Nlcyk7XG5cblx0XHRpZiAoaXNSZXNldHRhYmxlKSB7XG5cdFx0XHRpbnN0YW5jZS5hZGRFeHRyYUJ1dHRvbihidXR0b24gPT4gYnV0dG9uXG5cdFx0XHRcdC5zZXRJY29uKElDT05fUkVTRVQpXG5cdFx0XHRcdC5zZXRUb29sdGlwKFRFWFRfUkVTRVQpXG5cdFx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAoaGFzSW5kZXgpIHtcblx0XHRcdFx0XHRcdG9ialtwcm9wXVtpbmRleF0gPSByZXNldFZhbHVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcF0gPSByZXNldFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0fSlcblx0XHRcdClcblx0XHR9XG5cblx0XHRpbnN0YW5jZS5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcblx0XHRcdGNvbnN0IGNob2ljZXMgPSBvcHRpb25zPy5jaG9pY2VzIHx8IFtdO1xuXHRcdFx0Y2hvaWNlcy5mb3JFYWNoKChjaG9pY2UpID0+IHtcblx0XHRcdFx0ZHJvcGRvd24uYWRkT3B0aW9uKGNob2ljZS52YWx1ZSwgY2hvaWNlLmxhYmVsKTtcblx0XHRcdH0pXG5cdFx0XHRpZiAoaGFzSW5kZXgpIHtcblx0XHRcdFx0ZHJvcGRvd24uc2V0VmFsdWUob2JqW3Byb3BdW2luZGV4XSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkcm9wZG93bi5zZXRWYWx1ZShvYmpbcHJvcF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRkcm9wZG93bi5vbkNoYW5nZShhc3luYyAodikgPT4ge1xuXHRcdFx0XHRpZiAoaGFzSW5kZXgpIHtcblx0XHRcdFx0XHRvYmpbcHJvcF1baW5kZXhdID0gdjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvYmpbcHJvcF0gPSB2O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0fSlcblx0XHRcdHJldHVybiBkcm9wZG93bjtcblx0XHR9KVxuXHR9XG5cblx0YWRkVGV4dChvcHRpb25zOiBTZXR0aW5nQ29tcE9wdGlvbnMsIG9iajogYW55LCBwcm9wOiBzdHJpbmcpIHtcblx0XHRjb25zdCBpc1Jlc2V0dGFibGUgPSBvcHRpb25zLnJlc2V0VmFsdWUgIT09IHVuZGVmaW5lZDtcblx0XHRjb25zdCByZXNldFZhbHVlID0gb3B0aW9ucy5yZXNldFZhbHVlO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbCk7XG5cblx0XHRpZiAob3B0aW9ucy50aXRsZSkge1xuXHRcdFx0aW5zdGFuY2Uuc2V0TmFtZShvcHRpb25zLnRpdGxlKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuZGVzY3JpcHRpb24pIHtcblx0XHRcdGluc3RhbmNlLnNldERlc2Mob3B0aW9ucy5kZXNjcmlwdGlvbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRDbGFzc2VzKGluc3RhbmNlLCBvcHRpb25zLmNsYXNzZXMpO1xuXG5cdFx0aWYgKGlzUmVzZXR0YWJsZSkge1xuXHRcdFx0aW5zdGFuY2UuYWRkRXh0cmFCdXR0b24oYnV0dG9uID0+IGJ1dHRvblxuXHRcdFx0XHQuc2V0SWNvbihJQ09OX1JFU0VUKVxuXHRcdFx0XHQuc2V0VG9vbHRpcChURVhUX1JFU0VUKVxuXHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0b2JqW3Byb3BdID0gcmVzZXRWYWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0fSlcblx0XHRcdClcblx0XHR9XG5cblx0XHRpbnN0YW5jZS5hZGRUZXh0KCh0ZXh0KSA9PiB7XG5cdFx0XHRpZiAob3B0aW9ucy5wbGFjZWhvbGRlcikge1xuXHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKG9wdGlvbnMucGxhY2Vob2xkZXIpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dC5zZXRWYWx1ZShvYmpbcHJvcF0udG9TdHJpbmcoKSlcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLmFsbG93RW1wdHkpIHtcblx0XHRcdFx0XHRcdG9ialtwcm9wXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcF0gPSAodmFsdWUgIT09ICcnKSA/IHZhbHVlIDogcmVzZXRWYWx1ZSB8fCAnJztcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5yZWZyZXNoT25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9KTtcblx0fVxuXG5cdGFkZE51bWJlcihvcHRpb25zOiBTZXR0aW5nQ29tcE9wdGlvbnMsIG9iajogYW55LCBwcm9wOiBzdHJpbmcpIHtcblx0XHRjb25zdCBhc0Zsb2F0ID0gb3B0aW9ucy5mbG9hdDtcblx0XHRjb25zdCBpc1Jlc2V0dGFibGUgPSBvcHRpb25zLnJlc2V0VmFsdWUgIT09IHVuZGVmaW5lZDtcblx0XHRjb25zdCByZXNldFZhbHVlID0gb3B0aW9ucy5yZXNldFZhbHVlO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbCk7XG5cblx0XHRpZiAob3B0aW9ucy50aXRsZSkge1xuXHRcdFx0aW5zdGFuY2Uuc2V0TmFtZShvcHRpb25zLnRpdGxlKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuZGVzY3JpcHRpb24pIHtcblx0XHRcdGluc3RhbmNlLnNldERlc2Mob3B0aW9ucy5kZXNjcmlwdGlvbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRDbGFzc2VzKGluc3RhbmNlLCBvcHRpb25zLmNsYXNzZXMpO1xuXG5cdFx0aWYgKGlzUmVzZXR0YWJsZSkge1xuXHRcdFx0aW5zdGFuY2UuYWRkRXh0cmFCdXR0b24oYnV0dG9uID0+IGJ1dHRvblxuXHRcdFx0XHQuc2V0SWNvbihJQ09OX1JFU0VUKVxuXHRcdFx0XHQuc2V0VG9vbHRpcChURVhUX1JFU0VUKVxuXHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0b2JqW3Byb3BdID0gKG9wdGlvbnMuaXNWYWx1ZUFycmF5KSA/IFsuLi5yZXNldFZhbHVlXSA6IHJlc2V0VmFsdWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMuaXNWYWx1ZUFycmF5ICYmIG9wdGlvbnMubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnN0IGhhc1BsYWNlaG9sZGVycyA9IG9wdGlvbnMucGxhY2Vob2xkZXJzICE9PSB1bmRlZmluZWQ7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aW5zdGFuY2UuYWRkVGV4dCgodGV4dCkgPT4ge1xuXHRcdFx0XHRcdGlmIChoYXNQbGFjZWhvbGRlcnMgJiYgb3B0aW9ucz8ucGxhY2Vob2xkZXJzKSB7XG5cdFx0XHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKG9wdGlvbnMucGxhY2Vob2xkZXJzW2ldIHx8ICcnKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIpIHtcblx0XHRcdFx0XHRcdHRleHQuc2V0UGxhY2Vob2xkZXIob3B0aW9ucy5wbGFjZWhvbGRlcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRleHQuc2V0VmFsdWUob2JqW3Byb3BdW2ldLnRvU3RyaW5nKCkpXG5cdFx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGxldCBudW0gPSAoYXNGbG9hdCkgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHBhcnNlSW50KHZhbHVlLCAxMCk7XG5cdFx0XHRcdFx0XHRcdGlmIChpc05hTihudW0pICYmIGlzUmVzZXR0YWJsZSkge1xuXHRcdFx0XHRcdFx0XHRcdG51bSA9IHJlc2V0VmFsdWVbaV0gfHwgMDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRvYmpbcHJvcF1baV0gPSBudW07XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5yZWZyZXNoT25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnN0YW5jZS5hZGRUZXh0KCh0ZXh0KSA9PiB7XG5cdFx0XHRcdGlmIChvcHRpb25zLnBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdFx0dGV4dC5zZXRQbGFjZWhvbGRlcihvcHRpb25zLnBsYWNlaG9sZGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0ZXh0LnNldFZhbHVlKG9ialtwcm9wXS50b1N0cmluZygpKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdGxldCBudW0gPSAoYXNGbG9hdCkgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHBhcnNlSW50KHZhbHVlLCAxMCk7XG5cdFx0XHRcdFx0XHRpZiAoaXNOYU4obnVtKSAmJiBpc1Jlc2V0dGFibGUpIHtcblx0XHRcdFx0XHRcdFx0bnVtID0gcmVzZXRWYWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG9ialtwcm9wXSA9IG51bTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMucmVmcmVzaE9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHNldENsYXNzZXMoaW5zdGFuY2U6IFNldHRpbmcsIGNsYXNzZXM/OiBBcnJheTxzdHJpbmc+KSB7XG5cdFx0aWYgKGNsYXNzZXMpIHtcblx0XHRcdGNsYXNzZXMuZm9yRWFjaCgoYykgPT4gaW5zdGFuY2Uuc2V0Q2xhc3MoYykpO1xuXHRcdH1cblx0fVxufVxuIiwgImltcG9ydCBTaW1wbGVCYW5uZXIgZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQgeyBEZXZpY2VUeXBlIH0gZnJvbSAnLi4vdHlwZXMvZW51bXMnO1xuaW1wb3J0IHsgU2ltcGxlQmFubmVyU2V0dGluZ3MgfSBmcm9tICcuLi90eXBlcy9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3NNaWdyYXRvciB7XG5cdHN0YXRpYyBhc3luYyBtaWdyYXRlKGRhdGE6IGFueSwgcGx1Z2luOiBTaW1wbGVCYW5uZXIpOiBQcm9taXNlPFNpbXBsZUJhbm5lclNldHRpbmdzPiB7XG5cdFx0Y29uc3QgREVTS1RPUCA9IERldmljZVR5cGUuRGVza3RvcDtcblx0XHRjb25zdCBUQUJMRVQgPSBEZXZpY2VUeXBlLlRhYmxldDtcblx0XHRjb25zdCBQSE9ORSA9IERldmljZVR5cGUuUGhvbmU7XG5cdFx0Y29uc3QgbWlncmF0aW9uTWFwOiB7IFtvbGRLZXk6IHN0cmluZ106IHsgdGFyZ2V0OiBzdHJpbmc7IGRldmljZXM/OiBzdHJpbmdbXSB9IH0gPSB7XG5cdFx0XHRkZXNrdG9wSGVpZ2h0OiB7IHRhcmdldDogJ2Rlc2t0b3AuaGVpZ2h0JyB9LFxuXHRcdFx0dGFibGV0SGVpZ2h0OiB7IHRhcmdldDogJ3RhYmxldC5oZWlnaHQnIH0sXG5cdFx0XHRtb2JpbGVIZWlnaHQ6IHsgdGFyZ2V0OiAncGhvbmUuaGVpZ2h0JyB9LFxuXHRcdFx0b2Zmc2V0OiB7IHRhcmdldDogJ25vdGVPZmZzZXQnLCBkZXZpY2VzOiBbREVTS1RPUCwgVEFCTEVULCBQSE9ORV0gfSxcblx0XHRcdGZhZGU6IHsgdGFyZ2V0OiAnYmFubmVyRmFkZScsIGRldmljZXM6IFtERVNLVE9QLCBUQUJMRVQsIFBIT05FXSB9LFxuXHRcdFx0cmFkaXVzOiB7IHRhcmdldDogJ2Jhbm5lclJhZGl1cycsIGRldmljZXM6IFtERVNLVE9QLCBUQUJMRVQsIFBIT05FXSB9LFxuXHRcdFx0cGFkZGluZzogeyB0YXJnZXQ6ICdiYW5uZXJQYWRkaW5nJywgZGV2aWNlczogW0RFU0tUT1AsIFRBQkxFVCwgUEhPTkVdIH0sXG5cdFx0XHRwcm9wZXJ0eU5hbWU6IHsgdGFyZ2V0OiAncHJvcGVydGllcy5pbWFnZScgfSxcblx0XHR9O1xuXG5cdFx0bGV0IG5lZWRlZE1pZ3JhdGlvbiA9IGZhbHNlO1xuXHRcdGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuXHRcdGZvciAoY29uc3Qgb2xkS2V5IGluIG1pZ3JhdGlvbk1hcCkge1xuXHRcdFx0aWYgKG5ld0RhdGEuaGFzT3duUHJvcGVydHkob2xkS2V5KSAmJiBuZXdEYXRhW29sZEtleV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRuZWVkZWRNaWdyYXRpb24gPSB0cnVlO1xuXHRcdFx0XHRjb25zdCBtaWdyYXRpb24gPSBtaWdyYXRpb25NYXBbb2xkS2V5XTtcblxuXHRcdFx0XHRpZiAobWlncmF0aW9uLmRldmljZXMpIHtcblx0XHRcdFx0XHRtaWdyYXRpb24uZGV2aWNlcy5mb3JFYWNoKChkZXZpY2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHBhdGggPSBkZXZpY2UgKyAnLicgKyBtaWdyYXRpb24udGFyZ2V0O1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChuZXdEYXRhLCBwYXRoLCBuZXdEYXRhW29sZEtleV0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgobmV3RGF0YSwgbWlncmF0aW9uLnRhcmdldCwgbmV3RGF0YVtvbGRLZXldKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgbmV3RGF0YVtvbGRLZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChuZWVkZWRNaWdyYXRpb24pIHtcblx0XHRcdGF3YWl0IHBsdWdpbi5zYXZlRGF0YShuZXdEYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3RGF0YTtcblx0fVxuXG5cdHN0YXRpYyBzZXRWYWx1ZUJ5UGF0aChvYmo6IGFueSwgcGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XG5cdFx0bGV0IGN1cnJlbnQgPSBvYmo7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpXTtcblx0XHRcdGlmICghY3VycmVudFtwYXJ0XSB8fCB0eXBlb2YgY3VycmVudFtwYXJ0XSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Y3VycmVudFtwYXJ0XSA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnRbcGFydF07XG5cdFx0fVxuXHRcdGN1cnJlbnRbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBCYW5uZXJEYXRhLCBEYXRhc3RvcmUgfSBmcm9tICcuLi90eXBlcy9pbnRlcmZhY2VzJztcblxuY29uc3Qgc3RvcmFnZSA9IHt9IGFzIERhdGFzdG9yZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUge1xuXHRzdGF0aWMgZ2V0KGlkOiBzdHJpbmcpOiBCYW5uZXJEYXRhIHwgbnVsbCB7XG5cdFx0cmV0dXJuIHN0b3JhZ2VbaWRdIHx8IG51bGw7XG5cdH1cblxuXHRzdGF0aWMgc2V0KGlkOiBzdHJpbmcsIGRhdGE6IEJhbm5lckRhdGEpIHtcblx0XHRzdG9yYWdlW2lkXSA9IGRhdGE7XG5cdH1cblxuXHRzdGF0aWMgZGVsZXRlKGlkOiBzdHJpbmcgfCBudWxsID0gbnVsbCkge1xuXHRcdGlmIChpZCkge1xuXHRcdFx0ZGVsZXRlIHN0b3JhZ2VbaWRdO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleGlzdHMoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBzdG9yYWdlW2lkXSAhPT0gdW5kZWZpbmVkO1xuXHR9XG5cblx0c3RhdGljIGdldEFsbCgpOiBEYXRhc3RvcmUge1xuXHRcdHJldHVybiBzdG9yYWdlO1xuXHR9XG5cblx0c3RhdGljIGdldElkcygpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHN0b3JhZ2UpO1xuXHR9XG59XG4iLCAiaW1wb3J0IFNpbXBsZUJhbm5lciBmcm9tICcuLi9tYWluJztcblxubGV0IGluc3RhbmNlOiBTaW1wbGVCYW5uZXI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVV0aWxzIHtcblx0c3RhdGljIGluaXQocGx1Z2luOiBTaW1wbGVCYW5uZXIpIHtcblx0XHRpbnN0YW5jZSA9IHBsdWdpbjtcblx0fVxuXG5cdHN0YXRpYyBjYWxjdWxhdGVGb250c2l6ZSh0ZXh0Q29udGVudDogc3RyaW5nLCBpY29uU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHRlbXAuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwb3NpdGlvbjogYWJzb2x1dGU7IHZpc2liaWxpdHk6IGhpZGRlbjsgd2hpdGUtc3BhY2U6IG5vd3JhcDsnKTtcblx0XHR0ZW1wLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG5cdFx0dGVtcC5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cdFx0dGVtcC5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuXHRcdHRlbXAudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudC50b1VwcGVyQ2FzZSgpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVtcCk7XG5cdFx0Y29uc3Qgc2l6ZSA9IGljb25TaXplO1xuXHRcdGNvbnN0IGNoZWNrV2lkdGggPSBzaXplIC0gMTY7XG5cblx0XHRsZXQgZm9udFNpemUgPSBzaXplOyAvLyBTdGFydCBiaWdcblx0XHR0ZW1wLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnO1xuXG5cdFx0d2hpbGUgKHRlbXAub2Zmc2V0V2lkdGggPiBjaGVja1dpZHRoICYmIGZvbnRTaXplID4gMSkge1xuXHRcdFx0Zm9udFNpemUgLT0gMTtcblx0XHRcdHRlbXAuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCc7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZW1wKTtcblx0XHRyZXR1cm4gYCR7Zm9udFNpemV9cHhgO1xuXHR9XG5cblx0c3RhdGljIHNldENTU1ZhcmlhYmxlcyh2YXJpYWJsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIHRhcmdldDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5KSB7XG5cdFx0Y29uc3Qgc3R5bGUgPSB0YXJnZXQuc3R5bGU7XG5cdFx0T2JqZWN0LmtleXModmFyaWFibGVzKS5mb3JFYWNoKGsgPT4ge1xuXHRcdFx0c3R5bGUuc2V0UHJvcGVydHkoYC0tc2ItJHtrfWAsIHZhcmlhYmxlc1trXSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBNYXJrZG93blZpZXcsIFBsYXRmb3JtLCByZXF1ZXN0VXJsLCBURmlsZSAgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgU2ltcGxlQmFubmVyIGZyb20gJy4uL21haW4nO1xuaW1wb3J0IHsgSWNvbkRhdGEsIEltYWdlT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSWNvblR5cGUsIENvbnRlbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvZW51bXMnO1xuXG5sZXQgaW5zdGFuY2U6IFNpbXBsZUJhbm5lcjtcbmNvbnN0IFJlZ0V4cHJlc3Npb24gPSB7XG5cdFdpa2lsaW5rOiAvXiE/XFxbXFxbKFteXFxdXSs/KShcXHwoW15cXF1dKz8pKT9cXF1cXF0kLyxcblx0TWFya2Rvd246IC9eIT9cXFsoW15cXF1dKilcXF1cXCgoW14pXSs/KVxcKSQvLFxuXHRNYXJrZG93bkJhcmU6IC9eIT88KFtePl0rKT4kLyxcblx0V2VibGluazogL15odHRwcz86XFwvXFwvL2ksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZSB7XG5cblx0c3RhdGljIGluaXQocGx1Z2luOiBTaW1wbGVCYW5uZXIpIHtcblx0XHRpbnN0YW5jZSA9IHBsdWdpbjtcblx0fVxuXG5cdHN0YXRpYyBhc3luYyBsaW5rKHN0cjogc3RyaW5nLCB2aWV3PzogTWFya2Rvd25WaWV3IHwgbnVsbCwgc2V0dGluZ1Byb3BlcnR5Pzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8SW1hZ2VPcHRpb25zPiB7XG5cdFx0bGV0IHVybDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cdFx0bGV0IGRpc3BsYXlUZXh0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblx0XHRsZXQgZXh0ZXJuYWw6IGJvb2xlYW47XG5cdFx0bGV0IG9ic2lkaWFuVXJsOiBib29sZWFuID0gZmFsc2U7XG5cdFx0bGV0IG9wdGlvbnMgPSB7IHg6IDAsIHk6IDAsIHJlcGVhdGFibGU6IGZhbHNlIH07XG5cblx0XHRjb25zdCB3aWtpbGlua01hdGNoID0gc3RyLm1hdGNoKFJlZ0V4cHJlc3Npb24uV2lraWxpbmspO1xuXHRcdGlmICh3aWtpbGlua01hdGNoKSB7XG5cdFx0XHR1cmwgPSB3aWtpbGlua01hdGNoWzFdLnRyaW0oKTtcblx0XHRcdGRpc3BsYXlUZXh0ID0gd2lraWxpbmtNYXRjaFszXSA/IHdpa2lsaW5rTWF0Y2hbM10udHJpbSgpIDogbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBtYXJrZG93bk1hdGNoID0gc3RyLm1hdGNoKFJlZ0V4cHJlc3Npb24uTWFya2Rvd24pO1xuXHRcdGNvbnN0IG1hcmtkb3duQmFyZU1hdGNoID0gc3RyLm1hdGNoKFJlZ0V4cHJlc3Npb24uTWFya2Rvd25CYXJlKTtcblx0XHRpZiAobWFya2Rvd25NYXRjaCkge1xuXHRcdFx0ZGlzcGxheVRleHQgPSBtYXJrZG93bk1hdGNoWzFdLnRyaW0oKTtcblx0XHRcdHVybCA9IG1hcmtkb3duTWF0Y2hbMl0udHJpbSgpO1xuXHRcdH0gZWxzZSBpZiAobWFya2Rvd25CYXJlTWF0Y2gpIHtcblx0XHRcdHVybCA9IG1hcmtkb3duQmFyZU1hdGNoWzFdLnRyaW0oKTtcblx0XHRcdGRpc3BsYXlUZXh0ID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAoIXVybCkge1xuXHRcdFx0dXJsID0gc3RyO1xuXHRcdFx0ZGlzcGxheVRleHQgPSBudWxsO1xuXHRcdH1cblxuXHRcdGV4dGVybmFsID0gUmVnRXhwcmVzc2lvbi5XZWJsaW5rLnRlc3QodXJsKTtcblxuXHRcdGlmICh0aGlzLmlzT2JzaWRpYW5VcmwodXJsKSkge1xuXHRcdFx0Y29uc3Qgc3RyID0gdXJsLnJlcGxhY2UoJ29ic2lkaWFuOi8vb3BlbicsICcnKTtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc3RyKTtcblx0XHRcdGxldCBmaWxlID0gcGFyYW1zLmdldCgnZmlsZScpO1xuXHRcdFx0aWYgKGZpbGUpIHtcblx0XHRcdFx0dXJsID0gZmlsZTtcblx0XHRcdFx0b2JzaWRpYW5VcmwgPSB0cnVlO1xuXHRcdFx0XHRleHRlcm5hbCA9IGZhbHNlO1xuXHRcdFx0XHRkaXNwbGF5VGV4dCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHVybC5zdGFydHNXaXRoKCdmaWxlOicpKSB7XG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXmZpbGU6XFwvezEsfS8sIFBsYXRmb3JtLnJlc291cmNlUGF0aFByZWZpeClcblx0XHRcdGV4dGVybmFsID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXHRcdGlmICgoZXh0ZXJuYWwgfHwgb2JzaWRpYW5VcmwpICYmIGhhc2hJbmRleCAhPT0gLTEpIHtcblx0XHRcdG9wdGlvbnMgPSB0aGlzLmltYWdlUHJvcGVydGllcyh1cmwuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpKTtcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKC8jLiovLCAnJykudHJpbSgpO1xuXHRcdH1cblxuXHRcdGlmIChkaXNwbGF5VGV4dCkge1xuXHRcdFx0b3B0aW9ucyA9IHRoaXMuaW1hZ2VQcm9wZXJ0aWVzKGRpc3BsYXlUZXh0KTtcblx0XHR9XHRcdGlmICghZXh0ZXJuYWwpIHtcblx0XHRcdGNvbnN0IHZhdWx0ID0gaW5zdGFuY2UuYXBwLnZhdWx0O1xuXHRcdFx0bGV0IGZpbGU6IFRGaWxlIHwgbnVsbCA9IG51bGw7XG5cblx0XHRcdC8vIFRyeSB0byByZXNvbHZlIGEgcmVsYXRpdmUgcGF0aCBmaXJzdCBpZiB3ZSBoYXZlIGEgdmlldyBjb250ZXh0XG5cdFx0XHRpZiAodmlldyAmJiB2aWV3LmZpbGUgJiYgKHVybC5pbmNsdWRlcygnLi4vJykgfHwgdXJsLmluY2x1ZGVzKCcuLycpIHx8ICghdXJsLnN0YXJ0c1dpdGgoJy8nKSAmJiB1cmwuaW5jbHVkZXMoJy8nKSkpKSB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRGaWxlUGF0aCA9IHZpZXcuZmlsZS5wYXRoO1xuXHRcdFx0XHRjb25zdCByZXNvbHZlZFBhdGggPSBpbnN0YW5jZS5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdCh1cmwsIGN1cnJlbnRGaWxlUGF0aCk7XG5cdFx0XHRcdGlmIChyZXNvbHZlZFBhdGgpIHtcblx0XHRcdFx0XHRmaWxlID0gcmVzb2x2ZWRQYXRoO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZhbGxiYWNrIHRvIGV4YWN0IHBhdGgvbmFtZSBtYXRjaGluZyBpZiByZWxhdGl2ZSByZXNvbHV0aW9uIGZhaWxlZFxuXHRcdFx0aWYgKCFmaWxlKSB7XG5cdFx0XHRcdGNvbnN0IGZpbGVzID0gdmF1bHQuZ2V0RmlsZXMoKS5maWx0ZXIoZiA9PiBmLnBhdGggPT09IHVybCB8fCBmLm5hbWUgPT09IHVybCk7XG5cdFx0XHRcdGZpbGUgPSBmaWxlcy5maW5kKGYgPT4gZi5wYXRoID09PSB1cmwpIHx8IG51bGw7XG5cdFx0XHRcdGlmICghZmlsZSkge1xuXHRcdFx0XHRcdGZpbGUgPSBmaWxlcy5maW5kKGYgPT4gZi5uYW1lID09PSB1cmwpIHx8IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpbGUpIHtcblx0XHRcdFx0dXJsID0gdmF1bHQuZ2V0UmVzb3VyY2VQYXRoKGZpbGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob2JzaWRpYW5VcmwgJiYgZmlsZSAmJiB2aWV3KSB7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZUZpbGUgPSBpbnN0YW5jZS5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKTtcblx0XHRcdFx0aWYgKGFjdGl2ZUZpbGUpIHtcblx0XHRcdFx0XHQvLyBub2luc3BlY3Rpb24gSlNJZ25vcmVkUHJvbWlzZUZyb21DYWxsXG5cdFx0XHRcdFx0aW5zdGFuY2UuYXBwLmZpbGVNYW5hZ2VyLnByb2Nlc3NGcm9udE1hdHRlcihhY3RpdmVGaWxlLCAoZnJvbnRtYXR0ZXIpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHByb3BOYW1lID0gc2V0dGluZ1Byb3BlcnR5IHx8IGluc3RhbmNlLnNldHRpbmdQcm9wZXJ0aWVzLmltYWdlO1xuXHRcdFx0XHRcdFx0ZnJvbnRtYXR0ZXJbcHJvcE5hbWVdID0gYFtbJHtmaWxlPy5wYXRofV1dYFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IHR5cGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB1cmxPYmogPSBuZXcgVVJMKHVybCk7XG5cdFx0XHRpZiAodXJsT2JqKSB7XG5cdFx0XHRcdGNvbnN0IGV4dGVuc2lvbiA9IHVybE9iai5wYXRobmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuXHRcdFx0XHRjb25zdCBpbWFnZUV4dGVuc2lvbnMgPSBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdnaWYnLCAnc3ZnJywgJ3dlYnAnXTtcblx0XHRcdFx0Y29uc3QgdmlkZW9FeHRlbnNpb25zID0gWydtcDQnLCAnd2VibScsICdvZ2cnLCAnb2d2JywgJ21vdicsICdhdmknLCAnd212JywgJ21wZycsICdtcGVnJywgJzNncCddO1xuXHRcdFx0XHRpZiAoZXh0ZW5zaW9uICYmIGltYWdlRXh0ZW5zaW9ucy5pbmNsdWRlcyhleHRlbnNpb24pKSB7XG5cdFx0XHRcdFx0dHlwZSA9IENvbnRlbnRUeXBlLkltYWdlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV4dGVuc2lvbiAmJiB2aWRlb0V4dGVuc2lvbnMuaW5jbHVkZXMoZXh0ZW5zaW9uKSkge1xuXHRcdFx0XHRcdHR5cGUgPSBDb250ZW50VHlwZS5WaWRlbztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXR5cGUpIHtcblx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsLCBtZXRob2Q6ICdIRUFEJyB9KTtcblx0XHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZT8uaGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgbnVsbDtcblx0XHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdFx0aWYgKGNvbnRlbnRUeXBlLmluY2x1ZGVzKENvbnRlbnRUeXBlLkltYWdlKSkge1xuXHRcdFx0XHRcdFx0dHlwZSA9IENvbnRlbnRUeXBlLkltYWdlO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoY29udGVudFR5cGUuaW5jbHVkZXMoQ29udGVudFR5cGUuVmlkZW8pKSB7XG5cdFx0XHRcdFx0XHR0eXBlID0gQ29udGVudFR5cGUuVmlkZW87XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR1cmw6IGBcIiR7dXJsLnRyaW0oKS5yZXBsYWNlKC8oW1wiXFxcXF0pL2csIFwiXFxcXCQxXCIpfVwiYCxcblx0XHRcdGV4dGVybmFsLFxuXHRcdFx0dHlwZSxcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBpbWFnZVByb3BlcnRpZXMoc3RyOiBzdHJpbmcpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCByZXBlYXRhYmxlOiBib29sZWFuIH0ge1xuXHRcdGxldCByZXBlYXRhYmxlOiBib29sZWFuO1xuXHRcdGxldCB4ID0gMDtcblx0XHRsZXQgeSA9IDA7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBzdHIudG9Mb3dlckNhc2UoKTtcblx0XHRyZXBlYXRhYmxlID0gdmFsdWVzLmluY2x1ZGVzKCdyZXBlYXQnKTtcblxuXHRcdGNvbnN0IHNpemVzID0gc3RyLnNwbGl0KC94fCwvKTtcblx0XHRjb25zdCBudW1iZXJzID0gc2l6ZXMuZmlsdGVyKHYgPT4gIWlzTmFOKHBhcnNlSW50KHYudHJpbSgpLCAxMCkpKTtcblxuXHRcdGlmIChudW1iZXJzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0eCA9IHBhcnNlSW50KG51bWJlcnNbMF0udHJpbSgpLCAxMCk7XG5cdFx0XHR5ID0gcGFyc2VJbnQobnVtYmVyc1sxXS50cmltKCksIDEwKTtcblx0XHR9IGVsc2UgaWYgKG51bWJlcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR5ID0gcGFyc2VJbnQobnVtYmVyc1swXS50cmltKCksIDEwKTtcblx0XHR9XG5cdFx0cmV0dXJuIHsgeCwgeSwgcmVwZWF0YWJsZSB9O1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGljb24oaWNvbjogc3RyaW5nLCB2aWV3PzogTWFya2Rvd25WaWV3IHwgbnVsbCk6IFByb21pc2U8SWNvbkRhdGE+IHtcblx0XHRjb25zdCBzdHIgPSBpY29uIHx8ICcnO1xuXHRcdGNvbnN0IG91dCA9IHsgdmFsdWU6IG51bGwsIHR5cGU6IEljb25UeXBlLlRleHQgfSBhcyBJY29uRGF0YTtcblxuXHRcdGlmIChSZWdFeHByZXNzaW9uLldpa2lsaW5rLnRlc3Qoc3RyKSkge1xuXHRcdFx0b3V0LnR5cGUgPSBJY29uVHlwZS5MaW5rO1xuXHRcdH0gZWxzZSBpZiAoUmVnRXhwcmVzc2lvbi5NYXJrZG93bi50ZXN0KHN0cikgfHwgUmVnRXhwcmVzc2lvbi5NYXJrZG93bkJhcmUudGVzdChzdHIpKSB7XG5cdFx0XHRvdXQudHlwZSA9IEljb25UeXBlLkxpbms7XG5cdFx0fSBlbHNlIGlmIChSZWdFeHByZXNzaW9uLldlYmxpbmsudGVzdChpY29uKSkge1xuXHRcdFx0b3V0LnR5cGUgPSBJY29uVHlwZS5MaW5rO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5pc09ic2lkaWFuVXJsKGljb24pKSB7XG5cdFx0XHRvdXQudHlwZSA9IEljb25UeXBlLkxpbms7XG5cdFx0fVxuXG5cdFx0aWYgKG91dC50eXBlID09PSBJY29uVHlwZS5MaW5rKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5saW5rKHN0ciwgdmlldywgaW5zdGFuY2Uuc2V0dGluZ1Byb3BlcnRpZXMuaWNvbik7XG5cdFx0XHRvdXQudmFsdWUgPSBkYXRhLnVybDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0LnZhbHVlID0gc3RyO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgaXNJbWFnZVByb3BlcnRpZXNVcGRhdGUob2xkc3RyPzogc3RyaW5nIHwgbnVsbCwgbmV3c3RyPzogc3RyaW5nIHwgbnVsbCwgdmlldz86IE1hcmtkb3duVmlldyB8IG51bGwpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAoIW9sZHN0ciB8fCAhbmV3c3RyKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGNvbnN0IG9sZG9wdCA9IGF3YWl0IHRoaXMubGluayhvbGRzdHIsIHZpZXcpO1xuXHRcdGNvbnN0IG5ld29wdCA9IGF3YWl0IHRoaXMubGluayhuZXdzdHIsIHZpZXcpO1xuXHRcdHJldHVybiBvbGRvcHQudXJsID09PSBuZXdvcHQudXJsO1xuXHR9XG5cblx0c3RhdGljIGlzT2JzaWRpYW5VcmwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdXJsLnN0YXJ0c1dpdGgoJ29ic2lkaWFuOi8vb3BlbicpO1xuXHR9XG59XG4iLCAiaW1wb3J0IHsgQmFubmVyRGF0YSwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICcuLi90eXBlcy9pbnRlcmZhY2VzJztcbmltcG9ydCBTaW1wbGVCYW5uZXIgZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuICogQGludGVyZmFjZSBGZWF0dXJlSW50ZXJmYWNlXG4gKiBEZWZpbmVzIHRoZSBjb250cmFjdCB0aGF0IGFsbCBmZWF0dXJlcyB3aXRoaW4gdGhlIHBsdWdpbiBtdXN0IGltcGxlbWVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlSW50ZXJmYWNlIHtcbiAgICBkZXN0cm95KCk6IHZvaWQ7XG5cbiAgICB1cGRhdGUoZGF0YTogQmFubmVyRGF0YSwgLi4uYXJnczogYW55W10pOiBhbnk7XG59XG5cbi8qKlxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgRmVhdHVyZUJhc2VcbiAqIEFuIGFic3RyYWN0IGJhc2UgY2xhc3MgdGhhdCBhbGwgZmVhdHVyZXMgaW4gdGhlIHBsdWdpbiBzaG91bGQgZXh0ZW5kLlxuICogSXQgcHJvdmlkZXMgY29tbW9uIGZ1bmN0aW9uYWxpdHkgYW5kIGVuZm9yY2VzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIEZlYXR1cmVJbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGZWF0dXJlQmFzZSBpbXBsZW1lbnRzIEZlYXR1cmVJbnRlcmZhY2Uge1xuICAgIHByb3RlY3RlZCBwbHVnaW46IFNpbXBsZUJhbm5lcjtcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3M6IERldmljZVNldHRpbmdzO1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBTaW1wbGVCYW5uZXIsIHNldHRpbmdzOiBEZXZpY2VTZXR0aW5ncykge1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGRlc3Ryb3koKTogdm9pZDtcblxuICAgIGFic3RyYWN0IHVwZGF0ZShkYXRhOiBCYW5uZXJEYXRhLCAuLi5hcmdzOiBhbnlbXSk6IGFueTtcbn1cbiIsICJpbXBvcnQgeyBCYW5uZXJEYXRhLCBEZXZpY2VTZXR0aW5ncywgSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250ZW50VHlwZSwgQ1NTQ2xhc3NlcywgQ1NTVmFsdWUgfSBmcm9tICcuLi90eXBlcy9lbnVtcyc7XG5pbXBvcnQgRG9tVXRpbHMgZnJvbSAnLi4vdXRpbHMvZG9tdXRpbHMnO1xuaW1wb3J0IFNpbXBsZUJhbm5lciBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IEZlYXR1cmVCYXNlIH0gZnJvbSAnLi9iYXNlJztcblxuY29uc3QgTUFJTl9TRUxFQ1RPUiA9IGAuJHtDU1NDbGFzc2VzLk1haW59YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFubmVyIGV4dGVuZHMgRmVhdHVyZUJhc2Uge1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVmFyaWFibGVzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDb25zdHJ1Y3RvclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Y29uc3RydWN0b3IocGx1Z2luOiBTaW1wbGVCYW5uZXIsIHNldHRpbmdzOiBEZXZpY2VTZXR0aW5ncykge1xuXHRcdHN1cGVyKHBsdWdpbiwgc2V0dGluZ3MpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIExpZmVjeWNsZVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ZGVzdHJveSgpIHtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBNZXRob2RzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGUoZGF0YTogQmFubmVyRGF0YSwgaW1nT3B0aW9uczogSW1hZ2VPcHRpb25zLCBjb250YWluZXJzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pik6IEhUTUxFbGVtZW50W10ge1xuXHRcdGNvbnN0IHsgaXNJbWFnZUNoYW5nZSwgaXNJbWFnZVByb3BzVXBkYXRlIH0gPSBkYXRhO1xuXHRcdGNvbnN0IGJhbm5lcnM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuXHRcdGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuXHRcdFx0bGV0IGVsZW1lbnQgPSAoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoTUFJTl9TRUxFQ1RPUikgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKENTU0NsYXNzZXMuTWFpbik7XG5cdFx0XHRiYW5uZXJzLnB1c2goZWxlbWVudCk7XG5cblx0XHRcdGlmIChpc0ltYWdlQ2hhbmdlIHx8IGlzSW1hZ2VQcm9wc1VwZGF0ZSkge1xuXHRcdFx0XHRpZiAoaXNJbWFnZUNoYW5nZSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDU1NDbGFzc2VzLlN0YXRpYyk7XG5cdFx0XHRcdFx0ZWxlbWVudC5maXJzdENoaWxkPy5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHZhcnMgPSAge1xuXHRcdFx0XHRcdCdpbWcteCc6IGAke2ltZ09wdGlvbnMueH1weGAsXG5cdFx0XHRcdFx0J2ltZy15JzogYCR7aW1nT3B0aW9ucy55fXB4YCxcblx0XHRcdFx0XHQnc2l6ZSc6IGltZ09wdGlvbnMucmVwZWF0YWJsZSA/IENTU1ZhbHVlLkF1dG8gOiBDU1NWYWx1ZS5SZXZlcnRMYXllcixcblx0XHRcdFx0XHQncmVwZWF0JzogaW1nT3B0aW9ucy5yZXBlYXRhYmxlID8gQ1NTVmFsdWUuUmVwZWF0IDogQ1NTVmFsdWUuUmV2ZXJ0TGF5ZXIsXG5cdFx0XHRcdFx0J3VybCc6ICdub25lJyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoaW1nT3B0aW9ucy50eXBlID09PSBDb250ZW50VHlwZS5WaWRlbykge1xuXHRcdFx0XHRcdGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcblx0XHRcdFx0XHR2aWRlby5jb250cm9scyA9IGZhbHNlO1xuXHRcdFx0XHRcdHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcblx0XHRcdFx0XHR2aWRlby5tdXRlZCA9IHRydWU7XG5cdFx0XHRcdFx0dmlkZW8ubG9vcCA9IHRydWU7XG5cdFx0XHRcdFx0dmlkZW8uc3JjID0gaW1nT3B0aW9ucy51cmw7XG5cdFx0XHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZCh2aWRlbyk7XG5cdFx0XHRcdFx0dmFycy51cmwgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFycy51cmwgPSBgdXJsKCR7aW1nT3B0aW9ucy51cmx9KWA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHREb21VdGlscy5zZXRDU1NWYXJpYWJsZXModmFycywgY29udGFpbmVyKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBiYW5uZXJzO1xuXHR9XG5cblx0aW5qZWN0KGJhbm5lcnM6IEhUTUxFbGVtZW50W10sIGNvbnRhaW5lcnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KTogdm9pZCB7XG5cdFx0Y29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBiYW5uZXI6IEhUTUxFbGVtZW50ID0gYmFubmVyc1tpbmRleF07XG5cdFx0XHRjb250YWluZXIucHJlcGVuZChiYW5uZXIpO1xuXHRcdFx0YmFubmVyLm9uYW5pbWF0aW9uZW5kID0gKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpbnN0YW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE1BSU5fU0VMRUNUT1IpO1xuXHRcdFx0XHRpbnN0YW5jZXMuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LmFkZChDU1NDbGFzc2VzLlN0YXRpYykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmVwbGFjZShiYW5uZXJzOiBIVE1MRWxlbWVudFtdKTogdm9pZCB7XG5cdFx0YmFubmVycy5mb3JFYWNoKChiYW5uZXIpID0+IHtcblx0XHRcdGJhbm5lci5jbGFzc0xpc3QuYWRkKENTU0NsYXNzZXMuU3RhdGljKTtcblx0XHR9KVxuXHR9XG59XG4iLCAiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBCYW5uZXJEYXRhLCBEZXZpY2VTZXR0aW5ncyB9IGZyb20gJy4uL3R5cGVzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ1NTQ2xhc3NlcywgSWNvblR5cGUgfSBmcm9tICcuLi90eXBlcy9lbnVtcyc7XG5pbXBvcnQgeyBGZWF0dXJlQmFzZSB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgRG9tVXRpbHMgZnJvbSAnLi4vdXRpbHMvZG9tdXRpbHMnO1xuaW1wb3J0IFBhcnNlIGZyb20gJy4uL3V0aWxzL3BhcnNlJztcbmltcG9ydCBTaW1wbGVCYW5uZXIgZnJvbSAnLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb24gZXh0ZW5kcyBGZWF0dXJlQmFzZSB7XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBWYXJpYWJsZXNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIENvbnN0cnVjdG9yXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRjb25zdHJ1Y3RvcihwbHVnaW46IFNpbXBsZUJhbm5lciwgc2V0dGluZ3M6IERldmljZVNldHRpbmdzKSB7XG5cdFx0c3VwZXIocGx1Z2luLCBzZXR0aW5ncyk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gTGlmZWN5Y2xlXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZXN0cm95KCkge1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIE1ldGhvZHNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGFzeW5jIHVwZGF0ZShkYXRhOiBCYW5uZXJEYXRhLCBiYW5uZXJzOiBIVE1MRWxlbWVudFtdKSB7XG5cdFx0Y29uc3QgeyBpY29uRW5hYmxlZCwgaWNvblNpemUgfSA9IHRoaXMuc2V0dGluZ3M7XG5cdFx0bGV0IGNhbGN1bGF0ZWRGb250U2l6ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cblx0XHRmb3IgKGxldCBpID0gMCwgbiA9IGJhbm5lcnMubGVuZ3RoOyBpIDwgbjsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBiYW5uZXIgPSBiYW5uZXJzW2ldO1xuXHRcdFx0Y29uc3QgeyBpY29uLCB2aWV3IH0gPSBkYXRhO1xuXHRcdFx0bGV0IGNvbnRhaW5lciA9IGJhbm5lci5xdWVyeVNlbGVjdG9yKGAuJHtDU1NDbGFzc2VzLkljb259YCkgfHwgbnVsbDtcblx0XHRcdGNvbnN0IGhhc0NvbnRhaW5lciA9IGNvbnRhaW5lciAhPT0gbnVsbDtcblx0XHRcdGlmIChoYXNDb250YWluZXIpIHtcblx0XHRcdFx0Y29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKENTU0NsYXNzZXMuU3RhdGljKTtcblx0XHRcdH1cblx0XHRcdGlmIChpY29uRW5hYmxlZCAmJiBpY29uKSB7XG5cdFx0XHRcdGlmICghaGFzQ29udGFpbmVyKSB7XG5cdFx0XHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoQ1NTQ2xhc3Nlcy5JY29uKTtcblx0XHRcdFx0XHRpZiAoUGxhdGZvcm0uaXNXaW4pIHtcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKENTU0NsYXNzZXMuSXNXaW5kb3dzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0XHRcdFx0YmFubmVyLnByZXBlbmQoY29udGFpbmVyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGljb25FbGVtZW50ID0gY29udGFpbmVyPy5xdWVyeVNlbGVjdG9yKCdkaXYnKSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdFx0bGV0IHsgdmFsdWUsIHR5cGUgfSA9IGF3YWl0IFBhcnNlLmljb24oaWNvbiwgdmlldyk7XG5cblx0XHRcdFx0dmFsdWUgPSB2YWx1ZT8ucmVwbGFjZSgvKFsjLjpbXFxcXF1cIl0pL2csICdcXFxcJDEnKSB8fCAnJztcblx0XHRcdFx0aWNvbkVsZW1lbnQuZGF0YXNldC50eXBlID0gdHlwZTtcblxuXHRcdFx0XHRjb25zdCB2YXJzID0ge30gYXMgYW55O1xuXHRcdFx0XHR2YXJzWydpY29uLXZhbHVlJ10gPSB0eXBlID09PSBJY29uVHlwZS5MaW5rID8gYHVybCgke3ZhbHVlfSlgIDogYFwiJHt2YWx1ZX1cImA7XG5cblx0XHRcdFx0aWYgKHR5cGUgPT09IEljb25UeXBlLlRleHQpIHtcblx0XHRcdFx0XHRjYWxjdWxhdGVkRm9udFNpemUgPSBjYWxjdWxhdGVkRm9udFNpemUgPyBjYWxjdWxhdGVkRm9udFNpemUgOiBEb21VdGlscy5jYWxjdWxhdGVGb250c2l6ZSh2YWx1ZSwgaWNvblNpemUpO1xuXHRcdFx0XHRcdHZhcnNbJ2ljb24tZm9udHNpemUnXSA9IGNhbGN1bGF0ZWRGb250U2l6ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHREb21VdGlscy5zZXRDU1NWYXJpYWJsZXModmFycywgaWNvbkVsZW1lbnQpO1xuXHRcdFx0fSBlbHNlIGlmIChoYXNDb250YWluZXIpIHtcblx0XHRcdFx0ZGF0YS5pY29uID0gbnVsbDtcblx0XHRcdFx0Y29udGFpbmVyPy5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBCYW5uZXJEYXRhLCBEZXZpY2VTZXR0aW5ncyB9IGZyb20gJy4uL3R5cGVzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgbW9tZW50IH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IFNpbXBsZUJhbm5lciBmcm9tICcuLi9tYWluJztcbmltcG9ydCB7IEZlYXR1cmVCYXNlIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IENTU0NsYXNzZXMgfSBmcm9tICcuLi90eXBlcy9lbnVtcyc7XG5cbmNvbnN0IENPTlRBSU5FUl9TRUxFQ1RPUiA9IGAuJHtDU1NDbGFzc2VzLk1haW59ID4gZGl2LiR7Q1NTQ2xhc3Nlcy5EYXRldGltZX1gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRldGltZSBleHRlbmRzIEZlYXR1cmVCYXNlIHtcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFZhcmlhYmxlc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cHJpdmF0ZSB0aW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdHByaXZhdGUgZGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRwcml2YXRlIGlzbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRwcml2YXRlIGludGVydmFsSWQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ29uc3RydWN0b3Jcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGNvbnN0cnVjdG9yKHBsdWdpbjogU2ltcGxlQmFubmVyLCBzZXR0aW5nczogRGV2aWNlU2V0dGluZ3MpIHtcblx0XHRzdXBlcihwbHVnaW4sIHNldHRpbmdzKTtcblx0XHR0aGlzLnByb2Nlc3NUaW1lKCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gTGlmZWN5Y2xlXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZXN0cm95KCkge1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gTWV0aG9kc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0dXBkYXRlKGRhdGE6IEJhbm5lckRhdGEsIGJhbm5lcnM6IEhUTUxFbGVtZW50W10pIHtcblx0XHRjb25zdCB7IGRhdGV0aW1lRW5hYmxlZCwgZGF0ZXRpbWVPblByb3BPbmx5IH0gPSB0aGlzLnNldHRpbmdzO1xuXHRcdGNvbnN0IHsgZGF0ZXRpbWUgfSA9IGRhdGE7XG5cblx0XHRpZiAoZGF0ZXRpbWVFbmFibGVkKSB7XG5cdFx0XHRiYW5uZXJzLmZvckVhY2goKGJhbm5lcikgPT4ge1xuXHRcdFx0XHRsZXQgY29udGFpbmVyID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoYC4ke0NTU0NsYXNzZXMuRGF0ZXRpbWV9YCkgfHwgbnVsbDtcblx0XHRcdFx0Y29uc3QgaGFzQ29udGFpbmVyID0gY29udGFpbmVyICE9PSBudWxsO1xuXHRcdFx0XHRpZiAoaGFzQ29udGFpbmVyKSB7XG5cdFx0XHRcdFx0Y29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKENTU0NsYXNzZXMuU3RhdGljKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoKGRhdGV0aW1lRW5hYmxlZCAmJiAhZGF0ZXRpbWVPblByb3BPbmx5KSB8fCAoZGF0ZXRpbWVFbmFibGVkICYmIGRhdGV0aW1lT25Qcm9wT25seSAmJiBkYXRldGltZSkpIHtcblx0XHRcdFx0XHRpZiAoIWhhc0NvbnRhaW5lcikge1xuXHRcdFx0XHRcdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0XHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChDU1NDbGFzc2VzLkRhdGV0aW1lKTtcblx0XHRcdFx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RpbWUnKTtcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdFx0XHRcdFx0YmFubmVyLnByZXBlbmQoY29udGFpbmVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBkdEVsZW1lbnQgPSBjb250YWluZXI/LnF1ZXJ5U2VsZWN0b3IoJ3RpbWUnKSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdFx0XHRkdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDU1NDbGFzc2VzLlN0YXRpYyk7XG5cdFx0XHRcdFx0aWYgKGRhdGV0aW1lKSB7XG5cdFx0XHRcdFx0XHRkdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChDU1NDbGFzc2VzLlN0YXRpYyk7XG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVRpbWUoW2R0RWxlbWVudF0sIGRhdGV0aW1lLCB0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFkYXRldGltZU9uUHJvcE9ubHkpIHtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlVGltZShbZHRFbGVtZW50XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGhhc0NvbnRhaW5lcikge1xuXHRcdFx0XHRcdGNvbnRhaW5lcj8ucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkYXRldGltZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKENPTlRBSU5FUl9TRUxFQ1RPUik7XG5cdFx0XHRkYXRldGltZXMuZm9yRWFjaCgoZHQpID0+IHtcblx0XHRcdFx0ZHQucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRjaGVjaygpIHtcblx0XHRjb25zdCBjdXJyZW50SW50ZXJ2YWwgPSB0aGlzLmludGVydmFsSWQ7XG5cdFx0Y29uc3QgeyBkYXRldGltZUVuYWJsZWQsIGRhdGV0aW1lT25Qcm9wT25seSB9ID0gdGhpcy5zZXR0aW5ncztcblx0XHRpZiAoZGF0ZXRpbWVFbmFibGVkICYmICFkYXRldGltZU9uUHJvcE9ubHkpIHtcblx0XHRcdGNvbnN0IG51bVRpbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDT05UQUlORVJfU0VMRUNUT1IpLmxlbmd0aDtcblx0XHRcdGlmIChudW1UaW1lcyA9PT0gMCAmJiBjdXJyZW50SW50ZXJ2YWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuXHRcdFx0XHR0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2UgaWYgKG51bVRpbWVzID4gMCAmJiBjdXJyZW50SW50ZXJ2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLmludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5wcm9jZXNzVGltZSgpLCAxMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUHJpdmF0ZSBNZXRob2RzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRwcml2YXRlIHByb2Nlc3NUaW1lKCkge1xuXHRcdGNvbnN0IHsgZGF0ZXRpbWVFbmFibGVkLCBkYXRldGltZU9uUHJvcE9ubHksIGRhdGV0aW1lVGltZUZvcm1hdCwgZGF0ZXRpbWVEYXRlRm9ybWF0IH0gPSB0aGlzLnNldHRpbmdzO1xuXHRcdGNvbnN0IHNob3dUaW1lID0gZGF0ZXRpbWVUaW1lRm9ybWF0ICE9PSAnJztcblx0XHRjb25zdCBzaG93RGF0ZSA9IGRhdGV0aW1lRGF0ZUZvcm1hdCAhPT0gJyc7XG5cdFx0aWYgKGRhdGV0aW1lRW5hYmxlZCAmJiAhZGF0ZXRpbWVPblByb3BPbmx5KSB7XG5cdFx0XHRjb25zdCBub3cgPSBtb21lbnQoKTtcblx0XHRcdHRoaXMudGltZSA9IHNob3dUaW1lID8gbm93LmZvcm1hdChkYXRldGltZVRpbWVGb3JtYXQpIDogJyc7XG5cdFx0XHR0aGlzLmRhdGUgPSBzaG93RGF0ZSA/IG5vdy5mb3JtYXQoZGF0ZXRpbWVEYXRlRm9ybWF0KSA6ICcnO1xuXHRcdFx0dGhpcy5pc28gPSBub3cudG9JU09TdHJpbmcoKTtcblx0XHRcdHRoaXMudXBkYXRlVGltZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlVGltZShlbGVtZW50cz86IEhUTUxFbGVtZW50W10sIGRhdGV0aW1lPzogc3RyaW5nIHwgbnVsbCwgZm9yY2VVcGRhdGU/OiBib29sZWFuKSB7XG5cdFx0Y29uc3QgeyBkYXRldGltZUVuYWJsZWQsIGRhdGV0aW1lVGltZUZvcm1hdCwgZGF0ZXRpbWVEYXRlRm9ybWF0IH0gPSB0aGlzLnNldHRpbmdzO1xuXHRcdGNvbnN0IHNob3dUaW1lID0gZGF0ZXRpbWVUaW1lRm9ybWF0ICE9PSAnJztcblx0XHRjb25zdCBzaG93RGF0ZSA9IGRhdGV0aW1lRGF0ZUZvcm1hdCAhPT0gJyc7XG5cdFx0aWYgKGRhdGV0aW1lRW5hYmxlZCkge1xuXHRcdFx0bGV0IHsgdGltZSwgZGF0ZSwgaXNvIH0gPSB0aGlzO1xuXHRcdFx0aWYgKGRhdGV0aW1lKSB7XG5cdFx0XHRcdGNvbnN0IGR0ID0gbW9tZW50KGRhdGV0aW1lKTtcblx0XHRcdFx0dGltZSA9IHNob3dUaW1lID8gZHQuZm9ybWF0KGRhdGV0aW1lVGltZUZvcm1hdCkgOiAnJztcblx0XHRcdFx0ZGF0ZSA9IHNob3dEYXRlID8gZHQuZm9ybWF0KGRhdGV0aW1lRGF0ZUZvcm1hdCkgOiAnJztcblx0XHRcdFx0Y29uc3QgaGFzVGltZUluZm8gPSBkYXRldGltZS5pbmNsdWRlcygnVCcpO1xuXHRcdFx0XHRpZiAoIWhhc1RpbWVJbmZvKSB7XG5cdFx0XHRcdFx0dGltZSA9ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlzbyA9IGR0LnRvSVNPU3RyaW5nKCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVscyA9IGVsZW1lbnRzIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCR7Q09OVEFJTkVSX1NFTEVDVE9SfSA+IHRpbWVgKTtcblx0XHRcdGlmIChlbHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRlbHMuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdFx0XHRjb25zdCBjcmVhdGUgPSBlbC5jaGlsZHJlbj8ubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRcdGlmIChjcmVhdGUpIHtcblx0XHRcdFx0XHRcdGVsLmNyZWF0ZUVsKCdzcGFuJywgeyB0ZXh0OiB0aW1lIH0pO1xuXHRcdFx0XHRcdFx0ZWwuY3JlYXRlRWwoJ3NwYW4nLCB7IHRleHQ6IGRhdGUgfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKENTU0NsYXNzZXMuU3RhdGljKSB8fCBmb3JjZVVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzcGFucyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsdWVzID0gW3RpbWUsIGRhdGVdO1xuXHRcdFx0XHRcdFx0XHRzcGFucy5mb3JFYWNoKChzcGFuLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHNwYW4udGV4dENvbnRlbnQgPSB2YWx1ZXNbaW5kZXhdIHx8ICcnO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGlzbyB8fCAnJyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwgImltcG9ydCB7IEJhbm5lckRhdGEsIERldmljZVNldHRpbmdzIH0gZnJvbSAnLi4vdHlwZXMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgU2ltcGxlQmFubmVyIGZyb20gJy4uL21haW4nO1xuaW1wb3J0IHsgRmVhdHVyZUJhc2UgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW5JbnRlck9wIGV4dGVuZHMgRmVhdHVyZUJhc2Uge1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVmFyaWFibGVzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDb25zdHJ1Y3RvclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Y29uc3RydWN0b3IocGx1Z2luOiBTaW1wbGVCYW5uZXIsIHNldHRpbmdzOiBEZXZpY2VTZXR0aW5ncykge1xuXHRcdHN1cGVyKHBsdWdpbiwgc2V0dGluZ3MpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIExpZmVjeWNsZVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ZGVzdHJveSgpIHtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBNZXRob2RzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGUoZGF0YTogQmFubmVyRGF0YSwgYmFubmVyczogSFRNTEVsZW1lbnRbXSkge1xuXHRcdC8qXG5cdFx0Y29uc3Qgdmlld0NvbnRhaW5lciA9ZGF0YT8udmlldz8uY29udGFpbmVyRWw7XG5cdFx0Y29uc3QgaW50ZXJvcCA9IHRoaXMuc2V0dGluZ3MuaW50ZXJvcDtcblx0XHQqL1xuXHR9XG5cblx0Y2hlY2soKSB7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUHJpdmF0ZSBNZXRob2RzXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLG1CQUEyRDs7O0FDQTNELHNCQUE0RTtBQUs1RSxJQUFNLG1CQUF5QztBQUFBLEVBQzlDLFNBQVM7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLFlBQVk7QUFB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QUksUUFBUSxTQUFTLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDM0MsZ0JBQVEsUUFBUSxDQUFDLFFBQVEsUUFBUTtBQUNoQyxnQkFBTSxLQUFLLE1BQU0sR0FBRztBQUNwQixjQUFJLElBQUk7QUFDUCxnQkFBSSxPQUFPO0FBQ1YscUJBQU8sTUFBTSxNQUFNLEdBQUcsQ0FBQztBQUFBLFlBQ3hCLE9BQU87QUFDTixxQkFBTyxPQUFPLE1BQU0sR0FBRyxDQUFDO0FBQUEsWUFDekI7QUFBQSxVQUNEO0FBQUEsUUFDRCxDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFFQSxnQkFBcUM7QUFDcEMsV0FBTyxLQUFLLElBQUksVUFBVSxvQkFBb0IsNkJBQVksS0FBSztBQUFBLEVBQ2hFO0FBQUEsRUFFQSxzQkFBcUM7QUFDcEMsVUFBTSxPQUFPLEtBQUssSUFBSSxVQUFVLGtCQUFrQjtBQUVsRCxXQUFPLEtBQUs7QUFBQSxFQUNiO0FBQUEsRUFFQSx3QkFBd0IsTUFBNEIsY0FBNEM7QUFDL0YsUUFBSSxXQUFXO0FBQ2YsUUFBSSxNQUFNO0FBQ1Qsa0JBQWEsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNoQztBQUNBLFdBQU87QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWO0FBQUEsTUFDQSxjQUFjLGdCQUFnQjtBQUFBLE1BQzlCLG9CQUFvQjtBQUFBLE1BQ3BCLGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxNQUNiO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImluc3RhbmNlIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbnN0YW5jZSIsICJzdHIiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K
