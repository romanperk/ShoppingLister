import { Fragment, createComponent, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import NewListForm from "./new-list-form";

const ModalOnButton = createComponent({
  render({ header, ...props }) {
    /*@@viewOn:example*/
    const [open, setOpen] = useState();

    return (
      <Fragment>
        <Uu5Elements.Button onClick={() => setOpen(true)}>{header}</Uu5Elements.Button>
        <Uu5Elements.Modal {...props} header={header} open={open} onClose={() => setOpen(false)}>
          {props.children || <NewListForm/>}
        </Uu5Elements.Modal>
      </Fragment>
    );

    /*@@viewOn:example*/
  },
});

export { ModalOnButton};
export default ModalOnButton;