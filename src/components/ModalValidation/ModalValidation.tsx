import { useRef } from "react";
import Button from "../Button/Button";

type ModalValidationProps = {
    modalRef: React.MutableRefObject<null>,
    setCart: CallableFunction
}

function ModalValidation({modalRef, setCart}: ModalValidationProps){
    const successModal = useRef(null);
    const handleForm = (e: React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(modalRef.current === null) return;
        (modalRef.current as HTMLDialogElement).close();
        localStorage.setItem('articles', '[]');
        if(successModal.current === null) return;
        (successModal.current as HTMLDialogElement).showModal();
        setCart([]);
    }
    return (
        <>
        <dialog className="modal" ref={successModal}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Commande validé avec succès !
                        </h3>
                        <form method="dialog">
                            <button className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Fermer le dialog</span>
                            </button>
                        </form>
                    </div>
                    <div className="p-4 md:p-5">
                        <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nous vous remercions pour votre achat !</p>
                    </div>
                </div>
            </div>
        </dialog>
        <dialog className="modal" ref={modalRef}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Informations transport
                        </h3>
                        <form method="dialog">
                            <button className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Fermer le dialog</span>
                            </button>
                        </form>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#" onSubmit={handleForm}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="fullname@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre nom complet</label>
                                <input type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="fullname@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre adresse complete</label>
                                <input type="text" name="adress" id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="fullname@gmail.com" required />
                            </div>
                            <div className="flex justify-between">
                                <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Livraison sous 3 jours ouvrable.</p>
                            </div>
                            <div>
                                <Button disabled={false} onClick={()=>{return;}} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider ma commande</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
        </>
    )
}

export default ModalValidation;



