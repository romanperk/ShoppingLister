//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const UserTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.user, event));
    }

    // function handleUpdate(event) {
    //   props.onUpdate(new Utils.Event(props.user, event));
    // }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box {...elementProps}>
        <Text category="interface" segment="title" type="minor" colorScheme="building">
          {props.user.name}
        </Text>
        <Button icon="mdi-delete" onClick={handleDelete} significance="subdued" tooltip="Delete" />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UserTile };
export default UserTile;
//@@viewOff:exports
