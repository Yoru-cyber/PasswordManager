function Form(props: { hidden: boolean }) {
  const { hidden } = props;
  return hidden === false ? (
    <div className="flex flex-col text-white">
      <form action="">
        <label htmlFor="">Contraseña: </label>
        <input type="text" name="" id="" />
        <label htmlFor="">Para: </label>
        <input type="text" />
      </form>
    </div>
  ) : null;
}
export default Form;
