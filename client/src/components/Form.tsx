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
    <div className="absolute top-[20%] left-[40%] flex flex-col items-center bg-slate-700 w-72 h-72 rounded-xl text-white">
      <h1 className="font-bold">Nueva contraseña</h1>
      <form
        id="password-form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          handleForm(event);
        }}
        className="flex flex-col items-center w-max"
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            name="password"
            className="grow"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handlePasswordChange(e);
            }}
          />
        </label>
        {/* <label htmlFor="">Contraseña: </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          name="password"
          id="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handlePasswordChange(e);
          }}
        /> */}
        <button type="submit">Submit</button>
        {/* <label htmlFor="">Para: </label>
        <input type="text" /> */}
      </form>
    </div>
  ) : null;
}
export default Form;
