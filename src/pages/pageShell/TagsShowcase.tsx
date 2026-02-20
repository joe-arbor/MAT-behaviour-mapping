import React from 'react';
import { Tag } from '../../components/tag/Tag';
import { Tags } from '../../components/tag/Tags';
import './tagsShowcase.scss';

const STUDENT_TAGS = ['SEN', 'Intervention', 'FSM', 'EAL', 'PP', 'G&T'];

export function TagsShowcase() {
  return (
    <div className="tags-showcase">
      <section className="tags-showcase__section">
        <h2 className="tags-showcase__heading">Student Tag</h2>
        <div className="tags-showcase__row">
          <strong className="tags-showcase__label">Big</strong>
          <Tags>
            {STUDENT_TAGS.map(label => (
              <Tag key={label} size="big">{label}</Tag>
            ))}
          </Tags>
        </div>
        <div className="tags-showcase__row">
          <strong className="tags-showcase__label">Default</strong>
          <Tags>
            {STUDENT_TAGS.map(label => (
              <Tag key={label} size="default">{label}</Tag>
            ))}
          </Tags>
        </div>
        <div className="tags-showcase__row">
          <strong className="tags-showcase__label">Small</strong>
          <Tags>
            {STUDENT_TAGS.map(label => (
              <Tag key={label} size="small">{label}</Tag>
            ))}
          </Tags>
        </div>
      </section>
    </div>
  );
}
