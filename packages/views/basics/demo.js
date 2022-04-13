import React from 'react';
import AccountVisualDemo from '@wallet/detail/identity/accountVisual/demo';
import AutoSuggestDemo from './autoSuggest/demo';
import CalendarDemo from './calendar/demo';
import IllustrationDemo from './illustration/demo';
import SpinnerDemo from './spinner/demo';
import SwitcherDemo from './tabs/switcher/demo';
import styles from './demo.css';

const getName = child => child.type.name.replace('Demo', '');
const getId = child => `/toolbox/${getName(child)}`;

const WithTableOfContents = ({
  children,
}) => (
  <>
    {children.map(child => (
      <div id={getId(child)} key={getName(child)} className={styles.section}>
        {child}
      </div>
    ))}
    <div className={styles.tableOfContents}>
      {children.map(child => (
        <a href={`#${getId(child)}`} key={getName(child)}>
          {getName(child)}
        </a>
      ))}
    </div>
  </>
);

const ToolboxDemo = () => (
  <WithTableOfContents>
    <AccountVisualDemo />
    <AutoSuggestDemo />
    <CalendarDemo />
    <IllustrationDemo />
    <SpinnerDemo />
    <SwitcherDemo />
  </WithTableOfContents>
);

export default ToolboxDemo;
