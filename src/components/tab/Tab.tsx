import React from 'react';
import TabItem, { TabItemPropsType } from '@/components/tab/TabItem';

type TabType = {
  id: number;
  label: string;
  value: string | number;
  [key: string]: any;
};

export type TabListPropsType = {
  tabs: TabType[];
  tabIDSelected: TabItemPropsType['selectedID'];
  onSelectTab: TabItemPropsType['onSelect'];
} & JSX.IntrinsicElements['div'];

const Tab = function (props: TabListPropsType) {
  const { className = '', tabs, tabIDSelected, onSelectTab } = props;
  if (!tabs || !Array.isArray(tabs)) return null;
  return (
    <div className={className}>
      <div className={`tab flex flex-nowrap overflow-x-auto`}>
        {tabs.map((item) => (
          <TabItem
            key={item.id}
            value={item.value}
            selectedID={tabIDSelected}
            onSelect={() => {
              onSelectTab(item.value);
            }}
          >
            {item.label}
          </TabItem>
        ))}
      </div>
    </div>
  );
};

export default Tab;
