//@@viewOn:imports
import React from "react";
import { createVisualComponent } from "uu5g05";
import { Config } from "uu5g05-dev";
import { Button, Box } from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 25,
      marginTop: 20,
      paddingLeft: 30,
      paddingRight: 0,
    })
}
//@@viewOff:css

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: "Uu5TilesElements.Mock.Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { data, ...otherProps } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5TilesElements.Tile {...otherProps} headerOverlap>
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
                <div>
                  <strong>{data.listName}</strong>
                  <Box significance="distinct" className={Css.footer()}>
                    <div>
                    <Button icon="mdi-update" significance="subdued" tooltip="Update" />
                    <Button icon="mdi-delete" significance="subdued" tooltip="Delete" />
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

export default Tile;
