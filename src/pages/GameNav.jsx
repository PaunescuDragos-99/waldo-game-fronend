// eslint-disable-next-line react/prop-types
export default function GameNav({ title, imageURL }) {
  return (
    <>
      <h1>{title}</h1>
      <img src={imageURL} alt={imageURL} />
    </>
  );
}
