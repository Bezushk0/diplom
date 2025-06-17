import { useEffect, useState } from "react";

export const usePageError = (intialError) => {
    const [error, setError] = useState(intialError);

    useEffect(() => {
        if (!error) {
            return;
        }

        const timerId = setTimeout(() => {
            setError('');
        }, 3000);

        return () => {
            clearTimeout(timerId);
        }
    }, [error])

    return [error, setError];
}