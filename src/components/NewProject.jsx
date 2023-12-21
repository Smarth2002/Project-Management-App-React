import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onCancel, onSave }) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        // validation of inputs
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredDueDate.trim().length === 0
        ) {
            modal.current.open();
            return;
        }

        const obj = {
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        };

        onSave(obj);
    }

    return (
        <>
            {/* modal is always present in NewProject component but visible when showModal() is called using open() on invalid input*/}
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    Invalid Input
                </h2>
                <p className="text-stone-600 mb-4">
                    Opps. you forgot to entere a value
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a valid value for every input
                    field
                </p>
            </Modal>

            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" label="Title" ref={title}></Input>
                    <Input
                        label="Description"
                        textarea
                        ref={description}
                    ></Input>
                    <Input type="date" label="Due Date" ref={dueDate}></Input>
                </div>
            </div>
        </>
    );
}
