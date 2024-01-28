import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    // expose open function as api and show the modal component in virtual dom in root-modal div through createPortal
    // we are not exposing entire dialog (dom node) but only its showModal() method bcz it seperate both NewProject(parent)
    // and its child (Modal) componet bcz later when Modal component changes (dialog dom node replaced by other node)
    // so parent component not need to change bcz only exposed func needs to be changed in same Modal component  

    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog
            ref={dialog}
            className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        >
            {children}

            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Modal;
