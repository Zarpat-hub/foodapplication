import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const ProfilePage = () => {
  const user = useContext(LoginContext);

  const deleteAccount = () => {
    console.log("konto usunięte");
  };

  return (
    <section>
      <h2>Dzień dobry {user.name}!</h2>
      <h4>Twoje zamówienia</h4>
      <button className="btn btn-primary" onClick={deleteAccount}>
        Usuń konto
      </button>
    </section>
  );
};

export default ProfilePage;
