import { Banner } from '../../components/banner/Banner';
import { Button } from '../../components/button/Button';
import './bannerShowcase.scss';

const IconPerson = () => (
  <span className="banner-showcase__icon" aria-hidden>👤</span>
);
const IconChat = () => (
  <span className="banner-showcase__icon banner-showcase__icon--chat" aria-hidden>💬</span>
);

export function BannerShowcase() {
  return (
    <div className="banner-showcase">
      <section className="banner-showcase__section">
        <h2 className="banner-showcase__heading">Banners</h2>
        <p className="banner-showcase__intro">
          Banner is used to display an info message to the user. It accepts text and actions (buttons). Color is determined by type. Banners are not dismissible.
        </p>

        <h3 className="banner-showcase__subheading">System</h3>
        <p className="banner-showcase__label">The simplest system banner</p>
        <div className="banner-showcase__block">
          <Banner variant="system">System banner with some body text.</Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner variant="system" title="System Banner">
            System banner with title
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="system"
            title="System Banner"
            icon={<IconPerson />}
            actions={<Button variant="secondary" color="grey">More information</Button>}
          >
            System banner with title, icon and one action
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="system"
            title="System Banner"
            icon={<IconPerson />}
            actions={
              <>
                <Button variant="tertiary" color="grey">More information</Button>
                <Button variant="primary" color="grey">More information</Button>
              </>
            }
          >
            System banner with title, icon and two actions
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="system"
            title="System Banner"
            icon={<IconChat />}
            actions={
              <>
                <Button variant="tertiary" color="grey">More information</Button>
                <Button variant="primary" color="grey">More information</Button>
              </>
            }
          >
            System banner with title, icon and two Ext.js actions
          </Banner>
        </div>

        <h3 className="banner-showcase__subheading">Info</h3>
        <p className="banner-showcase__label">The simplest info banner</p>
        <div className="banner-showcase__block">
          <Banner variant="info">Info banner with some body text.</Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner variant="info" title="Info Banner">
            Info banner with title
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="info"
            title="Info Banner"
            icon={<IconPerson />}
            actions={<Button variant="secondary" color="grey">More information</Button>}
          >
            Info banner with title, icon and one action
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="info"
            title="Info Banner"
            icon={<IconPerson />}
            actions={
              <>
                <Button variant="tertiary" color="grey">More information</Button>
                <Button variant="primary" color="grey">More information</Button>
              </>
            }
          >
            Info banner with title, icon and two actions
          </Banner>
        </div>

        <h3 className="banner-showcase__subheading">Warning</h3>
        <p className="banner-showcase__label">The simplest warning banner</p>
        <div className="banner-showcase__block">
          <Banner variant="warning">Warning banner with some body text.</Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner variant="warning" title="Warning Banner">
            Warning banner with title
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="warning"
            title="Warning Banner"
            icon={<IconPerson />}
            actions={<Button variant="primary" color="orange">More information</Button>}
          >
            Warning banner with title, icon and one action
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="warning"
            title="Warning Banner"
            icon={<IconPerson />}
            actions={
              <>
                <Button variant="tertiary" color="grey">More information</Button>
                <Button variant="primary" color="orange">More information</Button>
              </>
            }
          >
            Warning banner with title, icon and two actions
          </Banner>
        </div>

        <h3 className="banner-showcase__subheading">Error</h3>
        <p className="banner-showcase__label">The simplest error banner</p>
        <div className="banner-showcase__block">
          <Banner variant="error">Error banner with some body text.</Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner variant="error" title="Error Banner">
            Error banner with title
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="error"
            title="Error Banner"
            icon={<IconPerson />}
            actions={<Button variant="primary" color="red">More information</Button>}
          >
            Error banner with title, icon and one action
          </Banner>
        </div>
        <div className="banner-showcase__block">
          <Banner
            variant="error"
            title="Error Banner"
            icon={<IconPerson />}
            actions={
              <>
                <Button variant="tertiary" color="grey">More information</Button>
                <Button variant="primary" color="red">More information</Button>
              </>
            }
          >
            Error banner with title, icon and two actions
          </Banner>
        </div>
      </section>
    </div>
  );
}
