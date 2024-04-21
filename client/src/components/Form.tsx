import { useState } from "react";

function Form(props: { hidden: boolean }) {
  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await fetch(`http://localhost:8000/v1/password`, {
        method: "POST",
        body: JSON.stringify({ password: password }),
      });
    } catch (e: any) {
      console.log(e);
    }
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  const [password, setPassword] = useState<string>("");
  const { hidden } = props;
  return hidden === false ? (
    <div className="flex flex-col text-white">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          handleForm(event);
        }}
      >
        <label htmlFor="">Contraseña: </label>
        <input
          className="text-black"
          type="text"
          name="password"
          id="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handlePasswordChange(e);
          }}
        />
        <button type="submit">Submit</button>
        {/* <label htmlFor="">Para: </label>
        <input type="text" /> */}
      </form>
    </div>
  ) : null;
}
export default Form;
