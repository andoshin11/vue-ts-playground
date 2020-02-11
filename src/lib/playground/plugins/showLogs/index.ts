import { PlaygroundPlugin } from '@/lib/playground';
import Component from './showLogs.vue'

export const showLogsPlugin: PlaygroundPlugin = {
  id: 'logs',
  displayName: "Run",
  component: Component
};
