import Card from "./components/Card";
function App() {
  return (
    <>
      <h1>My Password Manager</h1>
      <div className="grid grid-cols-1 grid-rows-2 h-[90vh]">
        <section id="cards" className="flex flex-row p-5">
          <Card Title="Banco" Text="****" />
          <Card Title="Netflix" Text="****" />
        </section>
        <button className="bg-[--primary] w-10 h-10 mr-5 rounded-lg justify-self-end self-end">
          <img src="./add.png" alt="" />
        </button>
      </div>
    </>
  );
}

export default App;
