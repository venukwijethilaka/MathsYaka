import { SpaceBackground } from './components/SpaceBackground';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpaceBackground />

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Add your page content here */}
      </div>
    </main>
  );
}
