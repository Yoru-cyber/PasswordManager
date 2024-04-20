import Card from "./components/Card";
import IPassword from "./interfaces/IPassword";
import { useFetch } from "./services/getData";
import Form from "./components/Form";
import { useState } from "react";
function App() {
  const [form, displayForm] = useState<boolean>(true);
  const { data, isPending, error } = useFetch(
    "http://localhost:8000/v1/password"
  );
  return (
    <>
      <h1>My Password Manager</h1>
      <div className="grid grid-cols-1 grid-rows-2 h-[90vh]">
        <section id="cards" className="flex flex-row p-5">
          {isPending && <div>Loading....</div>}
          {error && <div>{error}</div>}
          {data &&
            data.map((password: IPassword) => (
              <Card
                key={password.id}
                Id={password.id}
                Title=""
                Text={password.password}
              />
            ))}
        </section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus bg-[--primary] w-10 h-10 mr-5 rounded-lg justify-self-end self-end transition transform hover:scale-110 ease-in-out"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => {
            displayForm(false);
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </div>
      <Form hidden={form} />
    </>
  );
}

export default App;
