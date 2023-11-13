//@@viewOn:imports
import { Utils, createVisualComponent, Content } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { useJokes } from "../bricks/list-context.js";
import ListsView from "../bricks/shopping-list-summ/lists-view.js";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const { remove, update, create } = useJokes();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <div style={{ textAlign: 'center' }}>
          <h1>Přehled nákupních seznamů</h1>
        </div>
        <ListsView onDelete={remove} onUpdate={update} onCreate={create} />
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
