import React from 'react';
import { Button } from '../../components/button/Button';
import './buttonsShowcase.scss';

const IconPlus = () => (
  <span style={{ fontSize: '1em', lineHeight: 1 }} aria-hidden>+</span>
);
const IconCheck = () => (
  <span style={{ fontSize: '1em', lineHeight: 1 }} aria-hidden>✓</span>
);
const IconCircleDot = () => (
  <span style={{ fontSize: '1em', lineHeight: 1 }} aria-hidden>⊙</span>
);
const IconX = () => (
  <span style={{ fontSize: '1em', lineHeight: 1 }} aria-hidden>✗</span>
);

export function ButtonsShowcase() {
  return (
    <div className="buttons-showcase">
      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Active buttons</h2>
        <div className="buttons-showcase__row" data-testid="buttons-active-primary-row">
          <Button variant="primary" color="grey">Button grey</Button>
          <Button variant="primary" color="orange">Button orange (confirmation)</Button>
          <Button variant="primary" color="green">Button green</Button>
          <Button variant="primary" color="red">Button red (confirmation)</Button>
        </div>
      </section>

      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Disabled buttons</h2>
        <div className="buttons-showcase__row" data-testid="buttons-disabled-row">
          <Button variant="primary" color="grey" disabled>Button grey</Button>
          <Button variant="primary" color="green" disabled>Button green</Button>
        </div>
      </section>

      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Icon buttons</h2>
        <div className="buttons-showcase__row">
          <Button variant="primary" color="grey" iconLeft={<IconPlus />}>Button grey</Button>
          <Button variant="primary" color="green" iconLeft={<IconCheck />}>Button green</Button>
          <Button variant="primary" color="orange" iconLeft={<IconCircleDot />}>Button orange</Button>
          <Button variant="primary" color="red" iconLeft={<IconX />}>Button red</Button>
        </div>
      </section>

      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Menu buttons</h2>
        <div className="buttons-showcase__row">
          <Button variant="primary" color="grey" menu>Button grey</Button>
          <Button variant="primary" color="green" menu>Button green</Button>
          <Button variant="primary" color="orange" menu>Button orange</Button>
          <Button variant="primary" color="red" menu>Button red</Button>
        </div>
      </section>

      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Secondary buttons (V1)</h2>
        <p className="buttons-showcase__description">Text link style without underline</p>
        <div className="buttons-showcase__row">
          <Button variant="secondaryV1" color="grey">Cancel</Button>
          <Button variant="secondaryV1" color="grey">Ask Arbor</Button>
          <Button variant="secondaryV1" color="green">Ask Arbor</Button>
          <Button variant="secondaryV1" color="grey" disabled>Disabled</Button>
        </div>
      </section>

      <section className="buttons-showcase__section">
        <h2 className="buttons-showcase__heading">Secondary buttons (V2)</h2>
        <div className="buttons-showcase__row">
          <Button variant="secondary" color="green">Secondary (Tooltip)</Button>
          <Button variant="secondary" color="green" iconLeft={<span aria-hidden>📄</span>}>Secondary (Icon)</Button>
          <Button variant="secondary" color="green">Secondary (Colour)</Button>
          <Button variant="secondary" color="green" menu>Secondary (Menu)</Button>
          <Button variant="secondary" color="green" iconLeft={<span aria-hidden>🌿</span>}>Secondary (Arbor AI)</Button>
          <Button variant="secondary" color="green" disabled>Secondary (Disabled)</Button>
        </div>
      </section>
    </div>
  );
}
