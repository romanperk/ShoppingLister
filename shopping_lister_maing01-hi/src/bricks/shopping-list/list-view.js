//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Item from "./item";
import Config from "./config/config.js";
//@@viewOff:imports

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    itemList: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    itemList: [],
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const item = event.data;

      try {
        props.onDelete(item);
        addAlert({
          message: `The item ${item.name} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error deleting item", error);
        showError(error, "item delete failed!");
      }
    }

    function handleUpdate(event) {
      try {
        props.onUpdate(event.data);
      } catch (error) {
        ListView.logger.error("Error updating item", error);
        showError(error, "Item update failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        {props.itemList.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            style={{ width: 640, margin: "24px auto" }}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports