//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import CreateItem from "./create-item.js";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};
//@@viewOff:constants

//@@viewOn:helpers
function CreateButton(props) {
  return (
    <Button {...props} colorScheme="primary" significance="highlighted">
      Přidej položku
    </Button>
  );
}
//@@viewOff:helpers

const CreateView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();
    const [mode, setMode] = useState(Mode.BUTTON);

    function handleSubmit(event) {
      let item;

      try {
        item = props.onCreate(event.data.value);
      } catch (error) {
        // We pass Error.Message instance to the Uu5Forms.Form that shows alert
        throw new Utils.Error.Message("Item create failed!", error);
      }

      addAlert({
        message: `Item ${item.name} has been created.`,
        priority: "success",
        durationMs: 2000,
      });

      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    switch (mode) {
      case Mode.BUTTON:
        return <CreateButton {...elementProps} onClick={() => setMode(Mode.FORM)} />;
      default:
        return <CreateItem {...elementProps} onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateView };
export default CreateView;
//@@viewOff:exports