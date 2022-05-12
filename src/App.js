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
      onInit={(editor) => {
        editor.Panels.addButton("options", {
          id: "update-theme",
          className: "fa fa-adjust",
          command: "open-update-theme",
          attributes: {
            title: "Update Theme",
            "data-tooltip-pos": "bottom",
          },
        });
      }}
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

export default App;
