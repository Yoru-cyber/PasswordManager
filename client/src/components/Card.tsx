interface ICardProps {
  Title: string;
  Text: string;
}
function Card(props: ICardProps) {
  const { Title, Text } = props;
  return (
    <>
      <div className="w-64 h-64 m-5 p-5 flex flex-col items-center bg-[--primary] rounded-lg">
        <h1 className="font-bold">{Title}</h1>
        <p>{Text}</p>
      </div>
    </>
  );
}
export default Card;
