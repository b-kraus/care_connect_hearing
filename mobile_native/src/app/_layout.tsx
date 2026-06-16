import React, { createContext, useContext, useState } from 'react';
import { Slot } from 'expo-router';

// 1. Data Model Type Definitions
export interface AlertItem {
  id: string;
  title: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday';
  status: 'ACTIVE_NOW' | 'AWAITING_CONFIRMATION' | 'CONFIRMED' | 'MISSED';
  setBy: string;
}

interface AlertStateContainer {
  alerts: AlertItem[];
  confirmAlert: (id: string) => void;
  triggerDemoAlert: () => void;
}

// 2. State Context Creation
const AlertStateContext = createContext<AlertStateContainer | undefined>(undefined);

// 3. Global Hook (Equivalent to Provider.of<AlertState>(context))
export function useAlertState() {
  const state = useContext(AlertStateContext);
  if (!state) {
    throw new Error('useAlertState must be consumed within a root AlertProvider layout.');
  }
  return state;
}

// 4. Root App Provider Layout
export default function RootLayout() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      title: 'Take blue pill',
      time: '6:00 PM',
      dateGroup: 'Today',
      status: 'ACTIVE_NOW',
      setBy: 'Set by Sarah',
    },
    {
      id: '2',
      title: 'Blood pressure check',
      time: '5:30 PM',
      dateGroup: 'Today',
      status: 'AWAITING_CONFIRMATION',
      setBy: 'Set by Sarah',
    },
    {
      id: '3',
      title: 'Physical therapy session',
      time: '2:00 PM',
      dateGroup: 'Yesterday',
      status: 'MISSED',
      setBy: 'Set by Sarah',
    },
  ]);

  const confirmAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: 'CONFIRMED' } : alert
      )
    );
  };

  const triggerDemoAlert = () => {
    const newAlert: AlertItem = {
      id: Date.now().toString(),
      title: 'Urgent: Audiologist Check-in',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateGroup: 'Today',
      status: 'ACTIVE_NOW',
      setBy: 'System Auto-Gen',
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  return (
    <AlertStateContext.Provider value={{ alerts, confirmAlert, triggerDemoAlert }}>
      <Slot />
    </AlertStateContext.Provider>
  );
}