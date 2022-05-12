import "grapesjs/dist/css/grapes.min.css";
import { GrapesjsReact } from "grapesjs-react";
import { blockManager } from "./blockManager";
import tailWIndPlugin from "grapesjs-tailwind";

const escapeName = (name) =>
  `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");

function App() {
  // plugins={["gjs-preset-webpage", "gjs-blocks-basic"]}
  return (
    <GrapesjsReact
      id="grapesjs-react"
      onInit={loadPanels}
      blockManager={blockManager}
      plugins={[tailWIndPlugin]}
      height={"100vh"}
      pluginsOpts={{
        "grapesjs-tailwind": {
          /* Test here your options  */
        },
      }}
      selectorManager={{ escapeName }}
    />
  );
}

export const loadPanels = (editor) => {
  // Show Style Manager
  editor.on("component:selected", () => {
    const openSmBtn = editor.Panels.getButton("views", "open-sm");
    const openLayersBtn = editor.Panels.getButton("views", "open-layers");

    // Don't switch when the Layer Manager is on or there is no selected component
    if (
      (!openLayersBtn || !openLayersBtn.get("active")) &&
      editor.getSelected()
    ) {
      openSmBtn && openSmBtn.set("active", 1);
    }
  });

  editor.on("load", () => editor.Panels.getButton("views", "open-blocks").set("active", 1));

  editor.Commands.add("canvas-clear", (e) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Do you want to clear the canvas?");
    if (result) {
      e.runCommand("core:canvas-clear");
    }
  });

  // Config Buttons
  editor.Panels.removeButton("options", "export-template");

  editor.Panels.getButton("options", "sw-visibility").set("active", false);

  editor.Panels.addButton("options", {
    id: "export-template",
    className: "fa fa-code",
    command: (e) => e.runCommand("export-template"),
    attributes: { title: "View Code" },
  });

  editor.Panels.addButton("options", {
    id: "undo",
    className: "fa fa-undo",
    command: (e) => e.runCommand("core:undo"),
    attributes: { title: "Undo" },
  });

  editor.Panels.addButton("options", {
    id: "redo",
    className: "fa fa-repeat",
    command: "core:redo",
    attributes: { title: "Redo" },
  });

  editor.Panels.addButton("options", {
    id: "canvas-clear",
    className: "fa fa-trash",
    command: (e) => e.runCommand("canvas-clear"),
  });

  editor.Panels.addButton("options", {
    id: "update-theme",
    className: "fa fa-adjust",
    command: "open-update-theme",
    attributes: {
      title: "Update Theme",
      "data-tooltip-pos": "bottom",
    },
  });
};

export default App;
