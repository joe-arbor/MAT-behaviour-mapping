import React from 'react';
import {
  InfoPanel,
  InfoPanelHeader,
  InfoPanelRow,
  InfoPanelTags,
} from '../../components/infoPanel';
import { Tag } from '../../components/tag/Tag';
import { Folder } from 'lucide-react';
import './infoPanelShowcase.scss';

const avatar = (
  <img
    src="/placeholder-images/user.png"
    alt=""
    width={40}
    height={40}
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />
);

export function InfoPanelShowcase() {
  return (
    <div className="info-panel-showcase">
      <h1 className="info-panel-showcase__title">Info Panels</h1>

      <InfoPanel
        header={<InfoPanelHeader avatar={avatar} name="Name Surname" reference="8F" />}
        headerAction={<Folder size={16} strokeWidth={2} color="var(--color-grey-500)" aria-hidden />}
      >
        {null}
      </InfoPanel>

      <InfoPanel
        header={<InfoPanelHeader avatar={avatar} name="Name Surname" reference="8F" />}
      >
        <InfoPanelRow label="Label" value="Long Value" onClick={() => {}} />
        <InfoPanelRow label="Label" value="Value" onClick={() => {}} />
      </InfoPanel>

      <InfoPanel
        header={<InfoPanelHeader avatar={avatar} name="Name Surname" reference="8F" />}
      >
        <InfoPanelTags>
          <Tag>SEN</Tag>
          <Tag>Intervention</Tag>
          <Tag>FSM</Tag>
        </InfoPanelTags>
      </InfoPanel>

      <InfoPanel
        header={<InfoPanelHeader avatar={avatar} name="Name Surname" reference="8F" />}
      >
        <InfoPanelRow label="Label" value="Value" onClick={() => {}} />
        <InfoPanelRow label="Very Very Long Label" value="Very Very Very Long Value" onClick={() => {}} />
        <InfoPanelRow label="Label" value="Value" onClick={() => {}} />
        <InfoPanelRow label="Very Very Long Label" value="Very Very Very Long Value" onClick={() => {}} />
        <InfoPanelTags>
          <Tag>SEN</Tag>
          <Tag>Intervention</Tag>
          <Tag>FSM</Tag>
        </InfoPanelTags>
      </InfoPanel>
    </div>
  );
}
