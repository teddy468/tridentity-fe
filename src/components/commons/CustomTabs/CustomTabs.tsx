import { BoxProps } from "@mui/material";
import { Tab, TabBackground, TabContent, TabLabel, TabsContainer, TabsHeader } from "./styles";

interface Tab {
  key: number;
  label: string;
}
interface CustomTabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  children: React.ReactNode;
  contentProps?: BoxProps;
}

const CustomTabs = ({ tabs, activeTab, setActiveTab, children, contentProps }: CustomTabsProps) => {
  return (
    <TabsContainer>
      <TabsHeader>
        {tabs.map((tab: Tab) => (
          <Tab
            style={{ width: `${Math.floor(100 / tabs.length)}%` }}
            onClick={() => setActiveTab(tab.key)}
            key={tab.key}
            active={activeTab == tab.key}
          >
            <TabBackground active={activeTab == tab.key}>
              <TabLabel active={activeTab == tab.key}>{tab.label}</TabLabel>
            </TabBackground>
          </Tab>
        ))}
      </TabsHeader>
      <TabContent {...contentProps}>{children}</TabContent>
    </TabsContainer>
  );
};

export default CustomTabs;
