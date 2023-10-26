//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Button, Header } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),

  header: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      paddingLeft: 16,
      paddingRight: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.item, event));
    }

    function handleUpdate(event) {
      props.onUpdate(new Utils.Event(props.item, event));
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    return (
      <Box {...elementProps}>
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
        <Button icon="mdi-pencil" onClick={handleUpdate} significance="subdued" tooltip="Update" />
        {props.item.name}
          <div>
            <Button icon="mdi-delete" onClick={handleDelete} significance="subdued" tooltip="Delete" />
          </div>
        </Text>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports