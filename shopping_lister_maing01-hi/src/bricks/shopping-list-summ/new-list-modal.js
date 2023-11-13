import { Utils, Fragment, createComponent, useState, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { LoremIpsum, Config } from "uu5g05-dev";
import CreateFormList from "./new-list-form";

const ModalOnButton = createComponent({
  render({ header, ...props }) {
    /*@@viewOn:example*/
    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Uu5Elements.Button onClick={() => setOpen(true)}>{header}</Uu5Elements.Button>
        <Uu5Elements.Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          {props.children || <CreateFormList/>}
        </Uu5Elements.Modal>
      </Fragment>
    );

    /*@@viewOn:example*/
  },
});

export { ModalOnButton};
export default ModalOnButton;