import { MouseEventHandler } from "react";

type ButtonProps = {
    disabled: boolean,
    onClick: MouseEventHandler,
    children: React.ReactNode
}

function Button({disabled, onClick, children} : ButtonProps){
    return (
        <button className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''} text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800`}
        disabled={disabled} 
        onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;