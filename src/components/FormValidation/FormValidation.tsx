import Button from "../Button/Button";

type FormValidationProps = {
    totalPrice: number
}

function FormValidation({totalPrice}: FormValidationProps){
    return (
        <div className="mt-5">
            <div className="text-center">
                <p className="text-2xl font-extrabold text-gray-700 mb-5">Total: <span className="text-green-500">{totalPrice}€</span></p>
                <Button onClick={() => {return}} disabled={false} >Confirmer la commande</Button>
            </div>
        </div>
    )
}

export default FormValidation;