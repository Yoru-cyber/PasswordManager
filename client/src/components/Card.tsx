interface ICardProps {
  Title: string;
  Text: string;
  Id: number;
}
function Card(props: ICardProps) {
  const { Title, Text, Id } = props;
  return (
    <>
      <div
        id={`${Id}`}
        className="w-64 h-64 m-5 p-5 flex flex-col items-center bg-gradient-to-br from-[--primary] to-purple-800 rounded-lg transition transform hover:scale-110 ease-in-out"
        onClick={(e) => {
          console.log("This is the card: " + e.currentTarget.id);
        }}
      >
        <h1 className="font-bold">{Title}</h1>
        <p>{Text}</p>
      </div>
    </>
  );
}
export default Card;
