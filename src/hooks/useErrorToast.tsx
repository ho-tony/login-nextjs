import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';


const useErrorToast = (error: string) => {
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!error || hasShownToast.current) return;

        if (error === "not_authenticated") {
            toast.error("You need to be logged in to access this page", { toastId: "not_authenticated_error" });
            hasShownToast.current = true;
        } else if (error === "invalid_token") {
            toast.error("Your login token has expired, sign in again", { toastId: "invalid_token_error" });
            hasShownToast.current = true;
        }
    }, [error, hasShownToast]);
};

export default useErrorToast;