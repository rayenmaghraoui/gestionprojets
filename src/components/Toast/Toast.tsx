import React, { useEffect } from "react";
import "../../styles/Toast.css";

const Toast = ({
    message,
    onClose,
}: {
    message: string;
    onClose: () => void;
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Fermer automatiquement le toast après 3 secondes
        }, 3000);
        return () => clearTimeout(timer); // Nettoyer le timer
    }, [onClose]);

    return (
        <div className="toast">
            <p>{message}</p>
        </div>
    );
};

export default Toast;