import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  onClose,
  handleEditProfile,
  buttonText,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name);
      setAvatar(currentUser?.avatar);
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          required
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={handleAvatarChange}
          placeholder="Avatar"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
