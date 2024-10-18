import Button from "../Button/Button";

type FormValidationProps = {
    totalPrice: number,
    modalRef: React.MutableRefObject<null>
}

function FormValidation({totalPrice, modalRef}: FormValidationProps){
    return (
        <div className="sticky bottom-0 left-0 right-0 bg-gray-100 py-5 border-t">
            <div className="text-center">
                <p className="text-2xl font-extrabold text-gray-700 mb-5">Total: <span className="text-green-500">{totalPrice}€</span></p>
                <Button onClick={() => {
                    if(modalRef.current === null) return;
                    (modalRef.current as HTMLDialogElement).showModal();
                }} disabled={totalPrice <= 0} >Confirmer la commande</Button>
            </div>
        </div>
    )
}

export default FormValidation;