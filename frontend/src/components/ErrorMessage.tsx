import React, { useState, useEffect } from 'react'
type ErrorMessageProps = {
    children: React.ReactNode
    triggerKey : number
}
export default function ErrorMessage({ children, triggerKey }: ErrorMessageProps) {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setFading(true), 4500);
        const remove = setTimeout(() => setVisible(false), 5000);
        return () => {
            clearTimeout(timeout);
            clearTimeout(remove);
        };
    }, [triggerKey ,children]);

    if (!visible) return null;

    return (
        <p
            className={`mt-1 text-sm text-red-400 bg-red-500/10 px-3 py-1.5 rounded-md border border-red-400/30 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"
                }`}
        >
            {children}
        </p>
    );
}
