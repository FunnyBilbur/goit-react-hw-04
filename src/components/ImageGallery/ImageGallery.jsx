import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ data, onClick }) {
  const handleClick = evt => {
    console.dir(evt.target.id);
    onClick(evt.target.id);
  };
  return (
    <ul>
      {data.map(item => (
        <li key={item.id} onClick={handleClick}>
          <ImageCard
            src={item.urls.small}
            alt={item.alt_description}
            id={item.id}
            regular={item.urls.regular}
          />
        </li>
      ))}
    </ul>
  );
}
