import { PlaygroundPlugin } from '@/lib/playground';
import Component from './showErrors.vue'

export const showErrorsPlugin: PlaygroundPlugin = {
  id: 'errors',
  displayName: "Errors",
  component: Component
};
