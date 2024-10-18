import { MouseEventHandler } from "react";

type ButtonProps = {
    className?: string,
    disabled: boolean,
    onClick: MouseEventHandler,
    children: React.ReactNode
}

function Button({disabled, onClick, children, className=undefined} : ButtonProps){
    const disableClass = `${disabled ? 'opacity-50 cursor-not-allowed' : ''} `;
    const baseClassName = "text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800";
    const finalClassName = className !== undefined ? className + " " + disableClass : baseClassName + " " + disableClass;
    return (
        <button className={finalClassName}
        disabled={disabled} 
        onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;