import React from "react";

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    cancelText = "Закрыть",
    confirmText = "Подтвердить",
    cancelColor = "primary",
    confirmColor = "danger",
    size = "md",
    loading = false
}) => (
    <Modal
        isOpen={isOpen}
        size={size}
    >
        {(title && !loading) && (
            <ModalHeader toggle={onClose}>
                {title}
            </ModalHeader>
        )}
        <ModalBody className="text-center m-3">
            {children}
        </ModalBody>
        {!loading && (
            <ModalFooter>
                <Button color={cancelColor} onClick={onClose}>
                    {cancelText}
                </Button>
                <Button color={confirmColor} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </ModalFooter>
        )}
    </Modal>
);

export default ConfirmationModal;