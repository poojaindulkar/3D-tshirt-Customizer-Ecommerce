import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab 
    ? { 
        backgroundColor: snap.color, 
        opacity: 0.5,
        borderRadius: isFilterTab ? '50%' : '0.375rem',  /* Added border radius */
      }
    : { 
        backgroundColor: "transparent", 
        opacity: 1,
        borderRadius: isFilterTab ? '50%' : '0.375rem',  /* Added border radius */
      };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'glassmorphism' : ''}`}  /* Removed Tailwind classes */
      onClick={handleClick}
      style={activeStyles}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}  /* Removed Tailwind classes */
        style={{
          width: isFilterTab ? '66.67%' : '91.67%',  /* Adjusted width in percentage */
          height: isFilterTab ? '66.67%' : '91.67%',  /* Adjusted height in percentage */
          objectFit: 'contain'  /* Added object fit */
        }}
      />
    </div>
  );
};

export default Tab;
