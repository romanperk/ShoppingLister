//@@viewOn:imports
import React from "react";
import { createVisualComponent, PropTypes, Utils, useRoute  } from "uu5g05";
import { Config } from "uu5g05-dev";
import { Button, Box } from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import { useJokes } from "../list-context.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  body: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 30,
      marginTop: 20,
      paddingLeft: 10,
      paddingRight: 0,
    })
}
//@@viewOff:css

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: "Uu5TilesElements.Mock.Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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
    const { isUserOwner } = useJokes();
    const [route, setRoute] = useRoute();
    //@@viewOn:private
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.data, event));
    }

    function handleUpdate(event) {
      props.onUpdate(new Utils.Event(props.data, event));
    }

    function handleSelect() {
      props.selectlist(props.data.id);
      setRoute("shoppingListDetail");
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    
    return (
      <Uu5TilesElements.Tile {...elementProps} headerOverlap>
        {({ padding }) => {
          return (
            <>
              <div
                className={Config.Css.css({
                  paddingTop: 25,
                  paddingRight: 25,
                  paddingBottom: 25,
                  paddingLeft: 25,
                })}
              >
                <div style={{ textAlign: 'center' }}>
                  <strong>{props.data.listName}</strong>
                  <Box className={Css.body()}>
                    <div>
                      <Button icon="mdi-open-in-new" significance="subdued" colorScheme="primary" onClick={handleSelect} />
                      <Button icon="mdi-update" significance="subdued" colorScheme="warning" onClick={handleUpdate} tooltip="Update" />
                  {isUserOwner(props.data?.id) && !props.isArchived && (
                    <>
                      <Button icon="mdi-delete" significance="subdued" colorScheme="red" onClick={handleDelete} tooltip="Delete" />
                    </>
                    )}
                    </div>
                  </Box>

                </div>
              </div>
            </>
          );
        }}
      </Uu5TilesElements.Tile>
    );
    //@@viewOff:render
  },
});
export {Tile};
export default Tile;
