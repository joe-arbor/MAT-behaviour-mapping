import { useState } from 'react';
import { ChevronRight, HelpCircle, Star } from 'lucide-react';
import { Card } from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import './cardShowcase.scss';

const defaultDescription =
  'When you click on this, it will do something really exciting.';

export function CardShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="card-showcase">
      <section className="card-showcase__section">
        <h2 className="card-showcase__heading">Card</h2>
        <p className="card-showcase__intro">
          Single card component. Supports title, subtitle, description, icon, right element (e.g. arrow), action button, and title info. States: default, selected, inactive. Hover and active when interactive (onClick).
        </p>

        <div className="card-showcase__grid">
          <div className="card-showcase__block">
            <span className="card-showcase__label">Default</span>
            <Card title="Title of Card" description={defaultDescription} />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">Selected</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              selected
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">Inactive</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              inactive
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">Interactive (hover / active)</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              onClick={() => {}}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With subtitle</span>
            <Card
              subtitle="Subtitle"
              title="Title of Card"
              description={defaultDescription}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With right arrow</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              rightElement={<ChevronRight size={20} strokeWidth={2} />}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With icon</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              icon={<Star size={24} strokeWidth={1.5} />}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With icon and arrow</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              icon={
                <span className="card-showcase__vi-icon" aria-hidden>VI</span>
              }
              rightElement={<ChevronRight size={20} strokeWidth={2} />}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With action button</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              action={
                <Button variant="secondary" color="green" size="small">
                  Button
                </Button>
              }
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">With title info</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              titleInfo={<HelpCircle size={16} strokeWidth={2} />}
            />
          </div>

          <div className="card-showcase__block">
            <span className="card-showcase__label">Selectable (click to toggle)</span>
            <Card
              title="Title of Card"
              description={defaultDescription}
              selected={selectedId === 'selectable'}
              onClick={() =>
                setSelectedId((id) => (id === 'selectable' ? null : 'selectable'))
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
