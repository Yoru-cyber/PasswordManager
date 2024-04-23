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
      <h1 className="font-bold tracking-widest">My Password Manager</h1>
      <div className="flex flex-col  tracking-wider">
        <section
          id="cards"
          className="flex flex-row flex-wrap p-5 justify-center h-fit w-full"
        >
          {isPending && <h1>Loading....</h1>}
          {error &&
            (console.log(error),
            (
              <div role="alert" className="alert alert-error w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error.message}</span>
              </div>
            ))}
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
          className="icon icon-tabler icon-tabler-plus bg-gradient-to-br from-[--primary] to-purple-800 w-10 h-10 mr-5 mb-5 rounded-lg justify-self-end self-end transition transform hover:scale-110 ease-in-out"
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
