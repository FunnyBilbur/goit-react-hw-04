export default function ImageCard({ src, alt, id }) {
  return (
    <div>
      <img src={src} alt={alt} id={id} />
    </div>
  );
}
