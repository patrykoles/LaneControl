import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;

        // Sprawdzenie, czy `err` i `err.data` są zdefiniowane przed użyciem
        if (err?.data) {
            if (Array.isArray(err.data)) {
                // Obsługa, gdy `err.data` jest tablicą
                for (let val of err.data) {
                    toast.warning(val.description);
                }
            } else if (Array.isArray(err?.data.errors)) {
                // Obsługa, gdy `err.data.errors` jest tablicą
                for (let val of err?.data.errors) {
                    toast.warning(val.description);
                }
            } else if (typeof err?.data.errors === "object") {
                // Obsługa, gdy `err.data.errors` jest obiektem
                for (let key in err?.data.errors) {
                    toast.warning(err?.data.errors[key][0]);
                }
            } else {
                // Obsługa, gdy `err.data` jest tekstem lub jednym komunikatem
                toast.warning(err?.data);
            }
        } else if (err?.status === 401) {
            // Obsługa błędu 401 (brak autoryzacji)
            toast.warning("Please login");
            window.history.pushState({}, "LoginPage", "/login");
        }else if (err?.status === 404) {
            // Obsługa błędu 404
            toast.warning("Not found");
        } else {
            // Obsługa dla nieoczekiwanych błędów
            toast.warning("An unexpected error occurred.");
        }
    } else {
        // Obsługa innych typów błędów, jeśli nie są to błędy Axios
        toast.error("A network or unknown error occurred.");
    }
};
