import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="" className="modal__close_image" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            <p className="modal__submit_text">{buttonText}</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
