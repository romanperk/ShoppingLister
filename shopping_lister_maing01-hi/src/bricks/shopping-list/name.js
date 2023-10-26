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

const Name = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Name",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    name: PropTypes.shape({
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
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    return (
      <Box {...elementProps}>
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
        {props.name.name}
        </Text>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Name };
export default Name;
//@@viewOff:exports