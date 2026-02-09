import { ToastProvider } from './components/Toast';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}
