import { Tabs, TabList, Tab, TabPanel } from '../../components/tabs/Tabs';
import './tabsShowcase.scss';

const INFO_ICON = 'ⓘ';

function TabsBlock({
  prefix,
  size,
  alignment,
  activeIndex,
  withIcon,
}: {
  prefix: string;
  size: 'big' | 'medium' | 'small';
  alignment: 'left' | 'center' | 'right';
  activeIndex: 0 | 1 | 2;
  withIcon: boolean;
}) {
  const sizeLabel = size === 'big' ? 'Big' : size === 'medium' ? 'Medium' : 'Small';
  const ids = [`${prefix}-1`, `${prefix}-2`, `${prefix}-3`];
  const activeId = ids[activeIndex];
  return (
    <div className="tabs-showcase__block">
      <Tabs defaultValue={activeId} size={size} alignment={alignment}>
        <TabList>
          <Tab id={ids[0]} icon={withIcon ? INFO_ICON : undefined}>
            {sizeLabel} Tab Left
          </Tab>
          <Tab id={ids[1]} icon={withIcon ? INFO_ICON : undefined}>
            {sizeLabel} Tab Center
          </Tab>
          <Tab id={ids[2]} icon={withIcon ? INFO_ICON : undefined}>
            {sizeLabel} Tab Right
          </Tab>
        </TabList>
        <TabPanel id={ids[0]}>Tab Content 1</TabPanel>
        <TabPanel id={ids[1]}>Tab Content 2</TabPanel>
        <TabPanel id={ids[2]}>Tab Content 3</TabPanel>
      </Tabs>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <div className="tabs-showcase">
      <section className="tabs-showcase__section">
        <h2 className="tabs-showcase__heading">Tabs</h2>
        <p className="tabs-showcase__intro">
          Tab sizes (Big, Medium, Small) and alignment (Left, Center, Right). Tabs can optionally show an icon on the active tab.
        </p>

        {/* With icon — full size × alignment grid */}
        <h3 className="tabs-showcase__subheading">With icon</h3>
        <p className="tabs-showcase__variant-intro">
          Pass <code>icon</code> to <code>Tab</code>; the icon is shown only when that tab is active.
        </p>
        {/* Big: Left (1st active), Center (2nd active), Right (3rd active) */}
        <TabsBlock prefix="icon-big-l" size="big" alignment="left" activeIndex={0} withIcon />
        <TabsBlock prefix="icon-big-c" size="big" alignment="center" activeIndex={1} withIcon />
        <TabsBlock prefix="icon-big-r" size="big" alignment="right" activeIndex={2} withIcon />
        {/* Medium */}
        <TabsBlock prefix="icon-med-l" size="medium" alignment="left" activeIndex={0} withIcon />
        <TabsBlock prefix="icon-med-c" size="medium" alignment="center" activeIndex={1} withIcon />
        <TabsBlock prefix="icon-med-r" size="medium" alignment="right" activeIndex={2} withIcon />
        {/* Small */}
        <TabsBlock prefix="icon-sml-l" size="small" alignment="left" activeIndex={0} withIcon />
        <TabsBlock prefix="icon-sml-c" size="small" alignment="center" activeIndex={1} withIcon />
        <TabsBlock prefix="icon-sml-r" size="small" alignment="right" activeIndex={2} withIcon />

        {/* Without icon — full size × alignment grid */}
        <h3 className="tabs-showcase__subheading">Without icon</h3>
        <p className="tabs-showcase__variant-intro">
          Omit <code>icon</code> for text-only tabs.
        </p>
        <TabsBlock prefix="noicon-big-l" size="big" alignment="left" activeIndex={0} withIcon={false} />
        <TabsBlock prefix="noicon-big-c" size="big" alignment="center" activeIndex={1} withIcon={false} />
        <TabsBlock prefix="noicon-big-r" size="big" alignment="right" activeIndex={2} withIcon={false} />
        <TabsBlock prefix="noicon-med-l" size="medium" alignment="left" activeIndex={0} withIcon={false} />
        <TabsBlock prefix="noicon-med-c" size="medium" alignment="center" activeIndex={1} withIcon={false} />
        <TabsBlock prefix="noicon-med-r" size="medium" alignment="right" activeIndex={2} withIcon={false} />
        <TabsBlock prefix="noicon-sml-l" size="small" alignment="left" activeIndex={0} withIcon={false} />
        <TabsBlock prefix="noicon-sml-c" size="small" alignment="center" activeIndex={1} withIcon={false} />
        <TabsBlock prefix="noicon-sml-r" size="small" alignment="right" activeIndex={2} withIcon={false} />
      </section>
    </div>
  );
}
