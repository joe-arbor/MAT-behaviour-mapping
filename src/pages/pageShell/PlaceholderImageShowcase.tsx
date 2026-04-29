import './placeholderImageShowcase.scss';

const PLACEHOLDERS: { src: string; alt: string }[] = [
  { src: '/placeholder-images/user.png', alt: 'User / single person' },
  { src: '/placeholder-images/users-2.png', alt: 'Two people' },
  { src: '/placeholder-images/users-3.png', alt: 'Group of people' },
  { src: '/placeholder-images/graduation.png', alt: 'Graduation / education' },
  { src: '/placeholder-images/document.png', alt: 'Document / file' },
  { src: '/placeholder-images/book.png', alt: 'Open book' },
  { src: '/placeholder-images/scroll.png', alt: 'Scroll / diploma' },
  { src: '/placeholder-images/grid.png', alt: 'Grid / layout' },
  { src: '/placeholder-images/question.png', alt: 'Question / unknown' },
  { src: '/placeholder-images/bell.png', alt: 'Bell / notification' },
  { src: '/placeholder-images/info.png', alt: 'Information' },
];

export function PlaceholderImageShowcase() {
  return (
    <div className="placeholder-image-showcase">
      <section className="placeholder-image-showcase__section">
        <h2 className="placeholder-image-showcase__heading">Placeholder Image</h2>
        <p className="placeholder-image-showcase__intro">
          Circular placeholder icons for avatars, content blocks, and empty states.
        </p>
        <ul className="placeholder-image-showcase__grid">
          {PLACEHOLDERS.map(({ src, alt }) => (
            <li key={src} className="placeholder-image-showcase__item">
              <img
                src={src}
                alt={alt}
                className="placeholder-image-showcase__img"
                width={64}
                height={64}
              />
              <span className="placeholder-image-showcase__label">{alt}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
